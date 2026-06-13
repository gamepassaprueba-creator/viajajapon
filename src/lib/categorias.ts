/** Configuración de categorías del hub editorial. Mapea cada pilar (carpeta de
 *  content/) a su etiqueta legible, ruta base, color de chip y descripción.
 *  Las clases Tailwind son literales (no construidas) para que el purge no las elimine. */
export interface Categoria {
  pillar: string;
  label: string;
  basePath: string;
  badge: string; // clases del badge de categoría
  desc: string;
  icon: string; // nombre de icono RemixIcon (ri-...)
}

export const CATEGORIAS: Categoria[] = [
  { pillar: "destinos", label: "Destinos", basePath: "/destinos", badge: "bg-blue-100 text-blue-800", desc: "Qué ver en cada ciudad y región", icon: "ri-map-pin-line" },
  { pillar: "gastronomia", label: "Gastronomía", basePath: "/gastronomia", badge: "bg-green-100 text-green-800", desc: "Qué comer, dónde y cómo pedirlo", icon: "ri-restaurant-line" },
  { pillar: "cultura", label: "Cultura", basePath: "/cultura", badge: "bg-purple-100 text-purple-800", desc: "Tradiciones, onsen, etiqueta y ocio", icon: "ri-temple-line" },
  { pillar: "itinerarios", label: "Itinerarios", basePath: "/itinerarios", badge: "bg-rose-100 text-rose-800", desc: "Rutas día a día según tus días", icon: "ri-route-line" },
  { pillar: "logistica", label: "Consejos", basePath: "/logistica", badge: "bg-amber-100 text-amber-800", desc: "JR Pass, dinero, visado y logística", icon: "ri-lightbulb-line" },
  { pillar: "blog", label: "Noticias", basePath: "/blog", badge: "bg-gray-200 text-gray-700", desc: "Actualidad y novedades de 2026", icon: "ri-newspaper-line" },
];

const BY_PILLAR: Record<string, Categoria> = Object.fromEntries(CATEGORIAS.map((c) => [c.pillar, c]));

export function categoriaDe(pillar: string): Categoria {
  return BY_PILLAR[pillar] ?? CATEGORIAS[CATEGORIAS.length - 1];
}
