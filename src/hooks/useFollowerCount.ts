import { useEffect, useState } from 'react';

/**
 * Reads the admin-maintained follower + views count from /site-data.json.
 * This value is controlled from the admin panel (refreshed from Facebook there),
 * so the public site no longer depends on a live, expiring FB token.
 * Falls back to the provided values while loading or on error.
 */
export function useFollowerCount(fallback = 35000, refreshMs = 5 * 60 * 1000) {
  const [count, setCount] = useState(fallback);
  const [views, setViews] = useState(0);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      try {
        const res = await fetch('/api/fb-stats');
        if (!res.ok) return;
        const data = (await res.json()) as { followers?: number; views?: number };
        if (!cancelled) {
          if (typeof data.followers === 'number') {
            setCount(data.followers);
            setIsLive(true);
          }
          if (typeof data.views === 'number') {
            setViews(data.views);
          }
        }
      } catch {
        // silently keep the fallback value
      }
    };

    fetchCount();
    const id = setInterval(fetchCount, refreshMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [refreshMs]);

  return { count, views, isLive };
}

/** Rounds a count down to a friendly "35,000+" style string. */
export function roundedCount(n: number): string {
  if (n >= 1_000_000) {
    const m = (n / 1_000_000).toFixed(1).replace(/\.0$/, '');
    return `${m}M+`;
  }
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    return `${thousands.toLocaleString()},000+`;
  }
  return `${n}+`;
}
