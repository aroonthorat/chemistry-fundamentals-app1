import { useEffect, useRef } from 'react';

/**
 * SiteBackground — one fixed, full-viewport animated canvas that sits behind the
 * entire app and stays put through scroll. Renders a living chemistry scene:
 *   - a drifting neon "constellation" of particles linked by faint lines
 *   - several atoms (glowing nucleus + orbiting electrons) that wander, collide
 *     and bond (a glowing bond line + flash) when they meet, then drift apart
 * Colours are pulled at random from the brand neon spectrum so every reload — and
 * every collision — looks a little different.
 */
const COLORS = ['#00f0ff', '#8a2be2', '#ff007f', '#00ff88'];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = () => COLORS[(Math.random() * COLORS.length) | 0];

interface Electron {
  rx: number;
  ry: number;
  rot: number;
  speed: number;
  phase: number;
  color: string;
  size: number;
}
interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  electrons: Electron[];
  flash: number;
}
interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

export default function SiteBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let atoms: Atom[] = [];
    let dots: Dot[] = [];

    const makeAtom = (): Atom => {
      const r = rand(9, 20);
      const count = (Math.random() * 3 | 0) + 1; // 1–3 electron rings
      const electrons: Electron[] = Array.from({ length: count }, () => ({
        rx: r * rand(1.9, 2.8),
        ry: r * rand(0.7, 1.25),
        rot: rand(0, Math.PI),
        speed: rand(0.012, 0.035) * (Math.random() < 0.5 ? -1 : 1),
        phase: rand(0, Math.PI * 2),
        color: pick(),
        size: rand(1.6, 3),
      }));
      return {
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.32, 0.32),
        vy: rand(-0.32, 0.32),
        r,
        color: pick(),
        electrons,
        flash: 0,
      };
    };

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const atomCount = Math.min(13, Math.max(5, Math.round((w * h) / 110000)));
      const dotCount = Math.min(120, Math.max(28, Math.round(w / 15)));
      atoms = Array.from({ length: atomCount }, makeAtom);
      dots = Array.from({ length: dotCount }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.35, 0.35),
        vy: rand(-0.35, 0.35),
        r: rand(0.6, 2.4),
        color: pick(),
      }));
    };

    const drawAtom = (a: Atom) => {
      // electron rings + electrons
      for (const e of a.electrons) {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(e.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, e.rx, e.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `${e.color}40`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // electron
        const ex = Math.cos(e.phase) * e.rx;
        const ey = Math.sin(e.phase) * e.ry;
        ctx.beginPath();
        ctx.arc(ex, ey, e.size, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = e.color;
        ctx.fill();
        ctx.restore();
      }
      // nucleus
      const glow = a.r * (a.flash > 0 ? 2.4 : 1.7);
      const grad = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glow);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, a.color);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(a.x, a.y, glow, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = a.flash > 0 ? 0.9 : 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      // ---- particles + links ----
      ctx.shadowBlur = 0;
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = d.color;
        ctx.globalAlpha = 0.75;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,240,255,${(1 - dist / 120) * 0.1})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // ---- atom motion, collisions & bonds ----
      for (const a of atoms) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < a.r) { a.x = a.r; a.vx = Math.abs(a.vx); }
        if (a.x > w - a.r) { a.x = w - a.r; a.vx = -Math.abs(a.vx); }
        if (a.y < a.r) { a.y = a.r; a.vy = Math.abs(a.vy); }
        if (a.y > h - a.r) { a.y = h - a.r; a.vy = -Math.abs(a.vy); }
        for (const e of a.electrons) e.phase += e.speed;
        if (a.flash > 0) a.flash -= 1;
      }
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const a = atoms[i];
          const b = atoms[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const bondRange = (a.r + b.r) * 3.6;
          if (dist < bondRange) {
            // bond line — brightens as they close in
            const t = 1 - dist / bondRange;
            ctx.strokeStyle = `rgba(0,240,255,${0.06 + t * 0.4})`;
            ctx.lineWidth = 1 + t * 1.6;
            ctx.shadowBlur = 10 * t;
            ctx.shadowColor = '#00f0ff';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
          const minDist = a.r + b.r + 6;
          if (dist < minDist) {
            // elastic-ish bounce + bond flash
            const nx = dx / dist;
            const ny = dy / dist;
            const avn = a.vx * nx + a.vy * ny;
            const bvn = b.vx * nx + b.vy * ny;
            a.vx += (bvn - avn) * nx;
            a.vy += (bvn - avn) * ny;
            b.vx += (avn - bvn) * nx;
            b.vy += (avn - bvn) * ny;
            const push = (minDist - dist) / 2;
            a.x -= nx * push;
            a.y -= ny * push;
            b.x += nx * push;
            b.y += ny * push;
            a.flash = 14;
            b.flash = 14;
          }
        }
      }
      for (const a of atoms) drawAtom(a);

      raf = requestAnimationFrame(step);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      init();
      if (reduced) step();
      else raf = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(step);
      }
    };

    init();
    if (reduced) {
      step(); // single static frame
    } else {
      raf = requestAnimationFrame(step);
    }
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
