/* ==========================================================================
   MC7026 — site data
   Everything project-specific lives here: folders, file lists, statement
   text, and the OpenSea token id for every single piece.

   TO ADD OPENSEA LINKS: replace the "XXX" token values below with the real
   token id for each piece. The link is built automatically as:
   https://opensea.io/item/ethereum/0xe1851e0d09352f2e56171c62c7ded015e199258b/<token>

   Project order = release date: "coming soon" first, then most recent to
   oldest. release.sortValue drives the order — Infinity keeps a project on
   top regardless of what else launches later.
   ========================================================================== */

const OPENSEA_CONTRACT = "0xe1851e0d09352f2e56171c62c7ded015e199258b";

/* Live price/owner lookups (project pages only) — see fetchOpenSeaInfo below.
   The actual OpenSea API key lives server-side only, as the OPENSEA_API_KEY
   environment variable on Vercel (Project Settings -> Environment Variables).
   The browser only ever talks to our own /api/opensea proxy (api/opensea.js),
   which attaches the key before forwarding to OpenSea — the key itself never
   reaches client-side code or the network tab.
   NOTE: this proxy only exists once deployed on Vercel. Testing locally via
   file:// or a plain static server (python -m http.server, etc.) will just
   fall back to "MAKE OFFER" with no owner shown, since /api/opensea 404s —
   use `vercel dev` to test the live price/owner lookups locally. */
const OPENSEA_CHAIN = "ethereum";
const OPENSEA_PROXY = "/api/opensea";
const OPENSEA_CACHE_TTL_MS = 5 * 60 * 1000;

