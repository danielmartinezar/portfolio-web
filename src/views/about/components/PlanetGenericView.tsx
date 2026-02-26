"use client";

import { useEffect } from 'react';
import type { ComponentType, SVGProps } from 'react';
import styles from '../SpaceJourney.module.css';

interface PlanetGenericViewProps {
  PlanetSvg: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  isVisible: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function PlanetGenericView({
  PlanetSvg,
  title,
  content,
  isVisible,
  scrollContainerRef,
}: PlanetGenericViewProps) {
  // Prevent wheel/touch events from propagating to window (which would advance the journey)
  useEffect(() => {
    const el = scrollContainerRef.current;
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
  }, [scrollContainerRef]);

  // Reset scroll to top when a new planet becomes visible
  useEffect(() => {
    if (isVisible && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isVisible, title, scrollContainerRef]);

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
        ref={scrollContainerRef}
        className="relative z-10 h-full overflow-y-auto"
      >
        <div className="min-h-full flex flex-col items-center justify-center max-w-2xl mx-auto px-6 pt-20 pb-28 text-center">
          {/* Yellow divider */}
          <div className="w-12 h-1 bg-primary mx-auto mb-4" />

          <h2 className="font-georama text-4xl md:text-6xl font-bold italic uppercase text-fg-primary mb-6">
            {title}
          </h2>

          <div className="text-fg-secondary text-base md:text-lg leading-relaxed flex flex-col gap-4">
            {content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
