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

import { bookingHref, bookingMonetized, bookingQue, bookingTrackedPrefixes } from "@/data/booking-links";
import { gygHref, isGygTracked } from "@/data/getyourguide-links";
import { tripcomHref, tripcomMonetized, tripcomTrackedPrefixes } from "@/data/tripcom-links";

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
  | "tripcom"
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
  /**
   * CTA cuando NO hay tracking. Por defecto "Ver en {name}". Solo se personaliza cuando el
   * fallback no es la web del partner (p. ej. jrpass cae en la web oficial japanrailpass.net).
   */
  neutralCta?: string;
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
    fallback: "https://japanrailpass.net/en/", // /es/ desapareció (404 el 17-oct-2026)
    env: "AFF_JRPASS",
    neutralCta: "Ver en la web oficial (en inglés)",
  },
  revolut: {
    name: "Revolut",
    network: "Revolut Affiliate",
    fallback: "https://www.revolut.com/",
    env: "AFF_REVOLUT",
  },
  // Booking no usa `fallback` ni `env`: sus enlaces por destino viven en src/data/booking-links.ts.
  booking: {
    name: "Booking.com",
    network: "Booking.com Partner Portal (CJ) · Spain & Portugal 4347393",
    fallback: "https://www.booking.com/country/jp.es.html",
    env: "",
  },
  // Trip.com tampoco usa `env`: enlaces por ciudad en src/data/tripcom-links.ts (CJ 4368684, activo 25-oct-2026).
  tripcom: {
    name: "Trip.com",
    network: "Trip.com (Global) en CJ · 4368684",
    fallback: "https://es.trip.com/hotels/",
    env: "",
  },
  // Preparado para activar en cuanto haya ID real: el inventario más amplio de tours.
  // Enlaces por destino en src/data/getyourguide-links.ts (partner_id KGGGOIO, activo 15-oct-2026).
  getyourguide: {
    name: "GetYourGuide",
    network: "GetYourGuide Partner Program",
    fallback: "https://www.getyourguide.com/es-es/japon-l169034/",
    trackedDefault: gygHref("japon"),
    env: "AFF_GETYOURGUIDE",
  },
};

/**
 * Devuelve el enlace de afiliado real si está configurado; si no, la URL canónica.
 * `destino` solo lo usa Booking (clave de src/data/booking-links.ts; sin él, Japón).
 */
export function affiliateUrl(partner: PartnerKey, destino?: string): string {
  if (partner === "booking") return bookingHref(destino);
  if (partner === "tripcom") return tripcomHref(destino) ?? PARTNERS.tripcom.fallback;
  if (partner === "getyourguide" && !process.env.AFF_GETYOURGUIDE?.trim()) return gygHref(destino);
  const p = PARTNERS[partner];
  if (!p) return "https://viajajapon.com"; // partner desconocido: nunca romper el render
  const tracked = process.env[p.env]?.trim();
  return tracked && tracked.length > 0 ? tracked : p.trackedDefault ?? p.fallback;
}

/** ¿Hay enlace de tracking real configurado para este partner? (útil para avisos en dev/GA4). */
export function isMonetized(partner: PartnerKey, destino?: string): boolean {
  if (partner === "booking") return bookingMonetized(destino);
  if (partner === "tripcom") return tripcomMonetized(destino);
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
  if (bookingTrackedPrefixes().some((prefix) => href.startsWith(prefix))) return true;
  if (isGygTracked(href)) return true;
  if (tripcomTrackedPrefixes().some((prefix) => href.startsWith(prefix))) return true;
  return (Object.keys(PARTNERS) as PartnerKey[]).some((key) => {
    if (key === "booking" || key === "tripcom") return false; // ya cubiertos arriba, por destino
    if (!isMonetized(key)) return false;
    const tracked = affiliateUrl(key);
    return href === tracked || href.startsWith(tracked);
  });
}

export function partnerName(partner: PartnerKey): string {
  return PARTNERS[partner]?.name ?? partner;
}

/**
 * CTA cuando el partner NO monetiza: nunca promete comisión ni llama "web oficial" a una
 * tienda (Civitatis, Booking o Klook no lo son). "Ver en Civitatis" es verdad siempre.
 * Con Booking y un destino dice qué se va a ver: "Ver alojamiento en Gion en Booking.com".
 */
export function neutralCta(partner: PartnerKey, destino?: string): string {
  if (partner === "booking" && destino) return `Ver ${bookingQue(destino)} en Booking.com`;
  const p = PARTNERS[partner];
  return p?.neutralCta ?? `Ver en ${p?.name ?? partner}`;
}

export function partnerNetwork(partner: PartnerKey): string {
  return PARTNERS[partner].network;
}
