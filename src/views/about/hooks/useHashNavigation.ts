"use client";

import { useEffect, useCallback } from 'react';
import type { PlanetData } from '../data/planets';

interface UseHashNavigationOptions {
  planets: PlanetData[];
  totalHeight: number;
}

export function useHashNavigation({ planets, totalHeight }: UseHashNavigationOptions) {
  // On mount: if URL has a hash, scroll to the matching planet
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = planets.find((p) => p.id === hash);
    if (!target) return;

    const maxScroll = totalHeight - window.innerHeight;
    const targetScroll = target.scrollCenter * maxScroll;

    // Small delay to ensure layout is ready
    const timer = setTimeout(() => {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timer);
  }, [planets, totalHeight]);

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
      if (!target) return;

      const maxScroll = totalHeight - window.innerHeight;
      const targetScroll = target.scrollCenter * maxScroll;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    },
    [planets, totalHeight],
  );

  return { updateHash, scrollToPlanet };
}
