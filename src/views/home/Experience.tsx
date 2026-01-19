import type { ExperienceTranslations } from '../../pages/home/i18n';
import { HomeSection } from './shared';
import { ExperienceItem } from './components';
import logoIcon from '../../assets/logo_icon.png';

interface ExperienceProps {
  translations: ExperienceTranslations;
}

const experienceLogos: Record<string, string> = {
  'Humanforce': logoIcon,
  'The University of Queensland': logoIcon,
  'YouPay': logoIcon,
  'M3 Digital': logoIcon,
};

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
            logo={experienceLogos[experience.company]}
            company={experience.company}
            role={experience.role}
            period={experience.period}
            description={experience.description}
            skills={experience.skills}
          />
        ))}
      </div>
    </HomeSection>
  );
}
