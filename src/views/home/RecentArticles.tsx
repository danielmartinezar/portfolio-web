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
    <HomeSection subtitle={translations.subtitle} title={translations.title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <CardOverview key={article.id} article={article} />
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
