"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PROFILE_LABEL, type Profile } from "@/data/jrpass";
import {
  computeBudget,
  DEFAULT_FLIGHT_EUR,
  ROUTES,
  SEASON_LABEL,
  type BudgetInput,
  type Route,
  type Season,
} from "@/data/presupuesto";
import { NewsletterForm, NewsletterGate } from "@/components/NewsletterForm";
import { trackEvent } from "@/lib/analytics";

/**
 * Calculadora de presupuesto (diseño: tablero «CalcPresupuesto» del lienzo de Claude Design).
 * Escritorio: formulario a la izquierda y resultado a la derecha. Móvil: apilado, con el total fijo
 * abajo mientras se eligen opciones. El estado se refleja en la URL para poder compartir el cálculo.
 */

// Punto de miles siempre (es-ES no agrupa los números de 4 cifras: «1994 €»).
const miles = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const eur = (n: number) => `${miles(n)} €`;
const DAY_CHIPS = [7, 10, 15, 21];
const PROFILES = Object.keys(PROFILE_LABEL) as Profile[];
const PROFILE_HINT: Record<Profile, { desc: string; day: string }> = {
  mochilero: { desc: "Hostel, konbini, metro", day: "≈ 40 €/día" },
  medio: { desc: "Hotel sencillo, mezcla", day: "≈ 95 €/día" },
  comodo: { desc: "Hotel céntrico, restaurantes", day: "≈ 215 €/día" },
};
const SEASONS = Object.keys(SEASON_LABEL) as Season[];
const ROUTE_KEYS = Object.keys(ROUTES) as Route[];
const BAR_COLOR: Record<string, string> = {
  vuelo: "bg-[#0a0a0a]",
  alojamiento: "bg-[#e1352e]",
  fijos: "bg-[#f5f5f5]",
};

const DEFAULTS: BudgetInput = { days: 10, people: 2, profile: "medio", season: "normal", route: "clasica", flightEur: DEFAULT_FLIGHT_EUR };

function fromParams(p: URLSearchParams): BudgetInput {
  const int = (k: string, def: number, min: number, max: number) => {
    const v = Number.parseInt(p.get(k) ?? "", 10);
    return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : def;
  };
  const pick = <T extends string>(k: string, keys: T[], def: T) => (keys.includes(p.get(k) as T) ? (p.get(k) as T) : def);
  return {
    days: int("d", DEFAULTS.days, 3, 30),
    people: int("n", DEFAULTS.people, 1, 6),
    profile: pick("p", PROFILES, DEFAULTS.profile),
    season: pick("t", SEASONS, DEFAULTS.season),
    route: pick("r", ROUTE_KEYS, DEFAULTS.route),
    flightEur: int("v", DEFAULTS.flightEur, 0, 5000),
  };
}

const chip = (on: boolean) =>
  `min-h-11 border-[2px] border-[#0a0a0a] px-3.5 text-sm font-bold ${on ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a] hover:bg-[#f5f5f5]"}`;

