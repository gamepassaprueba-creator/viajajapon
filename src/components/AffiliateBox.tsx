import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { affiliateUrl, isMonetized, neutralCta, type PartnerKey } from "@/lib/affiliates";

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
}: AffiliateBoxProps) {
  const href = affiliateUrl(partner);
  const monetized = isMonetized(partner);
  const effectiveCta = monetized ? cta : neutralCta(partner);

  return (
    <aside className="panel-manga-red my-8 bg-white p-5">
      <p className="kicker text-[#e1352e]">{monetized ? "Recomendación · enlace de afiliado" : "Recomendación"}</p>
      <h3 className="mt-1 text-lg font-black text-[#0a0a0a]">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-[#555]">{children}</div>
      <TrackedAffiliateLink
        href={href}
        partner={partner}
        label={effectiveCta}
        monetized={monetized}
        placement={placement}
        ctaVariant={ctaVariant}
        className="btn-primary mt-4"
      />
    </aside>
  );
}
