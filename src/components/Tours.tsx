import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { isMonetized } from "@/lib/affiliates";
import { gygHref, gygLabel, gygSearchHref } from "@/data/getyourguide-links";

/**
 * Caja de tours y actividades (diseño «Caja de tours con búsquedas» del lienzo de Claude Design).
 * Un botón rojo a todos los tours del destino en GetYourGuide y, opcionalmente, accesos directos a
 * búsquedas concretas («Alquiler de kimono»), todos con el tracking del registro de GYG. La línea de
 * aviso dice la verdad sobre si el enlace paga.
 */
export function Tours({
  destino = "japon",
  titulo,
  busquedas = [],
  children,
}: {
  /** Clave de destino ("kioto", "hakone", "japon"…). */
  destino?: string;
  titulo: string;
  /** Accesos directos: texto visible y búsqueda en GetYourGuide. */
  busquedas?: { label: string; q: string }[];
  children?: React.ReactNode;
}) {
  const monetized = isMonetized("getyourguide");
  const lugar = gygLabel(destino);
  const aviso = monetized
    ? "GetYourGuide · enlace de afiliado, sin coste extra para ti"
    : "GetYourGuide · enlace externo sin comisión";

  return (
    <aside className="panel-manga-red my-8 flex flex-col bg-white sm:flex-row">
      <div className="flex shrink-0 items-center gap-3 border-b-[3px] border-[#0a0a0a] bg-[#e1352e] px-4 py-2.5 text-white sm:w-28 sm:flex-col sm:justify-center sm:gap-1.5 sm:border-b-0 sm:border-r-[3px] sm:py-4">
        <span lang="ja" aria-hidden="true" className="text-2xl font-black leading-none sm:text-5xl">旅</span>
        <span className="kicker">Tours<span className="sm:hidden"> en {lugar}</span></span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-4 sm:px-6 sm:py-5">
        <p className="kicker hidden text-[#d32f2f] sm:block">Tours y actividades en {lugar}</p>
        <p className="text-lg font-black leading-snug text-[#0a0a0a] sm:text-xl">{titulo}</p>
        {children && <div className="text-sm leading-relaxed text-fg-muted [&>p]:mt-0">{children}</div>}
        {busquedas.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Búsquedas en GetYourGuide">
            {busquedas.map((b) => (
              <li key={b.q}>
                <TrackedAffiliateLink
                  href={gygSearchHref(b.q)}
                  partner="getyourguide"
                  monetized={monetized}
                  label={`${b.label} `}
                  placement="tours_chip"
                  ctaVariant={b.q}
                  destination={destino}
                  className="inline-flex min-h-10 items-center gap-1 border-[2px] border-[#0a0a0a] px-3 text-[13px] font-bold text-[#0a0a0a] hover:bg-[#f5f5f5]"
                />
              </li>
            ))}
          </ul>
        )}
        <div className="pt-1">
          <TrackedAffiliateLink
            href={gygHref(destino)}
            partner="getyourguide"
            monetized={monetized}
            label={`Ver todos los tours en ${lugar}`}
            placement="tours_box"
            ctaVariant="tours"
            destination={destino}
            className="btn-primary w-full justify-center text-sm sm:w-auto"
          />
        </div>
        <p className="text-[11px] text-fg-muted">{aviso}</p>
      </div>
    </aside>
  );
}
