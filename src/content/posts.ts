import matter from 'gray-matter';
import type { Article, ArticleOverview, ArticleCategory } from '../pages/blog/blog.types';

// Import all markdown files from posts directory
const postFiles = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

interface PostFrontmatter {
  title: string;
  date: string;
  category: Exclude<ArticleCategory, 'all'>;
  resume: string;
  cover_image: string;
}

function parsePost(filename: string, content: string): Article {
  const { data, content: markdownContent } = matter(content);
  const frontmatter = data as PostFrontmatter;

  // Extract slug from filename (e.g., './posts/my-article.md' -> 'my-article')
  const slug = filename.replace('./posts/', '').replace('.md', '');

  return {
    id: slug.hashCode(),
    slug,
    created_at: frontmatter.date,
    title: frontmatter.title,
    resume: frontmatter.resume,
    cover_image: frontmatter.cover_image,
    content: markdownContent.trim(),
    category: frontmatter.category,
  };
}

// Simple hash function for generating IDs
declare global {
  interface String {
    hashCode(): number;
  }
}

String.prototype.hashCode = function(): number {
  let hash = 0;
  for (let i = 0; i < this.length; i++) {
    const char = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// Parse all posts
const allPosts: Article[] = Object.entries(postFiles)
  .map(([filename, content]) => parsePost(filename, content))
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

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

export function getArticles(params: GetArticlesParams = {}): GetArticlesResponse {
  const { page = 1, pageSize = 6, category = 'all' } = params;

  // Filter by category
  const filtered = category === 'all'
    ? allPosts
    : allPosts.filter(post => post.category === category);

  // Paginate
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = filtered.slice(startIndex, endIndex);

  // Map to overview (exclude content)
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

export function getArticleBySlug(slug: string): Article | null {
  return allPosts.find(post => post.slug === slug) || null;
}

export function getAllArticles(): Article[] {
  return allPosts;
}
