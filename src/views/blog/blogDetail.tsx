import { usePageContext } from "vike-react/usePageContext";
import { ContentContainer } from "../../components/layout";
import { MarkdownContent } from "./components/MarkdownContent";
import { useTranslation } from "../../shared/services";
import {
  blogTranslationLoaders,
  type BlogPageTranslations,
} from "../../pages/blog/i18n";
import { blogService } from "../../pages/blog/services";

export default function BlogDetail() {
  const { routeParams } = usePageContext();
  const slug = routeParams?.slug;
  const { t } = useTranslation<BlogPageTranslations>(blogTranslationLoaders);

  const article = slug ? blogService.getArticleBySlug(slug) : null;

  if (!t) {
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
          <a
            href="/blog"
            className="text-fg-primary hover:text-primary transition-colors"
          >
            &larr; {t.backToBlog}
          </a>
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
        <a
          href="/blog"
          className="text-fg-primary hover:text-primary transition-colors mb-6 inline-block"
        >
          &larr; {t.backToBlog}
        </a>

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

        <MarkdownContent content={article.content} />
      </ContentContainer>
    </div>
  );
}
