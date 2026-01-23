/**
 * Navigation link translation
 */
export interface NavLinkTranslation {
  label: string;
  href: string;
}

/**
 * Navbar section translation structure
 */
export interface NavbarTranslations {
  home: string;
  about: string;
  blog: string;
}

/**
 * Footer section translation structure
 */
export interface FooterTranslations {
  copyright: string;
  designedBy: string;
  navigation: NavLinkTranslation[];
}
