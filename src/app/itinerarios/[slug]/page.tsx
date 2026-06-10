import type { Metadata } from "next";
import { getArticleSlugs } from "@/lib/content";
import { Article, articleMetadata } from "@/components/Article";

const PILLAR = "itinerarios";

export function generateStaticParams() {
  return getArticleSlugs(PILLAR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata(PILLAR, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Article pillar={PILLAR} slug={slug} />;
}
