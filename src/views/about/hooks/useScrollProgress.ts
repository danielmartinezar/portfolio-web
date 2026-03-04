"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollProgress {
  progress: number;
  scrollY: number;
  /** 1 = scrolling down, -1 = scrolling up */
  direction: 1 | -1;
  /** Pause normalizeScroll while a modal is open (prevents GSAP from hijacking modal touches) */
  pauseNormalizer: () => void;
  /** Resume normalizeScroll after the modal closes */
  resumeNormalizer: () => void;
}

export function useScrollProgress(totalHeight: number): ScrollProgress {
  const [state, setState] = useState<Omit<ScrollProgress, 'pauseNormalizer' | 'resumeNormalizer'>>({
    progress: 0,
    scrollY: 0,
    direction: 1,
  });
  const prevScrollY = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const normalizerRef = useRef<ReturnType<typeof ScrollTrigger.normalizeScroll> | null>(null);

  useEffect(() => {
    if (!totalHeight) return;

    // momentum: 0 — no inertia, scroll tracks finger exactly.
    // allowNestedScroll: true — overflow-y:auto elements scroll normally.
    normalizerRef.current = ScrollTrigger.normalizeScroll({ momentum: 0, allowNestedScroll: true });

    const maxScroll = totalHeight - window.innerHeight;
    const scrollFn = ScrollTrigger.getScrollFunc(window) as (() => number) & ((v: number) => void);

    const update = () => {
      const scrollY = scrollFn();
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
      // Only flip direction when movement exceeds 2px — prevents Safari mouse wheel
      // momentum micro-reversals from flipping the shuttle 180°
      const delta = scrollY - prevScrollY.current;
      if (Math.abs(delta) > 2) {
        directionRef.current = delta > 0 ? 1 : -1;
      }
      prevScrollY.current = scrollY;
      setState({ progress, scrollY, direction: directionRef.current });
    };

    const st = ScrollTrigger.create({ start: 0, end: maxScroll, onUpdate: update });
    update();

    return () => {
      st.kill();
      normalizerRef.current?.kill();
      normalizerRef.current = null;
    };
  }, [totalHeight]);

  const pauseNormalizer = useCallback(() => {
    normalizerRef.current?.disable();
  }, []);

  const resumeNormalizer = useCallback(() => {
    normalizerRef.current?.enable();
  }, []);

  return { ...state, pauseNormalizer, resumeNormalizer };
}
