"use client";

import { useMemo } from 'react';

// Star types: dim background dots, mid glowing, bright with cross flare
type StarType = 'dim' | 'mid' | 'bright';

interface Star {
  x: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
  twinkleDuration: number;
  twinkleDelay: number;
  layer: 0 | 1 | 2;
  type: StarType;
  color: string;
}

// Speed by layer: far = slow, near = fast
const LAYER_DURATION = {
  0: { min: 20, range: 12 }, // 20–32s far/slow
  1: { min: 11, range: 7 },  // 11–18s mid
  2: { min: 5,  range: 5 },  // 5–10s near/fast
};

// Realistic star colors: blue-white, white, warm white, soft blue
const STAR_COLORS = ['#ffffff', '#e8eeff', '#fffbe8', '#c8d8ff', '#f0f8ff'];

function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateStars(count: number): Star[] {
  const random = createRng(42);
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const layer = (i < count * 0.5 ? 0 : i < count * 0.8 ? 1 : 2) as 0 | 1 | 2;
    const d = LAYER_DURATION[layer];

    // 60% dim, 30% mid, 10% bright — more bright stars on closer layers
    const typeRoll = random();
    const brightThreshold = layer === 2 ? 0.15 : layer === 1 ? 0.08 : 0.04;
    const midThreshold = layer === 2 ? 0.45 : layer === 1 ? 0.38 : 0.28;
    const type: StarType = typeRoll < brightThreshold ? 'bright' : typeRoll < midThreshold ? 'mid' : 'dim';

    const color = STAR_COLORS[Math.floor(random() * STAR_COLORS.length)];

    // Size varies a lot more by type
    let size: number;
    if (type === 'bright') {
      size = 3.5 + random() * 3.5; // 3.5–7px
    } else if (type === 'mid') {
      size = layer === 0 ? 1.2 + random() * 1.5 : 1.8 + random() * 2.5;
    } else {
      size = layer === 0 ? 0.6 + random() * 1.2 : layer === 1 ? 0.8 + random() * 1.4 : 1 + random() * 1.8;
    }

    stars.push({
      x: random() * 100,
      size,
      delay: -(random() * (d.min + d.range)),
      duration: d.min + random() * d.range,
      brightness: type === 'bright' ? 0.85 + random() * 0.15 : type === 'mid' ? 0.5 + random() * 0.4 : 0.2 + random() * 0.35,
      twinkleDuration: type === 'bright' ? 1.5 + random() * 2 : 2 + random() * 4,
      twinkleDelay: random() * 6,
      layer,
      type,
      color,
    });
  }
  return stars;
}


function getStarBoxShadow(star: Star): string {
  const { size, color, type } = star;

  if (type === 'bright') {
    // Soft glow + cross flare (4 directional rays)
    const glow1 = `0 0 ${size * 2}px ${size * 0.8}px ${color}99`;
    const glow2 = `0 0 ${size * 5}px ${size * 1.5}px ${color}44`;
    const rayH = `${size * 3}px 0 ${size * 2}px ${color}55, -${size * 3}px 0 ${size * 2}px ${color}55`;
    const rayV = `0 ${size * 3}px ${size * 2}px ${color}55, 0 -${size * 3}px ${size * 2}px ${color}55`;
    return `${glow1}, ${glow2}, ${rayH}, ${rayV}`;
  }

  if (type === 'mid') {
    return `0 0 ${size * 2}px ${size * 0.5}px ${color}66, 0 0 ${size * 4}px ${color}33`;
  }

  // dim: no shadow
  return 'none';
}

const LAST_PLANET = 0.639;
const HYPER_SPEED = 8;

interface StarFieldProps {
  scrollProgress: number;
}

export default function StarField({ scrollProgress }: StarFieldProps) {
  const stars = useMemo(() => generateStars(180), []);
  const isHyperSpeed = scrollProgress > LAST_PLANET;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {([0, 1, 2] as const).map((layer) => {
        const layerStars = stars.filter(s => s.layer === layer);
        return layerStars.map((star, i) => {
          const duration = isHyperSpeed ? star.duration / HYPER_SPEED : star.duration;
          return (
            <div
              key={`s${layer}-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${star.x}%`,
                bottom: `-${Math.ceil(star.size)}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.brightness,
                backgroundColor: star.color,
                boxShadow: getStarBoxShadow(star),
                animation: `scrollUp ${duration}s linear ${star.delay}s infinite`,
              }}
            />
          );
        });
      })}
    </div>
  );
}
