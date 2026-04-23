import { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react';

interface Props {
  /** initial/fallback value while fetching */
  fallback?: number;
  /** refresh every N ms (default 5 min) */
  refreshMs?: number;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toLocaleString();
}

/** Smoothly counts from `from` to `to` over `duration` ms */
function useCountUp(to: number, duration = 1200) {
  const [display, setDisplay] = useState(to);
  const fromRef = useRef(to);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = fromRef.current;
    if (from === to) return;

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * ease));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration]);

  return display;
}

export default function LiveFollowers({ fallback = 35000, refreshMs = 5 * 60 * 1000 }: Props) {
  const [count, setCount] = useState(fallback);
  const [isLive, setIsLive] = useState(false);
  const animatedCount = useCountUp(count);

  const fetch_count = async () => {
    try {
      // In dev: uses relative URL which Vite proxies or hits Vercel in prod
      const res = await fetch('/api/fb-stats');
      if (!res.ok) return;
      const data = await res.json() as { followers: number };
      if (typeof data.followers === 'number') {
        setCount(data.followers);
        setIsLive(true);
      }
    } catch {
      // silently fall back to static value
    }
  };

  useEffect(() => {
    fetch_count();
    const id = setInterval(fetch_count, refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);

  return (
    <div className="live-followers-badge">
      <span className={`live-dot ${isLive ? 'live-dot--active' : ''}`} />
      <Users size={15} />
      <span className="live-count">{formatCount(animatedCount)}</span>
      <span className="live-label">followers</span>
    </div>
  );
}
