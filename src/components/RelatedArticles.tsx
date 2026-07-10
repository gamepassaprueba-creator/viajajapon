import { getArticle } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

export interface RelatedArticle {
  pillar: string;
  slug: string;
}

export interface RelatedArticlesProps {
  articles: RelatedArticle[];
  title?: string;
}

/**
 * Componente para mostrar artículos relacionados al final de un post.
 * Útil para internal linking y mejorar SEO.
 *
 * @example
 * <RelatedArticles
 *   title="Artículos relacionados"
 *   articles={[
 *     { pillar: "logistica", slug: "jr-pass-2026" },
 *     { pillar: "destinos", slug: "que-ver-en-tokio" },
 *   ]}
 * />
 */
export function RelatedArticles({ articles, title = "Artículos relacionados" }: RelatedArticlesProps) {
  const validArticles = articles
    .map(({ pillar, slug }) => {
      const article = getArticle(pillar, slug);
      return article ? { ...article, pillar, slug } : null;
    })
    .filter((a): a is NonNullable<typeof a> => a !== null);

  if (validArticles.length === 0) return null;

  return (
    <section className="not-prose my-12 border-t-[3px] border-[#0a0a0a] pt-8">
      <h2 className="mb-6 text-2xl font-black text-[#0a0a0a]">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {validArticles.map(({ pillar, slug, meta }) => (
          <ArticleCard
            key={slug}
            href={`/${pillar}/${slug}`}
            kicker={meta.kicker || pillar}
            title={meta.title}
            excerpt={meta.excerpt}
            date={meta.datePublished}
          />
        ))}
      </div>
    </section>
  );
}
