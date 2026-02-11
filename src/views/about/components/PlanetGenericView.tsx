"use client";

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
  return (
    <div
      className={`fixed inset-0 z-30 flex flex-col items-center justify-center bg-bg-primary/90 ${
        isVisible ? styles.modalEnter : styles.modalExit
      }`}
    >
      {/* Planet as large background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PlanetSvg className="w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] md:w-[60vh] md:h-[60vh] md:max-w-[600px] md:max-h-[600px] opacity-30" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Yellow divider */}
        <div className="w-12 h-1 bg-primary mx-auto mb-4" />

        <h2 className="font-georama text-4xl md:text-6xl font-bold italic uppercase text-fg-primary mb-6">
          {title}
        </h2>

        <p className="text-fg-secondary text-base md:text-lg leading-relaxed mb-10">
          {content}
        </p>

        <button
          type="button"
          onClick={onSkip}
          className="inline-block px-8 py-3 border border-primary text-primary rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-bg-primary hover:scale-105 active:scale-95"
        >
          {skipLabel}
        </button>
      </div>
    </div>
  );
}
