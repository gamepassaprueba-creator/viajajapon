import type { Metadata } from "next";
import { getArticle, getArticleSlugs } from "@/lib/content";
import { Article, articleMetadata } from "@/components/Article";
import { breadcrumbLd } from "@/lib/jsonld";

const PILLAR = "logistica";

export function generateStaticParams() {
  return getArticleSlugs(PILLAR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return articleMetadata(PILLAR, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(PILLAR, slug);
  const extraJsonLd = article
    ? [
        breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Consejos", url: "/logistica" },
          { name: article.meta.title, url: `/${PILLAR}/${slug}` },
        ]),
      ]
    : [];
  return <Article pillar={PILLAR} slug={slug} extraJsonLd={extraJsonLd} />;
}
