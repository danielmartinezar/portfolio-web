"use client";

import { useEffect } from 'react';

/**
 * When `active` is true, intercepts all window wheel/touch scroll events and
 * redirects them into `scrollRef`. The window journey scroll is fully blocked.
 *
 * Boundary callbacks (instead of letting events leak to the window):
 * - `onScrollPastBottom` — called when the user scrolls down past the end of the content.
 * - `onScrollPastTop`    — called when the user scrolls up past the beginning of the content.
 *   If not provided, scrolling past the top does nothing (stays put).
 *
 * `onScrollUpAtTop` is an alias for `onScrollPastTop` kept for back-compat with TesseractGridView.
 */
export function useWindowScrollRedirect(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  active: boolean,
  onScrollUpAtTop?: () => void,
  onScrollPastBottom?: () => void,
  onScrollPastTop?: () => void,
) {
  useEffect(() => {
    if (!active) return;

    const exitTop = onScrollPastTop ?? onScrollUpAtTop;
    const exitBottom = onScrollPastBottom;

    const onWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Always block the window scroll — no leaking
      e.preventDefault();
      e.stopPropagation();

      if (atTop && exitTop) {
        exitTop();
      } else if (atBottom && exitBottom) {
        exitBottom();
      } else if (!atTop && !atBottom) {
        el.scrollTop += e.deltaY;
      }
    };

    // Touch: let the browser handle scrolling natively (smooth + momentum).
    // Only intercept to detect boundary exits via a passive scroll listener on the element.
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop <= 1 && deltaY < -8;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2 && deltaY > 8;
      if (atTop && exitTop) exitTop();
      else if (atBottom && exitBottom) exitBottom();
    };

    window.addEventListener('wheel',      onWheel,      { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      window.removeEventListener('wheel',      onWheel,      { capture: true });
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [active, scrollRef, onScrollUpAtTop, onScrollPastBottom, onScrollPastTop]);
}
