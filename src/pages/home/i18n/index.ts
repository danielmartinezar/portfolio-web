export type {
  HomePageTranslations,
  HeroTranslations,
  ServicesTranslations,
  ServiceItem,
  SkillsTranslations,
  SkillItem,
  SkillCategory,
  ContactTranslations,
  ContactItem,
  ExperienceTranslations,
  ExperienceItem,
} from './types';

/**
 * Lazy loaders for Home page translations
 * Only the active language file will be loaded
 */
export const homeTranslationLoaders = {
  en: () => import('./en'),
  es: () => import('./es'),
};
