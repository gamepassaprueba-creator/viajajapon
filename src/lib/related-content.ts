import related from "@/data/related-content.json";

/**
 * Relaciones editoriales entre guías: "pilar/slug" → ["pilar/slug", ...].
 * Alimentan "Sigue leyendo" (solo hermanos del mismo pilar) y "Descubre más" (otros pilares)
 * en Article.tsx y CrossPillarLinks.tsx. El mapa vive en src/data/related-content.json y
 * scripts/generate-content-manifest.mjs lo valida en cada build (claves y destinos existentes,
 * sin autoenlaces). Regla de redacción: 3-5 por guía, al menos 2 del mismo pilar y 1 de otro.
 */
export const RELATED_CONTENT: Record<string, string[]> = related;

export function contentKey(pillar: string, slug: string): string {
  return `${pillar}/${slug}`;
}
