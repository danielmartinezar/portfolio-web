"use client";

import { useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PlanetData } from '../data/planets';

const BLACKHOLE_SCROLL_CENTER = 0.88; // approximate progress where the black hole activates

interface UseHashNavigationOptions {
  planets: PlanetData[];
  totalHeight: number;
}

export function useHashNavigation({ planets, totalHeight }: UseHashNavigationOptions) {
  // Scroll to a given progress target using GSAP (bypasses normalizeScroll)
  const scrollToProgress = useCallback((progressTarget: number) => {
    if (totalHeight <= 0) return;
    const maxScroll = totalHeight - window.innerHeight;
    const scrollFn = ScrollTrigger.getScrollFunc(window) as (v: number) => void;
    const proxy = { y: (ScrollTrigger.getScrollFunc(window) as () => number)() };
    gsap.to(proxy, {
      y: progressTarget * maxScroll,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => scrollFn(proxy.y),
    });
  }, [totalHeight]);

  // On mount: scroll to hash if present (new tab / direct link)
  useEffect(() => {
    if (totalHeight <= 0) return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const timer = setTimeout(() => {
      if (hash === 'blackhole') {
        scrollToProgress(BLACKHOLE_SCROLL_CENTER);
        return;
      }
      const target = planets.find((p) => p.id === hash);
      if (target) scrollToProgress(target.scrollCenter);
    }, 200);

    return () => clearTimeout(timer);
  }, [planets, totalHeight, scrollToProgress]);

  // While on the page: listen for hashchange events (clicking anchor links)
  useEffect(() => {
    if (totalHeight <= 0) return;

    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      if (hash === 'blackhole') {
        scrollToProgress(BLACKHOLE_SCROLL_CENTER);
        return;
      }
      const target = planets.find((p) => p.id === hash);
      if (target) scrollToProgress(target.scrollCenter);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [planets, totalHeight, scrollToProgress]);

  const updateHash = useCallback((planetId: string | null) => {
    const currentHash = window.location.hash.slice(1);
    if (planetId && currentHash !== planetId) {
      history.replaceState(null, '', `#${planetId}`);
    } else if (!planetId && currentHash) {
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const scrollToPlanet = useCallback(
    (planetId: string) => {
      const target = planets.find((p) => p.id === planetId);
      if (target) scrollToProgress(target.scrollCenter);
    },
    [planets, scrollToProgress],
  );

  return { updateHash, scrollToPlanet };
}
