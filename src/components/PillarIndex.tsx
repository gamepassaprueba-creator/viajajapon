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
  const posts = getArticles(pillar);
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

/**
 * Índice de pilar auto-mantenible: si hay artículos publicados los lista; si no, muestra
 * el mensaje "vuelve pronto". La indexación (noindex) la decide cada página con pillarHasContent.
 */
export function PillarIndex({
  pillar,
  kicker = "Pilar",
  title,
  intro,
  emptyMessage = "Estamos publicando estas guías; vuelve pronto.",
}: {
  pillar: string;
  kicker?: string;
  title: string;
  intro: string;
  emptyMessage?: string;
}) {
  const posts = getArticles(pillar);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="kicker text-primary">{kicker}</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</p>
      {posts.length === 0 ? (
        <p className="mt-8 text-fg-muted">{emptyMessage}</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
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
    </div>
  );
}
