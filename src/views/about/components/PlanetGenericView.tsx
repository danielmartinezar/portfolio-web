"use client";

import { useEffect } from 'react';
import type { ComponentType, SVGProps } from 'react';
import styles from '../SpaceJourney.module.css';
import { useWindowScrollRedirect } from '../hooks/useWindowScrollRedirect';

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
  // Redirect window scroll into this panel while it's visible
  useWindowScrollRedirect(scrollContainerRef, isVisible);

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

      {/* Scrollable content — scroll is driven by window events via useWindowScrollRedirect */}
      <div
        ref={scrollContainerRef}
        className={`relative z-10 h-full overflow-y-auto ${styles.modalScroll}`}
      >
        <div className="min-h-full flex flex-col items-center justify-start max-w-2xl mx-auto px-6 pt-32 pb-28 text-center">
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
