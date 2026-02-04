import type { ArticleCategory } from '../../../pages/blog/blog.types';

interface CategoryTabsProps {
  categories: readonly ArticleCategory[];
  activeCategory: ArticleCategory;
  onCategoryChange: (category: ArticleCategory) => void;
  categoryLabels: Record<ArticleCategory, string>;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
  categoryLabels,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-start gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-5 py-2 rounded-[10px] text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeCategory === category
              ? 'bg-bg-secondary text-fg-primary border border-primary'
              : 'bg-transparent text-fg-secondary border border-fg-secondary hover:border-primary hover:text-fg-primary'
          }`}
          onClick={() => onCategoryChange(category)}
          type="button"
        >
          {categoryLabels[category]}
        </button>
      ))}
    </div>
  );
}
