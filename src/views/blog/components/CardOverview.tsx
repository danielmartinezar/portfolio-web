"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ArticleOverview } from '../../../features/blog/blog.types';

interface CardOverviewProps {
  article: ArticleOverview;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function CardOverview({ article }: CardOverviewProps) {
  const pathname = usePathname();
  const lang = pathname.startsWith('/es') ? 'es' : 'en';

  return (
    <Link
      href={`/${lang}/blog/${article.slug}`}
      className="block rounded-[10px] overflow-hidden bg-bg-secondary hover:scale-[1.02] transition-transform duration-300"
    >
      <img
        src={article.cover_image}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-fg-primary font-semibold text-base leading-tight line-clamp-2">
          {article.title}
        </h3>
        <p className="text-fg-secondary text-sm leading-normal line-clamp-3">
          {article.resume}
        </p>
        <span className="text-fg-secondary text-xs mt-1">
          {formatDate(article.created_at)}
        </span>
      </div>
    </Link>
  );
}
