"use client";

import { useMemo } from 'react';
import type { PlanetData } from '../data/planets';
import { getPlanetX } from '../data/planets';
import styles from '../SpaceJourney.module.css';

interface PlanetProps {
  planet: PlanetData;
  scrollProgress: number;
}

// How far (in scroll progress units) the planet is visible on each side of its center
const VISIBLE_RANGE = 0.13;

export default function Planet({ planet, scrollProgress }: PlanetProps) {
  const { scale, opacity } = useMemo(() => {
    const distance = Math.abs(scrollProgress - planet.scrollCenter);

    if (distance > VISIBLE_RANGE) {
      return { scale: 0, opacity: 0 };
    }

    const prox = 1 - distance / VISIBLE_RANGE;

    return {
      scale: 0.3 + prox * 0.9,
      opacity: Math.min(prox * 1.6, 1),
    };
  }, [scrollProgress, planet]);

  if (opacity === 0) return null;

  const { SvgComponent } = planet;

  const x = getPlanetX(planet.side);

  const distanceSigned = scrollProgress - planet.scrollCenter;
  const y = 55 - (distanceSigned / VISIBLE_RANGE) * 70;

  return (
    <div
      className="absolute will-change-transform pointer-events-none z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <SvgComponent className={`w-77 h-77 md:w-92 md:h-92 lg:w-123 lg:h-123 ${styles.planetFloat}`} />
    </div>
  );
}
