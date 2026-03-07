"use client";

import { useState, useMemo } from "react";
import { ContentContainer } from "../../components/layout";
import { useTranslation } from "../../shared/services";
import CookingEmptyState from "../../components/CookingEmptyState";
import { CardOverview, CategoryTabs } from "./components";
import {
  blogTranslationLoaders,
  type BlogPageTranslations,
} from "../../features/blog/i18n";
import type { ArticleOverview, ArticleCategory } from "../../features/blog/blog.types";
import { ARTICLE_CATEGORIES } from "../../features/blog/blog.types";

interface BlogProps {
  allArticles: ArticleOverview[];
}

export default function Blog({ allArticles }: BlogProps) {
  const { t } = useTranslation<BlogPageTranslations>(blogTranslationLoaders);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ArticleCategory>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredByCategory = useMemo(() => {
    return selectedCategory === "all"
      ? allArticles
      : allArticles.filter((a) => a.category === selectedCategory);
  }, [allArticles, selectedCategory]);

  const filteredArticles = useMemo(() => {
    if (!search.trim()) return filteredByCategory.slice(0, visibleCount);
    const query = search.toLowerCase();
    return filteredByCategory.filter(
      (a: ArticleOverview) =>
        a.title.toLowerCase().includes(query) ||
        a.resume.toLowerCase().includes(query),
    );
  }, [filteredByCategory, search, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleCategoryChange = (category: ArticleCategory) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  const hasMore = !search.trim() && visibleCount < filteredByCategory.length;
  const displayCount = search.trim()
    ? filteredArticles.length
    : filteredByCategory.length;

  if (!t) return null;

  return (
    <div className="min-h-screen bg-bg-primary pt-8 pb-16">
      <ContentContainer>
        <h1 className="text-fg-primary text-4xl font-bold mb-2">{t.title}</h1>
        <p className="text-fg-secondary mb-6">{t.description}</p>

        <div className="mb-8">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl px-4 py-3 rounded-[10px] bg-bg-secondary text-fg-primary placeholder-fg-secondary border border-fg-secondary/20 outline-none focus:border-fg-primary transition-colors"
          />
        </div>

        <CategoryTabs
          categories={ARTICLE_CATEGORIES}
          activeCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categoryLabels={t.categories}
        />

        <h2 className="text-fg-primary text-2xl font-semibold mb-6">
          {t.allPosts} ({displayCount})
        </h2>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article: ArticleOverview) => (
              <CardOverview key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <CookingEmptyState label={t.emptyState.label} />
        )}

        {hasMore && (
          <button
            type="button"
            onClick={handleLoadMore}
            className="w-full mt-6 py-3 px-6 text-sm font-medium text-fg-secondary border border-fg-secondary rounded-lg hover:text-fg-primary hover:border-fg-primary transition-colors duration-200"
          >
            {t.loadMore}
          </button>
        )}
      </ContentContainer>
    </div>
  );
}
