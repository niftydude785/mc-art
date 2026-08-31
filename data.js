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
    release: { label: "JUST MINTED", sortValue: 202609 },
    meta: "Onchain glitch ascii art archives — 20 Artworks",
    folder: "src/OGAKA/",
    cyd: { id: "1909", name: "GADGET" },
    statement: [
      "Onchain: permanently inscribed on Ethereum, no images, no vectors.",
      "Glitch: relics pulled from a crypto bank heist that never quite ends.",
      "Ascii: pure text, just characters holding a picture together.",
      "Art: cryptoart stripped to its rawest form.",
      "Archives: CYD coded.",
      "OGA³ makes a true banger MC7026 drop, that's it !"
    ],
    cover: { file: "ogaka1.html", label: "OGA³ #1 - THE ROBBERY", token: "247" },
    pieces: [
      { file: "intro.html",       label: "OGA³ — INTRO", token: "246" },
      { file: "ogaka1.html",      label: "OGA³ #1 - THE ROBBERY",  token: "247" },
      { file: "ogaka2.html",      label: "OGA³ #2 - DUDE SPENDOOOR",  token: "248" },
      { file: "ogaka3.html",      label: "OGA³ #3 - DEGEN GAMBLOR",  token: "249" },
      { file: "ogaka4.html",      label: "OGA³ #4 - DEEP WHALE",  token: "250" },
      { file: "ogaka5.html",      label: "OGA³ #5 - THE FARMOOOOOOOOR",  token: "251" },
      { file: "ogaka6.html",      label: "OGA³ #6 - THE CRYPTOART TEMPLE",  token: "252" },
      { file: "ogaka7.html",      label: "OGA³ #7 - THE BIRTHDAY DUDE",  token: "253" },
      { file: "ogaka8.html",      label: "OGA³ #8 - THE CRYPTO RAIN",  token: "254" },
      { file: "ogaka9.html",      label: "OGA³ #9 - THE HARDWARE DEALER",  token: "255" },
      { file: "ogaka10.html",     label: "OGA³ #10 - THE CYD GATES", token: "256" },
      { file: "ogaka11.html",     label: "OGA³ #11 - THE CYPHER DELOREAN", token: "257" },
      { file: "ogaka12.html",     label: "OGA³ #12 - THE GIANT LEAP", token: "258" },
      { file: "ogaka13.html",     label: "OGA³ #13 - THE CRYPTOART SUMMER", token: "259" },
      { file: "ogaka14.html",     label: "OGA³ #14 - THE DUDE BOY", token: "260" },
      { file: "ogaka15.html",     label: "OGA³ #15 - THE DUDE DEPLOYING COMPUTER", token: "261" },
      { file: "ogaka16.html",     label: "OGA³ #16 - DOOM GLITCH EDITION", token: "262" },
      { file: "ogaka17.html",     label: "OGA³ #17 - THE DUDE ART GALLERY", token: "263" },
      { file: "ogaka18.html",     label: "OGA³ #18 - THE Mo.DA", token: "264" },
      { file: "ogaka19.html",     label: "OGA³ #19 - GMITOKENCITY", token: "265" },
      { file: "ogaka20.html",     label: "OGA³ #20 - IN SEARCH OF MOON", token: "266" }
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
      "Experience it yourself by removing the tape. Do it now!",
      "A Maurizio Cattelan-inspired parody of a cryptoartist."
    ],
    cover: { file: "1_ordinian.html", label: "CENTRALIAN #1 — ORDINIAN", token: "233" },
    pieces: [
      { file: "_intro.html",          label: "CENTRALIAN — INTRO", token: "232" },
      { file: "1_ordinian.html",      label: "CENTRALIAN #1 - ORDINIAN", token: "233" },
      { file: "2_socialian.html",     label: "CENTRALIAN #2 - SOCIALIAN",     token: "234" },
      { file: "3_marketian.html",     label: "CENTRALIAN #3 - MARKETIAN",     token: "235" },
      { file: "4_gasian.html",        label: "CENTRALIAN #4 - GASIAN",     token: "236" },
      { file: "5_whaleian.html",      label: "CENTRALIAN #5 - WHALEIAN",     token: "237" },
      { file: "6_physicalian.html",   label: "CENTRALIAN #6 - PHYSICALIAN",     token: "238" },
      { file: "7_museian.html",       label: "CENTRALIAN #7 - MUSEIAN",     token: "239" },
      { file: "8_bankian.html",       label: "CENTRALIAN #8 - BANKIAN",     token: "240" },
      { file: "9_critician.html",     label: "CENTRALIAN #9 - CRITICIAN",     token: "241" },
      { file: "10_egotian.html",      label: "CENTRALIAN #10 - EGOTIAN",    token: "242" }
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
      "A gaming platform canvas with nine levels, spread into three worlds.",
      "Each world has its own colors and mood. Every pixel is coded by AI, no hands, no sprite sheets.",
      "Maximum compression capabilities used to render fully onchain."
    ],
    cover: { file: "cyd-bros-lvl1-1.html", label: "CYD BROS — W1 / L1", token: "221" },
    pieces: [
      { file: "cyd-bros-intro.html",     label: "CYD BROS — INTRO",  token: "220" },
      { file: "cyd-bros-lvl1-1.html",    label: "WORLD 1-1 - THE ONCHAIN HOME",     token: "221" },
      { file: "cyd-bros-lvl1-2.html",    label: "WORLD 1-2 - SHROOM FIELDS FOREVER",     token: "222" },
      { file: "cyd-bros-lvl1-3.html",    label: "WORLD 1-3 - THE ANCIENT FARM",     token: "223" },
      { file: "cyd-bros-lvl2-1.html",    label: "WORLD 2-1 - MOEBIUS DESERT B",     token: "224" },
      { file: "cyd-bros-lvl2-2.html",    label: "WORLD 2-2 - THE VOLCANIC ISLAND",     token: "225" },
      { file: "cyd-bros-lvl2-3.html",    label: "WORLD 2-3 - THE ROYAL ICE CAKE",     token: "226" },
      { file: "cyd-bros-lvl3-1.html",    label: "WORLD 3-1 - MYSTICAL SOUVENIRS",     token: "227" },
      { file: "cyd-bros-lvl3-2.html",    label: "WORLD 3-2 - LEAK CITY (EUROPE)",     token: "228" },
      { file: "cyd-bros-lvl3-3.html",    label: "WORLD 3-3 - THE FINAL BOSS",     token: "229" }
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
      "Twenty noise studies in interference.",
      "A parcour of deciphering through cypherdudes experiences, art and memes.",
      "What you see and hear is never fixed 📡"
    ],
    cover: { file: "MemeNoise1.html", label: "BRUIT #1", token: "194" },
    pieces: [
      { file: "IntroNoise.html", label: "BRUIT — INTRO", token: "193" },
      { file: "MemeNoise1.html",  label: "BRUIT #1 - FOUNDER",  token: "194" },
      { file: "MemeNoise2.html",  label: "BRUIT #2 - Ad Crush",  token: "195" },
      { file: "MemeNoise3.html",  label: "BRUIT #3 - LOADING",  token: "196" },
      { file: "MemeNoise4.html",  label: "BRUIT #4 - DIY Gallery",  token: "197" },
      { file: "MemeNoise5.html",  label: "BRUIT #5 - IRL-DRAW",  token: "198" },
      { file: "MemeNoise6.html",  label: "BRUIT #6 - SQUASHING",  token: "199" },
      { file: "MemeNoise7.html",  label: "BRUIT #7 - TopFive",  token: "200" },
      { file: "MemeNoise8.html",  label: "BRUIT #8 - AFTER VOSSEN",  token: "201" },
      { file: "MemeNoise9.html",  label: "BRUIT #9 - Cloud BIP-39",  token: "202" },
      { file: "MemeNoise10.html", label: "BRUIT #10 - SCHRAAAFF!!!", token: "203" },
      { file: "MemeNoise11.html", label: "BRUIT #11 - 1$ MERCH", token: "204" },
      { file: "MemeNoise12.html", label: "BRUIT #12 - Art Descending", token: "205" },
      { file: "MemeNoise13.html", label: "BRUIT #13 - C#y#p#h#e#r Frens", token: "206" },
      { file: "MemeNoise14.html", label: "BRUIT #14 - JS Uncaught SyntaxError", token: "207" },
      { file: "MemeNoise15.html", label: "BRUIT #15 - Corrupted WL", token: "208" },
      { file: "MemeNoise16.html", label: "BRUIT #16 - NoiSyphus the 13th", token: "209" },
      { file: "MemeNoise17.html", label: "BRUIT #17 - KOOooopssD", token: "210" },
      { file: "MemeNoise18.html", label: "BRUIT #18 - U = R x I", token: "211" },
      { file: "MemeNoise19.html", label: "BRUIT #19 - Raster EGG", token: "212" },
      { file: "MemeNoise20.html", label: "BRUIT #20 - No More Please", token: "213" }
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
      "Fifteen eggs, spreading the dudes art and aesthetic.",
      "Ranked from common to legendary, like specimens.",
      "The onchain Fabergé EGGS ready to be collected"
    ],
    cover: { file: "eggs_mini_id1.html", label: "EGGS #1", token: "172" },
    pieces: [
      { file: "intro.html",              label: "EGGS — INTRO", token: "171" },
      { file: "eggs_mini_id1.html",      label: "EGGS #1 - Genesis",  token: "172" },
      { file: "eggs_mini_id2.html",      label: "EGGS #2 - Multi Punk spores",  token: "173" },
      { file: "eggs_mini_id3.html",      label: "EGGS #3 - Overdoomed Pain",  token: "174" },
      { file: "eggs_mini_id4.html",      label: "EGGS #4 - META CHAIN",  token: "175" },
      { file: "eggs_mini_id5.html",      label: "EGGS #5 - TRAAASH !!!",  token: "176" },
      { file: "eggs_mini_id6.html",      label: "EGGS #6 - COINED",  token: "177" },
      { file: "eggs_mini_id7.html",      label: "EGGS #7 - heist-proof Moma",  token: "178" },
      { file: "eggs_mini_id8.html",      label: "EGGS #8 - UP AND DOWN ONLY",  token: "179" },
      { file: "eggs_mini_id9.html",      label: "EGGS #9 - OMELETTE PEPE",  token: "180" },
      { file: "eggs_mini_id10.html",     label: "EGGS #10 - HIS LEDGER", token: "181" },
      { file: "eggs_mini_id11.html",     label: "EGGS #11 - TRY AGAIN", token: "182" },
      { file: "eggs_mini_id12.html",     label: "EGGS #12 - MY PROMISED", token: "183" },
      { file: "eggs_mini_id13.html",     label: "EGGS #13 - MINT x2048", token: "184" },
      { file: "eggs_mini_id14.html",     label: "EGGS #14 - eternal return", token: "185" },
      { file: "eggs_mini_id15.html",     label: "EGGS #15 - PACMOON", token: "187" }
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
      "Each one recommends a book and hides a small relic. Vidoplyasov keeps watch.",
      "Made in collaboration with <a href=\"https://x.com/vidoplyasovna\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--accent)\">Vidoplyasov</a>."
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
