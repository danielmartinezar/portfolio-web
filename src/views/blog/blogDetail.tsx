"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContentContainer } from "../../components/layout";
import { MarkdownContent } from "./components/MarkdownContent";
import { useTranslation } from "../../shared/services";
import {
  blogTranslationLoaders,
  type BlogPageTranslations,
} from "../../features/blog/i18n";
import type { Article } from "../../features/blog/blog.types";

interface BlogDetailProps {
  article: Article;
}

export default function BlogDetail({ article }: BlogDetailProps) {
  const { t } = useTranslation<BlogPageTranslations>(blogTranslationLoaders);
  const pathname = usePathname();
  const lang = pathname.startsWith('/es') ? 'es' : 'en';

  if (!t) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="min-h-screen bg-bg-primary pt-8 pb-16">
      <ContentContainer>
        <Link
          href={`/${lang}/blog`}
          className="text-fg-primary hover:text-primary transition-colors mb-6 inline-block"
        >
          &larr; {t.backToBlog}
        </Link>

        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full max-h-[400px] object-cover rounded-[10px] mb-6"
        />

        <h1 className="text-fg-primary text-3xl md:text-4xl font-bold mb-2">
          {article.title}
        </h1>

        <span className="text-fg-secondary text-sm mb-8 block">
          {formattedDate}
        </span>

        <MarkdownContent content={article.content} />
      </ContentContainer>
    </div>
  );
}
