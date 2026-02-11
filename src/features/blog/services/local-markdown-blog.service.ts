import fs from 'fs';
import path from 'path';
import type { Article, ArticleOverview } from '../blog.types';
import type { IBlogService, GetArticlesParams, GetArticlesResponse } from './types';
import { parsePost } from './helpers';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

function loadAllPosts(): Article[] {
  const filenames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));

  return filenames
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const content = fs.readFileSync(filePath, 'utf-8');
      return parsePost(filename, content);
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

let cachedPosts: Article[] | null = null;

function getAllPosts(): Article[] {
  if (!cachedPosts) {
    cachedPosts = loadAllPosts();
  }
  return cachedPosts;
}

export class LocalMarkdownBlogService implements IBlogService {
  getArticles(params: GetArticlesParams = {}): GetArticlesResponse {
    const { page = 1, pageSize = 6, category = 'all' } = params;
    const allPosts = getAllPosts();

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
    return getAllPosts().find(post => post.slug === slug) || null;
  }

  getAllArticles(): Article[] {
    return getAllPosts();
  }
}
