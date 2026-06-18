import { useEffect, useState } from 'react';

/**
 * Fetches the live Facebook follower count from /api/fb-stats and refreshes it
 * on an interval. Falls back to the provided value while loading or on error.
 */
export function useFollowerCount(fallback = 35000, refreshMs = 5 * 60 * 1000) {
  const [count, setCount] = useState(fallback);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchCount = async () => {
      try {
        const res = await fetch('/api/fb-stats');
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
