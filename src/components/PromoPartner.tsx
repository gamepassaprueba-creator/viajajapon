"use client";

import { useSyncExternalStore } from "react";
import type { PartnerKey } from "@/lib/affiliates";
import { hoyMadrid, promoActiva } from "@/data/promos";

const sinSuscripcion = () => () => {};

/**
 * Línea de promoción temporal dentro de una caja de afiliado (src/data/promos.ts).
 * La fecha se lee en el navegador (en el servidor no se pinta nada) para que la promo caduque
 * sola aunque la página estática no se reconstruya.
 */
export function PromoPartner({ partner, compacta = false }: { partner: PartnerKey; compacta?: boolean }) {
  const hoy = useSyncExternalStore(sinSuscripcion, () => hoyMadrid(), () => "");
  const promo = hoy ? promoActiva(partner, hoy) : null;
  if (!promo) return null;
  return (
    <p className={`mt-2 border-l-4 border-[#e1352e] bg-[#fff5f4] px-2.5 py-1.5 leading-snug text-[#0a0a0a] ${compacta ? "text-xs" : "text-sm"}`}>
      <b>{promo.titular}.</b> {promo.detalle}
    </p>
  );
}
