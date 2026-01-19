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
  services: string;
  works: string;
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
