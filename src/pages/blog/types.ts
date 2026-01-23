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
  created_at: string;
  title: string;
  resume: string;
  cover_image: string;
  content: string;
  category: Exclude<ArticleCategory, 'all'>;
}

export type ArticleOverview = Omit<Article, 'content'>;

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
}

export interface GetArticlesRequest {
  page: number;
  pageSize: number;
  category?: ArticleCategory;
  search?: string;
}

export interface GetArticleBySlugRequest {
  slug: string;
}

export interface ArticleOverviewResponse {
  data: ArticleOverview[];
  pagination: Pagination;
}
