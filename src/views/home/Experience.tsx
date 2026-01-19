import type { ExperienceTranslations } from '../../pages/home/i18n';
import { HomeSection } from './shared';
import { ExperienceItem } from './components';

interface ExperienceProps {
  translations: ExperienceTranslations;
}

export default function Experience({ translations }: ExperienceProps) {
  return (
    <HomeSection
      subtitle={translations.subtitle}
      title={translations.title}
      variant="primary"
    >
      <div className="max-w-3xl mx-auto">
        {translations.items.map((experience, index) => (
          <ExperienceItem
            key={index}
            logo={experience.logo}
            company={experience.company}
            role={experience.role}
            period={experience.period}
            achievements={experience.achievements}
          />
        ))}
      </div>
    </HomeSection>
  );
}
