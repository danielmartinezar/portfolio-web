"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { HeroTranslations } from "../../features/home/i18n";
import ContactButton from "./components/ContactButton";
import SocialIcons from "../../components/SocialIcons";

const HERO_IMAGE_URL = "https://res.cloudinary.com/dyezhjnea/image/upload/v1772140035/DanielMartinez_ufqkqq.webp";
const HERO_IMAGE_BLUR = "https://res.cloudinary.com/dyezhjnea/image/upload/w_20,q_10,e_blur:200/v1772140035/DanielMartinez_ufqkqq.webp";

interface HeroProps {
  translations: HeroTranslations;
}

export default function Hero({ translations }: HeroProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 50),     // Nombre
      setTimeout(() => setAnimationStep(2), 200),    // Descripción
      setTimeout(() => setAnimationStep(3), 350),    // Botón
      setTimeout(() => setAnimationStep(4), 500),    // Imagen
      setTimeout(() => setAnimationStep(5), 1000),   // Slogan (Final with longest delay for emphasis)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="min-h-[calc(100vh-80px)] relative overflow-hidden flex flex-col">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 flex-1 max-w-[1900px] mx-auto px-[170px] w-full">
        {/* Text Content - Left side */}
        <div className="flex items-center">
          <div>
            <div>
              {/* Name */}
              <h1
                className={`font-georama text-[100px] leading-[1.1] italic font-bold uppercase text-primary transition-all duration-500 ease-out ${
                  animationStep >= 1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {translations.name}
              </h1>

              {/* Slogan - Protagonista, aparece al final con más énfasis */}
              <p
                className={`text-3xl text-fg-primary font-medium mt-1 transition-all duration-1000 ease-out ${
                  animationStep >= 5
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 -translate-x-12 scale-95"
                }`}
              >
                {translations.slogan}
              </p>

              {/* Description */}
              <p
                className={`text-lg text-fg-secondary leading-relaxed max-w-lg mt-4 transition-all duration-500 ease-out ${
                  animationStep >= 2
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {translations.description}
              </p>
            </div>
            <div
              className={`transition-all duration-500 ease-out ${
                animationStep >= 3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <ContactButton className="mt-8" label={translations.contactButton} />
            </div>
          </div>
        </div>

        {/* Image Container - Right side, extends to bottom */}
        <div className="relative h-full flex items-end justify-center">
          {/* Social Icons with Follow Me */}
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
          {/* Photo */}
          <div
            className={`relative h-[85%] w-auto transition-all duration-500 ease-out ${
              animationStep >= 4
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <Image
              src={HERO_IMAGE_URL}
              alt={translations.imageAlt}
              width={600}
              height={900}
              placeholder="blur"
              blurDataURL={HERO_IMAGE_BLUR}
              className="h-full w-auto object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col flex-1 max-w-[1900px] mx-auto px-6 w-full">
        {/* Text Content */}
        <div className="pt-8 shrink-0">
          <div className="space-y-3">
            <h1
              className={`font-georama text-5xl font-bold leading-[1.1] uppercase italic text-primary transition-all duration-500 ease-out ${
                animationStep >= 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {translations.name.split(' ').map((word, index) => (
                <span key={index}>
                  {word}
                  {index === 0 && <br />}
                </span>
              ))}
            </h1>
            {/* Slogan - Protagonista, aparece al final con más énfasis */}
            <p
              className={`text-xl text-fg-primary font-medium transition-all duration-1000 ease-out ${
                animationStep >= 5
                  ? "opacity-100 translate-x-0 scale-100"
                  : "opacity-0 -translate-x-12 scale-95"
              }`}
            >
              {translations.slogan}
            </p>
            <p
              className={`text-base text-fg-secondary leading-relaxed transition-all duration-500 ease-out ${
                animationStep >= 2
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {translations.description}
            </p>
          </div>
          <div
            className={`transition-all duration-700 ease-out ${
              animationStep >= 3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <ContactButton className="mt-6" label={translations.contactButton} />
          </div>
        </div>

        {/* Image - Grows to fill remaining space */}
        <div
          className={`flex-1 relative flex items-end justify-center mt-4 transition-all duration-500 ease-out ${
            animationStep >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
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
          <Image
            src={HERO_IMAGE_URL}
            alt={translations.imageAlt}
            width={600}
            height={900}
            placeholder="blur"
            blurDataURL={HERO_IMAGE_BLUR}
            className="h-full w-auto object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
