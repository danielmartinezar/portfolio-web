"use client";

import { useEffect, useRef } from 'react';
import type { ComponentType, SVGProps } from 'react';
import styles from '../SpaceJourney.module.css';

interface PlanetGenericViewProps {
  PlanetSvg: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  skipLabel: string;
  onSkip: () => void;
  isVisible: boolean;
}

export default function PlanetGenericView({
  PlanetSvg,
  title,
  content,
  skipLabel,
  onSkip,
  isVisible,
}: PlanetGenericViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Prevent wheel/touch events from propagating to window (which would advance the journey)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Reset scroll to top when a new planet becomes visible
  useEffect(() => {
    if (isVisible && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isVisible, title]);

  return (
    <div
      className={`fixed inset-0 z-30 bg-bg-primary/90 ${
        isVisible ? styles.modalEnter : styles.modalExit
      }`}
    >
      {/* Planet as large background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PlanetSvg className="w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] md:w-[60vh] md:h-[60vh] md:max-w-[600px] md:max-h-[600px] opacity-30" />
      </div>

      {/* Scrollable content — scroll is contained here, does not leak to window */}
      <div
        ref={scrollRef}
        className="relative z-10 h-full overflow-y-auto"
      >
        <div className="min-h-full flex flex-col items-center justify-center max-w-2xl mx-auto px-6 py-20 text-center">
          {/* Yellow divider */}
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />

          <h2 className="font-georama text-4xl md:text-6xl font-bold italic uppercase text-fg-primary mb-6">
            {title}
          </h2>

          <div className="text-fg-secondary text-base md:text-lg leading-relaxed mb-10 flex flex-col gap-4">
            {content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <button
            type="button"
            onClick={onSkip}
            className="inline-block px-8 py-3 border border-primary text-primary rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-bg-primary hover:scale-105 active:scale-95"
          >
            {skipLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
