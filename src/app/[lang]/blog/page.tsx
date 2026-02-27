import type { Metadata } from "next";
import { blogService } from "../../../features/blog/services";
import type { ArticleOverview } from "../../../features/blog/blog.types";
import Blog from "../../../views/blog/blog";

export const metadata: Metadata = {
  title: "Blog | Daniel Martinez",
};

export default function Page() {
  const allArticles: ArticleOverview[] = blogService
    .getAllArticles()
    .map((article) => ({
      id: article.id,
      slug: article.slug,
      created_at: article.created_at,
      title: article.title,
      resume: article.resume,
      cover_image: article.cover_image,
      category: article.category,
    }));

  return <Blog allArticles={allArticles} />;
}
