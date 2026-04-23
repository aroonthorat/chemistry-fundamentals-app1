import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;

// Total scrollable height (in vh) while the canvas is pinned
const SCROLL_HEIGHT_VH = 600;

// Fade zone as a fraction of total scroll: top 15% fades in, bottom 15% fades out
const FADE_ZONE = 0.15;

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const topFadeRef = useRef<HTMLDivElement>(null);
  const bottomFadeRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  // ─── Cover-fit draw ──────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  }, []);

  // ─── Smooth lerp RAF loop ────────────────────────────────────────────
  const animate = useCallback(() => {
    const diff = targetFrameRef.current - currentFrameRef.current;
    currentFrameRef.current += diff * 0.10; // lerp — lower = smoother

    const frame = Math.round(Math.min(Math.max(currentFrameRef.current, 0), TOTAL_FRAMES - 1));
    drawFrame(frame);

    rafRef.current = requestAnimationFrame(animate);
  }, [drawFrame]);

  // ─── Scroll → frame mapping + overlay opacity ────────────────────────
  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrolled = -section.getBoundingClientRect().top;
    const totalScrollable = section.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

    // Target frame
    targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

    // Top overlay: fade from site-bg (opacity 1) → transparent (opacity 0)
    if (topFadeRef.current) {
      const topOpacity = progress < FADE_ZONE ? 1 - progress / FADE_ZONE : 0;
      topFadeRef.current.style.opacity = String(topOpacity);
    }

    // Bottom overlay: transparent (0) → site-bg (1)
    if (bottomFadeRef.current) {
      const bottomOpacity = progress > 1 - FADE_ZONE ? (progress - (1 - FADE_ZONE)) / FADE_ZONE : 0;
      bottomFadeRef.current.style.opacity = String(bottomOpacity);
    }

    // Scroll hint: hide once user starts scrolling through the section
    if (hintRef.current) {
      hintRef.current.style.opacity = progress > 0.05 ? '0' : '0.85';
    }
  }, []);

  // ─── Resize ──────────────────────────────────────────────────────────
  const onResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // ─── Preload frames ──────────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => { if (i === 1) drawFrame(0); };
      images.push(img);
    }
    imagesRef.current = images;
  }, [drawFrame]);

  // ─── Mount ───────────────────────────────────────────────────────────
  useEffect(() => {
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [animate, onScroll, onResize]);

  const siteBg = '#050505'; // matches --bg-color

  return (
    <div
      ref={sectionRef}
      style={{ height: `${SCROLL_HEIGHT_VH}vh`, position: 'relative' }}
    >
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>

        {/* Frame canvas */}
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* ── Permanent centre vignette (subtle depth) ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(5,5,5,0.55) 100%)',
        }} />

        {/* ── Top fade: dark site → animation ── */}
        <div
          ref={topFadeRef}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '35%',
            background: `linear-gradient(to bottom, ${siteBg} 0%, transparent 100%)`,
            pointerEvents: 'none',
            transition: 'opacity 0.05s linear',
          }}
        />

        {/* ── Bottom fade: animation → dark site ── */}
        <div
          ref={bottomFadeRef}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: `linear-gradient(to top, ${siteBg} 0%, transparent 100%)`,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.05s linear',
          }}
        />

        {/* ── Scroll hint ── */}
        <div
          ref={hintRef}
          className="scroll-hint"
          style={{
            position: 'absolute', bottom: 40, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span style={{
            color: '#fff', fontSize: '0.75rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            Scroll to explore
          </span>
          <div className="scroll-arrow" />
        </div>
      </div>
    </div>
  );
}
