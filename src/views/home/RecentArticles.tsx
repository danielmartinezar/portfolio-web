"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CookingEmptyState from "../../components/CookingEmptyState";
import { HomeSection } from "./shared";
import { CardOverview } from "../blog/components";
import type { ArticleOverview } from "../../features/blog/blog.types";
import type { RecentArticlesTranslations } from "../../features/home/i18n/types";

export type { RecentArticlesTranslations };

interface RecentArticlesProps {
  translations: RecentArticlesTranslations;
  articles: ArticleOverview[];
}


export default function RecentArticles({
  translations,
  articles,
}: RecentArticlesProps) {
  const pathname = usePathname();
  const lang = pathname.startsWith("/es") ? "es" : "en";
  const hasArticles = articles.length > 0;

  return (
    <HomeSection
      subtitle={translations.subtitle}
      title={translations.title}
      variant="primary"
    >
      {hasArticles ? (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={`w-full sm:w-[calc(50%-12px)] lg:w-72 ${index >= 2 ? "hidden lg:block" : ""
                  }`}
              >
                <CardOverview article={article} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href={`/${lang}/blog`}
              className="py-3 px-8 text-sm font-medium text-fg-secondary border border-fg-secondary rounded-lg hover:text-fg-primary hover:border-fg-primary transition-colors duration-200"
            >
              {translations.viewAll}
            </Link>
          </div>
        </>
      ) : (
        <CookingEmptyState />
      )}
    </HomeSection>
  );
}
