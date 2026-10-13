import type { Metadata } from "next";
import { getArticleSlugs } from "@/lib/content";
import { Article, articleMetadata } from "@/components/Article";

const PILLAR = "gastronomia";

// Overrides de snippet (title/description) para experimentos de CTR sin tocar el MDX.
// Historial: el experimento de tipos-restaurantes (ago-sep 2026: "izakaya, ramen, sushi y más")
// acercó su título al de que-comer-en-japon (que Google tenía sin indexar) y no trajo clics;
// se retiró el 2026-10-13 para que cada guía tenga un título claramente distinto.
const SERP_OVERRIDES: Record<string, { title: string; description: string }> = {};

export function generateStaticParams() {
  return getArticleSlugs(PILLAR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  // El override entra en articleMetadata para que también cambie Open Graph/Twitter.
  return await articleMetadata(PILLAR, slug, SERP_OVERRIDES[slug]);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // El BreadcrumbList JSON-LD lo emite <Breadcrumbs> dentro de <Article>.
  return <Article pillar={PILLAR} slug={slug} />;
}
