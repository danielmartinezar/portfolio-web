export type { FooterTranslations, NavbarTranslations } from './types';

/**
 * Lazy loaders for Navbar translations
 * Only the active language file will be loaded
 */
export const navbarTranslationLoaders = {
  en: () => import('./en').then((m) => ({ default: m.navbar })),
  es: () => import('./es').then((m) => ({ default: m.navbar })),
};

/**
 * Lazy loaders for Footer translations
 * Only the active language file will be loaded
 */
export const footerTranslationLoaders = {
  en: () => import('./en').then((m) => ({ default: m.footer })),
  es: () => import('./es').then((m) => ({ default: m.footer })),
};
