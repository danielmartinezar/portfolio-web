import { useState } from 'react';
import type { ExperienceTranslations } from '../../pages/home/i18n';
import { HomeSection } from './shared';
import { ExperienceItem } from './components';
import overnights from '../../assets/experiences/overnights.webp';
import ucover from '../../assets/experiences/ucover.webp';
import realay from '../../assets/experiences/realay.webp';
import fifco from '../../assets/experiences/FIFCO.webp';
import babelstreet from '../../assets/experiences/babelstreet.webp';
import refundo from '../../assets/experiences/refundo.webp';
import brentunited from '../../assets/experiences/brentunited.webp';
import mosaiq from '../../assets/experiences/mosaiq.webp';

interface ExperienceProps {
  translations: ExperienceTranslations;
}

interface ExperienceData {
  id: string;
  company: string;
  logo: string;
  period: string;
  skills: string[];
}

const experiences: ExperienceData[] = [
  {
    id: 'mosaiq',
    company: 'MosaiqOS',
    logo: mosaiq,
    period: '10/2025 - Present',
    skills: ['nestjs', 'react', 'postgresql', 'docker', 'langraph'],
  },
  {
    id: 'dappsco-fifco',
    company: 'Dappsco - FIFCO',
    logo: fifco,
    period: '07/2025 - Present',
    skills: ['nodejs', 'strapi', 'postgresql', 'googlecloud', 'docker'],
  },
  {
    id: 'brentunited',
    company: 'Brent United Group S.A.',
    logo: brentunited,
    period: '06/2025 - 07/2025',
    skills: ['react', 'typescript', 'vercel'],
  },
  {
    id: 'refundo',
    company: 'Dappsco - Refundo',
    logo: refundo,
    period: '05/2025 - 07/2025',
    skills: ['nestjs', 'typescript', 'aws'],
  },
  {
    id: 'dappsco-realay',
    company: 'Dappsco - Realay',
    logo: realay,
    period: '07/2024 - 06/2025',
    skills: ['nestjs', 'typescript', 'postgresql', 'supabase', 'aws', 'docker'],
  },
  {
    id: 'software-sushi-babel-street',
    company: 'Software Sushi - Babel Street',
    logo: babelstreet,
    period: '04/2024 - 09/2024',
    skills: ['nextjs', 'react', 'redux', 'materialui', 'typescript'],
  },
  {
    id: 'ucover',
    company: 'UCOVER S.A.S',
    logo: ucover,
    period: '03/2023 - 04/2024',
    skills: ['react', 'antdesign', 'css'],
  },
  {
    id: 'overnights',
    company: 'Overnights Technologies Inc',
    logo: overnights,
    period: '07/2023 - 11/2023',
    skills: ['mongodb', 'express', 'react', 'nodejs', 'stripe', 'googlecloud', 'digitalocean'],
  },
];

const INITIAL_COUNT = 4;

export default function Experience({ translations }: ExperienceProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = showAll
    ? experiences
    : experiences.slice(0, INITIAL_COUNT);

  return (
    <HomeSection
      subtitle={translations.subtitle}
      title={translations.title}
      variant="primary"
    >
      <div className="max-w-3xl mx-auto">
        {visibleExperiences.map((experience) => {
          const translation = translations.items[experience.id];
          return (
            <ExperienceItem
              key={experience.id}
              logo={experience.logo}
              company={experience.company}
              role={translation?.role ?? ''}
              period={experience.period}
              description={translation?.description ?? ''}
              skills={experience.skills}
            />
          );
        })}
        {experiences.length > INITIAL_COUNT && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-6 py-3 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200"
          >
            {showAll ? translations.showLess : `${translations.showMore}`}
          </button>
        )}
      </div>
    </HomeSection>
  );
}
