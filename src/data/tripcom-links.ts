/**
 * Enlaces de Trip.com POR CIUDAD (segunda opción de alojamiento, junto a Booking).
 *
 * Programa «Trip.com (Global)» 4368684 en CJ, aprobado el 20-oct-2026 para el sitio
 * ViajaJapon.com (101904257): 5,5 % de las reservas de hotel completadas.
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

/** Ciudad de Trip.com para una clave de Booking ("osaka-namba" → "osaka"), o null. */
export function tripcomCiudad(destino?: string): string | null {
  if (!destino) return null;
  if (destino in TRIPCOM_CIUDADES) return destino;
  const ciudad = destino.split("-")[0];
  return ciudad in TRIPCOM_CIUDADES ? ciudad : null;
}

/** Enlace que se pinta (plantilla de CJ o URL directa), o null si la ciudad no está. */
export function tripcomHref(destino?: string): string | null {
  const ciudad = tripcomCiudad(destino);
  if (!ciudad) return null;
  const url = TRIPCOM_CIUDADES[ciudad].url;
  return TRIPCOM_DEEPLINK_TEMPLATE ? TRIPCOM_DEEPLINK_TEMPLATE.replace("{url}", encodeURIComponent(url)) : url;
}

export function tripcomMonetized(destino?: string): boolean {
  return !!(TRIPCOM_DEEPLINK_TEMPLATE && tripcomCiudad(destino));
}

/** Prefijo de tracking, para reconocer enlaces sueltos del MDX como patrocinados. */
export function tripcomTrackedPrefixes(): string[] {
  return TRIPCOM_DEEPLINK_TEMPLATE ? [TRIPCOM_DEEPLINK_TEMPLATE.split("{url}")[0]] : [];
}
