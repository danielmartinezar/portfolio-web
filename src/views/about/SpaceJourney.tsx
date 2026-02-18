"use client";

import { useState, useCallback, useEffect, useMemo } from 'react';
import type { AboutPageTranslations } from '../../features/about/i18n';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useHashNavigation } from './hooks/useHashNavigation';
import { planets } from './data/planets';
import StarField from './components/StarField';
import Spaceshuttle from './components/Spaceshuttle';
import Planet from './components/Planet';
import PlanetGenericView from './components/PlanetGenericView';
import styles from './SpaceJourney.module.css';

interface SpaceJourneyProps {
  translations: AboutPageTranslations;
}

const ACTIVATION_THRESHOLD = 0.02;
const SECTION_HEIGHT_VH = 700;

export default function SpaceJourney({ translations }: SpaceJourneyProps) {
  const totalHeightVh = planets.length * SECTION_HEIGHT_VH + 100;
  const [totalHeightPx, setTotalHeightPx] = useState(0);

  useEffect(() => {
    const calculate = () => {
      setTotalHeightPx((totalHeightVh / 100) * window.innerHeight);
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [totalHeightVh]);

  const { progress, direction } = useScrollProgress(totalHeightPx);
  const { updateHash, scrollToPlanet } = useHashNavigation({
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

  useEffect(() => {
    if (activePlanet) {
      setVisiblePlanetId(activePlanet.id);
      setIsExiting(false);
      updateHash(activePlanet.id);
    } else if (visiblePlanetId) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setVisiblePlanetId(null);
        setIsExiting(false);
      }, 300); // Match fadeOut duration
      return () => clearTimeout(timer);
    }
  }, [activePlanet, visiblePlanetId, updateHash]);

  // Arrow key scroll acceleration — each press scrolls 5vh of the total page
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

  // Handle skip world
  const handleSkipWorld = useCallback(() => {
    if (!activePlanet) return;

    const currentIndex = planets.findIndex((p) => p.id === activePlanet.id);
    const nextPlanet = planets[currentIndex + 1];

    if (nextPlanet) {
      scrollToPlanet(nextPlanet.id);
    } else {
      // Last planet — scroll to end
      const maxScroll = totalHeightPx - window.innerHeight;
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    }
  }, [activePlanet, scrollToPlanet, totalHeightPx]);

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
        <StarField />

        {planets.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            scrollProgress={progress}
          />
        ))}

        <Spaceshuttle
          scrollProgress={progress}
          isHidden={!!visiblePlanetId}
          direction={direction}
        />
      </div>

      {/* Planet content modal */}
      {modalPlanet && modalTranslation && (
        <PlanetGenericView
          PlanetSvg={modalPlanet.SvgComponent}
          title={modalTranslation.title}
          content={modalTranslation.content}
          skipLabel={translations.skipWorld}
          onSkip={handleSkipWorld}
          isVisible={!isExiting}
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
