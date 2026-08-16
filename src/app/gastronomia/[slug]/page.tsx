import type { Metadata } from "next";
import { getArticle, getArticleSlugs } from "@/lib/content";
import { breadcrumbLd } from "@/lib/jsonld";
import { Article, articleMetadata } from "@/components/Article";

const PILLAR = "gastronomia";

const SERP_OVERRIDES: Record<string, Pick<Metadata, "title" | "description">> = {
  // Search Console: ~posición 7 con impresiones y prácticamente sin clics.
  // Mantiene el H1/contenido estable para aislar el experimento de CTR.
  "tipos-restaurantes-japon": {
    title: "Restaurantes en Japón: tipos, precios y cómo pedir (2026)",
    description:
      "Izakaya, ramen, sushi en cinta, yakiniku, kaiseki y más: qué restaurante elegir en Japón, cuánto cuesta y cómo pedir sin hablar japonés.",
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
