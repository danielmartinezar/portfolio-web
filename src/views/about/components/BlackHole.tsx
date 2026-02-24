"use client";

import { type RefObject } from 'react';
import BlackHoleSvg from '../../../assets/planets/blackhole2.svg';

interface BlackHoleProps {
  progress: number;
  centered?: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
}

const SCROLL_CENTER = 0.88;
const VISIBLE_RANGE = 0.13;

export default function BlackHole({ progress, centered = false, containerRef }: BlackHoleProps) {
  const distance = Math.abs(progress - SCROLL_CENTER);

  if (distance > VISIBLE_RANGE && !centered) return null;

  const prox = centered ? 1 : 1 - distance / VISIBLE_RANGE;
  const scale = centered ? 1.2 : 0.3 + prox * 0.9;
  const opacity = centered ? 1 : Math.min(prox * 1.6, 1);

  // Same Y logic as planets: enters from below, moves up as it approaches center
  const distanceSigned = progress - SCROLL_CENTER;
  const scrollY = 65 - (distanceSigned / VISIBLE_RANGE) * 70;

  // When centered: transition to fixed 50% center
  const y = centered ? 50 : scrollY;

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 pointer-events-none z-30"
      style={{
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        transition: centered
          ? 'top 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease'
          : undefined,
      }}
    >
      <BlackHoleSvg className="w-150 h-auto" />
    </div>
  );
}
