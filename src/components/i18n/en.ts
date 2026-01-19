import type { FooterTranslations, NavbarTranslations } from './types';

export const navbar: NavbarTranslations = {
  services: 'Home',
  works: 'About me',
  blog: 'Blog',
};

export const footer: FooterTranslations = {
  copyright: 'Copyright',
  designedBy: 'Designed by Daniel Martinez',
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About Me', href: '#aboutme' },
    { label: 'Blog', href: '#blog' },
  ],
};