const PROJECTS = [
  {
    slug: "ogaka",
    title: "OGA³",
    release: { label: "MINTING SOON", sortValue: Infinity },
    meta: "Onchain glitch ascii art archives — 20 Artworks",
    folder: "src/OGAKA/",
    cyd: { id: "1909", name: "GADGET" },
    statement: [
      "A series of onchain cypherdudes rendered as raw ASCII — glitch relics pulled from a crypto bank heist that never quite ends.",
      "Each frame is pure text: no images, no vectors, just characters holding a picture together.",
      "20 unique scenes, one recurring cast, permanently inscribed on Ethereum."
    ],
    cover: { file: "ogaka1.html", label: "OGA³ #1", token: "XXX" },
    pieces: [
      { file: "intro.html",       label: "OGA³ — INTRO", token: "XXX" },
      { file: "ogaka1.html",      label: "OGA³ #1",  token: "XXX" },
      { file: "ogaka2.html",      label: "OGA³ #2",  token: "XXX" },
      { file: "ogaka3.html",      label: "OGA³ #3",  token: "XXX" },
      { file: "ogaka4.html",      label: "OGA³ #4",  token: "XXX" },
      { file: "ogaka5.html",      label: "OGA³ #5",  token: "XXX" },
      { file: "ogaka6.html",      label: "OGA³ #6",  token: "XXX" },
      { file: "ogaka7.html",      label: "OGA³ #7",  token: "XXX" },
      { file: "ogaka8.html",      label: "OGA³ #8",  token: "XXX" },
      { file: "ogaka9.html",      label: "OGA³ #9",  token: "XXX" },
      { file: "ogaka10.html",     label: "OGA³ #10", token: "XXX" },
      { file: "ogaka11.html",     label: "OGA³ #11", token: "XXX" },
      { file: "ogaka12.html",     label: "OGA³ #12", token: "XXX" },
      { file: "ogaka13.html",     label: "OGA³ #13", token: "XXX" },
      { file: "ogaka14.html",     label: "OGA³ #14", token: "XXX" },
      { file: "ogaka15.html",     label: "OGA³ #15", token: "XXX" },
      { file: "ogaka16.html",     label: "OGA³ #16", token: "XXX" },
      { file: "ogaka17.html",     label: "OGA³ #17", token: "XXX" },
      { file: "ogaka18.html",     label: "OGA³ #18", token: "XXX" },
      { file: "ogaka19.html",     label: "OGA³ #19", token: "XXX" },
      { file: "ogaka20.html",     label: "OGA³ #20", token: "XXX" }
    ]
  },
  {
    slug: "centralian",
    title: "CENTRALIAN",
    release: { label: "JULY 2026", sortValue: 202607 },
    meta: "Comedian Tape Cryptoartist — 10 Artworks",
    folder: "src/Centralian/",
    cyd: { id: "1986", name: "ANNOUNCE" },
    statement: [
      "Ten posters about money.",
      "Retro computer prints, styled like old software boxes. Peel the tape to see what's underneath."
    ],
    cover: { file: "1_ordinian.html", label: "CENTRALIAN #1 — ORDINIAN", token: "233" },
    pieces: [
      { file: "_intro.html",          label: "CENTRALIAN — INTRO", token: "232" },
      { file: "1_ordinian.html",      label: "CENTRALIAN #1 — ORDINIAN", token: "233" },
      { file: "2_socialian.html",     label: "#2 — SOCIALIAN",     token: "234" },
      { file: "3_marketian.html",     label: "#3 — MARKETIAN",     token: "235" },
      { file: "4_gasian.html",        label: "#4 — GASIAN",        token: "236" },
      { file: "5_whaleian.html",      label: "#5 — WHALEIAN",      token: "237" },
      { file: "6_physicalian.html",   label: "#6 — PHYSICALIAN",   token: "238" },
      { file: "7_museian.html",       label: "#7 — MUSEIAN",       token: "239" },
      { file: "8_bankian.html",       label: "#8 — BANKIAN",       token: "240" },
      { file: "9_critician.html",     label: "#9 — CRITICIAN",     token: "241" },
      { file: "10_egotian.html",      label: "#10 — EGOTIAN",      token: "242" }
    ]
  },
  {
    slug: "cydbros",
    title: "SUPER CYD BROS",
    release: { label: "APRIL 2026", sortValue: 202604 },
    meta: "Pixel platform levels — 9 Artworks",
    folder: "src/super-cyd-bros/",
    frameSize: { w: 470, h: 270 },
    cyd: { id: "1886", name: "DISPLAY" },
    statement: [
      "A platformer told in stills. Nine levels, three worlds.",
      "Each world has its own colors and mood. Every pixel is coded by hand, no sprite sheets."
    ],
    cover: { file: "cyd-bros-lvl1-1.html", label: "CYD BROS — W1 / L1", token: "221" },
    pieces: [
      { file: "cyd-bros-intro.html",     label: "CYD BROS — INTRO",  token: "220" },
      { file: "cyd-bros-lvl1-1.html",    label: "WORLD 1 / LEVEL 1",     token: "221" },
      { file: "cyd-bros-lvl1-2.html",    label: "WORLD 1 / LEVEL 2",     token: "222" },
      { file: "cyd-bros-lvl1-3.html",    label: "WORLD 1 / LEVEL 3",     token: "223" },
      { file: "cyd-bros-lvl2-1.html",    label: "WORLD 2 / LEVEL 1",     token: "224" },
      { file: "cyd-bros-lvl2-2.html",    label: "WORLD 2 / LEVEL 2",     token: "225" },
      { file: "cyd-bros-lvl2-3.html",    label: "WORLD 2 / LEVEL 3",     token: "226" },
      { file: "cyd-bros-lvl3-1.html",    label: "WORLD 3 / LEVEL 1",     token: "227" },
      { file: "cyd-bros-lvl3-2.html",    label: "WORLD 3 / LEVEL 2",     token: "228" },
      { file: "cyd-bros-lvl3-3.html",    label: "WORLD 3 / LEVEL 3",     token: "229" }
    ]
  },
  {
    slug: "noise",
    title: "BRUIT",
    release: { label: "FEBRUARY 2026", sortValue: 202602 },
    meta: "Decipher digital entities — 20 Artworks",
    folder: "src/Noise/",
    cyd: { id: "622", name: "AXIS" },
    statement: [
      "Twenty studies in interference.",
      "A single source image is broken down, averaged into a coarse grid, then set trembling under live analog static rendered frame by frame in canvas.",
      "What you see is never fixed — the noise regenerates every time the page loads."
    ],
    cover: { file: "MemeNoise1.html", label: "BRUIT #1", token: "194" },
    pieces: [
      { file: "IntroNoise.html", label: "BRUIT — INTRO", token: "193" },
      { file: "MemeNoise1.html",  label: "BRUIT #1",  token: "194" },
      { file: "MemeNoise2.html",  label: "BRUIT #2",  token: "195" },
      { file: "MemeNoise3.html",  label: "BRUIT #3",  token: "196" },
      { file: "MemeNoise4.html",  label: "BRUIT #4",  token: "197" },
      { file: "MemeNoise5.html",  label: "BRUIT #5",  token: "198" },
      { file: "MemeNoise6.html",  label: "BRUIT #6",  token: "199" },
      { file: "MemeNoise7.html",  label: "BRUIT #7",  token: "200" },
      { file: "MemeNoise8.html",  label: "BRUIT #8",  token: "201" },
      { file: "MemeNoise9.html",  label: "BRUIT #9",  token: "202" },
      { file: "MemeNoise10.html", label: "BRUIT #10", token: "203" },
      { file: "MemeNoise11.html", label: "BRUIT #11", token: "204" },
      { file: "MemeNoise12.html", label: "BRUIT #12", token: "205" },
      { file: "MemeNoise13.html", label: "BRUIT #13", token: "206" },
      { file: "MemeNoise14.html", label: "BRUIT #14", token: "207" },
      { file: "MemeNoise15.html", label: "BRUIT #15", token: "208" },
      { file: "MemeNoise16.html", label: "BRUIT #16", token: "209" },
      { file: "MemeNoise17.html", label: "BRUIT #17", token: "210" },
      { file: "MemeNoise18.html", label: "BRUIT #18", token: "211" },
      { file: "MemeNoise19.html", label: "BRUIT #19", token: "212" },
      { file: "MemeNoise20.html", label: "BRUIT #20", token: "213" }
    ]
  },
  {
    slug: "eggs",
    title: "EGGS",
    release: { label: "NOVEMBER 2025", sortValue: 202511 },
    meta: "Cosmic Eggs spreading CYD traits in space — 15 Artworks",
    folder: "src/eggs/",
    cyd: { id: "399", name: "EGG" },
    statement: [
      "Fifteen small eggs, each one a portrait of a dude.",
      "Ranked from common to legendary, like specimens in a collection."
    ],
    cover: { file: "eggs_mini_id1.html", label: "EGGS #1", token: "172" },
    pieces: [
      { file: "intro.html",              label: "EGGS — INTRO", token: "171" },
      { file: "eggs_mini_id1.html",      label: "EGGS #1",  token: "172" },
      { file: "eggs_mini_id2.html",      label: "EGGS #2",  token: "173" },
      { file: "eggs_mini_id3.html",      label: "EGGS #3",  token: "174" },
      { file: "eggs_mini_id4.html",      label: "EGGS #4",  token: "175" },
      { file: "eggs_mini_id5.html",      label: "EGGS #5",  token: "176" },
      { file: "eggs_mini_id6.html",      label: "EGGS #6",  token: "177" },
      { file: "eggs_mini_id7.html",      label: "EGGS #7",  token: "178" },
      { file: "eggs_mini_id8.html",      label: "EGGS #8",  token: "179" },
      { file: "eggs_mini_id9.html",      label: "EGGS #9",  token: "180" },
      { file: "eggs_mini_id10.html",     label: "EGGS #10", token: "181" },
      { file: "eggs_mini_id11.html",     label: "EGGS #11", token: "182" },
      { file: "eggs_mini_id12.html",     label: "EGGS #12", token: "183" },
      { file: "eggs_mini_id13.html",     label: "EGGS #13", token: "184" },
      { file: "eggs_mini_id14.html",     label: "EGGS #14", token: "185" },
      { file: "eggs_mini_id15.html",     label: "EGGS #15", token: "187" }
    ]
  },
  {
    slug: "dgl",
    title: "DGL (FEAT. VIDOPLYASOV)",
    release: { label: "JULY 2024", sortValue: 202407 },
    meta: "Dude's Grail Library ~ Perfect library as gaming characters — 10 Artworks",
    folder: "src/dude-grail-library/",
    frameSize: { w: 360, h: 320 },
    cyd: { id: "1436", name: "LIBRARY" },
    statement: [
      "Ten archives from a library that shouldn't exist.",
      "Each one recommends a book and hides a small relic. Vidoplyasov keeps watch."
    ],
    cover: { file: "dgl1.html", label: "DGL #1", token: "13" },
    pieces: [
      { file: "introduction.html", label: "DGL — INTRO", token: "12" },
      { file: "dgl1.html",  label: "DGL #1",  token: "13" },
      { file: "dgl2.html",  label: "DGL #2",  token: "14" },
      { file: "dgl3.html",  label: "DGL #3",  token: "15" },
      { file: "dgl4.html",  label: "DGL #4",  token: "16" },
      { file: "dgl5.html",  label: "DGL #5",  token: "18" },
      { file: "dgl6.html",  label: "DGL #6",  token: "19" },
      { file: "dgl7.html",  label: "DGL #7",  token: "20" },
      { file: "dgl8.html",  label: "DGL #8",  token: "21" },
      { file: "dgl9.html",  label: "DGL #9",  token: "22" },
      { file: "dgl10.html", label: "DGL #10", token: "17" }
    ]
  }
];

