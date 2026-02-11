"use client";

import { useMemo } from 'react';
import ShuttleSvg from '../../../assets/planets/spaceshuttle.svg';
import { planets, getPlanetX } from '../data/planets';
import styles from '../SpaceJourney.module.css';

interface SpaceshuttleProps {
  scrollProgress: number;
  isHidden: boolean;
  /** 1 = scrolling down (forward), -1 = scrolling up (backward) */
  direction: 1 | -1;
}

/**
 * The shuttle follows a serpentine S-curve that passes through each planet.
 * Between planets it curves from one side to the other.
 *
 * Rotation is calculated from the actual movement direction (tangent)
 * so the shuttle always points where it's heading.
 * The SVG points UP by default, so 0° = moving up.
 */

/** Get raw position at a given progress (no rotation) */
function getPositionAt(progress: number): { x: number; y: number } {
  const n = planets.length;

  // Before first planet
  if (progress <= planets[0].scrollCenter) {
    const t = planets[0].scrollCenter > 0
      ? progress / planets[0].scrollCenter
      : 1;
    const targetX = getPlanetX(planets[0].side);
    return {
      x: 50 + (targetX - 50) * easeInOut(t),
      y: 30 + t * 20,
    };
  }

  // After last planet
  if (progress >= planets[n - 1].scrollCenter) {
    const lastX = getPlanetX(planets[n - 1].side);
    const t = Math.min(
      (progress - planets[n - 1].scrollCenter) / (1 - planets[n - 1].scrollCenter),
      1,
    );
    return { x: lastX, y: 50 + t * 30 };
  }

  // Between two planets
  for (let i = 0; i < n - 1; i++) {
    const from = planets[i];
    const to = planets[i + 1];

    if (progress >= from.scrollCenter && progress <= to.scrollCenter) {
      const t = (progress - from.scrollCenter) / (to.scrollCenter - from.scrollCenter);
      const fromX = getPlanetX(from.side);
      const toX = getPlanetX(to.side);

      return {
        x: fromX + (toX - fromX) * easeInOut(t),
        y: 40 + t * 20,
      };
    }
  }

  return { x: 50, y: 50 };
}

function getShuttlePosition(progress: number) {
  const pos = getPositionAt(progress);

  // Calculate rotation from actual movement direction using a small delta
  const delta = 0.002;
  const prev = getPositionAt(Math.max(0, progress - delta));
  const next = getPositionAt(Math.min(1, progress + delta));

  const dx = next.x - prev.x;
  const dy = next.y - prev.y;

  // atan2 gives angle from positive X axis.
  // SVG shuttle nose points UP (-Y direction = -90° in atan2).
  // To align nose with movement: rotation = atan2(dy, dx) - (-90°) but since
  // CSS Y axis is inverted (down = positive), we subtract 90° instead.
  const angleRad = Math.atan2(dy, dx);
  const rotation = (angleRad * 180) / Math.PI - 90;

  return { x: pos.x, y: pos.y, rotation };
}

/** Smooth ease-in-out for S-curve */
function easeInOut(t: number): number {
  return t < 0.5
    ? 2 * t * t
    : 1 - (-2 * t + 2) ** 2 / 2;
}

export default function Spaceshuttle({ scrollProgress, isHidden, direction }: SpaceshuttleProps) {
  const position = useMemo(
    () => getShuttlePosition(scrollProgress),
    [scrollProgress],
  );

  // When scrolling up, flip the shuttle 180° so it points backward
  const rotation = direction === -1
    ? position.rotation + 180
    : position.rotation;

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
      <ShuttleSvg className={`w-12 h-16 md:w-16 md:h-24 ${styles.shuttleFloat}`} />
    </div>
  );
}
