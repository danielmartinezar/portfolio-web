export type { NotFoundPageTranslations } from './types';

export const notFoundTranslationLoaders = {
  en: () => import('./en'),
  es: () => import('./es'),
};