export function BudgetCalculator() {
  const [s, setS] = useState<BudgetInput>(DEFAULTS);
  const ready = useRef(false);
  const tracked = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- estado inicial desde la URL compartida
    setS(fromParams(new URLSearchParams(window.location.search)));
    ready.current = true;
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    const q = new URLSearchParams({ d: String(s.days), n: String(s.people), p: s.profile, t: s.season, r: s.route, v: String(s.flightEur) });
    window.history.replaceState(null, "", `?${q.toString()}`);
  }, [s]);

  const r = useMemo(() => computeBudget(s), [s]);
  const max = Math.max(...r.lines.map((l) => l.eur), 1);

  function set<K extends keyof BudgetInput>(k: K, v: BudgetInput[K]) {
    setS((prev) => ({ ...prev, [k]: v }));
    if (!tracked.current) {
      tracked.current = true;
      trackEvent("tool_use", { tool: "calculadora_presupuesto" });
    }
  }

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-8">
      <form className="flex flex-col gap-6 border-[3px] border-[#0a0a0a] bg-white p-4 sm:p-6" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-2.5 text-[15px] font-black">1 · ¿Cuántos días en Japón?</legend>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" aria-label="Menos días" className="size-11 border-[2px] border-[#0a0a0a] text-xl font-black" onClick={() => set("days", Math.max(3, s.days - 1))}>−</button>
            <output aria-live="polite" className="nums min-w-16 text-center font-mono text-[28px] font-bold">{s.days}</output>
            <button type="button" aria-label="Más días" className="size-11 border-[2px] border-[#0a0a0a] text-xl font-black" onClick={() => set("days", Math.min(30, s.days + 1))}>+</button>
            <span className="flex gap-1.5 sm:ml-3">
              {DAY_CHIPS.map((d) => (
                <button key={d} type="button" aria-pressed={s.days === d} className={chip(s.days === d)} onClick={() => set("days", d)}>{d}</button>
              ))}
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 text-[15px] font-black">2 · ¿Cuántas personas?</legend>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button key={n} type="button" aria-pressed={s.people === n} className={`${chip(s.people === n)} min-w-13`} onClick={() => set("people", n)}>{n}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-fg-muted">Con 2 o más, la habitación se comparte. Solo, la habitación individual sale más cara por persona.</p>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 text-[15px] font-black">3 · ¿Cómo viajas?</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {PROFILES.map((p) => {
              const on = s.profile === p;
              return (
                <button
                  key={p}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set("profile", p)}
                  className={`flex flex-col gap-1 p-2.5 text-left ${on ? "border-[3px] border-[#e1352e] bg-[#fff5f4]" : "border-[2px] border-[#0a0a0a] bg-white hover:bg-[#f5f5f5]"}`}
                >
                  <b className="text-[15px]">{PROFILE_LABEL[p]}</b>
                  <span className="text-xs text-fg-muted">{PROFILE_HINT[p].desc}</span>
                  <span className="font-mono text-xs font-bold">{PROFILE_HINT[p].day}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 text-[15px] font-black">4 · ¿Cuándo vas?</legend>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map((t) => (
              <button key={t} type="button" aria-pressed={s.season === t} className={chip(s.season === t)} onClick={() => set("season", t)}>{SEASON_LABEL[t]}</button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 text-[15px] font-black">5 · Trenes entre ciudades</legend>
          <div className="flex flex-col gap-2">
            {ROUTE_KEYS.map((k) => (
              <button key={k} type="button" aria-pressed={s.route === k} className={`${chip(s.route === k)} text-left`} onClick={() => set("route", k)}>{ROUTES[k].label}</button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2.5 text-[15px] font-black">6 · Vuelo ida y vuelta, por persona</legend>
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="flex items-center gap-2">
              <span className="sr-only">Precio del vuelo en euros</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={5000}
                step={10}
                value={s.flightEur}
                onChange={(e) => set("flightEur", Math.min(5000, Math.max(0, Number(e.target.value) || 0)))}
                className="min-h-11 w-28 border-[2px] border-[#0a0a0a] px-2.5 font-mono text-lg font-bold"
              />
              <span className="font-bold">€</span>
            </label>
            <span className="text-xs text-fg-muted">Desde España, 600-1.100 €. Desde Latinoamérica, pon tu precio (o 0 si ya lo tienes).</span>
          </div>
        </fieldset>
      </form>

      <section aria-label="Resultado" className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 border-[3px] border-[#0a0a0a] bg-white p-4 shadow-[6px_6px_0_#e1352e] sm:p-6">
          <p className="kicker text-[#e1352e]">
            Tu presupuesto · {s.days} días · {s.people} {s.people === 1 ? "persona" : "personas"} · {PROFILE_LABEL[s.profile].toLowerCase()}
          </p>
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span className="nums text-5xl font-black leading-none sm:text-[64px]">{eur(r.perPerson)}</span>
            <span className="text-lg font-bold text-fg-muted">por persona</span>
          </p>
          <p className="text-base text-fg-muted">
            {s.people > 1 && (
              <>
                <b className="text-[#0a0a0a]">{eur(r.total)} en total</b> ·{" "}
              </>
            )}
            sin el vuelo, {eur(r.perDayNoFlight)} por persona y día · ≈ ¥{miles(r.perPersonYen)} por persona en Japón
          </p>
          <ul className="mt-1 flex flex-col gap-2.5">
            {r.lines.map((l) => (
              <li key={l.key} className="grid grid-cols-[110px_minmax(0,1fr)_64px] items-center gap-2.5 sm:grid-cols-[170px_minmax(0,1fr)_70px]">
                <span className="text-sm font-bold sm:text-base">{l.label}</span>
                <span className="h-4 border-[2px] border-[#0a0a0a] bg-white">
                  <span className={`block h-full ${BAR_COLOR[l.key] ?? "bg-[#f4b183]"}`} style={{ width: `${(l.eur / max) * 100}%` }} />
                </span>
                <span className="nums text-right font-mono text-sm font-bold">{eur(l.eur)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-fg-muted">
            Estimación con precios de 2026 a ¥185/€. El alojamiento es lo que más cambia con la fecha: compruébalo para tus días.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/destinos/alojamiento-en-japon" className="flex flex-col gap-1.5 border-[2px] border-[#0a0a0a] p-3.5 hover:bg-[#f5f5f5]">
            <b>Ver alojamiento</b>
            <span className="text-[13px] text-fg-muted">Precios por noche y dónde dormir en cada ciudad</span>
            <span className="mt-auto font-bold text-primary">Comparar →</span>
          </Link>
          <Link href="/herramientas/jr-pass-calculadora" className="flex flex-col gap-1.5 border-[2px] border-[#0a0a0a] p-3.5 hover:bg-[#f5f5f5]">
            <b>¿Te compensa el JR Pass?</b>
            <span className="text-[13px] text-fg-muted">Con tu ruta, en euros</span>
            <span className="mt-auto font-bold text-primary">Calcular →</span>
          </Link>
          <Link href="/destinos/donde-dormir-en-kioto#precio-por-zona-cuanto-cuesta-cada-barrio" className="flex flex-col gap-1.5 border-[2px] border-[#0a0a0a] p-3.5 hover:bg-[#f5f5f5]">
            <b>Dónde dormir según precio</b>
            <span className="text-[13px] text-fg-muted">Precio real por barrio en Tokio, Kioto y Osaka</span>
            <span className="mt-auto font-bold text-primary">Ver guías →</span>
          </Link>
        </div>

        <NewsletterGate>
          <div className="border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-4 sm:p-5">
            <p className="text-[17px] font-black">Recibe la checklist de presupuesto en tu email</p>
            <div className="mt-3">
              <NewsletterForm source="calculadora-presupuesto" buttonLabel="Enviármela" note="Sin spam; te das de baja cuando quieras." />
            </div>
          </div>
        </NewsletterGate>
      </section>

      <div className="sticky bottom-[calc(64px+env(safe-area-inset-bottom))] z-40 -mx-4 flex items-center justify-between border-[3px] border-[#0a0a0a] bg-[#0a0a0a] px-4 py-2.5 text-white md:hidden print:hidden" aria-hidden="true">
        <span className="text-[13px]">Total por persona</span>
        <b className="nums font-mono text-lg">{eur(r.perPerson)}</b>
      </div>
    </div>
  );
}
