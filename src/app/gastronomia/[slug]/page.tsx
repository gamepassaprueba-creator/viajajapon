import type { Metadata } from "next";
import { getArticle, getArticleSlugs } from "@/lib/content";
import { breadcrumbLd } from "@/lib/jsonld";
import { Article, articleMetadata } from "@/components/Article";

const PILLAR = "gastronomia";

const SERP_OVERRIDES: Record<string, Pick<Metadata, "title" | "description">> = {
  // Experimento CTR v2 (2026-09-22).
  // V1 desde 2026-08-16: 67 -> 97 impresiones en ventanas limpias, posición ~6,6 estable y 0 clics.
  // Cambiamos solo el snippet; H1, URL y contenido permanecen estables para aislar el efecto.
  "tipos-restaurantes-japon": {
    title: "Tipos de restaurantes en Japón: izakaya, ramen, sushi y más",
    description:
      "Desde restaurantes tradicionales e izakayas hasta ramen-ya, sushi en cinta, yakiniku y kaiseki: qué tipo elegir, precios y cómo pedir en Japón.",
  },
};

export function generateStaticParams() {
  return getArticleSlugs(PILLAR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const base = await articleMetadata(PILLAR, slug);
  return { ...base, ...(SERP_OVERRIDES[slug] ?? {}) };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(PILLAR, slug);
  const extraJsonLd = article
    ? [
        breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Gastronomía", url: "/gastronomia" },
          { name: article.meta.title, url: `/${PILLAR}/${slug}` },
        ]),
      ]
    : [];
  return <Article pillar={PILLAR} slug={slug} extraJsonLd={extraJsonLd} />;
}
