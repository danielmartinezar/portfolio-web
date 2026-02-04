import { useData } from "vike-react/useData";
import type { Data } from "./+data";

const SITE_URL = "https://danielmartinez.dev";

function upgradeImageForOg(imageUrl: string): string {
  if (imageUrl.includes("unsplash.com")) {
    return imageUrl.replace(/w=\d+/, "w=1200").replace(/h=\d+/, "h=630");
  }
  return imageUrl;
}

export function Head() {
  const { title, resume, cover_image, slug } = useData<Data>();

  if (!title) return null;

  const ogImage = upgradeImageForOg(cover_image);
  const url = `${SITE_URL}/blog/${slug}`;

  return (
    <>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={resume} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Daniel Martinez" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={resume} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
