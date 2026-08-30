// Vercel serverless function: proxies the OpenSea API v2 calls this site
// needs (get NFT / get best listing / list an account's NFTs), attaching the
// API key server-side so it never reaches the browser. Set OPENSEA_API_KEY in
// the Vercel project's Environment Variables — nothing else to configure,
// Vercel picks this file up automatically as /api/opensea.
//
// Only these exact path shapes are forwarded; anything else is rejected so
// this can't be used as an open relay for the API key.
const ALLOWED_PATTERNS = [
  /^\/chain\/ethereum\/contract\/0x[a-fA-F0-9]{40}\/nfts\/[0-9]+$/,
  /^\/listings\/collection\/[a-z0-9-]+\/nfts\/[0-9]+\/best$/,
  /^\/chain\/ethereum\/account\/0x[a-fA-F0-9]{40}\/nfts(\?[a-zA-Z0-9=&_%.-]*)?$/,
];

module.exports = async function handler(req, res) {
  const path = req.query.path;

  if (!path || typeof path !== "string" || !ALLOWED_PATTERNS.some((re) => re.test(path))) {
    res.status(403).json({ error: "Path not allowed" });
    return;
  }

  const apiKey = process.env.OPENSEA_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: OPENSEA_API_KEY is not set" });
    return;
  }

  try {
    const upstream = await fetch(`https://api.opensea.io/api/v2${path}`, {
      headers: { accept: "application/json", "x-api-key": apiKey },
    });
    const body = await upstream.text();
    res.status(upstream.status);
    res.setHeader("content-type", upstream.headers.get("content-type") || "application/json");
    res.setHeader("cache-control", "s-maxage=60, stale-while-revalidate=300");
    res.send(body);
  } catch (err) {
    res.status(502).json({ error: "Upstream request to OpenSea failed" });
  }
};
