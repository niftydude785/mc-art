/* MC7026 — wallet connect + collection lookup.
   Connects to MetaMask (window.ethereum) to get the visitor's address, then
   asks OpenSea (via the /api/opensea proxy, same one used for price/owner
   lookups) which NFTs that address currently owns on this contract, and
   matches the token ids back to our own project/piece data. */

(function () {
  const btn = document.getElementById("connectWalletBtn");
  if (!btn) return;

  function shortenAddress(addr) {
    return addr.slice(0, 6) + "…" + addr.slice(-4);
  }

  function buildTokenIndex() {
    const map = {};
    PROJECTS.forEach((p) => {
      p.pieces.forEach((piece) => {
        if (piece.token && piece.token !== "XXX") {
          map[String(piece.token)] = { title: p.title, label: piece.label };
        }
      });
    });
    return map;
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

  /* ---------- panel ---------- */
  const panel = document.createElement("div");
  panel.className = "wallet-modal";
  panel.hidden = true;
  panel.innerHTML = `
    <div class="wallet-modal-frame">
      <button class="fs-close" aria-label="Close">&times;</button>
      <h2 class="wallet-modal-title">Your MC7026 collection</h2>
      <div class="wallet-modal-address"></div>
      <div class="wallet-modal-body"></div>
    </div>
  `;
  document.body.appendChild(panel);
  const panelAddress = panel.querySelector(".wallet-modal-address");
  const panelBody = panel.querySelector(".wallet-modal-body");
  panel.querySelector(".fs-close").addEventListener("click", () => { panel.hidden = true; });
  panel.addEventListener("click", (e) => { if (e.target === panel) panel.hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) panel.hidden = true; });

  function renderOwned(owned) {
    if (!owned.length) {
      panelBody.innerHTML = `<p class="wallet-empty">(no cryptoart collected yet)</p>`;
      return;
    }
    const byProject = {};
    owned.forEach((piece) => {
      (byProject[piece.title] = byProject[piece.title] || []).push(piece.label);
    });
    panelBody.innerHTML = `
      <p class="wallet-count">${owned.length} piece${owned.length > 1 ? "s" : ""} owned</p>
      ${Object.keys(byProject).map((title) => `
        <div class="wallet-group">
          <div class="wallet-group-title">${title}</div>
          <ul class="wallet-group-list">
            ${byProject[title].map((label) => `<li>${label}</li>`).join("")}
          </ul>
        </div>
      `).join("")}
    `;
  }

  async function openPanel(address) {
    panelAddress.textContent = address;
    panelBody.innerHTML = `<p class="wallet-loading">Checking your wallet…</p>`;
    panel.hidden = false;
    const owned = await fetchOwnedPieces(address);
    renderOwned(owned);
  }

  /* ---------- connect button ---------- */
  function setConnected(address) {
    btn.textContent = shortenAddress(address);
    btn.classList.add("is-connected");
    btn.dataset.address = address;
  }
  function setDisconnected() {
    btn.textContent = "CONNECT";
    btn.classList.remove("is-connected");
    delete btn.dataset.address;
  }

  async function connect() {
    if (!window.ethereum) {
      alert("MetaMask not detected. Install the MetaMask browser extension to connect your wallet.");
      return;
    }
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "CONNECTING…";
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts && accounts[0]) {
        setConnected(accounts[0]);
        openPanel(accounts[0]);
      } else {
        btn.textContent = original;
      }
    } catch (err) {
      btn.textContent = original;
    } finally {
      btn.disabled = false;
    }
  }

  btn.addEventListener("click", () => {
    if (btn.dataset.address) {
      openPanel(btn.dataset.address);
    } else {
      connect();
    }
  });

  if (window.ethereum) {
    // Silently restore an already-authorized connection (no MetaMask popup)
    // so the header stays in the connected state across pages.
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      if (accounts && accounts[0]) setConnected(accounts[0]);
    }).catch(() => {});
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts && accounts[0]) setConnected(accounts[0]);
      else setDisconnected();
    });
  }
})();
