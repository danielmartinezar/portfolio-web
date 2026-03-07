import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SUPPORTED_LANGUAGES } from "../../../../shared/services";
import { blogService } from "../../../../features/blog/services";
import BlogDetail from "../../../../views/blog/blogDetail";

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
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = blogService.getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const ogImage = upgradeImageForOg(article.cover_image);
  const url = `${SITE_URL}/${lang}/blog/${article.slug}`;

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

export async function generateStaticParams() {
  const articles = blogService.getAllArticles();
  const paths: { lang: string; slug: string }[] = [];

  SUPPORTED_LANGUAGES.forEach((lang) => {
    articles.forEach((article) => {
      paths.push({
        lang,
        slug: article.slug,
      });
    });
  });

  return paths;
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = blogService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogDetail article={article} />;
}
