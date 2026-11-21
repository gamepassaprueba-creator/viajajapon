import type { PartnerKey } from "@/lib/affiliates";

/**
 * Promociones temporales de los partners. Se pintan solas (PromoPartner) junto a las cajas de ese
 * partner y desaparecen solas cuando pasa `hasta` (día incluido, hora de Madrid), sin redesplegar.
 * Fuente de cada promo: el correo del programa de afiliados. Borrar la entrada cuando caduque.
 */
export interface Promo {
  partner: PartnerKey;
  /** Primer día visible, AAAA-MM-DD (hora de Madrid). */
  desde: string;
  /** Último día visible, AAAA-MM-DD (hora de Madrid). */
  hasta: string;
  /** Frase corta en negrita. */
  titular: string;
  /** Detalle con las condiciones. */
  detalle: string;
}

export const PROMOS: Promo[] = [
  {
    // Correo de IATI Afiliados del 20-nov-2026: «Orange Friday», 15 % (10 % directo + 5 % exclusivo por el enlace de afiliado).
    partner: "iati",
    desde: "2026-11-21",
    hasta: "2026-11-29",
    titular: "Orange Friday de IATI: 15 % de descuento del 23 al 29 de noviembre",
    detalle: "Un 10 % para todos y un 5 % más si entras por nuestro enlace. Solo en seguros de viaje contratados esos días.",
  },
];

/** Fecha de hoy en Madrid como AAAA-MM-DD. */
export function hoyMadrid(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(now);
}

export function promoActiva(partner: PartnerKey, hoy = hoyMadrid()): Promo | null {
  return PROMOS.find((p) => p.partner === partner && p.desde <= hoy && hoy <= p.hasta) ?? null;
}
