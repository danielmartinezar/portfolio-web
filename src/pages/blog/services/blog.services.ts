import type {
  Article,
  ArticleOverviewResponse,
  GetArticlesRequest,
  GetArticleBySlugRequest,
} from "../types";
import mockedArticlesData from "./mocked.articles.json";

// Type cast the imported JSON to ensure proper typing
const mockedArticles = mockedArticlesData as Article[];

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface IBlogServices {
  getArticles(request: GetArticlesRequest): Promise<ArticleOverviewResponse>;
  getArticleBySlug(request: GetArticleBySlugRequest): Promise<Article>;
}

export const blogServices = {
  getArticles: async (
    request: GetArticlesRequest,
  ): Promise<ArticleOverviewResponse> => {
    const { page, pageSize, category, search } = request;

    let allOverviews = mockedArticles.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ content, ...overview }) => overview,
    );

    // Filter by category if specified and not 'all'
    if (category && category !== "all") {
      allOverviews = allOverviews.filter(
        (article) => article.category === category,
      );
    }

    // Filter by search term if specified
    if (search && search.trim()) {
      const query = search.toLowerCase();
      allOverviews = allOverviews.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.resume.toLowerCase().includes(query),
      );
    }

    const start = (page - 1) * pageSize;
    const data = allOverviews.slice(start, start + pageSize);

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalItems: allOverviews.length,
      },
    };
  },

  getArticleBySlug: async (
    request: GetArticleBySlugRequest,
  ): Promise<Article> => {
    const { slug } = request;
    const article = mockedArticles.find((a) => slugify(a.title) === slug);
    if (!article) throw new Error("Article not found");
    return article;
  },
};
