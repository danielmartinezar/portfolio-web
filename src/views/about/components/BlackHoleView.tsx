"use client";

import styles from '../SpaceJourney.module.css';

interface BlackHoleViewProps {
  title: string;
  content: string;
  isVisible: boolean;
}

export default function BlackHoleView({ title, content, isVisible }: BlackHoleViewProps) {
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${
        isVisible ? styles.modalEnter : styles.modalExit
      }`}
    >
      {/* Content overlay — centered, no background (black hole SVG is behind via z-30) */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Yellow divider */}
        <div className="w-12 h-1 bg-primary mx-auto mb-4" />

        <h2 className="font-georama text-4xl md:text-6xl font-bold italic uppercase text-fg-primary mb-6">
          {title}
        </h2>

        <p className="text-fg-secondary text-base md:text-lg leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
