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

  const pageId = process.env.FB_PAGE_ID || '157376048062784';
  const pageToken = process.env.FB_PAGE_TOKEN;
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  // Facebook now requires a Page Access Token to read a page's follower/fan
  // count. Prefer that token; fall back to an app token if only app
  // credentials are configured (kept for backwards compatibility).
  const token = pageToken || (appId && appSecret ? `${appId}|${appSecret}` : null);

  if (!token) {
    // Return the static fallback — credentials not yet configured
    return res.json({ followers: 35000, cached: false, note: 'No FB credentials configured' });
  }

  // TEMPORARY diagnostic: /api/fb-stats?debug=1 reports the shape of the
  // configured token (never the full secret) to help verify it was pasted
  // completely. Remove after setup is confirmed working.
  if (req.query.debug === '1') {
    return res.json({
      hasPageToken: !!pageToken,
      usingAppTokenFallback: !pageToken,
      tokenLength: token.length,
      tokenStart: token.slice(0, 6),
      tokenEnd: token.slice(-4),
      pageId,
    });
  }

  try {
    // Query the page by id. This works with a Page token, or a User token
    // that has been granted pages_read_engagement for the page.
    const url = `https://graph.facebook.com/v18.0/${pageId}?fields=followers_count,fan_count&access_token=${token}`;
    const fbRes = await fetch(url);
    const data = await fbRes.json() as {
      followers_count?: number;
      fan_count?: number;
      error?: { message: string };
    };

    if (data.error) {
      console.error('Facebook API error:', data.error.message);
      return res.status(502).json({ followers: cachedCount ?? 35000, error: data.error.message });
    }

    // Prefer the true follower count; fall back to fan_count (page likes).
    const count = data.followers_count ?? data.fan_count;
    if (typeof count !== 'number') {
      return res.status(502).json({ followers: cachedCount ?? 35000, error: 'No count field returned' });
    }

    cachedCount = count;
    cacheTime = Date.now();
    return res.json({ followers: cachedCount, cached: false });
  } catch (err) {
    console.error('Fetch failed:', err);
    return res.status(500).json({ followers: cachedCount ?? 35000, error: 'Fetch failed' });
  }
}
