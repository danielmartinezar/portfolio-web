"use client";

import { useTranslation } from "../../shared/services";
import { aboutTranslationLoaders, type AboutPageTranslations } from "./i18n";
import SpaceJourney from "../../views/about/SpaceJourney";

export default function AboutPage() {
  const { t, isLoading } = useTranslation<AboutPageTranslations>(
    aboutTranslationLoaders,
  );

  if (isLoading || !t) {
    return null;
  }

  return <SpaceJourney translations={t} />;
}
