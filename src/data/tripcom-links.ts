/**
 * Enlaces de Trip.com POR CIUDAD (segunda opción de alojamiento, junto a Booking).
 *
 * Programa «Trip.com (Global)» 4368684 en CJ, aprobado el 20-oct-2026 para el sitio
 * ViajaJapon.com (101904257). Comisión especial de «content publisher» confirmada por el equipo de
 * afiliados de Trip.com el 26-oct-2026: hoteles 8 %, tours 5 %, trenes 5 %, traslados 8 %, coches 10 %.
 *
 * La plantilla sale del enlace «ES Site» (13993400) de CJ → Campañas → Enlaces y productos,
 * con la URL de destino cambiada: CJ la mete codificada en `?url=`. Generada y probada el
 * 25-oct-2026: el enlace de Tokio acaba en es.trip.com/hotels/tokyo-hotels-list-228/ con
 * allianceid y SID de afiliado. NUNCA pongas aquí un enlace que no hayas generado y probado.
 *
 * Las URL de ciudad (es.trip.com, en español y en euros) se comprobaron una a una el 25-oct-2026
 * (HTTP 200 y H1 «Hoteles en {ciudad}»). Las claves son las de booking-links.ts: un barrio
 * («tokio-shinjuku») o un tipo («kioto-ryokan») usan la página de su ciudad. Japón entero no
 * tiene página de país en Trip.com, así que ahí no se muestra.
 */

/** Plantilla de deep link de CJ con {url} = URL de Trip.com codificada. null = sin monetizar. */
export const TRIPCOM_DEEPLINK_TEMPLATE: string | null = "https://www.tkqlhce.com/click-101904257-13993400?url={url}";

const TC = "https://es.trip.com/hotels";

export const TRIPCOM_CIUDADES: Record<string, { label: string; url: string }> = {
  tokio: { label: "Tokio", url: `${TC}/tokyo-hotels-list-228/` },
  kioto: { label: "Kioto", url: `${TC}/kyoto-hotels-list-734/` },
  osaka: { label: "Osaka", url: `${TC}/osaka-hotels-list-219/` },
  hiroshima: { label: "Hiroshima", url: `${TC}/hiroshima-hotels-list-262/` },
  // Miyajima pertenece a Hatsukaichi: Trip.com no tiene página propia de la isla.
  miyajima: { label: "Miyajima (Hatsukaichi)", url: `${TC}/hatsukaichi-hotels-list-50273/` },
  nara: { label: "Nara", url: `${TC}/nara-hotels-list-1175/` },
  hakone: { label: "Hakone", url: `${TC}/hakone-hotels-list-1165/` },
  kanazawa: { label: "Kanazawa", url: `${TC}/kanazawa-hotels-list-3663/` },
  takayama: { label: "Takayama", url: `${TC}/takayama-hotels-list-3666/` },
  nikko: { label: "Nikko", url: `${TC}/nikko-hotels-list-4190/` },
  kawaguchiko: { label: "Kawaguchiko", url: `${TC}/fujikawaguchiko-hotels-list-50160/` },
  kamakura: { label: "Kamakura", url: `${TC}/kamakura-hotels-list-50150/` },
};

/**
 * Billetes sueltos de shinkansen por trayecto (comisión de trenes del 5 %). Las páginas de ruta de
 * es.trip.com se comprobaron una a una el 3-nov-2026 (HTTP 200 y título «Shinkansen de X a Y»; una ruta
 * inexistente da 404). Se usan con `destino="tren-tokio-kioto"` en <AffiliateBox partner="tripcom">.
 */
const TT = "https://es.trip.com/trains/japan/route";

export const TRIPCOM_TRENES: Record<string, { label: string; url: string }> = {
  "tren-tokio-kioto": { label: "Tokio → Kioto", url: `${TT}/tokyo-to-kyoto/` },
  "tren-tokio-osaka": { label: "Tokio → Osaka", url: `${TT}/tokyo-to-osaka/` },
  "tren-kioto-hiroshima": { label: "Kioto → Hiroshima", url: `${TT}/kyoto-to-hiroshima/` },
  "tren-osaka-hiroshima": { label: "Osaka → Hiroshima", url: `${TT}/osaka-to-hiroshima/` },
  "tren-tokio-kanazawa": { label: "Tokio → Kanazawa", url: `${TT}/tokyo-to-kanazawa/` },
  // Comprobadas el 14-nov-2026 (HTTP 200 y título «Shinkansen de Osaka/Kyoto a Himeji»).
  "tren-osaka-himeji": { label: "Osaka → Himeji", url: `${TT}/osaka-to-himeji/` },
  "tren-kioto-himeji": { label: "Kioto → Himeji", url: `${TT}/kyoto-to-himeji/` },
  // Trip.com es socio oficial de reservas del Japan Rail Pass (página comprobada el 3-nov-2026).
  "tren-japon": { label: "Shinkansen en Japón", url: "https://es.trip.com/trains/japan/" },
  "tren-jr-pass": { label: "JR Pass", url: "https://es.trip.com/trains/japan/jr-pass/" },
};

/** Ciudad de Trip.com para una clave de Booking ("osaka-namba" → "osaka"), o null. */
export function tripcomCiudad(destino?: string): string | null {
  if (!destino) return null;
  if (destino in TRIPCOM_CIUDADES) return destino;
  const ciudad = destino.split("-")[0];
  return ciudad in TRIPCOM_CIUDADES ? ciudad : null;
}

/** Enlace que se pinta (plantilla de CJ o URL directa), o null si la ciudad no está. */
export function tripcomHref(destino?: string): string | null {
  const tren = destino ? TRIPCOM_TRENES[destino] : undefined;
  const ciudad = tripcomCiudad(destino);
  // Sin ciudad (Japón entero, que no tiene página propia): el buscador general de hoteles, también con tracking.
  const url = tren?.url ?? (ciudad ? TRIPCOM_CIUDADES[ciudad].url : `${TC}/`);
  return TRIPCOM_DEEPLINK_TEMPLATE ? TRIPCOM_DEEPLINK_TEMPLATE.replace("{url}", encodeURIComponent(url)) : url;
}

export function tripcomMonetized(_destino?: string): boolean {
  return !!TRIPCOM_DEEPLINK_TEMPLATE;
}

/** Texto del botón de hoteles: con ciudad si Trip.com la tiene, genérico si no. */
export function tripcomHotelCta(destino?: string): string {
  const ciudad = tripcomCiudad(destino);
  return ciudad ? `Ver hoteles en ${TRIPCOM_CIUDADES[ciudad].label} en Trip.com` : "Buscar hoteles en Trip.com";
}

/** Prefijo de tracking, para reconocer enlaces sueltos del MDX como patrocinados. */
export function tripcomTrackedPrefixes(): string[] {
  return TRIPCOM_DEEPLINK_TEMPLATE ? [TRIPCOM_DEEPLINK_TEMPLATE.split("{url}")[0]] : [];
}
