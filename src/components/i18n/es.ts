import type { FooterTranslations, NavbarTranslations } from './types';

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
