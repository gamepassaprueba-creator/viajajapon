import { affiliateUrl, isMonetized, type PartnerKey } from "@/lib/affiliates";

export interface AffiliateBoxProps {
  /** Clave del partner en el registro central (src/lib/affiliates.ts). */
  partner: PartnerKey;
  title: string;
  cta: string;
  children: React.ReactNode;
}

/**
 * Caja de recomendación. El disclosure "enlace de afiliado" (obligatorio por ley
 * cuando monetiza) solo se muestra si el partner tiene tracking configurado:
 * sin IDs de afiliado, son recomendaciones sin más y etiquetarlas sería falso.
 */
export function AffiliateBox({ partner, title, cta, children }: AffiliateBoxProps) {
  const href = affiliateUrl(partner);
  const monetized = isMonetized(partner);
  return (
    <aside className="panel-manga-red my-8 bg-white p-5">
      <p className="kicker text-[#e1352e]">{monetized ? "Recomendación · enlace de afiliado" : "Recomendación"}</p>
      <h3 className="mt-1 text-lg font-black text-[#0a0a0a]">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-[#555]">{children}</div>
      <a
        href={href}
        rel="sponsored nofollow noopener noreferrer"
        target="_blank"
        className="btn-primary mt-4"
      >
        {cta}
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
