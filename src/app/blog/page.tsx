import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Noticias y novedades para viajar a Japón",
  description:
    "Últimas noticias para tu viaje a Japón: cambio del yen, festivales, reservas y consejos actualizados de 2026.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const posts = getArticles("blog");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="kicker text-primary">Noticias</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Noticias y novedades de Japón</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">
        Actualidad útil para tu viaje: cambio del yen, festivales, reservas y cambios de última hora — con datos
        verificados y de 2026.
      </p>
      {posts.length === 0 ? (
        <p className="mt-8 text-fg-muted">Pronto publicaremos las primeras noticias.</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <ArticleCard
              key={p.slug}
              href={`/blog/${p.slug}`}
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
