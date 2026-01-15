import { useTranslation } from '../../shared/services';
import { homeTranslationLoaders, type HomePageTranslations } from './i18n';
import Hero from '../../views/home/Hero';
import Services from '../../views/home/Services';

export default function HomePage() {
  const { t, isLoading } = useTranslation<HomePageTranslations>(homeTranslationLoaders);

  if (isLoading || !t) {
    return null;
  }

  return (
    <div>
      <Hero translations={t.hero} />
      <Services translations={t.services} />
    </div>
  );
}
