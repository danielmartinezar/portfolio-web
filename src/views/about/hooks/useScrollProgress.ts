"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollProgress {
  progress: number;
  scrollY: number;
  /** 1 = scrolling down, -1 = scrolling up */
  direction: 1 | -1;
}

export function useScrollProgress(totalHeight: number): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: 1,
  });
  const prevScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = totalHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    const direction: 1 | -1 = scrollY >= prevScrollY.current ? 1 : -1;
    prevScrollY.current = scrollY;

    setState({ progress, scrollY, direction });
  }, [totalHeight]);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return state;
}
