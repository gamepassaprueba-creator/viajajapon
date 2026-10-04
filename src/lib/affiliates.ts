/**
 * Registro CENTRAL de afiliados. Única fuente de verdad para los enlaces que monetizan.
 *
 * Cómo funciona:
 *  - Cada partner tiene un `fallback`: la URL canónica (página de Japón cuando existe).
 *    Si AÚN no tienes enlace de afiliado, el enlace funciona pero NO paga.
 *  - Si un partner tiene un enlace público de afiliado ya validado, puede declararse como
 *    `trackedDefault`. Una variable de entorno AFF_* sigue teniendo prioridad para permitir
 *    rotar/cambiar el tracking sin tocar contenido.
 *  - En cuanto haya un enlace de tracking real (env o `trackedDefault`), TODAS las cajas de
 *    ese partner en toda la web pasan a monetizar de golpe. No hay que tocar el contenido.
 *  - Las páginas son estáticas (SSG): los valores se "hornean" en el build, así que tras
 *    cambiar una env hay que reconstruir/redesplegar para que el enlace cambie.
 *
 * IMPORTANTE (JR Pass): el tracking de `jrpass` (AFF_JRPASS) es de un REVENDEDOR con programa
 * de afiliados. Mientras no haya tracking, el fallback es la web OFICIAL japanrailpass.net:
 * es la opción más barata para el lector y la única que se puede etiquetar como "oficial".
 */

export type PartnerKey =
  | "civitatis"
  | "klook"
  | "iati"
  | "heymondo"
  | "holafly"
  | "airalo"
  | "skyscanner"
  | "jrpass"
  | "revolut"
  | "booking"
  | "getyourguide";

interface Partner {
  /** Nombre visible del partner. */
  name: string;
  /** Programa/red de afiliación (de dónde sacas el enlace de tracking). */
  network: string;
  /** URL canónica de respaldo (funciona aunque no haya tracking; idealmente página de Japón). */
  fallback: string;
  /** Enlace público de tracking validado para usar por defecto si existe. */
  trackedDefault?: string;
  /** Nombre de la variable de entorno con el enlace de tracking COMPLETO. */
  env: string;
}

const PARTNERS: Record<PartnerKey, Partner> = {
  civitatis: {
    name: "Civitatis",
    network: "Civitatis Afiliados",
    fallback: "https://www.civitatis.com/es/japon/",
    env: "AFF_CIVITATIS",
  },
  klook: {
    name: "Klook",
    network: "Klook Affiliate (Impact/Partnerize)",
    fallback: "https://www.klook.com/es/",
    env: "AFF_KLOOK",
  },
  iati: {
    name: "IATI Seguros",
    network: "IATI Afiliados",
    fallback: "https://www.iatiseguros.com/",
    trackedDefault: "https://www.iatiseguros.com?r=68646352149966",
    env: "AFF_IATI",
  },
  heymondo: {
    name: "Heymondo",
    network: "Heymondo Afiliados",
    fallback: "https://heymondo.es/",
    env: "AFF_HEYMONDO",
  },
  holafly: {
    name: "Holafly",
    network: "Holafly Affiliates",
    fallback: "https://esim.holafly.com/",
    env: "AFF_HOLAFLY",
  },
  airalo: {
    name: "Airalo",
    network: "Airalo Affiliate (Partnerize)",
    fallback: "https://www.airalo.com/japan-esim",
    env: "AFF_AIRALO",
  },
  skyscanner: {
    name: "Skyscanner",
    network: "Skyscanner Partners",
    fallback: "https://www.skyscanner.es/",
    env: "AFF_SKYSCANNER",
  },
  jrpass: {
    // Con AFF_JRPASS → revendedor con afiliación. Sin él → web oficial (no paga, pero es
    // la más barata desde la subida de oct-2026 de los Exchange Orders y es "oficial" de verdad).
    name: "JRPass.com",
    network: "JRPass.com Affiliate",
    fallback: "https://japanrailpass.net/es/",
    env: "AFF_JRPASS",
  },
  revolut: {
    name: "Revolut",
    network: "Revolut Affiliate",
    fallback: "https://www.revolut.com/",
    env: "AFF_REVOLUT",
  },
  // Preparados para activar en cuanto haya IDs reales (ver auditoría, sección Monetización):
  // hoy Civitatis es el único partner de alojamiento/actividades, sin cubrir hoteles (Booking)
  // ni el inventario más amplio de tours (GetYourGuide).
  booking: {
    name: "Booking.com",
    network: "Booking.com Partner Program",
    fallback: "https://www.booking.com/country/jp.html",
    env: "AFF_BOOKING",
  },
  getyourguide: {
    name: "GetYourGuide",
    network: "GetYourGuide Affiliate",
    fallback: "https://www.getyourguide.com/japon-l117/",
    env: "AFF_GETYOURGUIDE",
  },
};

/** Devuelve el enlace de afiliado real si está configurado; si no, la URL canónica. */
export function affiliateUrl(partner: PartnerKey): string {
  const p = PARTNERS[partner];
  if (!p) return "https://viajajapon.com"; // partner desconocido: nunca romper el render
  const tracked = process.env[p.env]?.trim();
  return tracked && tracked.length > 0 ? tracked : p.trackedDefault ?? p.fallback;
}

/** ¿Hay enlace de tracking real configurado para este partner? (útil para avisos en dev/GA4). */
export function isMonetized(partner: PartnerKey): boolean {
  const p = PARTNERS[partner];
  if (!p) return false; // partner desconocido (errata en MDX): nunca romper el build
  const tracked = process.env[p.env]?.trim();
  return !!((tracked && tracked.length > 0) || p.trackedDefault);
}

/**
 * ¿Este href es un enlace de tracking de afiliado configurado? Lo usan los enlaces sueltos
 * del MDX para decidir si van con rel="sponsored": solo los que pagan, no las fuentes
 * oficiales ni las webs comerciales sin tracking.
 */
export function isTrackedAffiliateHref(href: string): boolean {
  return (Object.keys(PARTNERS) as PartnerKey[]).some((key) => {
    if (!isMonetized(key)) return false;
    const tracked = affiliateUrl(key);
    return href === tracked || href.startsWith(tracked);
  });
}

export function partnerName(partner: PartnerKey): string {
  return PARTNERS[partner]?.name ?? partner;
}

export function partnerNetwork(partner: PartnerKey): string {
  return PARTNERS[partner].network;
}
