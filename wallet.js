/* MC7026 — wallet connect + collection lookup.
   Connects to MetaMask (window.ethereum) to get the visitor's address, then
   asks OpenSea (via the /api/opensea proxy, same one used for price/owner
   lookups) which NFTs that address currently owns on this contract, and
   matches the token ids back to our own project/piece data.

   Exposes window.MCWallet so other pages (my-collection.html) can reuse the
   same connect/disconnect state and rendering instead of duplicating it. */

(function () {
  const DISCONNECT_FLAG = "mc7026_wallet_disconnected";

  function shortenAddress(addr) {
    return addr.slice(0, 6) + "…" + addr.slice(-4);
  }

  function buildTokenIndex() {
    const map = {};
    PROJECTS.forEach((p) => {
      p.pieces.forEach((piece) => {
        if (piece.token && piece.token !== "XXX") {
          map[String(piece.token)] = { project: p, piece };
        }
      });
    });
    return map;
  }

  /* Consistent "PROJECT #n/total" label for the collection views — some
     projects only carry the project name on their very first piece in the
     carousel data, so it's re-applied here for every piece. Super Cyd Bros
     pieces are named by world/level instead of a number, and intros aren't
     numbered editions, so both are left as-is. */
  function collectionLabel(project, piece) {
    if (project.slug === "cydbros" || /intro/i.test(piece.label)) return piece.label;
    const supply = project.pieces.length - 1;
    const m = piece.label.match(/#(\d+)/);
    return m ? `${project.title} #${m[1]}/${supply}` : piece.label;
  }

  /* One paginated pass over everything this address owns on OpenSea (across
     every collection, not just ours), keeping only the NFTs whose contract
     matches ours and that we recognize as one of our own pieces. Capped at a
     few pages so a wallet with a huge unrelated collection can't hang this. */
  async function fetchOwnedPieces(address) {
    const index = buildTokenIndex();
    const owned = [];
    let next = null;
    let pages = 0;
    do {
      const params = new URLSearchParams({ limit: "200" });
      if (next) params.set("next", next);
      const openSeaPath = `/chain/${OPENSEA_CHAIN}/account/${address}/nfts?${params.toString()}`;
      let res;
      try {
        res = await fetch(`${OPENSEA_PROXY}?path=${encodeURIComponent(openSeaPath)}`);
      } catch (err) {
        break;
      }
      if (!res.ok) break;
      const data = await res.json();
      (data.nfts || []).forEach((nft) => {
        if (nft.contract && nft.contract.toLowerCase() === OPENSEA_CONTRACT.toLowerCase()) {
          const info = index[String(nft.identifier)];
          if (info) owned.push(info);
        }
      });
      next = data.next || null;
      pages++;
    } while (next && pages < 5);
    return owned;
  }

  function renderOwnedInto(container, owned) {
    if (!owned.length) {
      container.innerHTML = `<p class="wallet-empty">(no cryptoart collected yet)</p>`;
      return;
    }
    const byProject = {};
    owned.forEach(({ project, piece }) => {
      (byProject[project.title] = byProject[project.title] || []).push({ project, piece });
    });
    container.innerHTML = `
      <p class="wallet-count">${owned.length} piece${owned.length > 1 ? "s" : ""} owned</p>
      ${Object.keys(byProject).map((title) => `
        <div class="wallet-group">
          <div class="wallet-group-title">${title}</div>
          <ul class="wallet-group-list">
            ${byProject[title].map(({ project, piece }) => `
              <li><a class="wallet-piece-link" href="project.html?p=${project.slug}&open=${encodeURIComponent(piece.file)}">${collectionLabel(project, piece)}</a></li>
            `).join("")}
          </ul>
        </div>
      `).join("")}
    `;
  }

  /* ---------- shared connect state ---------- */
  let connectedAddress = null;

  function notify() {
    window.dispatchEvent(new CustomEvent("mc-wallet-change", { detail: { address: connectedAddress } }));
  }

  function setConnected(address) {
    connectedAddress = address;
    try { localStorage.removeItem(DISCONNECT_FLAG); } catch (err) {}
    notify();
  }
  function setDisconnected() {
    connectedAddress = null;
    notify();
  }
  function disconnect() {
    connectedAddress = null;
    try { localStorage.setItem(DISCONNECT_FLAG, "1"); } catch (err) {}
    notify();
  }

  async function connect() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Install the MetaMask browser extension to connect your wallet.");
      return null;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts[0]) {
        setConnected(accounts[0]);
        return accounts[0];
      }
    } catch (err) {
      /* user rejected the request, or MetaMask is locked — nothing to do */
    }
    return null;
  }

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts && accounts[0]) setConnected(accounts[0]);
      else setDisconnected();
    });
  }

  let wasDisconnected = false;
  try { wasDisconnected = localStorage.getItem(DISCONNECT_FLAG) === "1"; } catch (err) {}

  const restorePromise = (window.ethereum && !wasDisconnected)
    ? window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts && accounts[0]) connectedAddress = accounts[0];
        notify();
      }).catch(() => { notify(); })
    : Promise.resolve().then(notify);

  window.MCWallet = {
    connect,
    disconnect,
    getAddress: () => connectedAddress,
    ready: restorePromise,
    fetchOwnedPieces,
    collectionLabel,
    renderOwnedInto,
    shortenAddress,
  };

  /* ---------- header CONNECT button (present on every page) ---------- */
  const btn = document.getElementById("connectWalletBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    if (connectedAddress) {
      window.location.href = "my-collection.html";
      return;
    }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "CONNECTING…";
    const address = await connect();
    btn.disabled = false;
    if (!address) btn.textContent = original;
  });

  window.addEventListener("mc-wallet-change", (e) => {
    if (e.detail.address) {
      btn.textContent = shortenAddress(e.detail.address);
      btn.classList.add("is-connected");
    } else {
      btn.textContent = "CONNECT";
      btn.classList.remove("is-connected");
    }
  });
})();
