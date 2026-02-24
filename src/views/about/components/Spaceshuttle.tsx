"use client";

import { useMemo, useState, useEffect, useRef, type RefObject } from 'react';
import ShuttleSvg from '../../../assets/planets/spaceshuttle.svg';
import { planets, getPlanetX } from '../data/planets';
import styles from '../SpaceJourney.module.css';

interface SpaceshuttleProps {
  scrollProgress: number;
  isHidden: boolean;
  direction: 1 | -1;
  blackHoleRef: RefObject<HTMLDivElement | null>;
}

function easeInOut(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : 1 - (-2 * t + 2) ** 2 / 2;
}

/** Get raw XY position at a given progress value */
export function getPositionAt(progress: number): { x: number; y: number } {
  const n = planets.length;

  // Before first planet: drop straight down first, then curve toward first planet.
  // This ensures the shuttle starts pointing straight down (vertical).
  if (progress <= planets[0].scrollCenter) {
    const t = planets[0].scrollCenter > 0 ? progress / planets[0].scrollCenter : 1;
    const targetX = getPlanetX(planets[0].side);
    // X stays near center for most of the drop, then sweeps to the planet side at the end
    const xEase = easeInOut(Math.max(0, (t - 0.4) / 0.6)); // only moves X in last 60% of segment
    return {
      x: 50 + (targetX - 50) * xEase,
      y: 20 + t * 25, // 20% → 45% (linear, so tangent is purely vertical at t=0)
    };
  }

  // After last planet: curve back to center first, then drop straight down (vertical at end).
  if (progress >= planets[n - 1].scrollCenter) {
    const lastX = getPlanetX(planets[n - 1].side);
    const t = Math.min(
      (progress - planets[n - 1].scrollCenter) / (1 - planets[n - 1].scrollCenter),
      1,
    );
    // X returns to center only in first 60% of segment, stays at 50 for last 40%
    const xEase = easeInOut(Math.min(t / 0.6, 1));
    return {
      x: lastX + (50 - lastX) * xEase,
      y: 45 + t * 40, // 45% → 85% (linear, so tangent is purely vertical at t=1)
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

export default function Spaceshuttle({ scrollProgress, isHidden, direction, blackHoleRef }: SpaceshuttleProps) {
  const position = useMemo(
    () => getShuttlePosition(scrollProgress),
    [scrollProgress],
  );

  // When scrolling up, flip 180° so the nose points in the direction of actual travel
  const rotation = direction === -1 ? position.rotation + 180 : position.rotation;

  const LAST_PLANET_CENTER = 0.639;
  const isHyperSpeed = scrollProgress > LAST_PLANET_CENTER;

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shuttleRef = useRef<HTMLDivElement | null>(null);

  // Distance-based absorption: measure real pixel distance to black hole edge
  const TRIGGER_PX = 80; // px from BH edge to start effect
  const [absorptionT, setAbsorptionT] = useState(0);

  useEffect(() => {
    const bhEl = blackHoleRef.current;
    const shEl = shuttleRef.current;
    if (!bhEl || !shEl) return;

    const bhRect = bhEl.getBoundingClientRect();
    const shRect = shEl.getBoundingClientRect();

    // Distance from shuttle center to nearest point of BH bounding box
    const shCX = shRect.left + shRect.width / 2;
    const shCY = shRect.top + shRect.height / 2;
    const nearestX = Math.max(bhRect.left, Math.min(shCX, bhRect.right));
    const nearestY = Math.max(bhRect.top, Math.min(shCY, bhRect.bottom));
    const dist = Math.hypot(shCX - nearestX, shCY - nearestY);

    const t = Math.max(0, Math.min(1, 1 - dist / TRIGGER_PX));
    setAbsorptionT(t);
  }, [scrollProgress, blackHoleRef]);

  useEffect(() => {
    setIsScrolling(true);
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 150);
  }, [scrollProgress]);

  const isBoost = isHyperSpeed || isScrolling;

  // Flame size: idle → boost (scrolling) → hyperspeed (permanent, much larger)
  const flameWidth = isHyperSpeed ? '28px' : isBoost ? '18px' : '12px';
  const flameHeight = isHyperSpeed ? '72px' : isBoost ? '40px' : '22px';
  const flameGradient = isHyperSpeed
    ? 'radial-gradient(ellipse 55% 100% at 50% 100%, #fff 0%, #aaddff 15%, #44aaff 35%, #ff8800 65%, #ff2200 85%, transparent 100%)'
    : isBoost
    ? 'radial-gradient(ellipse 60% 100% at 50% 100%, #fff 0%, #ffdd44 20%, #ff8800 55%, #ff4400 80%, transparent 100%)'
    : 'radial-gradient(ellipse 55% 100% at 50% 100%, #fffacc 0%, #ffee88 30%, #ffaa00 65%, transparent 100%)';

  // scaleX collapses to 0, scaleY stretches — classic "beam up" effect
  const scaleX = 1 - absorptionT;
  const scaleY = 1 + absorptionT * 2.5;
  const shuttleOpacity = isHidden ? 0 : Math.max(0, 1 - absorptionT * 1.6);

  return (
    <div
      ref={shuttleRef}
      className="absolute z-10 will-change-transform"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
        opacity: shuttleOpacity,
        transition: 'opacity 0.05s linear, transform 0.05s linear',
        visibility: absorptionT >= 1 ? 'hidden' : 'visible',
      }}
    >
      <div className={`relative ${styles.shuttleFloat}`} style={{ width: '72px', height: '96px' }}>
        <ShuttleSvg className="w-full h-full" />
        {/* Propulsors at TOP of SVG (Y≈0) — flame exits above */}
        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%) translateY(-100%)' }}>
          <div
            className={isBoost ? styles.flameBoost : styles.flameIdle}
            style={{
              width: flameWidth,
              height: flameHeight,
              background: flameGradient,
              borderRadius: '50% 50% 0 0',
              transition: 'width 0.3s ease, height 0.3s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
