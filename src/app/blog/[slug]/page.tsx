import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogService } from "../../../features/blog/services";
import BlogDetail from "../../../views/blog/blogDetail";

const SITE_URL = "https://danielmartinez.dev";

function upgradeImageForOg(imageUrl: string): string {
  if (imageUrl.includes("unsplash.com")) {
    return imageUrl.replace(/w=\d+/, "w=1200").replace(/h=\d+/, "h=630");
  }
  return imageUrl;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogService.getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const ogImage = upgradeImageForOg(article.cover_image);
  const url = `${SITE_URL}/blog/${article.slug}`;

  return {
    title: `${article.title} | Daniel Martinez`,
    description: article.resume,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.resume,
      images: [ogImage],
      url,
      siteName: "Daniel Martinez",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.resume,
      images: [ogImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetail article={article} />;
}
