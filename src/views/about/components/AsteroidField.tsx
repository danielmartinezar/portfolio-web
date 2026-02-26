"use client";

import { useMemo, useEffect, useRef } from 'react';
import styles from '../SpaceJourney.module.css';
import gsap from 'gsap';
import Asteroid1Svg from '../../../assets/planets/asteroid1.svg';
import Asteroid2Svg from '../../../assets/planets/asteroid2.svg';
import Asteroid3Svg from '../../../assets/planets/asteroid3.svg';
import { getPositionAt } from './Spaceshuttle';

const ASTEROID_SVGS = [Asteroid1Svg, Asteroid2Svg, Asteroid3Svg];

const ASTEROID_SIZE_RANGES_MOBILE = [
  { min: 60,  range: 30 },
  { min: 35,  range: 20 },
  { min: 18,  range: 12 },
];

const ASTEROID_SIZE_RANGES_DESKTOP = [
  { min: 100, range: 60 },
  { min: 55,  range: 35 },
  { min: 25,  range: 25 },
];

function getAsteroidSizeRanges() {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return ASTEROID_SIZE_RANGES_MOBILE;
  return ASTEROID_SIZE_RANGES_DESKTOP;
}

const ASTEROID_DURATION = { min: 12, range: 10 };
// Collision radius factor per asteroid size tier (index matches svgIndex / size bucket)
// Large asteroids (0): tighter — they look too early at 3x
// Medium (1) and small (2): slightly looser for touch accuracy on mobile
const COLLISION_RADIUS_FACTORS = [1.1, 1.4, 1.6];

interface AsteroidData {
  id: number;
  x: number;
  size: number;
  rotation: number;
  opacity: number;
  duration: number;
  delay: number;
  svgIndex: number;
  floatAmount: number;
  floatDuration: number;
  floatDelay: number;
}

const LAST_PLANET = 0.639;
const HYPER_SPEED = 8;

interface AsteroidFieldProps {
  scrollProgress: number;
}

function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateAsteroids(count: number): AsteroidData[] {
  const random = createRng(99);
  const asteroids: AsteroidData[] = [];
  const colWidth = 90 / count;
  const sizeRanges = getAsteroidSizeRanges();

  for (let i = 0; i < count; i++) {
    const baseX = 5 + (i + 0.5) * colWidth;
    const jitter = (random() - 0.5) * colWidth * 0.6;
    const x = Math.min(Math.max(baseX + jitter, 5), 95);
    const svgIndex = i % 3;
    const sizeRange = sizeRanges[svgIndex];

    asteroids.push({
      id: i,
      x,
      size: sizeRange.min + random() * sizeRange.range,
      rotation: random() * 360,
      opacity: 0.35 + random() * 0.45,
      duration: ASTEROID_DURATION.min + random() * ASTEROID_DURATION.range,
      delay: -(random() * (ASTEROID_DURATION.min + ASTEROID_DURATION.range)),
      svgIndex,
      floatAmount: 6 + random() * 14,          // 6–20px lateral drift
      floatDuration: 3 + random() * 4,          // 3–7s per float cycle
      floatDelay: -(random() * (3 + random() * 4)), // stagger start offset
    });
  }
  return asteroids;
}

function getAsteroidCount() {
  if (typeof window === 'undefined') return 16;
  if (window.innerWidth < 768) return 6;
  if (window.innerWidth < 1024) return 10;
  return 16;
}

