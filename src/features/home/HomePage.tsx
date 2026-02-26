"use client";

import { lazy, Suspense } from "react";
import { useTranslation } from "../../shared/services";
import { homeTranslationLoaders, type HomePageTranslations } from "./i18n";
import Hero from "../../views/home/Hero";
import Services from "../../views/home/Services";
import Experience from "../../views/home/Experience";
import Contact from "../../views/home/Contact";
import RecentArticles from "../../views/home/RecentArticles";
import type { ArticleOverview } from "../../features/blog/blog.types";

const Skills = lazy(() => import("../../views/home/Skills"));

interface HomePageProps {
  recentArticles: ArticleOverview[];
}

export default function HomePage({ recentArticles }: HomePageProps) {
  const { t, isLoading } = useTranslation<HomePageTranslations>(
    homeTranslationLoaders,
  );

  if (isLoading || !t) {
    return null;
  }

  return (
    <div>
      <Hero translations={t.hero} />
      <Services translations={t.services} />
      <Experience translations={t.experience} />
      <Suspense fallback={null}>
        <Skills translations={t.skills} />
      </Suspense>
      <RecentArticles translations={t.recentArticles} articles={recentArticles} />
      <Contact translations={t.contact} />
    </div>
  );
}
