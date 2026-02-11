export type { BlogPageTranslations } from './types';

export const blogTranslationLoaders = {
  en: () => import('./en'),
  es: () => import('./es'),
};
