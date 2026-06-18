import type { VercelRequest, VercelResponse } from '@vercel/node';

// Video totals change slowly, so cache for 30 minutes.
let cachedViews: number | null = null;
let cacheTime = 0;
const CACHE_TTL_MS = 30 * 60 * 1000;

// Safety cap on pagination so a page with many videos can't fan out forever.
const MAX_PAGES = 25;

interface Video {
  views?: number;
}

interface VideosResponse {
  data?: Video[];
  paging?: { next?: string };
  error?: { message: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (cachedViews !== null && Date.now() - cacheTime < CACHE_TTL_MS) {
    return res.json({ views: cachedViews, cached: true });
  }

  const pageId = process.env.FB_PAGE_ID || '157376048062784';
  const pageToken = process.env.FB_PAGE_TOKEN;
  const appId = process.env.FB_APP_ID;
  const appSecret = process.env.FB_APP_SECRET;
  const token = pageToken || (appId && appSecret ? `${appId}|${appSecret}` : null);

  if (!token) {
    return res.json({ views: 0, cached: false, note: 'No FB credentials configured' });
  }

  try {
    let url: string | undefined =
      `https://graph.facebook.com/v18.0/${pageId}/videos?fields=views&limit=100&access_token=${token}`;
    let total = 0;
    let pages = 0;
    let videoCount = 0;
    let firstPageSample: unknown = null;

    while (url && pages < MAX_PAGES) {
      const fbRes = await fetch(url);
      const data = (await fbRes.json()) as VideosResponse;

      if (data.error) {
        console.error('Facebook API error:', data.error.message);
        return res.status(502).json({ views: cachedViews ?? 0, error: data.error.message });
      }

      if (pages === 0) firstPageSample = (data.data ?? []).slice(0, 3);

      for (const video of data.data ?? []) {
        videoCount += 1;
        if (typeof video.views === 'number') total += video.views;
      }

      url = data.paging?.next;
      pages += 1;
    }

    if (req.query.debug === '1') {
      return res.json({ total, videoCount, pages, firstPageSample });
    }

    cachedViews = total;
    cacheTime = Date.now();
    return res.json({ views: total, cached: false });
  } catch (err) {
    console.error('Fetch failed:', err);
    return res.status(500).json({ views: cachedViews ?? 0, error: 'Fetch failed' });
  }
}
