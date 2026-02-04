import type { PageContext } from "vike/types";
import { blogService } from "../../../src/pages/blog/services";

export function title(pageContext: PageContext) {
  const { slug } = pageContext.routeParams;
  const article = blogService.getArticleBySlug(slug);
  return article ? `${article.title} | Daniel Martinez` : "Article Not Found";
}
