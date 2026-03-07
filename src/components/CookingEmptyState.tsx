"use client";

import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface CookingEmptyStateProps {
  label: string;
}

export default function CookingEmptyState({ label }: CookingEmptyStateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-6 py-10 md:py-16 w-full max-w-2xl mx-auto rounded-3xl border-2 border-dashed"
      style={{
        borderColor: "rgba(165, 169, 188, 0.2)",
        backgroundColor: "var(--color-bg-primary)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {/* Lottie Top */}
      <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 -mb-8">
        {isVisible && (
          <DotLottieReact
            src="/astronaut.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>

      {/* Text block below */}
      <div className="flex flex-col items-center gap-2 text-center px-4 relative z-10">
        <h3
          className="text-xl md:text-2xl font-medium"
          style={{ color: "var(--color-fg-primary)" }}
        >
          {label}
        </h3>
        <p
          className="text-sm md:text-base opacity-70"
          style={{ color: "var(--color-fg-secondary)" }}
        >
          Stay tuned.
        </p>
      </div>
    </div>
  );
}
