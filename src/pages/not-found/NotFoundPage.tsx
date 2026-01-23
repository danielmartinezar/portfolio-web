import { Link } from 'react-router-dom';
import { ContentContainer } from '../../components/layout';
import { useTranslation } from '../../shared/services';
import { notFoundTranslationLoaders, type NotFoundPageTranslations } from './i18n';

export default function NotFoundPage() {
  const { t } = useTranslation<NotFoundPageTranslations>(notFoundTranslationLoaders);

  if (!t) return null;

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <ContentContainer className="text-center">
        <h1 className="text-primary text-8xl font-bold mb-4">{t.title}</h1>
        <p className="text-fg-primary text-2xl font-semibold mb-2">
          {t.subtitle}
        </p>
        <p className="text-fg-secondary mb-8">
          {t.description}
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-[10px] bg-primary text-bg-primary font-semibold hover:opacity-90 transition-opacity"
        >
          {t.goHome}
        </Link>
      </ContentContainer>
    </div>
  );
}
