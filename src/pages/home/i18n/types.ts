/**
 * Hero section translation structure
 */
export interface HeroTranslations {
  greeting: string;
  name: string;
  description: string;
  contactButton: string;
  followMe: string;
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
 * Single skill item with icon reference
 */
export interface SkillItem {
  name: string;
  icon: string;
}

/**
 * Skill category with label and items
 */
export interface SkillCategory {
  label: string;
  items: SkillItem[];
}

/**
 * Skills section translation structure
 */
export interface SkillsTranslations {
  subtitle: string;
  title: string;
  categories: Record<string, SkillCategory>;
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
 * Single contact item translation
 */
export interface ContactItem {
  icon: 'email' | 'phone' | 'location';
  value: string;
}

/**
 * Contact section translation structure
 */
export interface ContactTranslations {
  subtitle: string;
  title: string;
  description: string;
  items: ContactItem[];
}

/**
 * Single experience item translation (only translatable fields)
 */
export interface ExperienceItemTranslation {
  role: string;
  description: string;
}

/**
 * Experience section translation structure
 */
export interface ExperienceTranslations {
  subtitle: string;
  title: string;
  items: Record<string, ExperienceItemTranslation>;
}

/**
 * Complete Home page translation structure
 */
export interface HomePageTranslations {
  hero: HeroTranslations;
  services: ServicesTranslations;
  skills: SkillsTranslations;
  experience: ExperienceTranslations;
  contact: ContactTranslations;
}
