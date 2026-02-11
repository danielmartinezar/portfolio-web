import type { Article, ArticleCategory } from '../blog.types';

export interface PostFrontmatter {
  title: string;
  date: string;
  category: Exclude<ArticleCategory, 'all'>;
  resume: string;
  cover_image: string;
}

export function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = value;
  }

  return { data, content: match[2] };
}

export function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function parsePost(_filename: string, raw: string): Article {
  const { data, content } = parseFrontmatter(raw);
  const frontmatter = data as unknown as PostFrontmatter;

  const slug = slugify(frontmatter.title);

  return {
    id: hashCode(slug),
    slug,
    created_at: frontmatter.date,
    title: frontmatter.title,
    resume: frontmatter.resume,
    cover_image: frontmatter.cover_image,
    content: content.trim(),
    category: frontmatter.category,
  };
}
