declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const component: FC<SVGProps<SVGSVGElement>>;
  export default component;
}

declare module "*.svg?url" {
  const src: string;
  export default src;
}

declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.JPG" {
  const src: string;
  export default src;
}