export default function AsteroidField({ scrollProgress }: AsteroidFieldProps) {
  const asteroids = useMemo(() => generateAsteroids(getAsteroidCount()), []);
  const refsMap = useRef<Map<number, HTMLDivElement>>(new Map());
  // Map from asteroid id to inner float div
  const innerRefsMap = useRef<Map<number, HTMLDivElement>>(new Map());
  // Track which asteroids are currently being GSAP-animated (not in CSS cycle)
  const floatingSet = useRef<Set<number>>(new Set());
  const rafRef = useRef<number>(0);
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const checkCollisions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const pos = getPositionAt(progressRef.current);
      const shuttleX = (pos.x / 100) * vw;
      const shuttleY = (pos.y / 100) * vh;

      refsMap.current.forEach((el, id) => {
        if (!el || floatingSet.current.has(id)) return;

        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(shuttleX - cx, shuttleY - cy);

        const asteroid = asteroids.find(a => a.id === id)!;
        const collisionRadius = (asteroid.size / 2) * COLLISION_RADIUS_FACTORS[asteroid.svgIndex];
        if (dist < collisionRadius) {
          floatingSet.current.add(id);

          // Freeze the CSS scrollUp animation at its current visual position.
          // getBoundingClientRect gives us where it is on screen right now.
          // We convert that to a fixed position so GSAP can move it freely.
          const currentTop = rect.top;
          const currentLeft = rect.left;

          // Switch from CSS animation to GSAP control:
          // 1. Remove the scrollUp animation
          // 2. Position the element fixed at its current screen coords
          // 3. Animate it sideways (translate) from there
          el.style.animation = 'none';
          el.style.position = 'fixed';
          el.style.left = `${currentLeft}px`;
          el.style.top = `${currentTop}px`;
          el.style.bottom = 'auto';

          const innerEl = innerRefsMap.current.get(id);

          // Pause the float animation on inner div so it doesn't interfere during explosion
          if (innerEl) innerEl.style.animation = 'none';

          // Hide the original immediately — fragments take over visually
          el.style.visibility = 'hidden';

          // Clone the SVG from inside the asteroid element to use in fragments
          const svgEl = el.querySelector('svg');
          const svgHTML = svgEl ? svgEl.outerHTML : '';

          // Spawn 5 fragments at the collision position
          const NUM_FRAGMENTS = 5;
          const fragSize = asteroid.size * 0.4;
          const cx0 = currentLeft + asteroid.size / 2 - fragSize / 2;
          const cy0 = currentTop + asteroid.size / 2 - fragSize / 2;

          for (let f = 0; f < NUM_FRAGMENTS; f++) {
            const frag = document.createElement('div');
            frag.style.cssText = `
              position: fixed;
              left: ${cx0}px;
              top: ${cy0}px;
              width: ${fragSize}px;
              height: ${fragSize}px;
              pointer-events: none;
              z-index: 15;
              opacity: ${asteroid.opacity};
            `;
            frag.innerHTML = svgHTML;
            document.body.appendChild(frag);

            // Each fragment flies in a different direction (evenly spread + jitter)
            const baseAngle = (f / NUM_FRAGMENTS) * Math.PI * 2;
            const angle = baseAngle + (Math.random() - 0.5) * 0.8;
            const speed = 90 + Math.random() * 130;
            const spin = (Math.random() - 0.5) * 600;

            gsap.to(frag, {
              x: Math.cos(angle) * speed,
              y: Math.sin(angle) * speed,
              rotation: spin,
              scale: 0.2 + Math.random() * 0.3,
              duration: 0.7 + Math.random() * 0.4,
              ease: 'power2.out',
              onComplete: () => frag.remove(),
            });
          }

          // Restore the original asteroid to its CSS cycle after fragments finish.
          // Use delay: 0 so it starts from bottom and takes a full cycle (~12-22s) before
          // appearing on screen again — asteroid won't be visible immediately after destruction.
          setTimeout(() => {
            const inner = innerRefsMap.current.get(id);
            gsap.set(el, { x: 0, y: 0, rotation: 0, scale: 1, opacity: asteroid.opacity });
            el.style.position = 'absolute';
            el.style.left = `${asteroid.x}%`;
            el.style.top = 'auto';
            el.style.bottom = `-${asteroid.size}px`;
            el.style.visibility = 'visible';
            el.style.animation = `scrollUp ${asteroid.duration}s linear 0s infinite`;
            if (inner) {
              // Restore float animation — keyframe is :global so name is not hashed
              inner.style.animationName = 'asteroidFloat';
              inner.style.animationDuration = `${asteroid.floatDuration}s`;
              inner.style.animationTimingFunction = 'ease-in-out';
              inner.style.animationIterationCount = 'infinite';
              inner.style.animationDelay = '0s';
            }
            floatingSet.current.delete(id);
          }, 1200);
        }
      });

      rafRef.current = requestAnimationFrame(checkCollisions);
    };

    rafRef.current = requestAnimationFrame(checkCollisions);
    return () => cancelAnimationFrame(rafRef.current);
  }, [asteroids]);

  const isHyperSpeed = scrollProgress > LAST_PLANET;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {asteroids.map((asteroid) => {
        const Svg = ASTEROID_SVGS[asteroid.svgIndex];
        const floatY1 = `-${asteroid.floatAmount}px`;
        const floatY2 = `${asteroid.floatAmount * 0.4}px`;
        const duration = isHyperSpeed ? asteroid.duration / HYPER_SPEED : asteroid.duration;
        return (
          <div
            key={`a${asteroid.id}`}
            ref={(el) => {
              if (el) refsMap.current.set(asteroid.id, el);
              else refsMap.current.delete(asteroid.id);
            }}
            className="absolute"
            style={{
              left: `${asteroid.x}%`,
              bottom: `-${asteroid.size}px`,
              width: `${asteroid.size}px`,
              height: `${asteroid.size}px`,
              opacity: asteroid.opacity,
              animation: `scrollUp ${duration}s linear ${asteroid.delay}s infinite`,
            }}
          >
            {/* Float wrapper — handles lateral drift independent of scrollUp */}
            <div
              ref={(el) => {
                if (el) innerRefsMap.current.set(asteroid.id, el);
                else innerRefsMap.current.delete(asteroid.id);
              }}
              className={styles.asteroidFloat}
              style={{
                width: '100%',
                height: '100%',
                animationDuration: `${asteroid.floatDuration}s`,
                animationDelay: `${asteroid.floatDelay}s`,
                '--float-y1': floatY1,
                '--float-y2': floatY2,
                '--asteroid-rot': `${asteroid.rotation}deg`,
              } as React.CSSProperties}
            >
              <Svg className="w-full h-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
