import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";
import { getArticle, getArticles, readingMinutes } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";

interface PillarConfig {
  basePath: string; // "/blog" | "/logistica"
  crumbName: string; // nombre en el breadcrumb
  back?: { href: string; label: string }; // enlace "volver" opcional
  dateMode: "updated" | "published"; // cómo se muestra la línea de fecha
}

const PILLARS: Record<string, PillarConfig> = {
  blog: {
    basePath: "/blog",
    crumbName: "Noticias",
    back: { href: "/blog", label: "← Noticias" },
    dateMode: "published",
  },
  logistica: {
    basePath: "/logistica",
    crumbName: "Consejos prácticos",
    dateMode: "updated",
  },
  itinerarios: {
    basePath: "/itinerarios",
    crumbName: "Itinerarios",
    dateMode: "updated",
  },
  gastronomia: {
    basePath: "/gastronomia",
    crumbName: "Gastronomía",
    dateMode: "updated",
  },
  destinos: {
    basePath: "/destinos",
    crumbName: "Destinos",
    dateMode: "updated",
  },
  cultura: {
    basePath: "/cultura",
    crumbName: "Cultura",
    dateMode: "updated",
  },
};

/** Metadata compartida para una página de artículo (incluye noindex si es borrador). */
export function articleMetadata(pillar: string, slug: string): Metadata {
  const cfg = PILLARS[pillar];
  const article = getArticle(pillar, slug);
  if (!article || !cfg) return {};
  const { meta } = article;
  const url = `${cfg.basePath}/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: meta.title, description: meta.description },
    // Borradores: visibles en la URL para previsualizar, pero NO indexables (puerta humana).
    ...(meta.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Renderiza un artículo completo (cabecera + MDX + JSON-LD Article/Breadcrumb). */
export function Article({ pillar, slug }: { pillar: string; slug: string }) {
  const cfg = PILLARS[pillar];
  const article = getArticle(pillar, slug);
  if (!article || !cfg) notFound();
  const { meta, content } = article;
  const url = `${cfg.basePath}/${slug}`;
  // Hermanos publicados del mismo pilar (excluye borradores y el actual) para interlinking.
  const related = getArticles(pillar)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {cfg.back && (
        <Link href={cfg.back.href} className="text-sm font-medium text-primary hover:underline">
          {cfg.back.label}
        </Link>
      )}
      {meta.draft && (
        <p className="mt-4 rounded-md bg-muted px-3 py-2 text-xs font-medium text-fg-muted">
          Borrador · no indexado. Revisa los datos y añade tu experiencia antes de publicar (draft: false).
        </p>
      )}
      <p className={`kicker text-primary ${cfg.back || meta.draft ? "mt-4" : ""}`}>{meta.kicker}</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{meta.title}</h1>
      <p className="nums mt-3 text-sm text-fg-muted">
        {cfg.dateMode === "updated"
          ? `Última actualización: ${formatDate(meta.dateModified)}`
          : `${formatDate(meta.dateModified)} · ${readingMinutes(content)} min de lectura`}
      </p>
      <div className="mt-6">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold">Sigue leyendo</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`${cfg.basePath}/${a.slug}`}
                  className="flex h-full flex-col rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary"
                >
                  <span className="kicker text-primary">{a.kicker}</span>
                  <span className="mt-1 font-medium text-fg">{a.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <JsonLd
        data={[
          articleLd({
            title: meta.title,
            description: meta.description,
            slug: url,
            datePublished: meta.datePublished,
            dateModified: meta.dateModified,
          }),
          breadcrumbLd([
            { name: "Inicio", url: "/" },
            { name: cfg.crumbName, url: cfg.basePath },
            { name: meta.title, url },
          ]),
        ]}
      />
    </article>
  );
}
