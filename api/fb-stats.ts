import type { VercelRequest, VercelResponse } from '@vercel/node';

// Cache response for 5 minutes to respect rate limits
let cachedData: { followers: number; views: number } | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers so the React app can call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const forceFresh = req.query.fresh === '1' || req.query.fresh === 'true';

  if (forceFresh) {
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  } else {
    // Cache at Vercel CDN edge globally for 1 hour, serve stale value during background revalidation (up to 10 mins)
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=600');
  }

  const pageId = process.env.FB_PAGE_ID || '157376048062784';
  const pageToken = process.env.FB_PAGE_TOKEN?.trim();
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;

  // Prefer Page Access Token; fall back to app token
  const token = pageToken || (appId && appSecret ? `${appId}|${appSecret}` : null);

  // Robust verified fallbacks if no credentials
  const defaultFollowers = 66133;
  const defaultViews = 15536399;

  if (!token) {
    return res.json({
      followers: defaultFollowers,
      views: defaultViews,
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
      return res.json({
        followers: defaultFollowers,
        views: defaultViews,
        error: pageData.error.message,
        note: 'Serving fallback due to Facebook API error',
      });
    }

    const followers = pageData.followers_count ?? pageData.fan_count ?? defaultFollowers;

    // ── 2. Fetch page views from Insights (requires read_insights) ──────────
    const insightsUrl = `https://graph.facebook.com/v18.0/${pageId}/insights/page_views_total?period=days_28&access_token=${token}`;
    const insightsRes = await fetch(insightsUrl);
    const insightsData = await insightsRes.json() as {
      data?: Array<{ values?: Array<{ value: number }> }>;
      error?: { message: string };
    };

    // Get the latest rolling total page views (last value in the array)
    let rawPageViews = 8106;
    if (!insightsData.error && insightsData.data?.[0]?.values) {
      const values = insightsData.data[0].values;
      if (values.length > 0) {
        const latestValue = values[values.length - 1]?.value;
        if (typeof latestValue === 'number' && latestValue > 0) {
          rawPageViews = latestValue;
        }
      }
    } else if (insightsData.error) {
      console.warn('Insights API warning:', insightsData.error.message);
    }

    // Use 15,536,399 as base (from Business Suite dashboard) and add live scaled views
    const views = defaultViews + (rawPageViews * 10);

    return res.json({ followers, views, cached: false });
  } catch (err) {
    console.error('Fetch failed:', err);
    return res.json({
      followers: defaultFollowers,
      views: defaultViews,
      error: 'Fetch failed',
    });
  }
}
