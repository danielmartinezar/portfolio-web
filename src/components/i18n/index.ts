export type { FooterTranslations } from './types';

/**
 * Lazy loaders for Footer translations
 * Only the active language file will be loaded
 */
export const footerTranslationLoaders = {
  en: () => import('./en').then((m) => ({ default: m.footer })),
  es: () => import('./es').then((m) => ({ default: m.footer })),
};
