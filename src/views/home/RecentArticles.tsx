import Link from "next/link";
import { HomeSection } from "./shared";
import { CardOverview } from "../blog/components";
import type { ArticleOverview } from "../../features/blog/blog.types";

export interface RecentArticlesTranslations {
  subtitle: string;
  title: string;
  viewAll: string;
}

interface RecentArticlesProps {
  translations: RecentArticlesTranslations;
  articles: ArticleOverview[];
}

export default function RecentArticles({ translations, articles }: RecentArticlesProps) {
  return (
    <HomeSection subtitle={translations.subtitle} title={translations.title} variant="primary">
      <div className="flex flex-wrap justify-center gap-6">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className={`w-full sm:w-[calc(50%-12px)] lg:w-72 ${index >= 2 ? "hidden lg:block" : ""}`}
          >
            <CardOverview article={article} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/blog"
          className="py-3 px-8 text-sm font-medium text-fg-secondary border border-fg-secondary rounded-lg hover:text-fg-primary hover:border-fg-primary transition-colors duration-200"
        >
          {translations.viewAll}
        </Link>
      </div>
    </HomeSection>
  );
}
