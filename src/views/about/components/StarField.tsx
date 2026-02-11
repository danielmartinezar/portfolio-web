"use client";

import { useMemo } from 'react';
import AsteroidSvg from '../../../assets/planets/asteroids.svg';

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  brightness: number;
  layer: 0 | 1 | 2;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  layer: 0 | 1 | 2;
}

/**
 * Each layer spans a tall virtual field (e.g. 300% of viewport height).
 * As scrollProgress goes 0→1, each layer translates upward at different speeds.
 * Closer layers move faster → parallax depth effect.
 * This makes it feel like the shuttle is flying over these elements.
 */
const LAYER_CONFIG = {
  // fieldHeight: how tall the virtual field is (in vh units)
  // speed: how much of the field scrolls through the viewport (0→1 = full traverse)
  0: { fieldHeight: 200, speed: 0.3 },  // far: slow drift
  1: { fieldHeight: 300, speed: 0.6 },  // mid: moderate
  2: { fieldHeight: 400, speed: 0.9 },  // near: fast, feels close
};

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
    const fieldH = LAYER_CONFIG[layer].fieldHeight;
    stars.push({
      x: random() * 100,
      // Spread across the full virtual field height (in %)
      y: random() * fieldH,
      size: layer === 0 ? 0.5 + random() * 1 : layer === 1 ? 1 + random() * 1.5 : 1.5 + random() * 2.5,
      delay: random() * 6,
      duration: 2 + random() * 5,
      brightness: layer === 0 ? 0.2 + random() * 0.3 : 0.4 + random() * 0.6,
      layer,
    });
  }
  return stars;
}

function generateAsteroids(count: number): Asteroid[] {
  const random = createRng(99);
  const asteroids: Asteroid[] = [];

  for (let i = 0; i < count; i++) {
    const layer = (i < count * 0.4 ? 1 : 2) as 0 | 1 | 2;
    const fieldH = LAYER_CONFIG[layer].fieldHeight;
    asteroids.push({
      x: random() * 90 + 5, // 5-95% to avoid edge clipping
      y: random() * fieldH,
      size: 20 + random() * 30,
      rotation: random() * 360,
      opacity: 0.2 + random() * 0.4,
      layer,
    });
  }
  return asteroids;
}

interface StarFieldProps {
  scrollProgress: number;
}

export default function StarField({ scrollProgress }: StarFieldProps) {
  const stars = useMemo(() => generateStars(150), []);
  const asteroids = useMemo(() => generateAsteroids(14), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {([0, 1, 2] as const).map((layer) => {
        const config = LAYER_CONFIG[layer];
        // Translate the entire field upward as progress increases
        // At progress=0 the field starts at its initial position
        // At progress=1 it has scrolled up by (fieldHeight - 100) * speed vh
        const offset = -scrollProgress * (config.fieldHeight - 100) * config.speed;

        const layerStars = stars.filter(s => s.layer === layer);
        const layerAsteroids = asteroids.filter(a => a.layer === layer);

        return (
          <div
            key={layer}
            className="absolute left-0 right-0 will-change-transform"
            style={{
              top: 0,
              height: `${config.fieldHeight}vh`,
              transform: `translateY(${offset}vh)`,
            }}
          >
            {layerStars.map((star, i) => (
              <div
                key={`s${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}vh`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.brightness,
                  backgroundColor: layer === 0 ? '#A5A9BC' : '#FBFCFF',
                  boxShadow: star.size > 1.8
                    ? `0 0 ${star.size * (layer + 1)}px rgba(251,252,255,${0.15 + layer * 0.1})`
                    : 'none',
                  animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                }}
              />
            ))}

            {layerAsteroids.map((asteroid, i) => (
              <div
                key={`a${i}`}
                className="absolute"
                style={{
                  left: `${asteroid.x}%`,
                  top: `${asteroid.y}vh`,
                  width: `${asteroid.size}px`,
                  height: `${asteroid.size}px`,
                  opacity: asteroid.opacity,
                  transform: `rotate(${asteroid.rotation}deg)`,
                }}
              >
                <AsteroidSvg className="w-full h-full" />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
