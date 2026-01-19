import { useTranslation } from "../../shared/services";
import { homeTranslationLoaders, type HomePageTranslations } from "./i18n";
import Hero from "../../views/home/Hero";
import Services from "../../views/home/Services";
import Skills from "../../views/home/Skills";
import Experience from "../../views/home/Experience";
import Contact from "../../views/home/Contact";

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
      <Skills translations={t.skills} />
      <Contact translations={t.contact} />
    </div>
  );
}
