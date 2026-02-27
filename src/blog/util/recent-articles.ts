import { blogService } from '../../features/blog/services';
import type { ArticleOverview } from '../../features/blog/blog.types';

/**
 * Returns the N most recent articles sorted by date descending.
 * Articles are already sorted by date in the blog service.
 */
export function getRecentArticles(count = 3): ArticleOverview[] {
  return blogService
    .getAllArticles()
    .slice(0, count)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content, ...rest }) => rest);
}
