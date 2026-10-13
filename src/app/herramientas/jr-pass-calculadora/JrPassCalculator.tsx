"use client";

import { useEffect, useRef, useState } from "react";
import {
  SEGMENTS,
  PROFILE_LABEL,
  KANSAI_HIROSHIMA,
  computeJrPass,
  DATA_UPDATED,
  type Profile,
  type CalcInput,
} from "@/data/jrpass";
import { NewsletterForm, NewsletterGate } from "@/components/NewsletterForm";
import { TrackedAffiliateLink } from "@/components/TrackedAffiliateLink";
import { trackEvent } from "@/lib/analytics";
import { useYenRate } from "@/lib/hooks/useYenRate";

const eur = (n: number) => `${n.toLocaleString("es-ES")}€`;

export interface CalcAffLink {
  href: string;
  partner: string;
  monetized: boolean;
}

export interface CalcAffLinks {
  jrpass: CalcAffLink;
  civitatis: CalcAffLink;
  iati: CalcAffLink;
  holafly: CalcAffLink;
}

const MIN_DAYS = 3;
const MAX_DAYS = 30;
const PROFILES = Object.keys(PROFILE_LABEL) as Profile[];
const DEFAULTS: CalcInput = {
  days: 7,
  adults: 2,
  children: 0,
  segmentIds: ["tokio-kioto", "tokio-osaka"],
  roundTrip: false,
  profile: "medio",
  kansai: false,
};

/**
 * Estado ⇄ URL para poder compartir un cálculo:
 * ?d=14&a=2&n=1&t=tokio-kioto,osaka-hiroshima&iv=1&k=1&p=comodo
 * Sin useSearchParams a propósito: exigiría <Suspense> y dejaría el formulario fuera del HTML
 * prerenderizado. Se lee window.location al montar, con validación de rangos e ids.
 */
function stateFromParams(params: URLSearchParams): CalcInput | null {
  const KEYS = ["d", "a", "n", "t", "iv", "k", "p"];
  if (!KEYS.some((k) => params.has(k))) return null;
  const int = (key: string, fallback: number, min: number, max: number) => {
    const v = Number.parseInt(params.get(key) ?? "", 10);
    return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;
  };
  const ids = new Set(SEGMENTS.map((s) => s.id));
  const t = params.get("t");
  const p = params.get("p");
  return {
    days: int("d", DEFAULTS.days, MIN_DAYS, MAX_DAYS),
    adults: int("a", DEFAULTS.adults, 1, 9),
    children: int("n", DEFAULTS.children, 0, 9),
    segmentIds: t === null ? DEFAULTS.segmentIds : t.split(",").filter((id) => ids.has(id)),
    roundTrip: params.get("iv") === "1",
    kansai: params.get("k") === "1",
    profile: PROFILES.includes(p as Profile) ? (p as Profile) : DEFAULTS.profile,
  };
}

function paramsFromState(s: CalcInput): string {
  const p = new URLSearchParams();
  p.set("d", String(s.days));
  p.set("a", String(s.adults));
  if (s.children > 0) p.set("n", String(s.children));
  p.set("t", s.segmentIds.join(","));
  if (s.roundTrip) p.set("iv", "1");
  if (s.kansai) p.set("k", "1");
  if (s.profile !== DEFAULTS.profile) p.set("p", s.profile);
  return p.toString();
}

const DEFAULT_PARAMS = paramsFromState(DEFAULTS);

