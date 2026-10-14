/**
 * Enlaces de Booking.com POR DESTINO. Única fuente de verdad del alojamiento.
 *
 * Cada destino tiene su URL canónica de booking.com (página de ciudad, barrio o tipo de
 * alojamiento), comprobada a mano en Chrome el 14-oct-2026. Sin tracking, el enlace funciona
 * pero NO paga: el CTA es neutro ("Ver en Booking.com") y el rel no lleva "sponsored".
 *
 * ACTIVAR LA MONETIZACIÓN = tocar SOLO este archivo, cuando CJ apruebe el programa
 * "Booking.com Spain & Portugal" (4347393) para el sitio ViajaJapon.com (101904257):
 *  1. En booking.cj.com → "Create a Deep Link", genera el enlace de UNA URL canónica de
 *     esta lista y comprueba que redirige a booking.com.
 *  2. a) Si el enlace generado lleva la URL de destino codificada dentro (p. ej. "...?url=https%3A%2F%2F..."),
 *        copia ese enlace en BOOKING_DEEPLINK_TEMPLATE sustituyendo la URL codificada por
 *        {url}: todas las cajas de la web pasan a monetizar de golpe, cada una a su destino.
 *     b) Si no, pega en `tracked` de cada destino el enlace que genere el panel para su URL.
 *  3. npm run build y comprobar con curl que los href llevan el tracking.
 * NUNCA pongas aquí un enlace de tracking que no hayas generado en el panel y probado.
 *
 * Por qué en código y no en un secret de GitHub: los enlaces de CJ son públicos (salen en el
 * HTML), así que el secret no protege nada y en cambio esconde el estado real; en código se
 * revisan en el PR, quedan versionados y un solo cambio activa los ~40 destinos.
 */

/** Plantilla de deep link de CJ con {url} = URL canónica codificada. null = sin monetizar. */
export const BOOKING_DEEPLINK_TEMPLATE: string | null = null;

interface BookingDestino {
  /** Lugar visible ("Kioto", "Gion"). Se usa en los CTA: "Ver alojamiento en Gion". */
  label: string;
  /** Tipo de alojamiento cuando la página está filtrada (cambia el CTA: "Ver ryokan en Kioto"). */
  tipo?: "ryokan" | "albergues";
  /** URL canónica de booking.com verificada (funciona sin tracking). */
  url: string;
  /** Enlace de CJ generado y probado para ESTE destino (gana a la plantilla). */
  tracked?: string;
}

const BK = "https://www.booking.com";

