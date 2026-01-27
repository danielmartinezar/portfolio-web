import type { ArticleCategory, ArticleOverview, Article } from "../blog.types";
import { getImageUrl } from "../../../shared/services/Client";

// API response types
export interface APIImageFormat {
  url: string;
  name?: string;
  width?: number;
  height?: number;
}

export interface APIImage {
  id: number;
  url: string;
  name: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: APIImageFormat;
    small?: APIImageFormat;
    medium?: APIImageFormat;
    large?: APIImageFormat;
  };
}

export interface APIArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  resume: string;
  content?: string;
  category: Exclude<ArticleCategory, "all">;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover_image: APIImage | null;
}

export interface APIPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface APIResponse<T> {
  data: T[];
  meta: {
    pagination: APIPagination;
  };
}

// App types
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

// Mappers
export const mapAPIArticleToOverview = (
  apiArticle: APIArticle
): ArticleOverview => ({
  id: apiArticle.id,
  slug: apiArticle.slug,
  created_at: apiArticle.createdAt,
  title: apiArticle.title,
  resume: apiArticle.resume,
  cover_image: getImageUrl(apiArticle.cover_image?.url ?? ""),
  category: apiArticle.category,
});

export const mapAPIArticleToArticle = (
  apiArticle: APIArticle
): Article => ({
  id: apiArticle.id,
  slug: apiArticle.slug,
  created_at: apiArticle.createdAt,
  title: apiArticle.title,
  resume: apiArticle.resume,
  cover_image: getImageUrl(apiArticle.cover_image?.url ?? ""),
  content: apiArticle.content || "",
  category: apiArticle.category,
});
