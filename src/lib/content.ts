import { allArticlesMeta } from "@/generated/content-manifest";

export interface ArticleMeta {
  title: string;
  seoTitle?: string;
  description: string;
  kicker: string;
  pillar: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  excerpt: string;
  hero?: string;
  heroCredito?: string;
  heroAlt?: string;
  draft?: boolean;
  readingMinutes?: number;
}

export function getArticleSlugs(pillar: string): string[] {
  return allArticlesMeta
    .filter((a) => a.pillar === pillar)
    .map((a) => a.slug);
}

export async function getArticle(pillar: string, slug: string): Promise<{ meta: ArticleMeta; content: string } | null> {
  const meta = allArticlesMeta.find((a) => a.pillar === pillar && a.slug === slug);
  if (!meta) return null;
  
  try {
    const mod = await import(`@/generated/content/${pillar}/${slug}.ts`);
    return { meta, content: mod.content };
  } catch (e) {
    console.error(`Error loading content for ${pillar}/${slug}:`, e);
    return null;
  }
}

export function getArticles(pillar: string): ArticleMeta[] {
  return allArticlesMeta
    .filter((a) => a.pillar === pillar && !a.draft)
    .sort((a, b) => (a.dateModified < b.dateModified ? 1 : -1));
}

/** Todos los artículos publicados de todos los pilares, de más reciente a más antiguo.
 *  Para el hub editorial (/blog), el feed y la búsqueda. */
export function getAllArticles(): ArticleMeta[] {
  return allArticlesMeta
    .filter((a) => !a.draft)
    .sort((a, b) => (a.dateModified < b.dateModified ? 1 : -1));
}

/** Slugs publicados (excluye borradores). Para generateStaticParams + feed. */
export function getPublishedSlugs(pillar: string): string[] {
  return allArticlesMeta
    .filter((a) => a.pillar === pillar && !a.draft)
    .map((a) => a.slug);
}

export interface ItineraryStep {
  day: number;
  title: string;
  city: string;
  text: string;
}

/**
 * Extrae los días de un itinerario a partir del markdown crudo (no del árbol MDX ya
 * compilado: <ItineraryDay> recibe sus hijos como nodos React, no como texto). Los 4
 * artículos de content/itinerarios/ usan <ItineraryDay dia={N} titulo="..." ciudad="...">
 * con el mismo orden de atributos, así que una regex tolerante es suficiente. Se usa
 * para construir el schema.org HowTo de cada itinerario (src/lib/jsonld.ts).
 */
export function extractItinerarySteps(content: string): ItineraryStep[] {
  const re = /<ItineraryDay\s+dia=\{(\d+)\}\s+titulo="([^"]+)"\s+ciudad="([^"]+)"[^>]*>([\s\S]*?)<\/ItineraryDay>/g;
  const steps: ItineraryStep[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(content))) {
    const [, dia, titulo, ciudad, body] = match;
    const text = body
      .replace(/<[^>]+>/g, " ") // componentes anidados (Foto, InfoBox…)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // enlaces markdown → solo el texto visible
      .replace(/[*_`#]/g, "") // énfasis/markdown restante
      .replace(/\s+/g, " ")
      .trim();
    steps.push({ day: Number(dia), title: titulo, city: ciudad, text });
  }
  return steps.sort((a, b) => a.day - b.day);
}

