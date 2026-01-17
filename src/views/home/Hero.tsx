import { useState } from "react";
import type { HeroTranslations } from "../../pages/home/i18n";
import ContactButton from "./components/ContactButton";
import SocialIcons from "../../components/SocialIcons";
import danielImage from "../../assets/DanielMartinez.webp";
import { danielImageBlurBase64 } from "../../assets/danielImageBlurBase64";

interface HeroProps {
  translations: HeroTranslations;
}

export default function Hero({ translations }: HeroProps) {
  const [blurLoaded, setBlurLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="min-h-[calc(100vh-80px)] relative overflow-hidden flex flex-col">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 flex-1 max-w-[1900px] mx-auto px-[170px] w-full">
        {/* Text Content - Left side */}
        <div className="flex items-center">
          <div>
            <div className="space-y-4">
              {/* Greeting + Name */}
              <h1 className="font-georama text-7xl leading-[1.1] italic font-bold uppercase">
                <span className="text-fg-primary">{translations.greeting}</span>
                <br />
                <span className="text-primary">{translations.name}</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-fg-secondary leading-relaxed max-w-lg">
                {translations.description}
              </p>
            </div>
            <ContactButton className="mt-8" label={translations.contactButton} />
          </div>
        </div>

        {/* Image Container - Right side, extends to bottom */}
        <div className="relative h-full flex items-end justify-center">
          {/* Social Icons with Follow Me */}
          {blurLoaded && (
            <div
              key={translations.followMe}
              className="absolute right-0 top-[65%] -translate-y-1/2 z-10 flex flex-col items-center gap-4"
            >
              <span className="text-fg-secondary text-xs tracking-widest uppercase [writing-mode:vertical-lr] whitespace-nowrap">
                {translations.followMe}
              </span>
              <svg
                width="12"
                height="40"
                viewBox="0 0 12 40"
                fill="none"
                className="text-fg-secondary"
              >
                <path
                  d="M6 0L6 38M6 38L1 33M6 38L11 33"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <SocialIcons direction="vertical" size="sm" gap="gap-2" />
            </div>
          )}
          {/* Photo */}
          <div className="relative h-[85%] w-auto">
            <img
              src={danielImageBlurBase64}
              alt=""
              className={`h-full w-auto object-contain object-bottom transition-opacity duration-700 ${
                imageLoaded ? "opacity-0" : "opacity-100"
              }`}
              aria-hidden="true"
              onLoad={() => setBlurLoaded(true)}
            />
            <img
              src={danielImage}
              alt={translations.imageAlt}
              className={`h-full w-auto object-contain object-bottom absolute inset-0 transition-opacity duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col flex-1 max-w-[1900px] mx-auto px-6 w-full">
        {/* Text Content */}
        <div className="pt-8 shrink-0">
          <div className="space-y-3">
            <h1 className="font-georama text-4xl font-bold leading-[1.1] uppercase italic">
              <span className="text-fg-primary">{translations.greeting}</span>
              <br />
              <span className="text-primary">{translations.name}</span>
            </h1>
            <p className="text-base text-fg-secondary leading-relaxed">
              {translations.description}
            </p>
          </div>
          <ContactButton className="mt-6" label={translations.contactButton} />
        </div>

        {/* Image - Grows to fill remaining space */}
        <div className="flex-1 relative flex items-end justify-center mt-4">
          {blurLoaded && (
            <div
              key={translations.followMe}
              className="absolute right-0 top-[25%] -translate-y-1/2 z-10 flex flex-col items-center gap-3"
            >
              <span className="text-fg-secondary text-[10px] tracking-widest uppercase [writing-mode:vertical-lr] whitespace-nowrap">
                {translations.followMe}
              </span>
              <svg
                width="10"
                height="30"
                viewBox="0 0 12 40"
                fill="none"
                className="text-fg-secondary"
              >
                <path
                  d="M6 0L6 38M6 38L1 33M6 38L11 33"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <SocialIcons direction="vertical" size="sm" gap="gap-2" />
            </div>
          )}
          <img
            src={danielImageBlurBase64}
            alt=""
            className={`h-full w-auto object-contain object-bottom transition-opacity duration-700 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden="true"
            onLoad={() => setBlurLoaded(true)}
          />
          <img
            src={danielImage}
            alt={translations.imageAlt}
            className={`h-full w-auto object-contain object-bottom absolute inset-0 left-1/2 -translate-x-1/2 transition-opacity duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </section>
  );
}