export const BOOKING_DESTINOS = {
  japon: { label: "Japón", url: `${BK}/country/jp.es.html` },
  "japon-ryokan": { label: "Japón", tipo: "ryokan", url: `${BK}/ryokans/country/jp.es.html` },
  "japon-albergues": { label: "Japón", tipo: "albergues", url: `${BK}/hostels/country/jp.es.html` },

  tokio: { label: "Tokio", url: `${BK}/city/jp/tokyo.es.html` },
  "tokio-shinjuku": { label: "Shinjuku", url: `${BK}/district/jp/tokyo/shinjuku.es.html` },
  "tokio-shibuya": { label: "Shibuya", url: `${BK}/district/jp/tokyo/shibuya.es.html` },
  "tokio-asakusa": { label: "Asakusa", url: `${BK}/district/jp/tokyo/asakusa.es.html` },
  "tokio-ueno": { label: "Ueno", url: `${BK}/district/jp/tokyo/ueno.es.html` },
  "tokio-marunouchi": { label: "Marunouchi (estación de Tokio)", url: `${BK}/district/jp/tokyo/marunouchi.es.html` },
  "tokio-ginza": { label: "Ginza", url: `${BK}/district/jp/tokyo/ginza.es.html` },
  "tokio-akihabara": { label: "Akihabara", url: `${BK}/district/jp/tokyo/akihabara.es.html` },
  "tokio-ikebukuro": { label: "Ikebukuro", url: `${BK}/district/jp/tokyo/ikebukuro.es.html` },
  "tokio-albergues": { label: "Tokio", tipo: "albergues", url: `${BK}/hostels/city/jp/tokyo.es.html` },

  kioto: { label: "Kioto", url: `${BK}/city/jp/kyoto.es.html` },
  "kioto-kawaramachi": { label: "Kawaramachi", url: `${BK}/district/jp/kyoto/kawaramachi.es.html` },
  "kioto-estacion": { label: "la estación de Kioto", url: `${BK}/district/jp/kyoto/kyotostation.es.html` },
  "kioto-gion": { label: "Gion", url: `${BK}/district/jp/kyoto/gion.es.html` },
  "kioto-higashiyama": { label: "Higashiyama", url: `${BK}/district/jp/kyoto/higashiyama.es.html` },
  "kioto-arashiyama": { label: "Arashiyama", url: `${BK}/district/jp/kyoto/arashiyama.es.html` },
  "kioto-ryokan": { label: "Kioto", tipo: "ryokan", url: `${BK}/ryokans/city/jp/kyoto.es.html` },

  osaka: { label: "Osaka", url: `${BK}/city/jp/osaka.es.html` },
  "osaka-umeda": { label: "Umeda", url: `${BK}/district/jp/osaka/umeda.es.html` },
  "osaka-kita": { label: "Kita", url: `${BK}/district/jp/osaka/kita.es.html` },
  "osaka-namba": { label: "Namba", url: `${BK}/district/jp/osaka/namba.es.html` },
  "osaka-shinsaibashi": { label: "Shinsaibashi", url: `${BK}/district/jp/osaka/shinsaibashi.es.html` },
  "osaka-dotonbori": { label: "Dotonbori", url: `${BK}/district/jp/osaka/dotonbori.es.html` },
  // Sin página de barrio en Booking: búsqueda por estación (verificada: resuelve a la estación).
  "osaka-shin-osaka": { label: "Shin-Osaka", url: `${BK}/searchresults.es.html?ss=Shin-Osaka` },
  "osaka-tennoji": { label: "Tennoji", url: `${BK}/searchresults.es.html?ss=Tennoji%2C+Osaka` },

  hiroshima: { label: "Hiroshima", url: `${BK}/city/jp/hiroshima.es.html` },
  miyajima: { label: "Miyajima", url: `${BK}/city/jp/miyajima.es.html` },
  kanazawa: { label: "Kanazawa", url: `${BK}/city/jp/kanazawa.es.html` },
  "kanazawa-ryokan": { label: "Kanazawa", tipo: "ryokan", url: `${BK}/ryokans/city/jp/kanazawa.es.html` },
  takayama: { label: "Takayama", url: `${BK}/city/jp/takayama.es.html` },
  "takayama-ryokan": { label: "Takayama", tipo: "ryokan", url: `${BK}/ryokans/city/jp/takayama.es.html` },
  hakone: { label: "Hakone", url: `${BK}/city/jp/hakone.es.html` },
  "hakone-ryokan": { label: "Hakone", tipo: "ryokan", url: `${BK}/ryokans/city/jp/hakone.es.html` },
  nara: { label: "Nara", url: `${BK}/city/jp/nara.es.html` },
  nikko: { label: "Nikko", url: `${BK}/city/jp/nikko.es.html` },
  "nikko-ryokan": { label: "Nikko", tipo: "ryokan", url: `${BK}/ryokans/city/jp/nikko.es.html` },
  kawaguchiko: { label: "Kawaguchiko", url: `${BK}/city/jp/fujikawaguchiko.es.html` },
  "kawaguchiko-ryokan": { label: "Kawaguchiko", tipo: "ryokan", url: `${BK}/ryokans/city/jp/fujikawaguchiko.es.html` },
  yokohama: { label: "Yokohama", url: `${BK}/city/jp/yokohama.es.html` },
  kamakura: { label: "Kamakura", url: `${BK}/city/jp/kamakura.es.html` },
} satisfies Record<string, BookingDestino>;

export type BookingDestinoKey = keyof typeof BOOKING_DESTINOS;

/** Destino conocido o "japon" (una errata en el MDX nunca rompe el render). */
function destino(key?: string): BookingDestino {
  const d = key ? (BOOKING_DESTINOS as Record<string, BookingDestino>)[key] : undefined;
  return d ?? BOOKING_DESTINOS.japon;
}

export function isBookingDestino(key: string): key is BookingDestinoKey {
  return key in BOOKING_DESTINOS;
}

/** Enlace que se pinta: tracking del destino > plantilla de CJ > URL canónica. */
export function bookingHref(key?: string): string {
  const d = destino(key);
  if (d.tracked) return d.tracked;
  if (BOOKING_DEEPLINK_TEMPLATE) return BOOKING_DEEPLINK_TEMPLATE.replace("{url}", encodeURIComponent(d.url));
  return d.url;
}

/** ¿Este destino paga? Solo si hay tracking real (propio o por plantilla). */
export function bookingMonetized(key?: string): boolean {
  return !!(destino(key).tracked || BOOKING_DEEPLINK_TEMPLATE);
}

export function bookingLabel(key?: string): string {
  return destino(key).label;
}

/** Qué se busca en ese destino, para los CTA: "alojamiento en Gion", "ryokan en Hakone". */
export function bookingQue(key?: string): string {
  const d = destino(key);
  return `${d.tipo ?? "alojamiento"} en ${d.label}`;
}

/** Prefijos de tracking de Booking, para reconocer enlaces sueltos del MDX como patrocinados. */
export function bookingTrackedPrefixes(): string[] {
  const own = Object.values(BOOKING_DESTINOS as Record<string, BookingDestino>)
    .map((d) => d.tracked)
    .filter((t): t is string => !!t);
  const template = BOOKING_DEEPLINK_TEMPLATE ? [BOOKING_DEEPLINK_TEMPLATE.split("{url}")[0]] : [];
  return [...own, ...template];
}
