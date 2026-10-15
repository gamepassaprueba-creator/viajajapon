/**
 * Enlaces de GetYourGuide POR DESTINO (programa de partners, partner_id KGGGOIO, activo desde
 * el 15-oct-2026). Cada URL es la página de destino de getyourguide.com en español, comprobada
 * en Chrome con el tracking puesto. El enlace es la URL + partner_id + utm_medium, el mismo
 * formato que genera el constructor de enlaces del panel (partner.getyourguide.com → Enlaces).
 *
 * Para el monte Fuji no hay página de destino propia: las excursiones salen de Tokio.
 */

export const GYG_PARTNER_ID = "KGGGOIO";

const GYG = "https://www.getyourguide.com/es-es";

const DESTINOS: Record<string, string> = {
  japon: `${GYG}/japon-l169034/`,
  tokio: `${GYG}/tokio-l193/`,
  kioto: `${GYG}/kioto-l96826/`,
  osaka: `${GYG}/osaka-l1204/`,
  hakone: `${GYG}/hakone-l1875/`,
  nara: `${GYG}/nara-l1707/`,
  kamakura: `${GYG}/kamakura-l32206/`,
  nikko: `${GYG}/nikko-l89510/`,
  hiroshima: `${GYG}/hiroshima-l32662/`,
  kanazawa: `${GYG}/kanazawa-l32537/`,
  takayama: `${GYG}/takayama-l32150/`,
  // Sin página propia: las excursiones al Fuji salen de Tokio.
  kawaguchiko: `${GYG}/tokio-l193/`,
};

/** Destino de GYG para una clave de la web ("kioto-gion" → kioto, "hakone-ryokan" → hakone). */
function urlDestino(key?: string): string {
  if (!key) return DESTINOS.japon;
  return DESTINOS[key] ?? DESTINOS[key.split("-")[0]] ?? DESTINOS.japon;
}

export function gygHref(key?: string): string {
  return `${urlDestino(key)}?partner_id=${GYG_PARTNER_ID}&utm_medium=online_publisher`;
}

/** ¿Es un enlace de GYG con nuestro tracking? (enlaces sueltos del MDX → rel sponsored). */
export function isGygTracked(href: string): boolean {
  return href.includes("getyourguide.") && href.includes(`partner_id=${GYG_PARTNER_ID}`);
}
