import Link from "next/link";
import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { affiliateUrl, isMonetized, neutralCta } from "@/lib/affiliates";
import { bookingLabel, bookingQue } from "@/data/booking-links";
import { TRIPCOM_CIUDADES, tripcomCiudad } from "@/data/tripcom-links";

/**
 * Componentes de alojamiento (diseño aprobado en el lienzo "ViajaJapón · Alojamiento y Booking").
 * Todos los enlaces a Booking salen del registro por destino (src/data/booking-links.ts): el CTA es
 * neutro y verdadero ("Ver alojamiento en Kioto en Booking.com") y la línea de aviso dice si el
 * enlace paga o no, según el estado REAL de monetización de ese destino.
 */

export function avisoBooking(monetized: boolean): string {
  return monetized
    ? "Booking.com · enlace de afiliado, sin coste extra para ti"
    : "Booking.com · enlace externo sin comisión";
}

/** Caja "Dónde dormir en X": paradas de itinerario y guías de destino. Un solo botón rojo. */
export function DormirEn({
  destino,
  titulo,
  cuando,
  zonas,
  guia,
  ryokan,
  children,
}: {
  /** Clave de Booking ("kioto", "hakone"…). */
  destino: string;
  /** Por defecto "Dónde dormir en {ciudad}". */
  titulo?: string;
  /** Contexto corto: "Días 4-6 · base en Kioto". */
  cuando?: string;
  /** Chips de zona recomendada. */
  zonas?: string[];
  /** Guía interna de zonas o del destino. */
  guia?: string;
  /** Clave de Booking de ryokan de esa ciudad, para el enlace secundario "Solo ryokan". */
  ryokan?: string;
  children?: React.ReactNode;
}) {
  const monetized = isMonetized("booking", destino);
  const ciudad = bookingLabel(destino);
  const placement = "dormir_en";
  // Segunda opción: Trip.com, solo en ciudades con página verificada (Japón entero no la tiene).
  const tcCiudad = tripcomCiudad(destino);
  const tcMonetized = isMonetized("tripcom", destino);
  // Mientras Booking no pague (solicitud pendiente en CJ) y Trip.com sí, el botón principal va a
  // Trip.com y Booking queda como enlace secundario. Al aprobarse Booking vuelve solo a su sitio.
  const tripFirst = !!tcCiudad && tcMonetized && !monetized;
  const secondary = "inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-bold text-primary hover:underline sm:justify-start";

  return (
    <aside className="panel-manga-red my-8 flex flex-col bg-white sm:flex-row">
      <div className="flex shrink-0 items-center gap-3 bg-[#0a0a0a] px-4 py-2.5 text-white sm:w-28 sm:flex-col sm:justify-center sm:gap-1.5 sm:py-4">
        <span lang="ja" aria-hidden="true" className="text-2xl font-black leading-none sm:text-5xl">泊</span>
        <span className="kicker">Dormir{cuando ? <span className="sm:hidden"> · {cuando}</span> : null}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4 sm:px-6 sm:py-5">
        {cuando && <p className="kicker hidden text-[#d32f2f] sm:block">{cuando}</p>}
        <p className="text-lg font-black leading-snug text-[#0a0a0a] sm:text-xl">{titulo ?? `Dónde dormir en ${ciudad}`}</p>
        {zonas && zonas.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Zonas recomendadas">
            {zonas.map((z) => (
              <li key={z} className="border-[2px] border-[#0a0a0a] px-2 py-0.5 text-xs font-bold text-[#0a0a0a]">{z}</li>
            ))}
          </ul>
        )}
        {children && <div className="text-sm leading-relaxed text-fg-muted [&>p]:mt-0">{children}</div>}
        <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          {tripFirst ? (
            <TrackedAffiliateLink
              href={affiliateUrl("tripcom", destino)}
              partner="tripcom"
              monetized={tcMonetized}
              label={`Ver hoteles en ${TRIPCOM_CIUDADES[tcCiudad].label} en Trip.com`}
              placement={`${placement}_tripcom`}
              ctaVariant="dormir_en_principal"
              destination={tcCiudad}
              className="btn-primary justify-center text-sm"
            />
          ) : (
            <TrackedAffiliateLink
              href={affiliateUrl("booking", destino)}
              partner="booking"
              monetized={monetized}
              label={neutralCta("booking", destino)}
              placement={placement}
              ctaVariant="dormir_en"
              destination={destino}
              className="btn-primary justify-center text-sm"
            />
          )}
          {guia && (
            <Link href={guia} className="inline-flex min-h-11 items-center justify-center border-[3px] border-[#0a0a0a] px-3.5 text-sm font-bold text-[#0a0a0a] hover:bg-[#f5f5f5]">
              Guía de zonas de {ciudad}
            </Link>
          )}
          {ryokan && (
            <TrackedAffiliateLink
              href={affiliateUrl("booking", ryokan)}
              partner="booking"
              monetized={isMonetized("booking", ryokan)}
              label={`Solo ryokan en ${bookingLabel(ryokan)}`}
              placement={`${placement}_ryokan`}
              ctaVariant="dormir_en"
              destination={ryokan}
              className={secondary}
            />
          )}
          {tripFirst ? (
            <TrackedAffiliateLink
              href={affiliateUrl("booking", destino)}
              partner="booking"
              monetized={monetized}
              label={`O ${bookingQue(destino)} en Booking.com`}
              placement={placement}
              ctaVariant="dormir_en_secundario"
              destination={destino}
              className={secondary}
            />
          ) : (
            tcCiudad && (
              <TrackedAffiliateLink
                href={affiliateUrl("tripcom", destino)}
                partner="tripcom"
                monetized={tcMonetized}
                label="Comparar en Trip.com"
                placement={`${placement}_tripcom`}
                ctaVariant="dormir_en"
                destination={tcCiudad}
                className={secondary}
              />
            )
          )}
        </div>
        <p className="text-[11px] text-fg-muted">
          {avisoBooking(monetized)}
          {tcCiudad ? ` · Trip.com (hoteles en ${TRIPCOM_CIUDADES[tcCiudad].label}) · ${tcMonetized ? "enlace de afiliado, sin coste extra para ti" : "enlace externo sin comisión"}` : ""}
        </p>
      </div>
    </aside>
  );
}