function openseaUrl(token) {
  return "https://opensea.io/item/ethereum/" + OPENSEA_CONTRACT + "/" + token;
}

function frameSizeOf(project) {
  return project.frameSize || { w: 470, h: 360 };
}

function cydGifPath(project) {
  if (!project.cyd) return null;
  return "src/cyd-gifs/" + project.cyd.name + " - CYPHERDUDE #" + project.cyd.id + ".gif";
}

function sortedProjects() {
  return [...PROJECTS].sort((a, b) => b.release.sortValue - a.release.sortValue);
}

/* Live OpenSea lookup for one token: current best listing price (if any)
   and current owner. Never throws — on any failure (network, CORS, 404,
   rate limit) it just resolves with nulls so the caller can fall back to
   "MAKE OFFER" / no owner shown. */
function proxyUrl(openSeaPath) {
  return `${OPENSEA_PROXY}?path=${encodeURIComponent(openSeaPath)}`;
}

async function fetchOpenSeaInfo(tokenId) {
  const result = { owner: null, listing: null };
  try {
    const nftRes = await fetch(proxyUrl(`/chain/${OPENSEA_CHAIN}/contract/${OPENSEA_CONTRACT}/nfts/${tokenId}`));
    if (!nftRes.ok) return result;
    const nftData = await nftRes.json();
    result.owner = (nftData && nftData.nft && nftData.nft.owners && nftData.nft.owners[0] && nftData.nft.owners[0].address) || null;
    const slug = nftData && nftData.nft && nftData.nft.collection;
    if (!slug) return result;

    const listRes = await fetch(proxyUrl(`/listings/collection/${slug}/nfts/${tokenId}/best`));
    if (listRes.ok) {
      const listData = await listRes.json();
      const cur = listData && listData.price && listData.price.current;
      if (cur && cur.value != null && cur.decimals != null) {
        const amount = Number(cur.value) / Math.pow(10, Number(cur.decimals));
        result.listing = { amount: Number(amount.toFixed(2)), currency: cur.currency || "ETH" };
      }
    }
  } catch (err) {
    /* network or CORS failure — return whatever we already have */
  }
  return result;
}

function getOpenSeaInfoCached(tokenId) {
  const cacheKey = "mc7026_opensea_" + tokenId;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
    if (cached && Date.now() - cached.ts < OPENSEA_CACHE_TTL_MS) {
      return Promise.resolve(cached.data);
    }
  } catch (err) { /* ignore bad cache entry */ }

  return fetchOpenSeaInfo(tokenId).then(data => {
    try { localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data })); } catch (err) { /* storage full/blocked */ }
    return data;
  });
}
