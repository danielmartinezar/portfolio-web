import type { Article, ArticleOverview } from '../blog.types';
import type { IBlogService, GetArticlesParams, GetArticlesResponse } from './types';
import { parsePost } from './helpers';

// Import all markdown files from posts directory
const postFiles = import.meta.glob('../../../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const allPosts: Article[] = Object.entries(postFiles)
  .map(([filename, content]) => parsePost(filename, content))
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

export class LocalMarkdownBlogService implements IBlogService {
  getArticles(params: GetArticlesParams = {}): GetArticlesResponse {
    const { page = 1, pageSize = 6, category = 'all' } = params;

    const filtered = category === 'all'
      ? allPosts
      : allPosts.filter(post => post.category === category);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginated = filtered.slice(startIndex, endIndex);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data: ArticleOverview[] = paginated.map(({ content, ...rest }) => rest);

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalItems: filtered.length,
        totalPages: Math.ceil(filtered.length / pageSize),
      },
    };
  }

  getArticleBySlug(slug: string): Article | null {
    return allPosts.find(post => post.slug === slug) || null;
  }

  getAllArticles(): Article[] {
    return allPosts;
  }
}
