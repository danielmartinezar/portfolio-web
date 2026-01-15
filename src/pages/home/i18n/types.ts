/**
 * Hero section translation structure
 */
export interface HeroTranslations {
  name: string;
  description: string;
  contactButton: string;
  imageAlt: string;
}

/**
 * Single service item translation
 */
export interface ServiceItem {
  title: string;
  description: string;
}

/**
 * Services section translation structure
 */
export interface ServicesTranslations {
  subtitle: string;
  title: string;
  items: ServiceItem[];
}

/**
 * Complete Home page translation structure
 */
export interface HomePageTranslations {
  hero: HeroTranslations;
  services: ServicesTranslations;
}
