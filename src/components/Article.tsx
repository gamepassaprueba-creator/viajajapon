import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx";
import { getArticle, getArticles, readingMinutes } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { articleLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
    crumbName: "Consejos", // alineado con src/lib/categorias.ts (antes decía "Consejos prácticos")
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
  // Imagen social: el hero del artículo si lo tiene, si no la portada por defecto.
  const ogImage = meta.hero ?? "/images/hero-fuji.jpg";
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.title,
      description: meta.description,
      images: [{ url: ogImage, alt: meta.title }],
      publishedTime: meta.datePublished,
      modifiedTime: meta.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    // Borradores: visibles en la URL para previsualizar, pero NO indexables (puerta humana).
    ...(meta.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Renderiza un artículo completo (cabecera + MDX + JSON-LD Article/Breadcrumb). */
export function Article({
  pillar,
  slug,
  extraJsonLd = [],
}: {
  pillar: string;
  slug: string;
  /** JSON-LD adicional específico de la página que lo renderiza (p. ej. HowTo en itinerarios). */
  extraJsonLd?: object[];
}) {
  const cfg = PILLARS[pillar];
  const article = getArticle(pillar, slug);
  if (!article || !cfg) notFound();
  const { meta, content } = article;
  const url = `${cfg.basePath}/${slug}`;
  const crumbs = [
    { name: "Inicio", href: "/" },
    { name: cfg.crumbName, href: cfg.basePath },
    { name: meta.title, href: url },
  ];
  // Hermanos publicados del mismo pilar (excluye borradores y el actual) para interlinking.
  const related = getArticles(pillar)
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const dateLine =
    cfg.dateMode === "updated"
      ? `Última actualización: ${formatDate(meta.dateModified)}`
      : `${formatDate(meta.dateModified)} · ${readingMinutes(content)} min de lectura`;

  return (
    <article>
      {/* Hero a sangre completa con overlay (lenguaje visual de los mockups) */}
      {meta.hero ? (
        <header className="relative">
          <Image src={meta.hero} alt={meta.heroAlt ?? meta.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
          <div className="relative mx-auto flex min-h-[420px] max-w-5xl flex-col justify-end px-4 pb-12 pt-32 sm:min-h-[500px]">
            <Breadcrumbs items={crumbs} variant="onDark" />
            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              {meta.title}
            </h1>
            {meta.excerpt && <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/90">{meta.excerpt}</p>}
            <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/75">
              <Image src="/avatares/hijo.webp" alt="" width={28} height={28} className="rounded-full ring-1 ring-white/30" />
              <span>
                por{" "}
                <Link href="/sobre-nosotros" className="font-medium text-white/90 underline-offset-2 hover:underline">
                  {SITE.author.name}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <span className="nums">{dateLine}</span>
            </div>
          </div>
          {meta.heroCredito && (
            <span className="absolute bottom-1.5 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[11px] leading-none text-white/90">
              Foto: {meta.heroCredito}
            </span>
          )}
        </header>
      ) : (
        <header className="mx-auto max-w-3xl px-4 pt-12">
          <Breadcrumbs items={crumbs} variant="onLight" />
          {cfg.back && (
            <Link href={cfg.back.href} className="mt-4 block text-sm font-medium text-primary hover:underline">
              {cfg.back.label}
            </Link>
          )}
          <p className="kicker mt-4 text-primary">{meta.kicker}</p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{meta.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-fg-muted">
            <Image src="/avatares/hijo.webp" alt="" width={24} height={24} className="rounded-full ring-1 ring-border" />
            <span>
              por{" "}
              <Link href="/sobre-nosotros" className="font-medium text-fg underline-offset-2 hover:underline">
                {SITE.author.name}
              </Link>
            </span>
            <span aria-hidden="true">·</span>
            <span className="nums">{dateLine}</span>
          </div>
        </header>
      )}

      <div className="mx-auto max-w-3xl px-4 py-10">
      {meta.draft && (
        <p className="mb-6 rounded-md bg-muted px-3 py-2 text-xs font-medium text-fg-muted">
          Borrador · no indexado. Revisa los datos y añade tu experiencia antes de publicar (draft: false).
        </p>
      )}
        {/* remark-gfm: tablas, tachado y autolinks GFM (sin él, las tablas markdown
            salen como texto plano con pipes). blockJS:false — nuestro MDX es contenido
            propio del repo (no remoto), y los componentes ricos (KeyFacts/Steps/FAQ/Toc)
            reciben sus datos como expresiones en atributos, que la v6 elimina por defecto.
            blockDangerousJS sigue activo. */}
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
        />
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
            image: meta.hero ?? "/images/hero-fuji.jpg",
          }),
          ...extraJsonLd,
        ]}
      />
    </article>
  );
}
