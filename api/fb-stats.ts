import type { VercelRequest, VercelResponse } from '@vercel/node';

// Cache response for 5 minutes to respect rate limits
let cachedCount: number | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers so the React app can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Serve cached value if fresh
  if (cachedCount !== null && Date.now() - cacheTime < CACHE_TTL_MS) {
    return res.json({ followers: cachedCount, cached: true });
  }

  const pageId = process.env.FB_PAGE_ID || '100063990864335';
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  if (!appId || !appSecret) {
    // Return the static fallback — credentials not yet configured
    return res.json({ followers: 35000, cached: false, note: 'No FB credentials configured' });
  }

  try {
    const token = `${appId}|${appSecret}`;
    const url = `https://graph.facebook.com/v18.0/${pageId}?fields=fan_count&access_token=${token}`;
    const fbRes = await fetch(url);
    const data = await fbRes.json() as { fan_count?: number; error?: { message: string } };

    if (data.error) {
      console.error('Facebook API error:', data.error.message);
      return res.status(502).json({ followers: 35000, error: data.error.message });
    }

    cachedCount = data.fan_count ?? 35000;
    cacheTime = Date.now();
    return res.json({ followers: cachedCount, cached: false });
  } catch (err) {
    console.error('Fetch failed:', err);
    return res.status(500).json({ followers: 35000, error: 'Fetch failed' });
  }
}
