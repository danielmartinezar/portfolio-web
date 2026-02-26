import type { ComponentType, SVGProps } from 'react';
import Planet1 from '../../../assets/planets/planet1.svg';
import Planet3 from '../../../assets/planets/planet3.svg';
import Planet5 from '../../../assets/planets/planet5.svg';
import Planet7 from '../../../assets/planets/planet7.svg';
import Planet9 from '../../../assets/planets/planet9.svg';
import Planet12 from '../../../assets/planets/planet12.svg';
import Planet15 from '../../../assets/planets/planet15.svg';
import Planet17 from '../../../assets/planets/planet17.svg';

export interface PlanetData {
  id: string;
  SvgComponent: ComponentType<SVGProps<SVGSVGElement>>;
  /** Horizontal side: even index = right, odd index = left (alternating) */
  side: 'left' | 'right';
  /** 0-1 position in the scroll journey where the planet is centered */
  scrollCenter: number;
}

/**
 * Planets are laid out vertically, alternating left-right sides.
 * The shuttle follows a serpentine S-curve connecting them.
 *
 * Layout reference (like EnCosmos):
 *        [Planet 1]  (right)
 *   [Planet 2]       (left)
 *        [Planet 3]  (right)
 *   [Planet 4]       (left)
 *        [Planet 5]  (right)
 *   [Planet 6]       (left)
 *        [Planet 7]  (right)
 */
export const planets: PlanetData[] = [
  { id: 'dreams',     SvgComponent: Planet1,  side: 'right', scrollCenter: 0.080 },
  { id: 'psychology', SvgComponent: Planet3,  side: 'left',  scrollCenter: 0.167 },
  { id: 'hobbies',    SvgComponent: Planet5,  side: 'right', scrollCenter: 0.254 },
  { id: 'engineering',SvgComponent: Planet7,  side: 'left',  scrollCenter: 0.341 },
  { id: 'art',        SvgComponent: Planet9,  side: 'right', scrollCenter: 0.428 },
  { id: 'childhood',  SvgComponent: Planet12, side: 'left',  scrollCenter: 0.515 },
  { id: 'people',     SvgComponent: Planet15, side: 'right', scrollCenter: 0.602 },
  { id: 'lifestyle',  SvgComponent: Planet17, side: 'left',  scrollCenter: 0.689 },
];

/** Get the X position (%) for a planet based on its side */
export function getPlanetX(side: 'left' | 'right'): number {
  return side === 'right' ? 70 : 30;
}
