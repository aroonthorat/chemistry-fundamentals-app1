import { useEffect, useRef, useState } from 'react';
import { Users } from 'lucide-react';
import { useFollowerCount } from '../hooks/useFollowerCount';

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
  const { count, isLive } = useFollowerCount(fallback, refreshMs);
  const animatedCount = useCountUp(count);

  return (
    <div className="live-followers-badge">
      <span className={`live-dot ${isLive ? 'live-dot--active' : ''}`} />
      <Users size={15} />
      <span className="live-count">{formatCount(animatedCount)}</span>
      <span className="live-label">followers</span>
    </div>
  );
}
