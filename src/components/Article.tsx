import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents, slugify } from "@/components/mdx";
import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { affiliateUrl, isMonetized } from "@/lib/affiliates";
import { getArticle, getArticles, type ArticleMeta } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { articleLd } from "@/lib/jsonld";
import { formatDate } from "@/lib/format";
import { SITE } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CrossPillarLinks } from "@/components/CrossPillarLinks";
import { RELATED_CONTENT, contentKey } from "@/lib/related-content";

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
export async function articleMetadata(pillar: string, slug: string): Promise<Metadata> {
  const cfg = PILLARS[pillar];
  const article = await getArticle(pillar, slug);
  if (!article || !cfg) return {};
  const { meta } = article;
  const url = `${cfg.basePath}/${slug}`;
  // Imagen social: el hero del artículo si lo tiene, si no la portada por defecto.
  const ogImage = meta.hero ?? "/images/hero-fuji.jpg";
  return {
    title: meta.seoTitle || meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: meta.seoTitle || meta.title,
      description: meta.description,
      images: [{ url: ogImage, alt: meta.title }],
      publishedTime: meta.datePublished,
      modifiedTime: meta.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.seoTitle || meta.title,
      description: meta.description,
      images: [ogImage],
    },
    // Borradores: visibles en la URL para previsualizar, pero NO indexables (puerta humana).
    ...(meta.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Índice de la guía a partir de sus `## ` (mismos ids que genera el h2 de mdx.tsx). */
function tocFromContent(content: string): { href: string; label: string }[] {
  return content
    .split(/\r?\n/)
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).trim())
    .map((label) => ({ href: `#${slugify(label)}`, label }));
}

const AUTHOR_TRIP = "viajó a Japón en dic. 2025";

