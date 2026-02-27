export interface NavigationLink {
  translationKey: 'home' | 'about' | 'blog';
  fallbackLabel: string;
  href: string;
}

export function getNavigationLinks(lang: string): NavigationLink[] {
  return [
    { translationKey: 'home', fallbackLabel: 'Home', href: `/${lang}` },
    { translationKey: 'about', fallbackLabel: 'About me', href: `/${lang}/about` },
    { translationKey: 'blog', fallbackLabel: 'Blog', href: `/${lang}/blog` },
  ];
}
