/**
 * Navigation link translation
 */
export interface NavLinkTranslation {
  label: string;
  href: string;
}

/**
 * Footer section translation structure
 */
export interface FooterTranslations {
  copyright: string;
  designedBy: string;
  navigation: NavLinkTranslation[];
}
