import type { FooterTranslations, NavbarTranslations, EmptyStateTranslations } from './types';

export const navbar: NavbarTranslations = {
  home: 'Inicio',
  about: 'Acerca de mí',
  blog: 'Blog',
};

export const footer: FooterTranslations = {
  copyright: 'Copyright',
  designedBy: 'Diseñado por Daniel Martinez',
  navigation: [
    { label: 'Inicio', href: '#home' },
    { label: 'Acerca de mí', href: '#aboutme' },
    { label: 'Blog', href: '#blog' },
  ],
};

export const emptyState: EmptyStateTranslations = {
  label: 'Algo se está cocinando',
  stayTuned: 'Mantente al tanto.',
};
