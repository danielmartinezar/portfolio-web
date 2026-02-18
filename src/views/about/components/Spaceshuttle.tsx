"use client";

import { useMemo, useState, useEffect, useRef } from 'react';
import ShuttleSvg from '../../../assets/planets/spaceshuttle.svg';
import { planets, getPlanetX } from '../data/planets';
import styles from '../SpaceJourney.module.css';

interface SpaceshuttleProps {
  scrollProgress: number;
  isHidden: boolean;
  direction: 1 | -1;
}

function easeInOut(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : 1 - (-2 * t + 2) ** 2 / 2;
}

/** Get raw XY position at a given progress value */
export function getPositionAt(progress: number): { x: number; y: number } {
  const n = planets.length;

  // Before first planet: descend from top-center toward first planet
  if (progress <= planets[0].scrollCenter) {
    const t = planets[0].scrollCenter > 0 ? progress / planets[0].scrollCenter : 1;
    const targetX = getPlanetX(planets[0].side);
    return {
      x: 50 + (targetX - 50) * easeInOut(t),
      y: 10 + easeInOut(t) * 35, // 10% → 45%
    };
  }

  // After last planet: continue downward toward bottom
  if (progress >= planets[n - 1].scrollCenter) {
    const lastX = getPlanetX(planets[n - 1].side);
    const t = Math.min(
      (progress - planets[n - 1].scrollCenter) / (1 - planets[n - 1].scrollCenter),
      1,
    );
    return {
      x: lastX + (50 - lastX) * easeInOut(t),
      y: 45 + easeInOut(t) * 40, // 45% → 85%
    };
  }

  // Between planets: S-curve sweeping left↔right, Y moves from 45% to 65% per segment
  for (let i = 0; i < n - 1; i++) {
    const from = planets[i];
    const to = planets[i + 1];
    if (progress >= from.scrollCenter && progress <= to.scrollCenter) {
      const t = (progress - from.scrollCenter) / (to.scrollCenter - from.scrollCenter);
      const fromX = getPlanetX(from.side);
      const toX = getPlanetX(to.side);
      return {
        x: fromX + (toX - fromX) * easeInOut(t),
        y: 45 + easeInOut(t) * 20, // 45% → 65%
      };
    }
  }

  return { x: 50, y: 50 };
}

function getShuttlePosition(progress: number) {
  const pos = getPositionAt(progress);

  const delta = 0.008;
  const prev = getPositionAt(Math.max(0, progress - delta));
  const next = getPositionAt(Math.min(1, progress + delta));

  const dx = next.x - prev.x;
  const dy = next.y - prev.y;

  // SVG nose at Y=95 (bottom) → rotate(0°) = nose DOWN.
  // atan2(dy,dx) - 90° aligns nose with travel direction for a nose-down SVG.
  const angleRad = Math.atan2(dy, dx);
  const rotation = (angleRad * 180) / Math.PI - 90;

  return { x: pos.x, y: pos.y, rotation };
}

export default function Spaceshuttle({ scrollProgress, isHidden, direction }: SpaceshuttleProps) {
  const position = useMemo(
    () => getShuttlePosition(scrollProgress),
    [scrollProgress],
  );

  // When scrolling up, flip 180° so the nose points in the direction of actual travel
  const rotation = direction === -1 ? position.rotation + 180 : position.rotation;

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsScrolling(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 150);
  }, [scrollProgress]);

  return (
    <div
      className="absolute z-10 will-change-transform transition-opacity duration-300"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        opacity: isHidden ? 0 : 1,
      }}
    >
      <div className={`relative ${styles.shuttleFloat}`} style={{ width: '72px', height: '96px' }}>
        <ShuttleSvg className="w-full h-full" />
        {/* Propulsors at TOP of SVG (Y≈0) — flame exits above */}
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%) translateY(-100%)' }}>
          <div
            className={isScrolling ? styles.flameBoost : styles.flameIdle}
            style={{
              width: isScrolling ? '18px' : '12px',
              height: isScrolling ? '40px' : '22px',
              background: isScrolling
                ? 'radial-gradient(ellipse 60% 100% at 50% 100%, #fff 0%, #ffdd44 20%, #ff8800 55%, #ff4400 80%, transparent 100%)'
                : 'radial-gradient(ellipse 55% 100% at 50% 100%, #fffacc 0%, #ffee88 30%, #ffaa00 65%, transparent 100%)',
              borderRadius: '50% 50% 0 0',
              transition: 'width 0.1s ease, height 0.1s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
