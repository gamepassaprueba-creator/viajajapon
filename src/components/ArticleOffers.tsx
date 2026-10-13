import Link from "next/link";
import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { affiliateUrl, isMonetized, neutralCta, type PartnerKey } from "@/lib/affiliates";

type Offer =
  | { kind: "partner"; partner: PartnerKey; title: string; blurb: string; cta: string }
  | { kind: "internal"; href: string; title: string; blurb: string; cta: string };

const OFFERS = {
  iati: { kind: "partner", partner: "iati", title: "Seguro de viaje", blurb: "La sanidad japonesa es excelente y cara para el visitante.", cta: "Ver seguros IATI" },
  holafly: { kind: "partner", partner: "holafly", title: "eSIM para Japón", blurb: "Datos desde que aterrizas, sin cambiar de SIM.", cta: "Ver eSIM Holafly" },
  civitatis: { kind: "partner", partner: "civitatis", title: "Tours y traslados", blurb: "Actividades en español y traslados desde el aeropuerto.", cta: "Ver en Civitatis" },
  booking: { kind: "partner", partner: "booking", title: "Alojamiento", blurb: "Hoteles, ryokan y apartamentos con cancelación gratuita.", cta: "Ver en Booking.com" },
  calculadora: { kind: "internal", href: "/herramientas/jr-pass-calculadora", title: "¿Te compensa el JR Pass?", blurb: "Compara billetes sueltos contra el pase, en euros.", cta: "Abrir la calculadora" },
} satisfies Record<string, Offer>;

type OfferKey = keyof typeof OFFERS;

/** Qué ofrecer según el pilar: solo lo que encaja con la intención de esa guía. */
const BY_PILLAR: Record<string, OfferKey[]> = {
  logistica: ["iati", "holafly", "civitatis", "calculadora"],
  itinerarios: ["iati", "holafly", "civitatis", "calculadora"],
  destinos: ["booking", "civitatis", "calculadora"],
  gastronomia: ["civitatis", "calculadora"],
  cultura: ["civitatis", "calculadora"],
  blog: ["iati", "calculadora"],
};

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/**
 * Bloque comercial de la plantilla de artículo, visible en TODOS los tamaños (antes la única
 * zona comercial era la barra lateral `hidden xl:block`: en móvil y tablet no existía).
 * Va justo después de "En 30 segundos", cuando el lector ya sabe de qué va la guía.
 * El disclosure dice la verdad: solo habla de afiliación si alguno de los partners paga.
 */
export function ArticleOffers({ pillar }: { pillar: string }) {
  const keys = BY_PILLAR[pillar] ?? BY_PILLAR.logistica;
  const offers = keys.map((key) => ({ key, ...OFFERS[key] }));
  const anyMonetized = offers.some((o) => o.kind === "partner" && isMonetized(o.partner));
  const cols = COLS[offers.length] ?? COLS[4];

  return (
    <section aria-label="Para organizar el viaje" className="mx-auto mt-6 max-w-[1180px] px-4">
      <div className="border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-4 sm:p-5">
        <p className="kicker text-fg-muted">
          Para organizar el viaje
          {anyMonetized ? " · algunos enlaces son de afiliado, sin coste extra para ti" : " · enlaces externos sin comisión"}
        </p>
        <ul className={`mt-3 grid gap-3 ${cols}`}>
          {offers.map((o) => (
            <li key={o.key} className="flex flex-col border-[2px] border-[#0a0a0a] bg-white p-4">
              <p className="font-black text-[#0a0a0a]">{o.title}</p>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-fg-muted">{o.blurb}</p>
              {o.kind === "partner" ? (
                <TrackedAffiliateLink
                  href={affiliateUrl(o.partner)}
                  partner={o.partner}
                  monetized={isMonetized(o.partner)}
                  label={isMonetized(o.partner) ? o.cta : neutralCta(o.partner)}
                  placement="article_top"
                  ctaVariant={pillar}
                  className="btn-primary mt-3 inline-block text-sm"
                />
              ) : (
                <Link href={o.href} className="btn-primary mt-3 inline-block text-sm">
                  {o.cta} <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
