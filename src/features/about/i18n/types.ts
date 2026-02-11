export interface PlanetTranslation {
  title: string;
  content: string;
}

export interface AboutPageTranslations {
  scrollHint: string;
  skipWorld: string;
  planets: Record<string, PlanetTranslation>;
}
