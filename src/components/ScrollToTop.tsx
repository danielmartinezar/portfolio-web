"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    const onVirtual = (e: Event) => {
      setVisible((e as CustomEvent<{ y: number }>).detail.y > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('app:virtualScrollY', onVirtual);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('app:virtualScrollY', onVirtual);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        const intercepted = !window.dispatchEvent(
          new CustomEvent('app:scrollToTop', { cancelable: true, bubbles: false })
        );
        if (!intercepted) window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-200"
    >
      <svg width="43" height="43" viewBox="0 0 24 24" fill="none" stroke="#FFD154" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
