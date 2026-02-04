export const ARTICLE_CATEGORIES = [
  'all',
  'frontend',
  'backend',
  'devops',
  'architecture',
  'testing',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export interface Article {
  id: number;
  slug: string;
  created_at: string;
  title: string;
  resume: string;
  cover_image: string;
  content: string;
  category: Exclude<ArticleCategory, 'all'>;
}

export type ArticleOverview = Omit<Article, 'content'>;
