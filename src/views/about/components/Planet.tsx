"use client";

import { useMemo } from 'react';
import type { PlanetData } from '../data/planets';
import { getPlanetX } from '../data/planets';

interface PlanetProps {
  planet: PlanetData;
  scrollProgress: number;
}

const VISIBLE_RANGE = 0.18;

export default function Planet({ planet, scrollProgress }: PlanetProps) {
  const { scale, opacity } = useMemo(() => {
    const distance = Math.abs(scrollProgress - planet.scrollCenter);

    if (distance > VISIBLE_RANGE) {
      return { scale: 0, opacity: 0 };
    }

    const proximity = 1 - distance / VISIBLE_RANGE;

    return {
      scale: 0.2 + proximity * 1.1,
      opacity: Math.min(proximity * 1.5, 1),
    };
  }, [scrollProgress, planet]);

  if (opacity === 0) return null;

  const { SvgComponent } = planet;
  const x = getPlanetX(planet.side);

  // Vertical position: planet moves from bottom to top of viewport
  // as scroll progress approaches its scrollCenter
  const distanceSigned = scrollProgress - planet.scrollCenter;
  // Map: when far below (negative distance) → bottom of screen
  //       when at center → middle of screen (50%)
  //       when far above (positive distance) → top of screen
  const y = 50 - (distanceSigned / VISIBLE_RANGE) * 50;

  return (
    <div
      className="absolute will-change-transform pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <SvgComponent className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64" />
    </div>
  );
}
