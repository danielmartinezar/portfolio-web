export interface NavigationLink {
  translationKey: 'home' | 'about' | 'blog';
  fallbackLabel: string;
  href: string;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  { translationKey: 'home', fallbackLabel: 'Home', href: '/' },
  { translationKey: 'about', fallbackLabel: 'About me', href: '/about' },
  { translationKey: 'blog', fallbackLabel: 'Blog', href: '/blog' },
];