/** Renderiza un artículo completo (cabecera + MDX + JSON-LD Article/Breadcrumb). */
export async function Article({
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
  const article = await getArticle(pillar, slug);
  if (!article || !cfg) notFound();
  const { meta, content } = article;
  const url = `${cfg.basePath}/${slug}`;
  const crumbs = [
    { name: "Inicio", href: "/" },
    { name: cfg.crumbName, href: cfg.basePath },
    { name: meta.title, href: url },
  ];

  // "Sigue leyendo" prioriza relaciones editoriales del mismo pilar. Si no hay
  // suficientes relaciones explícitas, completa con hermanos recientes para no
  // dejar huecos. Así evitamos que dateModified decida por sí sola el interlinking.
  const siblings = getArticles(pillar).filter((a) => a.slug !== slug);
  const currentKey = contentKey(pillar, slug);
  const siblingsByKey = new Map(
    siblings.map((a) => [contentKey(a.pillar, a.slug), a]),
  );
  const related: ArticleMeta[] = [];

  for (const key of RELATED_CONTENT[currentKey] ?? []) {
    const candidate = siblingsByKey.get(key);
    if (candidate && !related.some((a) => a.slug === candidate.slug)) {
      related.push(candidate);
    }
    if (related.length === 3) break;
  }

  if (related.length < 3) {
    for (const candidate of siblings) {
      if (!related.some((a) => a.slug === candidate.slug)) {
        related.push(candidate);
      }
      if (related.length === 3) break;
    }
  }

  const toc = tocFromContent(content);
  const iatiMonetized = isMonetized("iati");
  const showRelatedImages = related.length > 0 && related.every((a) => a.hero);

  return (
    <article>
      {/* CABECERA: migas, titular, firma con foto real del autor y fecha */}
      <header className="mx-auto max-w-[1180px] px-4 pt-8 sm:pt-10">
        <Breadcrumbs items={crumbs} variant="onLight" />
        {cfg.back && !meta.hero && (
          <Link href={cfg.back.href} className="mt-3 block text-sm font-medium text-primary hover:underline">
            {cfg.back.label}
          </Link>
        )}
        <p className="kicker mt-4 text-primary">{meta.kicker}</p>
        <h1 className="mt-2 max-w-4xl text-balance text-3xl font-black leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-4xl lg:text-[56px]">
          {meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-fg-muted">
          <span className="flex items-center gap-2.5">
            <Image
              src="/avatares/sergio.webp"
              alt={SITE.author.name}
              width={40}
              height={40}
              className="size-10 rounded-full border-[2px] border-[#0a0a0a] object-cover"
            />
            <span>
              Por{" "}
              <Link href="/sobre-nosotros" className="font-bold text-[#0a0a0a] underline-offset-2 hover:underline">
                {SITE.author.name}
              </Link>{" "}
              · {AUTHOR_TRIP}
            </span>
          </span>
          <span className="nums">
            {cfg.dateMode === "updated" ? "Actualizado el " : ""}
            {formatDate(meta.dateModified)}
          </span>
          {meta.readingMinutes ? <span className="nums">{meta.readingMinutes} min de lectura</span> : null}
          <Link href="/politica-editorial" className="flex items-center gap-1.5 font-medium text-[#0a0a0a] underline-offset-2 hover:underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12l5 5 9-10" />
            </svg>
            Cómo verificamos esta guía
          </Link>
        </div>
      </header>

      {/* RESPUESTA RÁPIDA + FOTO */}
      <section
        aria-label="Resumen de la guía"
        className={`mx-auto mt-6 grid max-w-[1180px] gap-6 px-4 ${meta.hero ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" : ""}`}
      >
        <div className="self-start border-[3px] border-[#0a0a0a] bg-white p-5 shadow-[6px_6px_0_#e1352e] sm:p-6">
          <p className="kicker text-primary">En 30 segundos</p>
          {meta.resumen && meta.resumen.length > 0 ? (
            <ul className="mt-3 list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-[#2b2b2b] sm:text-base">
              {meta.resumen.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#2b2b2b] sm:text-base">{meta.excerpt}</p>
          )}
          {toc.length > 0 && (
            <a href={toc[0].href} className="kicker mt-4 inline-block text-primary underline-offset-2 hover:underline">
              Empezar a leer ↓
            </a>
          )}
        </div>
        {meta.hero && (
          <figure className="relative m-0 min-h-[260px] overflow-hidden border-[3px] border-[#0a0a0a] sm:min-h-[340px]">
            <Image
              src={meta.hero}
              alt={meta.heroAlt ?? meta.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 640px"
              className="object-cover"
            />
            {meta.heroCredito && (
              <figcaption className="absolute bottom-2 right-2 bg-black/65 px-1.5 py-0.5 text-[11px] leading-none text-white/90">
                Foto: {meta.heroCredito}
              </figcaption>
            )}
          </figure>
        )}
      </section>

      {/* CUERPO + LATERAL (la barra lateral se muestra en xl; en móvil y tablet va todo en una columna) */}
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-10 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 lg:mx-auto lg:max-w-3xl xl:mx-0 xl:max-w-none">
          {meta.draft && (
            <p className="mb-6 border-[2px] border-[#0a0a0a] bg-[#f5f5f5] px-3 py-2 font-mono text-xs font-bold text-[#555]">
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

          {/* AUTORÍA Y TRANSPARENCIA */}
          <aside className="mt-12 flex flex-wrap items-center gap-4 border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-5" aria-label="Sobre el autor">
            <div className="flex shrink-0">
              <Image src="/avatares/sergio.webp" alt={SITE.author.name} width={64} height={64} className="size-16 rounded-full border-[2px] border-[#0a0a0a] object-cover" />
              <Image src="/avatares/madre-foto.webp" alt="Su madre, compañera de viaje" width={64} height={64} className="-ml-4 size-16 rounded-full border-[2px] border-[#0a0a0a] object-cover" />
            </div>
            <div className="min-w-0 flex-[1_1_320px] text-sm leading-relaxed text-fg-muted">
              <p className="text-base font-black text-[#0a0a0a]">{SITE.author.name}</p>
              <p className="mt-1">
                Vive en Madrid y recorrió Japón con su madre en diciembre de 2025: Tokio, Kioto, Osaka, Nara y más.
                Cuando contamos algo vivido lo señalamos como experiencia propia, y las fotos con la marca viajajapon.com son de ese
                viaje; los datos que cambian se contrastan antes de actualizar.{" "}
                <Link href="/sobre-nosotros" className="font-bold text-primary underline-offset-2 hover:underline">
                  Nuestro viaje
                </Link>{" "}
                ·{" "}
                <Link href="/politica-editorial" className="text-primary underline-offset-2 hover:underline">
                  Política editorial
                </Link>{" "}
                ·{" "}
                <Link href="/contacto" className="text-primary underline-offset-2 hover:underline">
                  Avísanos de un error
                </Link>
              </p>
            </div>
          </aside>
        </div>

        <aside className="hidden xl:block" aria-label="Herramientas de la guía">
          <div className="sticky top-24 flex flex-col gap-5">
            {toc.length > 1 && (
              <nav aria-label="En esta guía" className="border-[3px] border-[#0a0a0a] bg-white p-5">
                <p className="kicker text-fg-muted">En esta guía</p>
                <ul className="mt-3 flex max-h-[45vh] flex-col gap-2 overflow-y-auto pr-1 text-sm">
                  {toc.map((t) => (
                    <li key={t.href}>
                      <a href={t.href} className="font-medium text-[#0a0a0a] underline-offset-2 hover:text-primary hover:underline">
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="flex flex-col gap-3 border-[3px] border-[#0a0a0a] bg-[#0a0a0a] p-5 text-white">
              <p className="kicker text-white">Planifica tu viaje</p>
              <Link href="/herramientas/jr-pass-calculadora" className="flex justify-between font-bold text-white hover:text-[#ffb4b0]">
                ¿Me compensa el JR Pass? <span aria-hidden="true">→</span>
              </Link>
              <Link href="/logistica/cuanto-cuesta-viajar-japon" className="flex justify-between font-bold text-white hover:text-[#ffb4b0]">
                ¿Cuánto cuesta el viaje? <span aria-hidden="true">→</span>
              </Link>
              <Link href="/itinerarios" className="flex justify-between font-bold text-white hover:text-[#ffb4b0]">
                Itinerarios día a día <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="border-[3px] border-[#0a0a0a] bg-[#fff5f4] p-5">
              <p className="kicker text-primary">{iatiMonetized ? "Seguro de viaje · enlace de afiliado" : "Seguro de viaje"}</p>
              <p className="mt-1 font-black text-[#0a0a0a]">No viajes a Japón sin seguro médico</p>
              <p className="mt-1 text-sm text-fg-muted">La sanidad japonesa es excelente y cara para el visitante.</p>
              <TrackedAffiliateLink
                href={affiliateUrl("iati")}
                partner="iati"
                label="Ver seguros IATI"
                monetized={iatiMonetized}
                placement="article_sidebar"
                className="btn-primary mt-3 inline-block"
              />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t-[3px] border-[#0a0a0a] bg-[#f5f5f5]">
          <div className="mx-auto max-w-[1180px] px-4 py-10">
            <h2 className="display-md text-2xl text-[#0a0a0a]">Sigue leyendo</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`${cfg.basePath}/${a.slug}`}
                    className="flex h-full flex-col border-[3px] border-[#0a0a0a] bg-white transition-all hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    {showRelatedImages && a.hero && (
                      <span className="relative block h-36 border-b-[3px] border-[#0a0a0a]">
                        <Image src={a.hero} alt="" fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
                      </span>
                    )}
                    <span className="flex flex-col p-4">
                      <span className="kicker text-[#e1352e]">{a.kicker}</span>
                      <span className="mt-1 font-black text-[#0a0a0a]">{a.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CrossPillarLinks currentPillar={pillar} currentSlug={slug} />

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
