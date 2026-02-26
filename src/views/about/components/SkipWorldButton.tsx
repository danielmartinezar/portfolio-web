"use client";

import { useState, useEffect, useRef } from 'react';

interface SkipWorldButtonProps {
  label: string;
  onSkip: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function SkipWorldButton({ label, onSkip, scrollContainerRef }: SkipWorldButtonProps) {
  const [visible, setVisible] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    setVisible(true);
    lastScrollTop.current = 0;
  }, [label]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onScroll = () => {
      const currentTop = el.scrollTop;
      if (currentTop > lastScrollTop.current && currentTop > 10) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollTop.current = currentTop;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollContainerRef]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-6 pt-10 transition-all duration-300"
      style={{
        background: 'linear-gradient(to top, rgba(17,17,34,0.95) 60%, transparent)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      <button
        type="button"
        onClick={onSkip}
        className="px-8 py-3 border border-primary text-primary rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-primary hover:text-bg-primary hover:scale-105 active:scale-95"
      >
        {label}
      </button>
    </div>
  );
}
