"use client";

import { useEffect, useRef } from 'react';
import type { ComponentType, SVGProps } from 'react';
import styles from '../SpaceJourney.module.css';
import { useWindowScrollRedirect } from '../hooks/useWindowScrollRedirect';

interface PlanetGenericViewProps {
  PlanetSvg: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
  isVisible: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  /** Called when the user scrolls past the bottom — advance journey forward */
  onScrollPastBottom?: () => void;
  /** Called when the user scrolls past the top — retreat journey backward */
  onScrollPastTop?: () => void;
  /** Called with boundary direction and intensity (0–1) while pressing at boundary */
  onBoundaryPressure?: (dir: 'top' | 'bottom', intensity: number) => void;
}

export default function PlanetGenericView({
  PlanetSvg,
  title,
  content,
  isVisible,
  scrollContainerRef,
  onScrollPastBottom,
  onScrollPastTop,
  onBoundaryPressure,
}: PlanetGenericViewProps) {
  useWindowScrollRedirect(scrollContainerRef, isVisible, undefined, onScrollPastBottom, onScrollPastTop, onBoundaryPressure);

  const paragraphs = content.split('\n\n').filter(Boolean);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Reset scroll + strip reveal classes so animation replays per planet
  useEffect(() => {
    if (isVisible && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    paragraphRefs.current.forEach((el) => {
      if (!el) return;
      el.classList.remove(styles.paragraphVisible);
      // Clear any focus-mode inline opacity/filter so reveal starts clean
      el.style.opacity = '';
      el.style.filter = '';
    });
  }, [isVisible, title, scrollContainerRef]);

  // Staggered reveal — observe each paragraph entering the scroll container
  useEffect(() => {
    if (!isVisible) return;
    const root = scrollContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.paragraphVisible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, root }
    );
    // Wait for the modal entrance animation (0.5s) before observing
    const id = setTimeout(() => {
      paragraphRefs.current.forEach((el) => { if (el) observer.observe(el); });
    }, 450);
    return () => { clearTimeout(id); observer.disconnect(); };
  }, [isVisible, title, scrollContainerRef]);

  // Focus-reading effect — dim every paragraph except the one closest to centre
  useEffect(() => {
    if (!isVisible) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    const applyFocus = () => {
      const atBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 40;
      const lastIdx = paragraphRefs.current.filter(Boolean).length - 1;

      // At the bottom snap focus to the last paragraph so it never stays dimmed
      if (atBottom) {
        paragraphRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = i === lastIdx ? '1' : '0.28';
          el.style.filter  = i === lastIdx ? 'none' : 'blur(0.4px)';
        });
        return;
      }

      const centre = container.scrollTop + container.clientHeight / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      paragraphRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs((el.offsetTop + el.offsetHeight / 2) - centre);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
      paragraphRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.opacity = i === closestIdx ? '1' : '0.28';
        el.style.filter  = i === closestIdx ? 'none' : 'blur(0.4px)';
      });
    };

    // Start after all stagger reveals have settled (~1.3 s)
    const id = setTimeout(applyFocus, 1300);
    container.addEventListener('scroll', applyFocus, { passive: true });
    return () => { clearTimeout(id); container.removeEventListener('scroll', applyFocus); };
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

      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className={`relative z-10 overflow-y-auto ${styles.modalScroll}`}
      >
        <div className="min-h-full flex flex-col items-center justify-start max-w-xl mx-auto px-7 pt-32 pb-[65vh]">

          {/* Header */}
          <header className="text-center w-full mb-10">
            <div className="w-10 h-0.5 bg-primary mx-auto mb-5" />
            <h2 className="font-georama text-4xl md:text-6xl font-bold italic uppercase text-fg-primary">
              {title}
            </h2>
          </header>

          {/* Body */}
          <div className={styles.planetContent}>
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                ref={(el) => { paragraphRefs.current[i] = el; }}
                className={[
                  styles.planetParagraph,
                  styles.paragraphReveal,
                  styles[`paragraphDelay${Math.min(i, 7)}`],
                  i === 0 ? styles.dropCap : '',
                ].join(' ')}
              >
                {paragraph}
              </p>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