export function JrPassCalculator({ aff }: { aff: CalcAffLinks }) {
  const { rate: fx, date: fxDate, live: fxLive, isLoading } = useYenRate();
  const [s, setS] = useState<CalcInput>(DEFAULTS);
  const set = <K extends keyof CalcInput>(key: K, value: CalcInput[K]) =>
    setS((prev) => ({ ...prev, [key]: value }));
  const r = computeJrPass(s, fx);

  const urlReady = useRef(false);
  const lastTracked = useRef<string | null>(null);

  // Lectura de la URL al montar. El estado inicial son los valores por defecto (sin desajuste
  // de hidratación); un enlace compartido muestra un instante los defaults antes de aplicarse.
  useEffect(() => {
    const next = stateFromParams(new URLSearchParams(window.location.search));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado inicial desde la URL tras hidratar
    if (next) setS(next);
    urlReady.current = true;
  }, []);

  // Escritura en la URL con retardo (el slider de días dispara muchos cambios seguidos).
  useEffect(() => {
    if (!urlReady.current) return;
    const t = setTimeout(() => {
      const qs = paramsFromState(s);
      if (window.location.search !== `?${qs}`) {
        window.history.replaceState(null, "", `?${qs}`);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [s]);

  // GA4: resultado del cálculo, 1 s después del último cambio y nunca con los valores por
  // defecto. Es el dato que faltaba para saber qué rutas y duraciones piden los lectores.
  useEffect(() => {
    const key = paramsFromState(s);
    if (key === DEFAULT_PARAMS || key === lastTracked.current) return;
    const t = setTimeout(() => {
      lastTracked.current = key;
      trackEvent("calculator_result", {
        dias: s.days,
        viajeros: s.adults + s.children,
        tramos: s.segmentIds.length,
        ida_vuelta: s.roundTrip ? 1 : 0,
        kansai: s.kansai ? 1 : 0,
        perfil: s.profile,
        veredicto: r.cheapest,
        ahorro_eur: r.savingsEur,
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [s, r.cheapest, r.savingsEur]);

  const toggleSegment = (id: string) =>
    set("segmentIds", s.segmentIds.includes(id) ? s.segmentIds.filter((x) => x !== id) : [...s.segmentIds, id]);

  const labelCls = "block text-sm font-medium text-[#0a0a0a]";
  const fieldCls = "border-[2px] border-[#0a0a0a] bg-white p-4";
  const anyMonetized = Object.values(aff).some((link) => link.monetized);

  const kansaiLabel = `Kansai-Hiroshima Area Pass${r.kansaiUncoveredEur > 0 ? " + billetes del resto" : ""}`;
  const verdictText =
    r.cheapest === "billetes"
      ? `El JR Pass NO te compensa: ahorras ${eur(r.savingsEur)} comprando billetes sueltos.`
      : r.cheapest === "nacional"
        ? `Sí te compensa el ${r.nationalPassLabel}: ahorras ${eur(r.savingsEur)} frente a la siguiente opción más barata.`
        : `Te compensa el ${kansaiLabel}: ahorras ${eur(r.savingsEur)} frente a la siguiente opción más barata.`;
  const nextStepText =
    r.cheapest === "billetes"
      ? "Te sale mejor comprar billetes sueltos. Merece la pena reservar con antelación los trayectos y traslados clave."
      : r.cheapest === "nacional"
        ? "Te compensa el pase nacional. Antes de comprarlo, verifica el precio del día: desde octubre de 2026 la compra online oficial es más barata que los Exchange Orders de agencia."
        : "Te compensa el pase regional de JR-West para los trayectos de Kansai e Hiroshima; el resto, en billetes sueltos. Recuerda que el pase dura 5 días consecutivos.";

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {/* Controles */}
      <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
        <fieldset className={fieldCls}>
          <legend className="kicker text-fg-muted">Tu viaje</legend>
          <div className="mt-3 grid gap-4">
            <div>
              <label htmlFor="days" className={labelCls}>
                Días en Japón: <span className="nums font-semibold text-primary">{s.days}</span>
              </label>
              <input
                id="days"
                type="range"
                min={MIN_DAYS}
                max={MAX_DAYS}
                value={s.days}
                onChange={(e) => set("days", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--color-primary)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="adults" className={labelCls}>Adultos</label>
                <input id="adults" type="number" inputMode="numeric" min={1} max={9} value={s.adults}
                  onChange={(e) => set("adults", Math.min(9, Math.max(1, Number(e.target.value))))}
                  className="nums mt-1 w-full border-[2px] border-[#0a0a0a] bg-white px-3 py-2 text-base outline-none focus:border-[#e1352e]" />
              </div>
              <div>
                <label htmlFor="children" className={labelCls}>Niños (6–11)</label>
                <input id="children" type="number" inputMode="numeric" min={0} max={9} value={s.children}
                  onChange={(e) => set("children", Math.min(9, Math.max(0, Number(e.target.value))))}
                  className="nums mt-1 w-full border-[2px] border-[#0a0a0a] bg-white px-3 py-2 text-base outline-none focus:border-[#e1352e]" />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldCls}>
          <legend className="kicker text-fg-muted">Trayectos en tren de larga distancia</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SEGMENTS.map((seg) => (
              <label key={seg.id} className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={s.segmentIds.includes(seg.id)} onChange={() => toggleSegment(seg.id)}
                  className="size-4 accent-[var(--color-primary)]" />
                <span>{seg.label}</span>
              </label>
            ))}
          </div>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={s.roundTrip} onChange={(e) => set("roundTrip", e.target.checked)}
              className="size-4 accent-[var(--color-primary)]" />
            <span>Ida y vuelta en todos los tramos (×2)</span>
          </label>
          <label className="mt-2 flex cursor-pointer items-start gap-2 text-sm">
            <input type="checkbox" checked={s.kansai} onChange={(e) => set("kansai", e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[var(--color-primary)]" />
            <span>
              Comparar también el {KANSAI_HIROSHIMA.label}
              <span className="block text-xs text-fg-muted">
                Cubre Kioto, Osaka, Nara e Hiroshima. Suponemos que esos trayectos los haces en 5 días seguidos; el resto (p. ej. Tokio → Kioto) se suma en billetes sueltos.
              </span>
            </span>
          </label>
        </fieldset>

        <fieldset className={fieldCls}>
          <legend className="kicker text-fg-muted">Perfil de gasto</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROFILES.map((p) => (
              <label key={p}
                className={`cursor-pointer border-[2px] px-3 py-2 font-mono text-xs font-black uppercase tracking-wide transition-colors ${
                  s.profile === p
                    ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                    : "border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#e1352e] hover:border-[#e1352e] hover:text-white"
                }`}>
                <input type="radio" name="profile" value={p} checked={s.profile === p}
                  onChange={() => set("profile", p)} className="sr-only" />
                {PROFILE_LABEL[p]}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      {/* Resultado */}
      <div className="grid content-start gap-4">
        {/* Solo los resultados que cambian se anuncian; el formulario de email queda fuera del live region. */}
        <div className="grid gap-4" aria-live="polite">
        <div className={`border-[3px] p-5 ${r.verdictWorthIt ? "border-[#15803d] bg-[#f0fdf4]" : "border-[#e1352e] bg-[#fff5f5]"}`} style={{boxShadow: r.verdictWorthIt ? "4px 4px 0 #15803d" : "4px 4px 0 #e1352e"}}>
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className={`mt-0.5 ${r.verdictWorthIt ? "text-success" : "text-danger"}`}>
              {r.verdictWorthIt ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              )}
            </span>
            <p className="text-lg font-black leading-snug text-[#0a0a0a]">{verdictText}</p>
          </div>
          {!r.nationalPassCoversTrip && (
            <p className="mt-3 border-t-[2px] border-[#0a0a0a]/15 pt-3 text-sm leading-relaxed text-[#2b2b2b]">
              Tu viaje dura {s.days} días y el pase nacional más largo es de 21: los trenes fuera de esos 21 días se pagan aparte,
              así que el pase sale aún menos a cuenta de lo que muestra la tabla.
            </p>
          )}
        </div>

        <table className="w-full overflow-hidden border-[2px] border-[#0a0a0a] bg-white text-sm">
          <caption className="sr-only">Comparativa de coste por opción de transporte</caption>
          <thead>
            <tr className="border-b-[2px] border-[#0a0a0a] bg-[#f5f5f5] text-left">
              <th scope="col" className="px-4 py-2 font-medium">Opción</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">Coste (grupo)</th>
            </tr>
          </thead>
          <tbody className="nums">
            <Row label="Billetes sueltos" value={eur(r.segmentsTotalEur)} best={r.cheapest === "billetes"} />
            <Row label={r.nationalPassLabel} value={eur(r.nationalPassEur)} best={r.cheapest === "nacional"} />
            {r.kansaiEur !== null && (
              <Row label={kansaiLabel} value={eur(r.kansaiEur)} best={r.cheapest === "kansai"} />
            )}
          </tbody>
        </table>

        <div className="border-[2px] border-[#0a0a0a] bg-white p-5">
          <p className="kicker text-[#555]">Presupuesto estimado del viaje</p>
          <p className="mt-2 nums text-2xl font-black text-[#0a0a0a]">{eur(r.budgetPerPersonEur)} <span className="text-base font-normal text-[#555]">/ persona</span></p>
          <p className="nums mt-1 text-sm text-fg-muted">{eur(r.budgetGroupEur)} en total · alojamiento + comida + extras + la opción de transporte más barata</p>
          {s.children > 0 && (
            <p className="mt-1 text-xs text-fg-muted">Los niños cuentan como medio adulto en transporte y gasto diario (aproximación).</p>
          )}
        </div>

        {/* Siguiente paso: acciones recomendadas según el veredicto */}
        <div className="border-[2px] border-[#0a0a0a] bg-white p-5">
          <p className="kicker text-[#555]">Tu siguiente paso</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{nextStepText}</p>
          <div className="mt-3 flex flex-col gap-2">
            {r.cheapest === "nacional" && (
              <CalcLink link={aff.jrpass} label={aff.jrpass.monetized ? "Ver precios del JR Pass" : "Ver precios del JR Pass (web oficial)"} variant="solid" verdict={r.cheapest} />
            )}
            {r.cheapest === "kansai" && (
              <CalcLink link={{ href: KANSAI_HIROSHIMA.url, partner: "jr-west", monetized: false }} label="Ver el Kansai-Hiroshima Area Pass (JR-West)" variant="solid" verdict={r.cheapest} />
            )}
            {r.cheapest === "billetes" && (
              <CalcLink link={aff.civitatis} label="Reservar actividades y traslados" variant="solid" verdict={r.cheapest} />
            )}
            <CalcLink link={aff.iati} label="Comparar seguro de viaje" variant="ghost" verdict={r.cheapest} />
            <CalcLink link={aff.holafly} label="eSIM con datos para Japón" variant="ghost" verdict={r.cheapest} />
          </div>
          <p className="mt-3 text-xs text-fg-muted">
            {anyMonetized
              ? "Algunos enlaces son de afiliado: si compras a través de ellos podemos recibir una comisión, sin coste extra para ti."
              : "Enlaces a proveedores externos. Actualmente estos enlaces no llevan comisión para ViajaJapón."}
          </p>
        </div>

        </div>{/* fin del live region de resultados */}

        {/* Captura de email: checklist de presupuesto + avisos de precios */}
        <NewsletterGate>
          <div className="panel-manga-red bg-white p-5">
            <p className="font-black text-[#0a0a0a]">¿Te guardamos este cálculo?</p>
            <p className="mt-1 text-sm text-fg-muted">
              Te enviamos el checklist de presupuesto para Japón (en euros) y un aviso cuando cambien precios clave como el del JR Pass.
            </p>
            <div className="mt-3">
              <NewsletterForm
                source="calculadora"
                layout="stack"
                buttonLabel="Enviarme el checklist"
                note="Sin spam; te das de baja cuando quieras."
              />
            </div>
          </div>
        </NewsletterGate>

        <p className="text-xs text-fg-muted">
          Datos actualizados: {DATA_UPDATED} · cambio {isLoading ? "..." : (fxLive ? `1€ = ¥${fx} (ref. BCE${fxDate !== "—" ? `, ${fxDate}` : ""})` : `1€ = ¥${fx} (estimado)`)}.
          Tipo de referencia, no incluye comisiones de cambio. La URL guarda tu cálculo: cópiala para compartirlo.
        </p>
      </div>
    </div>
  );
}

const CALC_LINK_BASE = "inline-flex items-center justify-between gap-1.5 px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wide transition-colors";
const CALC_LINK_SOLID = "border-[2px] border-[#0a0a0a] bg-[#e1352e] text-white hover:bg-[#b8271f]";
const CALC_LINK_GHOST = "border-[2px] border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white";

/**
 * Enlace comercial de la calculadora sobre el mismo TrackedAffiliateLink que el resto del
 * sitio: `rel="sponsored"` solo si el partner paga y el evento affiliate_click lleva el mismo
 * esquema (placement, content_slug y cta_variant = veredicto).
 */
function CalcLink({
  link,
  label,
  variant,
  verdict,
}: {
  link: CalcAffLink;
  label: string;
  variant: "solid" | "ghost";
  verdict: string;
}) {
  return (
    <TrackedAffiliateLink
      href={link.href}
      partner={link.partner}
      label={label}
      monetized={link.monetized}
      placement="calculator_next_step"
      ctaVariant={verdict}
      className={`${CALC_LINK_BASE} ${variant === "solid" ? CALC_LINK_SOLID : CALC_LINK_GHOST}`}
    />
  );
}

function Row({ label, value, best }: { label: string; value: string; best: boolean }) {
  return (
    <tr className={`border-b-[2px] border-[#0a0a0a] last:border-0 ${best ? "bg-[#f0fdf4] font-black" : ""}`}>
      <td className="px-4 py-2">
        {label}
        {best && <span className="ml-2 border border-[#15803d] bg-[#15803d] px-1.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wide text-white">más barata</span>}
      </td>
      <td className="px-4 py-2 text-right">{value}</td>
    </tr>
  );
}
