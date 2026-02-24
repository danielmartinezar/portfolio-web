import type { ComponentType, SVGProps } from 'react';
import Planet1 from '../../../assets/planets/planet1.svg';
import Planet3 from '../../../assets/planets/planet3.svg';
import Planet8 from '../../../assets/planets/planet8.svg';
import Planet14 from '../../../assets/planets/planet14.svg';
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
 */
export const planets: PlanetData[] = [
  { id: 'origin',    SvgComponent: Planet1,  side: 'right', scrollCenter: 0.132 },
  { id: 'mission',   SvgComponent: Planet3,  side: 'left',  scrollCenter: 0.250 },
  { id: 'skills',    SvgComponent: Planet8,  side: 'right', scrollCenter: 0.382 },
  { id: 'interests', SvgComponent: Planet14, side: 'left',  scrollCenter: 0.514 },
  { id: 'values',    SvgComponent: Planet17, side: 'right', scrollCenter: 0.639 },
];

/** Get the X position (%) for a planet based on its side */
export function getPlanetX(side: 'left' | 'right'): number {
  return side === 'right' ? 70 : 30;
}
