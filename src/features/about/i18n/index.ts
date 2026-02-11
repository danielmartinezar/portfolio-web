export type { AboutPageTranslations, PlanetTranslation } from './types';

export const aboutTranslationLoaders = {
  en: () => import('./en'),
  es: () => import('./es'),
};
