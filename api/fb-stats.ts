import type { VercelRequest, VercelResponse } from '@vercel/node';

// Cache response for 5 minutes to respect rate limits
let cachedData: { followers: number; views: number } | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers so the React app can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // The admin "Refresh from Facebook" button passes ?fresh=1 to bypass the cache
  const forceFresh = req.query.fresh === '1' || req.query.fresh === 'true';

  // Serve cached value if still fresh
  if (!forceFresh && cachedData !== null && Date.now() - cacheTime < CACHE_TTL_MS) {
    return res.json({ ...cachedData, cached: true });
  }

  const pageId = process.env.FB_PAGE_ID || '157376048062784';
  const pageToken = process.env.FB_PAGE_TOKEN?.trim();
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  // Prefer Page Access Token; fall back to app token for backwards compatibility
  const token = pageToken || (appId && appSecret ? `${appId}|${appSecret}` : null);

  if (!token) {
    return res.json({
      followers: cachedData?.followers ?? 35000,
      views: cachedData?.views ?? 0,
      cached: false,
      note: 'No FB credentials configured',
    });
  }

  try {
    // ── 1. Fetch followers / fan count ─────────────────────────────────────
    const pageUrl = `https://graph.facebook.com/v18.0/${pageId}?fields=followers_count,fan_count&access_token=${token}`;
    const pageRes = await fetch(pageUrl);
    const pageData = await pageRes.json() as {
      followers_count?: number;
      fan_count?: number;
      error?: { message: string };
    };

    if (pageData.error) {
      console.error('Facebook API error (page):', pageData.error.message);
      return res.status(502).json({
        followers: cachedData?.followers ?? 35000,
        views: cachedData?.views ?? 0,
        error: pageData.error.message,
      });
    }

    const followers = pageData.followers_count ?? pageData.fan_count ?? cachedData?.followers ?? 35000;

    // ── 2. Fetch page views from Insights (requires read_insights) ──────────
    // page_views_total for the last 28 days gives a rolling total page views
    const insightsUrl = `https://graph.facebook.com/v18.0/${pageId}/insights/page_views_total?period=days_28&access_token=${token}`;
    const insightsRes = await fetch(insightsUrl);
    const insightsData = await insightsRes.json() as {
      data?: Array<{ values?: Array<{ value: number }> }>;
      error?: { message: string };
    };

    // Sum all returned daily values for total views in the period
    let views = cachedData?.views ?? 0;
    if (!insightsData.error && insightsData.data?.[0]?.values) {
      const total = insightsData.data[0].values.reduce((sum, v) => sum + (v.value || 0), 0);
      if (total > 0) views = total;
    } else if (insightsData.error) {
      console.warn('Insights API warning:', insightsData.error.message);
    }

    cachedData = { followers, views };
    cacheTime = Date.now();

    return res.json({ followers, views, cached: false });
  } catch (err) {
    console.error('Fetch failed:', err);
    return res.status(500).json({
      followers: cachedData?.followers ?? 35000,
      views: cachedData?.views ?? 0,
      error: 'Fetch failed',
    });
  }
}
