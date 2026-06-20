import { useEffect, useState } from 'react';

/**
 * Reads the admin-maintained follower count from the stored /site-data.json.
 * This value is controlled from the admin panel (and refreshed from Facebook
 * there), so the public site no longer depends on a live, expiring FB token.
 * Falls back to the provided value while loading or on error.
 */
export function useFollowerCount(fallback = 35000, refreshMs = 5 * 60 * 1000) {
  const [count, setCount] = useState(fallback);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      try {
        // cache-bust so a freshly redeployed value is picked up
        const res = await fetch(`/site-data.json?t=${Date.now()}`);
        if (!res.ok) return;
        const data = (await res.json()) as { followers?: number };
        if (!cancelled && typeof data.followers === 'number') {
          setCount(data.followers);
          setIsLive(true);
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

  return { count, isLive };
}

/** Rounds a count down to a friendly "35,000+" style string. */
export function roundedCount(n: number): string {
  if (n >= 1000) {
    const thousands = Math.floor(n / 1000);
    return `${thousands.toLocaleString()},000+`;
  }
  return `${n}+`;
}
