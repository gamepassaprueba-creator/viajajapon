import type { Metadata } from "next";
import { getArticle, getArticleSlugs, extractItinerarySteps } from "@/lib/content";
import { Article, articleMetadata } from "@/components/Article";
import { howToLd, breadcrumbLd } from "@/lib/jsonld";

const PILLAR = "itinerarios";

export function generateStaticParams() {
  return getArticleSlugs(PILLAR).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return await articleMetadata(PILLAR, slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(PILLAR, slug);
  const steps = article ? extractItinerarySteps(article.content) : [];
  const extraJsonLd = article
    ? [
        breadcrumbLd([
          { name: "Inicio", url: "/" },
          { name: "Itinerarios", url: "/itinerarios" },
          { name: article.meta.title, url: `/${PILLAR}/${slug}` },
        ]),
        ...(steps.length > 0
          ? [
              howToLd({
                name: article.meta.title,
                description: article.meta.description,
                steps: steps.map((s) => ({ name: `Día ${s.day} · ${s.title} (${s.city})`, text: s.text })),
              }),
            ]
          : []),
      ]
    : [];
  return <Article pillar={PILLAR} slug={slug} extraJsonLd={extraJsonLd} />;
}
