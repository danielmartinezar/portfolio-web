export interface PlanetTranslation {
  title: string;
  content: string;
}

export interface AboutPageTranslations {
  title: string;
  scrollHint: string;
  skipWorld: string;
  exitBlackHole: string;
  planets: Record<string, PlanetTranslation>;
  blackhole: PlanetTranslation;
}
