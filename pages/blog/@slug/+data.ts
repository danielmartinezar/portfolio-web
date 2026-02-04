import type { PageContextServer } from "vike/types";
import { blogService } from "../../../src/pages/blog/services";

export type Data = {
  title: string;
  resume: string;
  cover_image: string;
  slug: string;
};

export function data(pageContext: PageContextServer) {
  const { slug } = pageContext.routeParams;
  const article = blogService.getArticleBySlug(slug);

  if (!article) {
    return { title: "", resume: "", cover_image: "", slug };
  }

  return {
    title: article.title,
    resume: article.resume,
    cover_image: article.cover_image,
    slug: article.slug,
  };
}
