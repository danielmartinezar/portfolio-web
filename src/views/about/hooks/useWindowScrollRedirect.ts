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
 *
 * `onBoundaryPressure(dir, intensity)` — called on every wheel/touch event while at
 * a boundary. `intensity` is clamped 0–1 and grows with accumulated delta. Called with
 * intensity=0 when the user stops pressing (wheel ends or moves away from boundary).
 *
 * `nativeScroll` — when true, skips touch interception (no preventDefault) and lets the
 * browser scroll the element natively. Only wheel blocking + touchend boundary exit are kept.
 * Use this when scrollRef IS the overflow scroll container (e.g. TesseractGridView).
 */
export function useWindowScrollRedirect(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  active: boolean,
  onScrollUpAtTop?: () => void,
  onScrollPastBottom?: () => void,
  onScrollPastTop?: () => void,
  onBoundaryPressure?: (dir: 'top' | 'bottom', intensity: number) => void,
  nativeScroll?: boolean,
) {
  useEffect(() => {
    if (!active) return;

    const exitTop = onScrollPastTop ?? onScrollUpAtTop;
    const exitBottom = onScrollPastBottom;

    // Accumulated delta while pressing at boundary (resets when leaving boundary)
    let boundaryAccum = 0;
    // Max delta to reach intensity=1 (tune for feel)
    const ACCUM_MAX = 600;
    // Timer to detect when the user stops wheeling at the boundary
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const resetBoundaryPressure = () => {
      boundaryAccum = 0;
      if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
      onBoundaryPressure?.('top', 0); // direction doesn't matter for reset
    };

    // --- Wheel (desktop) ---
    const onWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      // Always block the window scroll — no leaking
      e.preventDefault();
      e.stopPropagation();

      if (atTop) {
        boundaryAccum = Math.min(boundaryAccum + Math.abs(e.deltaY), ACCUM_MAX);
        const intensity = boundaryAccum / ACCUM_MAX;
        onBoundaryPressure?.('top', intensity);
        // Reset idle timer — if no wheel event for 120ms, pressure drops to 0
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          boundaryAccum = 0;
          onBoundaryPressure?.('top', 0);
          idleTimer = null;
        }, 120);
        if (exitTop) exitTop();
      } else if (atBottom) {
        boundaryAccum = Math.min(boundaryAccum + Math.abs(e.deltaY), ACCUM_MAX);
        const intensity = boundaryAccum / ACCUM_MAX;
        onBoundaryPressure?.('bottom', intensity);
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          boundaryAccum = 0;
          onBoundaryPressure?.('bottom', 0);
          idleTimer = null;
        }, 120);
        if (exitBottom) exitBottom();
      } else {
        // Not at boundary — reset accumulated pressure
        if (boundaryAccum > 0) resetBoundaryPressure();
        el.scrollTop += e.deltaY;
      }
    };

    // --- Touch (mobile) ---
    const TOUCH_EXIT_THRESHOLD = 40;
    let touchStartY = 0;
    let touchLastY  = 0;
    let exitCooldown = false;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY  = touchStartY;
    };

    // nativeScroll mode: the element scrolls natively, so we only track finger
    // position for boundary-exit detection — no preventDefault, no manual scrollTop.
    const onTouchMoveNative = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      touchLastY = currentY;
      if (!onBoundaryPressure) return;
      const el = scrollRef.current;
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 1;
      if (atTop) {
        const totalDelta = touchStartY - currentY; // negative = pulling down (scroll up gesture)
        if (totalDelta < 0) {
          onBoundaryPressure('top', Math.min(Math.abs(totalDelta) / TOUCH_EXIT_THRESHOLD, 1));
        } else {
          onBoundaryPressure('top', 0);
        }
      }
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
      if (atBottom && !atTop) {
        const totalDelta = touchStartY - currentY;
        if (totalDelta > 0) {
          onBoundaryPressure('bottom', Math.min(totalDelta / TOUCH_EXIT_THRESHOLD, 1));
        } else {
          onBoundaryPressure('bottom', 0);
        }
      }
    };

    // Redirect mode: GSAP normalizeScroll is active so native touch is suppressed;
    // we manually drive scrollTop and emit boundary pressure.
    const onTouchMoveRedirect = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      const currentY = e.touches[0].clientY;
      const delta = touchLastY - currentY;
      el.scrollTop += delta;
      touchLastY    = currentY;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight + 2;
      if (!isScrollable || scrollTop <= 1) {
        const totalDelta = touchStartY - currentY;
        if (totalDelta < 0) {
          onBoundaryPressure?.('top', Math.min(Math.abs(totalDelta) / TOUCH_EXIT_THRESHOLD, 1));
        }
      } else if (!isScrollable || scrollTop + clientHeight >= scrollHeight - 2) {
        const totalDelta = touchStartY - currentY;
        if (totalDelta > 0) {
          onBoundaryPressure?.('bottom', Math.min(totalDelta / TOUCH_EXIT_THRESHOLD, 1));
        }
      }
    };

    const onTouchMove = nativeScroll ? onTouchMoveNative : onTouchMoveRedirect;

    const onTouchEnd = () => {
      onBoundaryPressure?.('top', 0);
      const el = scrollRef.current;
      if (!el || exitCooldown) return;
      const totalDeltaY = touchStartY - touchLastY;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight + 2;
      const isAtTop    = !isScrollable || scrollTop <= 1;
      const isAtBottom = !isScrollable || scrollTop + clientHeight >= scrollHeight - 2;
      const pullUp   = isAtTop    && totalDeltaY < -TOUCH_EXIT_THRESHOLD;
      const pullDown = isAtBottom && totalDeltaY >  TOUCH_EXIT_THRESHOLD;
      if (pullUp && exitTop) {
        exitCooldown = true;
        exitTop();
        setTimeout(() => { exitCooldown = false; }, 600);
      } else if (pullDown && exitBottom) {
        exitCooldown = true;
        exitBottom();
        setTimeout(() => { exitCooldown = false; }, 600);
      }
    };

    window.addEventListener('wheel',      onWheel,      { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: !nativeScroll, capture: !nativeScroll });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('wheel',      onWheel,      { capture: true });
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove,  { capture: !nativeScroll });
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [active, scrollRef, onScrollUpAtTop, onScrollPastBottom, onScrollPastTop, onBoundaryPressure, nativeScroll]);
}
