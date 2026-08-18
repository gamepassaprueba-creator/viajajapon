export const RELATED_CONTENT: Record<string, string[]> = {
  "cultura/geishas-y-maiko-japon": [
    "destinos/que-ver-en-kioto",
    "destinos/donde-dormir-en-kioto",
    "cultura/kimono",
  ],
  "destinos/que-ver-en-kioto": [
    "destinos/donde-dormir-en-kioto",
    "destinos/nara",
    "itinerarios/itinerario-japon-15-dias",
    "cultura/geishas-y-maiko-japon",
  ],
  "destinos/donde-dormir-en-kioto": [
    "destinos/que-ver-en-kioto",
    "destinos/donde-dormir-en-tokio",
    "destinos/nara",
    "itinerarios/itinerario-japon-15-dias",
    "itinerarios/itinerario-japon-1-mes",
  ],
  "cultura/festivales-de-japon": [
    "logistica/mejor-epoca-viajar-japon",
    "itinerarios/itinerario-japon-1-mes",
    "destinos/que-ver-en-kioto",
  ],
  "logistica/compras-y-tax-free-japon": [
    "logistica/como-pagar-en-japon",
    "logistica/cuanto-cuesta-viajar-japon",
    "logistica/suica-iphone",
    "itinerarios/itinerario-japon-1-mes",
  ],
  "logistica/como-pagar-en-japon": [
    "logistica/compras-y-tax-free-japon",
    "logistica/cuanto-cuesta-viajar-japon",
    "logistica/suica-iphone",
  ],
  "itinerarios/itinerario-japon-1-mes": [
    "itinerarios/itinerario-japon-15-dias",
    "itinerarios/itinerario-japon-10-dias",
    "logistica/compras-y-tax-free-japon",
    "logistica/jr-pass-2026",
    "destinos/donde-dormir-en-kioto",
  ],
  "itinerarios/itinerario-japon-15-dias": [
    "itinerarios/itinerario-japon-1-mes",
    "itinerarios/itinerario-japon-10-dias",
    "logistica/jr-pass-2026",
    "destinos/donde-dormir-en-kioto",
    "logistica/compras-y-tax-free-japon",
  ],
  "itinerarios/itinerario-japon-10-dias": [
    "itinerarios/itinerario-japon-15-dias",
    "itinerarios/itinerario-japon-1-mes",
    "itinerarios/itinerario-japon-7-dias",
    "destinos/donde-dormir-en-kioto",
  ],
  "itinerarios/itinerario-japon-7-dias": [
    "itinerarios/itinerario-japon-10-dias",
    "itinerarios/itinerario-japon-15-dias",
    "itinerarios/itinerario-japon-1-mes",
    "destinos/donde-dormir-en-kioto",
  ],
};

export function contentKey(pillar: string, slug: string): string {
  return `${pillar}/${slug}`;
}
