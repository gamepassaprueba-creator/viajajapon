import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

/** ¿El pilar tiene algún artículo publicado? (para decidir indexación y sitemap). */
export function pillarHasContent(pillar: string): boolean {
  return getArticles(pillar).length > 0;
}

/**
 * Listado de artículos publicados de un pilar (sin h1): para incrustar como sección
 * dentro de las landings de sección. Auto-mantenible: lista lo publicado o muestra
 * el mensaje de "en preparación".
 */
export function PillarArticles({
  pillar,
  heading = "Todas las guías",
  emptyMessage = "Estamos publicando estas guías; vuelve pronto.",
}: {
  pillar: string;
  heading?: string;
  emptyMessage?: string;
}) {
  // Orden editorial (frontmatter `orden`) y, a igualdad, la más reciente. getArticles no cambia:
  // lo usan el sitemap, el feed y /blog, que sí deben ir por fecha.
  const posts = [...getArticles(pillar)].sort(
    (a, b) => (a.orden ?? 999) - (b.orden ?? 999) || (a.dateModified < b.dateModified ? 1 : -1),
  );
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h2 className="text-balance text-3xl font-bold">{heading}</h2>
      {posts.length === 0 ? (
        <p className="mt-6 text-fg-muted">{emptyMessage}</p>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <ArticleCard
              key={p.slug}
              href={`/${pillar}/${p.slug}`}
              kicker={p.kicker}
              title={p.title}
              excerpt={p.excerpt}
              date={`${formatDate(p.dateModified)}${p.readingMinutes ? ` · ${p.readingMinutes} min` : ""}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
