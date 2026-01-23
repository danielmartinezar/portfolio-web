import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContentContainer } from "../../components/layout";
import { useTranslation } from "../../shared/services";
import {
  blogTranslationLoaders,
  type BlogPageTranslations,
} from "../../pages/blog/i18n";
import type { Article } from "../../pages/blog/types";
import type { IBlogServices } from "../../pages/blog/services/blog.services";

interface IBlogDetailProps {
  blogServices: IBlogServices;
}

export default function BlogDetail({ blogServices }: IBlogDetailProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation<BlogPageTranslations>(blogTranslationLoaders);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    blogServices
      .getArticleBySlug({ slug })
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [slug, blogServices]);

  if (!t || isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-bg-primary pt-8 pb-16">
        <ContentContainer>
          <p className="text-fg-secondary text-center py-12">
            {t.articleNotFound}
          </p>
          <button
            type="button"
            onClick={() => navigate("/blog")}
            className="text-fg-primary hover:text-primary transition-colors"
          >
            &larr; {t.backToBlog}
          </button>
        </ContentContainer>
      </div>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="min-h-screen bg-bg-primary pt-8 pb-16">
      <ContentContainer>
        <button
          type="button"
          onClick={() => navigate("/blog")}
          className="text-fg-primary hover:text-primary transition-colors mb-6 inline-block"
        >
          &larr; {t.backToBlog}
        </button>

        <img
          src={article.cover_image}
          alt={article.title}
          className="w-full max-h-[400px] object-cover rounded-[10px] mb-6"
        />

        <h1 className="text-fg-primary text-3xl md:text-4xl font-bold mb-2">
          {article.title}
        </h1>

        <span className="text-fg-secondary text-sm mb-8 block">
          {formattedDate}
        </span>

        <div
          className="prose prose-invert max-w-none text-fg-secondary prose-headings:text-fg-primary prose-a:text-primary prose-strong:text-fg-primary"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </ContentContainer>
    </div>
  );
}
