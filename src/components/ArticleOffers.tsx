import Link from "next/link";
import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { affiliateUrl, isMonetized, neutralCta, type PartnerKey } from "@/lib/affiliates";
import { bookingQue } from "@/data/booking-links";
import { TRIPCOM_CIUDADES, tripcomCiudad } from "@/data/tripcom-links";

type Offer =
  | { kind: "partner"; partner: PartnerKey; title: string; blurb: string; cta: string }
  | { kind: "internal"; href: string; title: string; blurb: string; cta: string };

const OFFERS = {
  iati: { kind: "partner", partner: "iati", title: "Seguro de viaje", blurb: "La sanidad japonesa es excelente y cara para el visitante.", cta: "Ver seguros IATI" },
  holafly: { kind: "partner", partner: "holafly", title: "eSIM para Japón", blurb: "Datos desde que aterrizas, sin cambiar de SIM.", cta: "Ver eSIM Holafly" },
  getyourguide: { kind: "partner", partner: "getyourguide", title: "Tours y excursiones", blurb: "Excursiones de un día, entradas y free tours, muchas con cancelación gratuita.", cta: "Ver tours en GetYourGuide" },
  booking: { kind: "partner", partner: "booking", title: "Alojamiento", blurb: "Hoteles, ryokan y apartamentos con cancelación gratuita.", cta: "Ver en Booking.com" },
  calculadora: { kind: "internal", href: "/herramientas/jr-pass-calculadora", title: "¿Te compensa el JR Pass?", blurb: "Compara billetes sueltos contra el pase, en euros.", cta: "Abrir la calculadora" },
} satisfies Record<string, Offer>;

type OfferKey = keyof typeof OFFERS;

/** Qué ofrecer según el pilar: solo lo que encaja con la intención de esa guía. */
const BY_PILLAR: Record<string, OfferKey[]> = {
  logistica: ["iati", "holafly", "getyourguide", "calculadora"],
  itinerarios: ["booking", "iati", "getyourguide", "calculadora"],
  destinos: ["booking", "getyourguide", "calculadora"],
  gastronomia: ["getyourguide", "calculadora"],
  cultura: ["getyourguide", "calculadora"],
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
 * `destino` (frontmatter `destinoBooking`) lleva la caja de Booking a la ciudad de la guía; en
 * una guía de logística con destino, Booking entra en lugar de Civitatis.
 */
export function ArticleOffers({ pillar, destino }: { pillar: string; destino?: string }) {
  let keys = BY_PILLAR[pillar] ?? BY_PILLAR.logistica;
  if (destino && !keys.includes("booking")) keys = ["booking", ...keys.filter((k) => k !== "getyourguide")];
  const offers = keys.map((key) => {
    const o: Offer = OFFERS[key];
    if (key !== "booking" || !destino) return { key, ...o };
    const que = bookingQue(destino);
    return { key, ...o, title: que.charAt(0).toUpperCase() + que.slice(1) };
  });
  // Trip.com va como segunda opción dentro de la tarjeta de alojamiento (solo ciudades verificadas).
  const tcCiudad = tripcomCiudad(destino);
  // Mientras Booking no pague y Trip.com sí, Trip.com es el botón principal (igual que en DormirEn).
  const tripFirst = !!tcCiudad && isMonetized("tripcom", destino) && !isMonetized("booking", destino);
  const anyMonetized =
    offers.some((o) => o.kind === "partner" && isMonetized(o.partner, destino)) ||
    (!!tcCiudad && keys.includes("booking") && isMonetized("tripcom", destino));
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
              {o.kind === "partner" && o.partner === "booking" && tripFirst && tcCiudad ? (
                <>
                  <TrackedAffiliateLink
                    href={affiliateUrl("tripcom", destino)}
                    partner="tripcom"
                    monetized
                    label={`Ver hoteles en ${TRIPCOM_CIUDADES[tcCiudad].label} en Trip.com`}
                    placement="article_top_tripcom"
                    ctaVariant={`${pillar}_principal`}
                    destination={tcCiudad}
                    className="btn-primary mt-3 inline-block text-sm"
                  />
                  <TrackedAffiliateLink
                    href={affiliateUrl("booking", destino)}
                    partner="booking"
                    monetized={false}
                    label="o en Booking.com"
                    placement="article_top"
                    ctaVariant={`${pillar}_secundario`}
                    destination={destino ?? "japon"}
                    className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  />
                </>
              ) : (
                <>
                  {o.kind === "partner" ? (
                    <TrackedAffiliateLink
                      href={affiliateUrl(o.partner, destino)}
                      partner={o.partner}
                      monetized={isMonetized(o.partner, destino)}
                      label={isMonetized(o.partner, destino) ? o.cta : neutralCta(o.partner)}
                      placement="article_top"
                      ctaVariant={pillar}
                      destination={o.partner === "booking" || o.partner === "getyourguide" ? destino ?? "japon" : undefined}
                      className="btn-primary mt-3 inline-block text-sm"
                    />
                  ) : null}
                  {o.kind === "partner" && o.partner === "booking" && tcCiudad ? (
                    <TrackedAffiliateLink
                      href={affiliateUrl("tripcom", destino)}
                      partner="tripcom"
                      monetized={isMonetized("tripcom", destino)}
                      label="o compara en Trip.com"
                      placement="article_top_tripcom"
                      ctaVariant={pillar}
                      destination={tcCiudad}
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    />
                  ) : null}
                </>
              )}
              {o.kind === "partner" ? null : (
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
