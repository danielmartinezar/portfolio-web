import { Client } from "../../../shared/services/Client";
import type { Article } from "../blog.types";
import type {
  APIArticle,
  APIResponse,
  ArticleOverviewResponse,
  GetArticleBySlugRequest,
  GetArticlesRequest,
} from "./types";
import { mapAPIArticleToArticle, mapAPIArticleToOverview } from "./types";

export interface IBlogServices {
  getArticles(request: GetArticlesRequest): Promise<ArticleOverviewResponse>;
  getArticleBySlug(request: GetArticleBySlugRequest): Promise<Article>;
}

export const blogServices: IBlogServices = {
  getArticles: async (
    request: GetArticlesRequest
  ): Promise<ArticleOverviewResponse> => {
    const { page, pageSize, category, search } = request;

    const params = new URLSearchParams();

    // Fields for overview (exclude content)
    params.append("fields[0]", "title");
    params.append("fields[1]", "slug");

    
    params.append("fields[3]", "category");
    params.append("fields[4]", "createdAt");

    // Populate cover image
    params.append("populate", "cover_image");

    // Pagination
    params.append("pagination[page]", String(page));
    params.append("pagination[pageSize]", String(pageSize));

    // Filter by category
    if (category && category !== "all") {
      params.append("filters[category][$eq]", category);
    }

    // Search by title or resume
    if (search && search.trim()) {
      params.append("filters[$or][0][title][$containsi]", search);
      params.append("filters[$or][1][resume][$containsi]", search);
    }

    const response = await Client.get<APIResponse<APIArticle>>(
      `/articles?${params.toString()}`
    );

    return {
      data: response.data.data.map((article) =>
        mapAPIArticleToOverview(article)
      ),
      pagination: {
        page: response.data.meta.pagination.page,
        pageSize: response.data.meta.pagination.pageSize,
        totalItems: response.data.meta.pagination.total,
      },
    };
  },

  getArticleBySlug: async (
    request: GetArticleBySlugRequest
  ): Promise<Article> => {
    const { slug } = request;

    const params = new URLSearchParams();
    params.append("filters[slug][$eq]", slug);
    params.append("populate", "cover_image");

    const response = await Client.get<APIResponse<APIArticle>>(
      `/articles?${params.toString()}`
    );

    if (!response.data.data.length) {
      throw new Error("Article not found");
    }

    return mapAPIArticleToArticle(response.data.data[0]);
  },
};
