import type { Article, ArticleOverview, ArticleCategory } from '../blog.types';

export interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  category?: ArticleCategory;
}

export interface GetArticlesResponse {
  data: ArticleOverview[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface IBlogService {
  getArticles(params?: GetArticlesParams): GetArticlesResponse;
  getArticleBySlug(slug: string): Article | null;
  getAllArticles(): Article[];
}
