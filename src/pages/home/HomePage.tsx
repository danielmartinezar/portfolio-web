import { lazy, Suspense } from "react";
import { useTranslation } from "../../shared/services";
import { homeTranslationLoaders, type HomePageTranslations } from "./i18n";
import Hero from "../../views/home/Hero";
import Services from "../../views/home/Services";
import Experience from "../../views/home/Experience";
import Contact from "../../views/home/Contact";

const Skills = lazy(() => import("../../views/home/Skills"));

export default function HomePage() {
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
      <Contact translations={t.contact} />
    </div>
  );
}
