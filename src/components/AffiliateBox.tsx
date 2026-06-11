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
    <aside className="my-8 rounded-lg border border-border bg-muted p-5">
      <p className="kicker text-fg-muted">{monetized ? "Recomendación · enlace de afiliado" : "Recomendación"}</p>
      <h3 className="mt-1 font-serif text-lg text-fg">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-fg-muted">{children}</div>
      <a
        href={href}
        rel="sponsored nofollow noopener noreferrer"
        target="_blank"
        className="mt-4 inline-flex items-center gap-1.5 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
      >
        {cta}
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
