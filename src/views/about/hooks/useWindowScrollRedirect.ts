"use client";

import { useEffect } from 'react';

/**
 * When `active` is true, intercepts all window wheel/touch scroll events and
 * redirects them into `scrollRef`. The window journey scroll is blocked while
 * the inner content can still scroll. Once the inner content reaches the top or
 * bottom, the event is passed through to the window so the journey resumes.
 *
 * `onScrollUpAtTop` — if provided, called instead of letting the window scroll
 * when the user scrolls up while already at the top of the content. Useful for
 * views (e.g. black hole) that need a custom exit action on scroll-up-at-top.
 */
export function useWindowScrollRedirect(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  active: boolean,
  onScrollUpAtTop?: () => void,
) {
  useEffect(() => {
    if (!active) return;

    const onWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      if (atTop && onScrollUpAtTop) {
        e.preventDefault();
        e.stopPropagation();
        onScrollUpAtTop();
        return;
      }

      if (!atTop && !atBottom) {
        // Content can scroll — redirect delta and block the journey
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += e.deltaY;
      }
      // else: let the event propagate to window → journey advances
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;

      const deltaY = touchStartY - e.touches[0].clientY;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY > 0;

      if (atTop && onScrollUpAtTop) {
        e.preventDefault();
        e.stopPropagation();
        onScrollUpAtTop();
        return;
      }

      if (!atTop && !atBottom) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += deltaY;
        touchStartY = e.touches[0].clientY;
      }
    };

    // Must be non-passive to allow preventDefault
    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
    };
  }, [active, scrollRef, onScrollUpAtTop]);
}
