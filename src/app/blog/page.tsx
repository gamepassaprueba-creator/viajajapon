import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogHub, type HubItem } from "@/components/BlogHub";
import { CATEGORIAS, categoriaDe } from "@/lib/categorias";
import { getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Blog: guías y noticias para viajar a Japón",
  description:
    "El hub de contenido de ViajaJapón: guías de destinos, gastronomía, cultura, itinerarios y consejos prácticos, más las novedades de 2026. Filtra por categoría y empieza a planear.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  const articles = getAllArticles();

  const items: HubItem[] = articles.map((a) => {
    const cat = categoriaDe(a.pillar);
    return {
      href: `${cat.basePath}/${a.slug}`,
      pillar: a.pillar,
      category: cat.label,
      badge: cat.badge,
      title: a.title,
      excerpt: a.excerpt,
      hero: a.hero,
      date: formatDate(a.dateModified),
      readingMinutes: a.readingMinutes,
    };
  });

  const featured = items[0]; // el más reciente de todo el sitio
  const counts = Object.fromEntries(
    CATEGORIAS.map((c) => [c.pillar, articles.filter((a) => a.pillar === c.pillar).length]),
  );

  return (
    <div>
      {/* Hero contenido con buscador */}
      <section className="border-b-[3px] border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center sm:py-16">
          <Breadcrumbs items={[{ name: "Inicio", href: "/" }, { name: "Blog", href: "/blog" }]} className="mb-4 justify-center" />
          <p className="kicker text-[#e1352e]">Blog</p>
          <h1 className="display-md mt-2 text-3xl text-[#0a0a0a] sm:text-5xl">Blog de viajes a Japón</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#555] sm:text-lg">
            Guías de destinos, gastronomía, cultura, itinerarios y consejos. Con datos verificados y experiencia real.
          </p>
          <form action="/buscar" method="get" className="mx-auto mt-6 flex max-w-xl border-[2px] border-[#0a0a0a] focus-within:border-[#e1352e]">
            <label htmlFor="q" className="sr-only">Buscar en el blog</label>
            <input
              id="q" name="q" type="search"
              placeholder="Busca: Kioto, JR Pass, ramen, sakura…"
              className="flex-1 border-none bg-white px-4 py-3 text-[#0a0a0a] placeholder:text-[#999] outline-none"
            />
            <button type="submit" className="border-l-[2px] border-[#0a0a0a] bg-[#e1352e] px-5 py-3 font-mono text-xs font-black uppercase tracking-wide text-white hover:bg-[#b8271f]">
              Buscar
            </button>
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Artículo destacado */}
        {featured && (
          <Link
            href={featured.href}
            className="group mb-12 grid overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-primary hover:shadow-lg md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-auto md:min-h-[320px]">
              {featured.hero ? (
                <Image
                  src={featured.hero}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-surface">
                  <span className="font-serif text-2xl font-bold text-fg-muted/50">{featured.category}</span>
                </div>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                Destacado
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${featured.badge}`}>
                {featured.category}
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-fg group-hover:text-primary sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{featured.excerpt}</p>
              <p className="nums mt-4 text-xs text-fg-muted">
                {featured.date}
                {featured.readingMinutes ? ` · ${featured.readingMinutes} min de lectura` : ""}
              </p>
            </div>
          </Link>
        )}

        {/* Categorías con conteo real */}
        <h2 className="display-md text-xl text-[#0a0a0a]">Explora por categoría</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIAS.filter((c) => counts[c.pillar] > 0).map((c) => (
            <Link
              key={c.pillar}
              href={c.basePath}
              className="panel-manga-dark flex items-center justify-between bg-white p-4 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
            >
              <span>
                <span className="tag-manga">{c.label}</span>
                <span className="mt-2 block text-sm text-[#555]">{c.desc}</span>
              </span>
              <span className="nums shrink-0 pl-3 font-mono text-2xl font-black text-[#ccc]">{counts[c.pillar]}</span>
            </Link>
          ))}
        </div>

        {/* Grid filtrable con todo el contenido */}
        <h2 className="display-md mt-12 text-xl text-[#0a0a0a]">Todos los artículos</h2>
        <p className="mt-1 text-sm text-fg-muted">{items.length} guías y noticias, filtra por lo que te interese.</p>
        <div className="mt-6">
          <BlogHub items={items} />
        </div>
      </div>
    </div>
  );
}
