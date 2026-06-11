import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArticleMeta {
  title: string;
  description: string;
  kicker: string;
  pillar: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  excerpt: string;
  /** Imagen de cabecera opcional (ruta bajo /public, p. ej. "/images/kioto.jpg"). */
  hero?: string;
  /** Crédito del hero (obligatorio si la imagen es CC BY / CC BY-SA; se pinta sobre la foto). */
  heroCredito?: string;
  draft?: boolean;
  readingMinutes?: number;
}

export function getArticleSlugs(pillar: string): string[] {
  const dir = path.join(CONTENT_DIR, pillar);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getArticle(pillar: string, slug: string): { meta: ArticleMeta; content: string } | null {
  const file = path.join(CONTENT_DIR, pillar, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: { pillar, slug, ...(data as Omit<ArticleMeta, "pillar" | "slug">) }, content };
}

/** Minutos de lectura estimados (≈200 palabras/min). */
export function readingMinutes(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getArticles(pillar: string): ArticleMeta[] {
  const out: ArticleMeta[] = [];
  for (const slug of getArticleSlugs(pillar)) {
    const a = getArticle(pillar, slug);
    if (!a || a.meta.draft) continue;
    out.push({ ...a.meta, readingMinutes: readingMinutes(a.content) });
  }
  return out.sort((a, b) => (a.dateModified < b.dateModified ? 1 : -1));
}

/** Slugs publicados (excluye borradores). Para generateStaticParams + feed. */
export function getPublishedSlugs(pillar: string): string[] {
  return getArticleSlugs(pillar).filter((slug) => {
    const a = getArticle(pillar, slug);
    return !!a && !a.meta.draft;
  });
}
