/**
 * Registro CENTRAL de afiliados. Única fuente de verdad para los enlaces que monetizan.
 *
 * Cómo funciona:
 *  - Cada partner tiene un `fallback`: la URL canónica (página de Japón cuando existe).
 *    Si AÚN no tienes enlace de afiliado, el enlace funciona pero NO paga.
 *  - En cuanto pegues tu enlace de tracking COMPLETO en la variable de entorno
 *    correspondiente (ver `.env.example`), TODAS las cajas de ese partner en toda la web
 *    pasan a monetizar de golpe. No hay que tocar el contenido.
 *  - Las páginas son estáticas (SSG): el valor de la env se "hornea" en el build, así que
 *    tras editar `.env.local` hay que reconstruir/redesplegar para que el enlace cambie.
 *
 * IMPORTANTE (JR Pass): el partner `jrpass` apunta a un REVENDEDOR con programa de afiliados,
 * NO a japanrailpass.net (la web oficial paga 0€ en comisión).
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
  | "revolut";

interface Partner {
  /** Nombre visible del partner. */
  name: string;
  /** Programa/red de afiliación (de dónde sacas el enlace de tracking). */
  network: string;
  /** URL canónica de respaldo (funciona aunque no haya tracking; idealmente página de Japón). */
  fallback: string;
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
    // Revendedor con programa de afiliados (NO la web oficial japanrailpass.net, que paga 0€).
    name: "JRPass.com",
    network: "JRPass.com Affiliate",
    fallback: "https://www.jrpass.com/",
    env: "AFF_JRPASS",
  },
  revolut: {
    name: "Revolut",
    network: "Revolut Affiliate",
    fallback: "https://www.revolut.com/",
    env: "AFF_REVOLUT",
  },
};

/** Devuelve el enlace de afiliado real si está configurado en la env; si no, la URL canónica. */
export function affiliateUrl(partner: PartnerKey): string {
  const p = PARTNERS[partner];
  if (!p) return "https://viajajapon.com"; // partner desconocido: nunca romper el render
  const tracked = process.env[p.env];
  return tracked && tracked.trim().length > 0 ? tracked.trim() : p.fallback;
}

/** ¿Hay enlace de tracking real configurado para este partner? (útil para avisos en dev). */
export function isMonetized(partner: PartnerKey): boolean {
  const v = process.env[PARTNERS[partner].env];
  return !!(v && v.trim().length > 0);
}

export function partnerName(partner: PartnerKey): string {
  return PARTNERS[partner].name;
}

export function partnerNetwork(partner: PartnerKey): string {
  return PARTNERS[partner].network;
}
