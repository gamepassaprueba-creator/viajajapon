import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { affiliateUrl, isMonetized, lodgingPartner, neutralCta, type PartnerKey } from "@/lib/affiliates";
import { tripcomHotelCta } from "@/data/tripcom-links";

export interface AffiliateBoxProps {
  /** Clave del partner en el registro central (src/lib/affiliates.ts). */
  partner: PartnerKey;
  title: string;
  cta: string;
  children: React.ReactNode;
  /** Ubicación semántica para atribución en GA4. */
  placement?: string;
  /** Variante visual/copy del CTA para experimentos. */
  ctaVariant?: string;
  /** Solo Booking: clave de destino de src/data/booking-links.ts ("kioto", "hakone-ryokan"…). */
  destino?: string;
}

/**
 * Caja de recomendación. El disclosure "enlace de afiliado" solo se muestra si el
 * partner tiene tracking configurado. Si no monetiza, el CTA pasa a uno neutro y honesto
 * ("Ver en Civitatis"; "web oficial" solo cuando lo es) y el enlace no se marca sponsored.
 */
export function AffiliateBox({
  partner,
  title,
  cta,
  children,
  placement = "affiliate_box",
  ctaVariant = "default",
  destino,
}: AffiliateBoxProps) {
  // Una caja de Booking pasa a Trip.com mientras Booking no pague (ver lodgingPartner).
  const swap = partner === "booking" && lodgingPartner(destino) === "tripcom";
  const p: PartnerKey = swap ? "tripcom" : partner;
  const href = affiliateUrl(p, destino);
  const monetized = isMonetized(p, destino);
  const effectiveCta = swap ? tripcomHotelCta(destino) : monetized ? cta : neutralCta(p, destino);
  // Solo se trabaja con quien paga (titular, 3-nov-2026): sin enlace de afiliado, la caja no se pinta.
  if (!monetized) return null;

  return (
    <aside className="panel-manga-red my-8 bg-white p-5">
      <p className="kicker text-[#d32f2f]">{monetized ? "Recomendación · enlace de afiliado" : "Recomendación"}</p>
      <h3 className="mt-1 text-lg font-black text-[#0a0a0a]">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-[#555]">{children}</div>
      <TrackedAffiliateLink
        href={href}
        partner={p}
        label={effectiveCta}
        monetized={monetized}
        placement={placement}
        ctaVariant={ctaVariant}
        destination={destino}
        className="btn-primary mt-4"
      />
    </aside>
  );
}
