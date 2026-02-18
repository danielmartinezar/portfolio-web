"use client";

import { useMemo } from 'react';
import Asteroid1Svg from '../../../assets/planets/asteroid1.svg';
import Asteroid2Svg from '../../../assets/planets/asteroid2.svg';
import Asteroid3Svg from '../../../assets/planets/asteroid3.svg';

const ASTEROID_SVGS = [Asteroid1Svg, Asteroid2Svg, Asteroid3Svg];

// Each type has a distinct size range to look visually different
const ASTEROID_SIZE_RANGES = [
  { min: 100, range: 60 }, // type 0 (191×172): large 100–160px
  { min: 55,  range: 35 }, // type 1 (79×65):  medium 55–90px
  { min: 25,  range: 25 }, // type 2 (27×25):  small 25–50px
];

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

interface AsteroidData {
  id: number;
  x: number;
  size: number;
  rotation: number;
  opacity: number;
  duration: number;
  delay: number;
  svgIndex: number;
}

// Speed by layer: far = slow, near = fast
const LAYER_DURATION = {
  0: { min: 20, range: 12 }, // 20–32s far/slow
  1: { min: 11, range: 7 },  // 11–18s mid
  2: { min: 5,  range: 5 },  // 5–10s near/fast
};

const ASTEROID_DURATION = { min: 12, range: 10 };

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

function generateAsteroids(count: number): AsteroidData[] {
  const random = createRng(99);
  const asteroids: AsteroidData[] = [];

  const cols = count;
  const colWidth = 90 / cols;

  for (let i = 0; i < count; i++) {
    const baseX = 5 + (i + 0.5) * colWidth;
    const jitter = (random() - 0.5) * colWidth * 0.6;
    const x = Math.min(Math.max(baseX + jitter, 5), 95);

    const svgIndex = i % 3;
    const sizeRange = ASTEROID_SIZE_RANGES[svgIndex];

    asteroids.push({
      id: i,
      x,
      size: sizeRange.min + random() * sizeRange.range,
      rotation: random() * 360,
      opacity: 0.35 + random() * 0.45,
      duration: ASTEROID_DURATION.min + random() * ASTEROID_DURATION.range,
      delay: -(random() * (ASTEROID_DURATION.min + ASTEROID_DURATION.range)),
      svgIndex,
    });
  }
  return asteroids;
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

export default function StarField() {
  const stars = useMemo(() => generateStars(180), []);
  const asteroids = useMemo(() => generateAsteroids(16), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {([0, 1, 2] as const).map((layer) => {
        const layerStars = stars.filter(s => s.layer === layer);
        return layerStars.map((star, i) => (
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
              animation: `scrollUp ${star.duration}s linear ${star.delay}s infinite`,
            }}
          />
        ));
      })}

      {asteroids.map((asteroid) => {
        const Svg = ASTEROID_SVGS[asteroid.svgIndex];
        return (
          <div
            key={`a${asteroid.id}`}
            className="absolute"
            style={{
              left: `${asteroid.x}%`,
              bottom: `-${asteroid.size}px`,
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              opacity: asteroid.opacity,
              animation: `scrollUp ${asteroid.duration}s linear ${asteroid.delay}s infinite`,
            }}
          >
            <div style={{ width: '100%', height: '100%', transform: `rotate(${asteroid.rotation}deg)` }}>
              <Svg className="w-full h-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
