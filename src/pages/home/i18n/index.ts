export type {
  HomePageTranslations,
  HeroTranslations,
  ServicesTranslations,
  ServiceItem,
} from './types';

/**
 * Lazy loaders for Home page translations
 * Only the active language file will be loaded
 */
export const homeTranslationLoaders = {
  en: () => import('./en'),
  es: () => import('./es'),
};
