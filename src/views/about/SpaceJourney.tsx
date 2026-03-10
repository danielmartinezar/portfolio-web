"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import type { AboutPageTranslations } from '../../features/about/i18n';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useHashNavigation } from './hooks/useHashNavigation';
import { planets } from './data/planets';
import StarField from './components/StarField';
import AsteroidField from './components/AsteroidField';
import Spaceshuttle from './components/Spaceshuttle';
import Planet from './components/Planet';
import PlanetGenericView from './components/PlanetGenericView';
import SkipWorldButton from './components/SkipWorldButton';
import BlackHole from './components/BlackHole';
import TesseractGridView from './components/TesseractGridView';
import ThrusterExitOverlay from './components/ThrusterExitOverlay';
import styles from './SpaceJourney.module.css';

interface SpaceJourneyProps {
  translations: AboutPageTranslations;
}

const ACTIVATION_THRESHOLD = 0.02;
const SECTION_HEIGHT_VH = 700;

export default function SpaceJourney({ translations }: SpaceJourneyProps) {
  const totalHeightVh = planets.length * SECTION_HEIGHT_VH + 1400;
  const [totalHeightPx, setTotalHeightPx] = useState(0);

  useEffect(() => {
    const calculate = () => {
      setTotalHeightPx((totalHeightVh / 100) * window.innerHeight);
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [totalHeightVh]);

  const { progress, direction, pauseNormalizer, resumeNormalizer } = useScrollProgress(totalHeightPx);
  const blackHoleRef = useRef<HTMLDivElement | null>(null);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const { updateHash } = useHashNavigation({
    planets,
    totalHeight: totalHeightPx,
  });

  // Determine active planet
  const activePlanet = useMemo(() => {
    for (const planet of planets) {
      if (Math.abs(progress - planet.scrollCenter) < ACTIVATION_THRESHOLD) {
        return planet;
      }
    }
    return null;
  }, [progress]);

  // Track modal visibility state for exit animation
  const [visiblePlanetId, setVisiblePlanetId] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  // Refs track shown/exiting state without causing effect re-runs
  const shownPlanetIdRef = useRef<string | null>(null);
  const isExitingRef = useRef(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (activePlanet) {
      // Guard: already showing this exact planet — ignore (handles momentum scroll re-entry)
      if (shownPlanetIdRef.current === activePlanet.id) return;

      // New planet incoming: cancel any in-flight exit animation and open immediately
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
      isExitingRef.current = false;
      shownPlanetIdRef.current = activePlanet.id;
      setIsExiting(false);
      setVisiblePlanetId(activePlanet.id);
      updateHash(activePlanet.id);
    } else if (shownPlanetIdRef.current) {
      // Only start one exit animation at a time
      if (isExitingRef.current) return;
      isExitingRef.current = true;
      setIsExiting(true);
      exitTimerRef.current = setTimeout(() => {
        setVisiblePlanetId(null);
        setIsExiting(false);
        isExitingRef.current = false;
        shownPlanetIdRef.current = null;
        exitTimerRef.current = null;
      }, 300);
    }
  }, [activePlanet, updateHash]);

  // Black hole: activates when shuttle is fully absorbed, deactivates when user scrolls back up
  const [isBlackHoleActive, setIsBlackHoleActive] = useState(false);
  const BLACKHOLE_DEACTIVATION = 0.82; // progress below which we reset (BH not yet in view)

  const handleShuttleAbsorbed = useCallback(() => {
    setIsBlackHoleActive(true);
    updateHash('blackhole');
  }, [updateHash]);

  const handleExitBlackHole = useCallback(() => {
    updateHash(null);
    const maxScroll = totalHeightPx - window.innerHeight;
    const targetScroll = (BLACKHOLE_DEACTIVATION - 0.01) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, [totalHeightPx, updateHash]);

  useEffect(() => {
    if (progress < BLACKHOLE_DEACTIVATION) {
      if (isBlackHoleActive) updateHash(null);
      setIsBlackHoleActive(false);
    }
  }, [progress, isBlackHoleActive, updateHash]);

  // Delay showing the text panel slightly to let the centering animation finish
  const [showBlackHoleInfo, setShowBlackHoleInfo] = useState(false);
  const [isBlackHoleInfoExiting, setIsBlackHoleInfoExiting] = useState(false);
  const bhInfoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isBlackHoleActive) {
      // Wait for the centering transition (0.8s) before fading in text
      bhInfoTimerRef.current = setTimeout(() => setShowBlackHoleInfo(true), 700);
      setIsBlackHoleInfoExiting(false);
    } else {
      if (bhInfoTimerRef.current) clearTimeout(bhInfoTimerRef.current);
      if (showBlackHoleInfo) {
        setIsBlackHoleInfoExiting(true);
        const timer = setTimeout(() => {
          setShowBlackHoleInfo(false);
          setIsBlackHoleInfoExiting(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
    return () => {
      if (bhInfoTimerRef.current) clearTimeout(bhInfoTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlackHoleActive]);

  // Intercept the global scroll-to-top button and use GSAP's scroll function
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const scrollFn = ScrollTrigger.getScrollFunc(window) as (v: number) => void;
      const proxy = { y: (ScrollTrigger.getScrollFunc(window) as () => number)() };
      gsap.to(proxy, {
        y: 0,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => scrollFn(proxy.y),
      });
    };
    window.addEventListener('app:scrollToTop', handler);
    return () => window.removeEventListener('app:scrollToTop', handler);
  }, []);

  // Emit a virtual scroll-position event so ScrollToTop stays visible
  // even when GSAP's normalizeScroll intercepts window.scrollY on mobile
  useEffect(() => {
    const scrollFn = ScrollTrigger.getScrollFunc(window) as () => number;
    const y = scrollFn();
    window.dispatchEvent(new CustomEvent('app:virtualScrollY', { detail: { y } }));
  }, [progress]);

  // Arrow key scroll acceleration — each press scrolls 9vh of the total page
  useEffect(() => {
    const STEP_VH = 9;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      e.preventDefault();
      const stepPx = (STEP_VH / 100) * window.innerHeight;
      window.scrollBy({ top: e.key === 'ArrowDown' ? stepPx : -stepPx, behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // While a planet modal is open:
  // 1. Pause normalizeScroll so GSAP doesn't hijack touches inside the modal.
  // 2. Snap window.scrollY to the planet's scrollCenter to cancel any in-flight momentum.
  // 3. Lock body scroll so Brave/Chromium native scroll doesn't leak through.
  // useWindowScrollRedirect takes over touch handling while the modal is active.
  useEffect(() => {
    if (!activePlanet || !totalHeightPx) return;
    pauseNormalizer();
    document.body.style.overflow = 'hidden';
    const maxScroll = totalHeightPx - window.innerHeight;
    const lockedY = activePlanet.scrollCenter * maxScroll;
    const scrollFn = ScrollTrigger.getScrollFunc(window) as (v: number) => void;
    scrollFn(lockedY);
    return () => {
      resumeNormalizer();
      document.body.style.overflow = '';
    };
  }, [activePlanet, totalHeightPx, pauseNormalizer, resumeNormalizer]);

  // Thruster exit animation state
  const [thrusterDir, setThrusterDir]         = useState<'forward' | 'backward' | null>(null);
  const [thrusterIntensity, setThrusterIntensity] = useState(0);
  // hold timer: fires the actual exit after 1s of sustained boundary pressure
  const holdTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  // fade timer: removes thrusterDir after fade-out animation
  const fadeTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  // pending scroll target while hold timer is running
  const pendingTarget = useRef<{ dir: 'forward' | 'backward'; px: number } | null>(null);
  const exitingRef    = useRef(false);

  const scrollTo = (v: number) => (ScrollTrigger.getScrollFunc(window) as (v: number) => void)(v);

  const cancelThruster = useCallback(() => {
    if (holdTimerRef.current)  { clearTimeout(holdTimerRef.current);  holdTimerRef.current  = null; }
    if (fadeTimerRef.current)  { clearTimeout(fadeTimerRef.current);  fadeTimerRef.current  = null; }
    pendingTarget.current = null;
    exitingRef.current    = false;
    setThrusterIntensity(0);
    setThrusterDir(null);
  }, []);

  /**
   * Called by onBoundaryPressure from useWindowScrollRedirect.
   * intensity=0 means the user stopped pressing → cancel.
   * intensity>0 → show flame, start/reset hold timer.
   */
  const handleBoundaryPressure = useCallback((
    boundaryDir: 'top' | 'bottom',
    intensity: number,
  ) => {
    if (exitingRef.current) return;
    if (!activePlanet) return;

    const dir: 'forward' | 'backward' = boundaryDir === 'bottom' ? 'forward' : 'backward';

    if (intensity <= 0) {
      // User released — cancel if not yet committed
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
        setThrusterIntensity(0);
        // Short fade then remove
        fadeTimerRef.current = setTimeout(() => {
          setThrusterDir(null);
          fadeTimerRef.current = null;
        }, 300);
      }
      return;
    }

    // Show flame immediately
    setThrusterDir(dir);
    setThrusterIntensity(intensity);

    // Calculate target once
    const maxScroll = totalHeightPx - window.innerHeight;
    const target = dir === 'forward'
      ? Math.min((activePlanet.scrollCenter + ACTIVATION_THRESHOLD + 0.018) * maxScroll, maxScroll)
      : Math.max((activePlanet.scrollCenter - ACTIVATION_THRESHOLD - 0.018) * maxScroll, 0);
    pendingTarget.current = { dir, px: target };

    // Reset hold timer on every call — fires exit after 1s of sustained pressure
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (fadeTimerRef.current)  { clearTimeout(fadeTimerRef.current); fadeTimerRef.current = null; }

    holdTimerRef.current = setTimeout(() => {
      holdTimerRef.current = null;
      exitingRef.current   = true;
      const t = pendingTarget.current;
      if (t) scrollTo(t.px);
      setThrusterIntensity(0);
      fadeTimerRef.current = setTimeout(() => {
        setThrusterDir(null);
        exitingRef.current  = false;
        fadeTimerRef.current = null;
      }, 400);
    }, 1000);
  }, [activePlanet, totalHeightPx]);

  // Cancel thruster when planet changes
  useEffect(() => {
    cancelThruster();
  }, [visiblePlanetId, cancelThruster]);

  // exitPlanetForward/Backward kept for SkipWorldButton
  const exitPlanetForward = useCallback(() => {
    if (!activePlanet) return;
    const maxScroll = totalHeightPx - window.innerHeight;
    const target = Math.min((activePlanet.scrollCenter + ACTIVATION_THRESHOLD + 0.018) * maxScroll, maxScroll);
    exitingRef.current = true;
    setThrusterDir('forward');
    setThrusterIntensity(1);
    scrollTo(target);
    setTimeout(() => {
      setThrusterIntensity(0);
      setTimeout(() => { setThrusterDir(null); exitingRef.current = false; }, 400);
    }, 600);
  }, [activePlanet, totalHeightPx]);

  const exitPlanetBackward = useCallback(() => {
    if (!activePlanet) return;
    const maxScroll = totalHeightPx - window.innerHeight;
    const target = Math.max((activePlanet.scrollCenter - ACTIVATION_THRESHOLD - 0.018) * maxScroll, 0);
    exitingRef.current = true;
    setThrusterDir('backward');
    setThrusterIntensity(1);
    scrollTo(target);
    setTimeout(() => {
      setThrusterIntensity(0);
      setTimeout(() => { setThrusterDir(null); exitingRef.current = false; }, 400);
    }, 600);
  }, [activePlanet, totalHeightPx]);

  // Handle skip world — same as exit forward (skip button advances the journey)
  const handleSkipWorld = useCallback(() => {
    exitPlanetForward();
  }, [exitPlanetForward]);

  // Find the visible planet data for the modal
  const modalPlanet = visiblePlanetId
    ? planets.find((p) => p.id === visiblePlanetId)
    : null;

  const modalTranslation = modalPlanet
    ? translations.planets[modalPlanet.id]
    : null;

  return (
    <div className="-mt-24" style={{ height: `${totalHeightVh}vh` }}>
      {/* Fixed space viewport */}
      <div className="fixed inset-0 overflow-hidden bg-bg-primary">
        <StarField scrollProgress={progress} />
        <AsteroidField scrollProgress={progress} />

        {planets.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            scrollProgress={progress}
            hidden={!!visiblePlanetId}
          />
        ))}

        <Spaceshuttle
          scrollProgress={progress}
          isHidden={!!visiblePlanetId}
          direction={direction}
          blackHoleRef={blackHoleRef}
          onAbsorbed={handleShuttleAbsorbed}
        />

        <BlackHole progress={progress} centered={isBlackHoleActive} containerRef={blackHoleRef} />

        {/* Page title — fades out as user scrolls */}
        <h1
          className={`${styles.pageTitle} text-fg-primary`}
          style={{ '--title-opacity': Math.max(0, 1 - progress * 30) } as React.CSSProperties}
        >
          {translations.title}
        </h1>
      </div>

      {/* Planet content modal */}
      {modalPlanet && modalTranslation && (
        <>
          <PlanetGenericView
            PlanetSvg={modalPlanet.SvgComponent}
            title={modalTranslation.title}
            content={modalTranslation.content}
            isVisible={!isExiting}
            scrollContainerRef={modalScrollRef}
            onScrollPastBottom={exitPlanetForward}
            onScrollPastTop={exitPlanetBackward}
            onBoundaryPressure={handleBoundaryPressure}
            holdToExitLabel={translations.holdToExit}
          />
          <SkipWorldButton
            label={translations.skipWorld}
            onSkip={handleSkipWorld}
            scrollContainerRef={modalScrollRef}
          />
          {/* Thruster fire overlay — shown while exiting a planet */}
          {thrusterDir && (
            <ThrusterExitOverlay
              direction={thrusterDir}
              intensity={thrusterIntensity}
            />
          )}
        </>
      )}

      {/* Black hole info panel — Tesseract */}
      {(showBlackHoleInfo || isBlackHoleInfoExiting) && (
        <TesseractGridView
          isVisible={showBlackHoleInfo && !isBlackHoleInfoExiting}
          onExit={handleExitBlackHole}
          exitLabel={translations.exitBlackHole}
        />
      )}

      {/* Scroll hint at the beginning */}
      {progress < 0.03 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-center">
          <p className={`text-fg-secondary text-sm ${styles.scrollHint}`}>
            {translations.scrollHint}
          </p>
          <svg
            className="w-5 h-5 mx-auto mt-2 text-fg-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