type ZonaTipo = "recomendada" | "matices" | "nicho";

interface Zona {
  nombre: string;
  /** Posición en % (0-100) desde la izquierda. */
  x: number;
  /** Posición en % (0-100) desde arriba. Norte arriba. */
  y: number;
  tipo?: ZonaTipo;
  nota?: string;
  /** Hacia dónde sale la etiqueta (escritorio). Por defecto, a la izquierda si x > 55. */
  lado?: "izq" | "der";
}

interface Linea {
  orientacion: "v" | "h";
  /** Posición en % del eje perpendicular. */
  pos: number;
  tipo: "rio" | "tren";
  label?: string;
}

const PUNTO: Record<ZonaTipo, string> = {
  recomendada: "bg-[#e1352e] text-white border-[#0a0a0a]",
  matices: "bg-[#0a0a0a] text-white border-[#0a0a0a]",
  nicho: "bg-white text-[#0a0a0a] border-[#0a0a0a]",
};

const clamp = (n: number) => Math.min(96, Math.max(4, n));

/**
 * Mapa mental de zonas: esquema (no a escala) con puntos numerados sobre papel punteado y la
 * misma lista en texto debajo o al lado (lo que leen los lectores de pantalla y Google).
 * En móvil el mapa solo lleva los números (las etiquetas se pisarían a 375 px); la lista
 * de debajo da los nombres. Desde `sm` se ven también las etiquetas.
 */
export function ZonasMapa({
  titulo,
  zonas,
  lineas = [],
  nota = "Esquema orientativo, no a escala. Norte arriba.",
}: {
  titulo?: string;
  zonas: Zona[];
  lineas?: Linea[];
  nota?: string;
}) {
  return (
    <figure className="my-8">
      {titulo && <p className="kicker mb-2 text-[#d32f2f]">Mapa mental · {titulo}</p>}
      <div className="grid gap-5 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <div
          aria-hidden="true"
          className="relative h-64 border-[3px] border-[#0a0a0a] bg-[#f5f5f5] sm:h-80"
          style={{ boxShadow: "4px 4px 0 #0a0a0a", backgroundImage: "radial-gradient(#cfcfcf 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        >
          {lineas.map((l) => {
            const rio = l.tipo === "rio";
            const color = rio ? "bg-[#9cc3e6]" : "bg-[#0a0a0a]";
            const pos = `${clamp(l.pos)}%`;
            return (
              <div key={`${l.tipo}-${l.pos}-${l.label}`}>
                {l.orientacion === "v" ? (
                  <div className={`absolute bottom-0 top-0 ${rio ? "w-1.5" : "w-[3px]"} ${color}`} style={{ left: pos }} />
                ) : (
                  <div className={`absolute left-0 right-0 ${rio ? "h-1.5" : "h-[3px]"} ${color}`} style={{ top: pos }} />
                )}
                {l.label && (
                  <span
                    className={`absolute text-[10px] font-bold ${rio ? "text-[#2f6fa3]" : "text-fg-muted"}`}
                    style={l.orientacion === "v" ? { left: `calc(${pos} + 8px)`, top: 6 } : { top: `calc(${pos} + 6px)`, left: 8 }}
                  >
                    {l.label}
                  </span>
                )}
              </div>
            );
          })}
          {zonas.map((z, i) => {
            const etiquetaIzq = z.lado ? z.lado === "izq" : z.x > 55;
            return (
              <div
                key={z.nombre}
                className={`absolute flex items-center gap-1.5 ${etiquetaIzq ? "flex-row-reverse" : ""}`}
                style={{
                  left: `${clamp(z.x)}%`,
                  top: `${clamp(z.y)}%`,
                  transform: etiquetaIzq ? "translate(calc(-100% + 14px), -14px)" : "translate(-14px, -14px)",
                }}
              >
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border-[3px] text-xs font-black ${PUNTO[z.tipo ?? "matices"]}`}>
                  {i + 1}
                </span>
                <span className="hidden whitespace-nowrap border-[2px] border-[#0a0a0a] bg-white px-1.5 py-px text-xs font-black text-[#0a0a0a] sm:inline-block">
                  {z.nombre}
                </span>
              </div>
            );
          })}
        </div>
        <ol className="flex flex-col gap-2">
          {zonas.map((z, i) => (
            <li key={z.nombre} className="flex items-start gap-2.5 border-[2px] border-[#0a0a0a] bg-white px-3 py-2">
              <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-[2px] text-[11px] font-black ${PUNTO[z.tipo ?? "matices"]}`}>
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-fg-muted">
                <strong className="font-black text-[#0a0a0a]">{z.nombre}</strong>
                {z.nota ? ` · ${z.nota}` : ""}
              </span>
            </li>
          ))}
          <li className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px] text-fg-muted">
            <span><span aria-hidden="true" className="text-[#d32f2f]">●</span> recomendada</span>
            <span><span aria-hidden="true">●</span> con matices</span>
            <span><span aria-hidden="true">○</span> nicho</span>
          </li>
        </ol>
      </div>
      <figcaption className="mt-2 text-xs text-fg-muted">{nota}</figcaption>
    </figure>
  );
}
