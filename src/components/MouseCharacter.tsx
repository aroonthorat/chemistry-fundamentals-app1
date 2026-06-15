import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * MouseCharacter
 * --------------
 * A friendly mascot that peeks in from the bottom-right corner and "watches"
 * the cursor — inspired by the GitHub Universe mascot. It combines two effects:
 *
 *   1. Head tilt  — the whole character rotates toward the cursor (rotateX/Y),
 *                   reading as him turning to look at you.
 *   2. Eye gaze   — two pupil overlays glide toward the cursor inside their
 *                   sockets (only rendered when `eyes` coordinates are given).
 *
 * Drop your character art at `public/character.png` (a transparent PNG works
 * best). If your art has visible eyes you want to animate separately, pass the
 * `eyes` prop with their approximate positions as a percentage of the image.
 */

type EyeSpec = {
  /** Horizontal centre of the eye, as a % of the image width (0–100). */
  x: number;
  /** Vertical centre of the eye, as a % of the image height (0–100). */
  y: number;
};

type Props = {
  /** Path to the character image. Defaults to `/character.png`. */
  src?: string;
  /** Rendered width of the character in pixels. */
  size?: number;
  /** Optional pupil positions to enable separate eye-tracking. */
  eyes?: { left: EyeSpec; right: EyeSpec };
  /** How far the pupils may travel from centre, in px. */
  pupilRange?: number;
};

const MouseCharacter = ({
  src = '/character.png',
  size = 220,
  eyes,
  pupilRange = 6,
}: Props) => {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Hide on touch / small screens where a corner mascot just gets in the way.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const check = () =>
      setEnabled(
        window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768
      );
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Raw, normalised cursor offset from the character's centre, range ~[-1, 1].
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // Smooth the motion so the gaze feels alive rather than robotic.
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const sx = useSpring(offsetX, spring);
  const sy = useSpring(offsetY, spring);

  // Head tilt: a few degrees of rotation toward the cursor.
  const rotateY = useTransform(sx, [-1, 1], [-16, 16]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);

  // Pupils travel a small distance in the same direction.
  const pupilX = useTransform(sx, [-1, 1], [-pupilRange, pupilRange]);
  const pupilY = useTransform(sy, [-1, 1], [-pupilRange, pupilRange]);

  useEffect(() => {
    if (!enabled || prefersReduced) return;

    const handle = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalise by a quarter of the viewport so nearby motion is responsive
      // but the character doesn't slam to its limit the moment you move.
      const nx = (e.clientX - cx) / (window.innerWidth / 2);
      const ny = (e.clientY - cy) / (window.innerHeight / 2);
      offsetX.set(Math.max(-1, Math.min(1, nx)));
      offsetY.set(Math.max(-1, Math.min(1, ny)));
    };

    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [enabled, prefersReduced, offsetX, offsetY]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={containerRef}
      aria-hidden
      initial={{ y: size * 0.6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.6 }}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 0,
        width: size,
        height: size,
        zIndex: 60,
        pointerEvents: 'none',
        perspective: 600,
        filter: 'drop-shadow(0 12px 24px rgba(0,240,255,0.25))',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          rotateX: prefersReduced ? 0 : rotateX,
          rotateY: prefersReduced ? 0 : rotateY,
        }}
      >
        <img
          src={src}
          alt=""
          draggable={false}
          // Until the art is added at public/character.png, hide rather than
          // showing a broken-image icon.
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden';
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none' }}
        />

        {/* Optional separate eye-tracking overlay. */}
        {eyes &&
          !prefersReduced &&
          [eyes.left, eyes.right].map((eye, i) => (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                left: `${eye.x}%`,
                top: `${eye.y}%`,
                width: 7,
                height: 7,
                marginLeft: -3.5,
                marginTop: -3.5,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fff, #0a0a0a 70%)',
                x: pupilX,
                y: pupilY,
              }}
            />
          ))}
      </motion.div>
    </motion.div>
  );
};

export default MouseCharacter;
