"use client";

import { useState } from "react";
import {
  SEGMENTS,
  PROFILE_LABEL,
  computeJrPass,
  DATA_UPDATED,
  type Profile,
  type CalcInput,
} from "@/data/jrpass";
import { NewsletterForm } from "@/components/NewsletterForm";

const eur = (n: number) => `${n.toLocaleString("es-ES")}€`;

export interface CalcAffLinks {
  jrpass: string;
  civitatis: string;
  iati: string;
  holafly: string;
}

export function JrPassCalculator({
  fx,
  fxDate,
  fxLive,
  aff,
}: {
  fx: number;
  fxDate: string;
  fxLive: boolean;
  aff: CalcAffLinks;
}) {
  const [days, setDays] = useState(7);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roundTrip, setRoundTrip] = useState(false);
  const [profile, setProfile] = useState<Profile>("medio");
  const [kansai, setKansai] = useState(false);
  const [segmentIds, setSegmentIds] = useState<string[]>(["tokio-kioto", "tokio-osaka"]);

  const input: CalcInput = { days, adults, children, segmentIds, roundTrip, profile, kansai };
  const r = computeJrPass(input, fx);

  const toggleSegment = (id: string) =>
    setSegmentIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  const labelCls = "block text-sm font-medium text-fg";
  const fieldCls = "rounded-lg border border-border bg-surface p-4";

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      {/* Controles */}
      <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
        <fieldset className={fieldCls}>
          <legend className="kicker text-fg-muted">Tu viaje</legend>
          <div className="mt-3 grid gap-4">
            <div>
              <label htmlFor="days" className={labelCls}>
                Días en Japón: <span className="nums font-semibold text-primary">{days}</span>
              </label>
              <input
                id="days"
                type="range"
                min={3}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-2 w-full accent-[var(--color-primary)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="adults" className={labelCls}>Adultos</label>
                <input id="adults" type="number" inputMode="numeric" min={1} max={9} value={adults}
                  onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                  className="nums mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-base" />
              </div>
              <div>
                <label htmlFor="children" className={labelCls}>Niños (6–11)</label>
                <input id="children" type="number" inputMode="numeric" min={0} max={9} value={children}
                  onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                  className="nums mt-1 w-full rounded-sm border border-border bg-bg px-3 py-2 text-base" />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className={fieldCls}>
          <legend className="kicker text-fg-muted">Trayectos en tren de larga distancia</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SEGMENTS.map((s) => (
              <label key={s.id} className="flex cursor-pointer items-center gap-2 text-sm">
                <input type="checkbox" checked={segmentIds.includes(s.id)} onChange={() => toggleSegment(s.id)}
                  className="size-4 accent-[var(--color-primary)]" />
                <span>{s.label}</span>
              </label>
            ))}
          </div>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={roundTrip} onChange={(e) => setRoundTrip(e.target.checked)}
              className="size-4 accent-[var(--color-primary)]" />
            <span>Ida y vuelta en todos los tramos (×2)</span>
          </label>
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={kansai} onChange={(e) => setKansai(e.target.checked)}
              className="size-4 accent-[var(--color-primary)]" />
            <span>Mi viaje se concentra en Kansai (Osaka/Kioto/Nara/Hiroshima)</span>
          </label>
        </fieldset>

        <fieldset className={fieldCls}>
          <legend className="kicker text-fg-muted">Perfil de gasto</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(PROFILE_LABEL) as Profile[]).map((p) => (
              <label key={p}
                className={`cursor-pointer rounded-sm border px-3 py-2 text-sm transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring ${
                  profile === p ? "border-primary bg-primary text-white" : "border-border text-fg-muted hover:border-primary"
                }`}>
                <input type="radio" name="profile" value={p} checked={profile === p}
                  onChange={() => setProfile(p)} className="sr-only" />
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
        <div className={`rounded-lg border p-5 ${r.verdictWorthIt ? "border-success/40 bg-success/5" : "border-danger/40 bg-danger/5"}`}>
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className={`mt-0.5 ${r.verdictWorthIt ? "text-success" : "text-danger"}`}>
              {r.verdictWorthIt ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              )}
            </span>
            <p className="font-serif text-lg leading-snug text-fg">
              {r.verdictWorthIt
                ? `Sí te compensa un pase: ahorras ${eur(r.savingsEur)} frente a la opción más cara.`
                : `El JR Pass NO te compensa: ahorras ${eur(r.savingsEur)} comprando billetes sueltos.`}
            </p>
          </div>
        </div>

        <table className="w-full overflow-hidden rounded-lg border border-border bg-surface text-sm">
          <caption className="sr-only">Comparativa de coste por opción de transporte</caption>
          <thead>
            <tr className="border-b border-border bg-muted text-left">
              <th scope="col" className="px-4 py-2 font-medium">Opción</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">Coste (grupo)</th>
            </tr>
          </thead>
          <tbody className="nums">
            <Row label="Billetes sueltos" value={eur(r.segmentsTotalEur)} best={r.cheapest === "billetes"} />
            <Row label={r.nationalPassLabel} value={eur(r.nationalPassEur)} best={r.cheapest === "nacional"} />
            {r.kansaiEur !== null && (
              <Row label="Kansai Wide Pass" value={eur(r.kansaiEur)} best={r.cheapest === "kansai"} />
            )}
          </tbody>
        </table>

        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="kicker text-fg-muted">Presupuesto estimado del viaje</p>
          <p className="mt-2 nums font-serif text-2xl text-fg">{eur(r.budgetPerPersonEur)} <span className="text-base font-normal text-fg-muted">/ persona</span></p>
          <p className="nums mt-1 text-sm text-fg-muted">{eur(r.budgetGroupEur)} en total · transporte + alojamiento + comida + extras</p>
        </div>

        {/* Siguiente paso: acciones recomendadas según el veredicto */}
        <div className="rounded-lg border border-border bg-surface p-5">
          <p className="kicker text-fg-muted">Tu siguiente paso</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            {r.verdictWorthIt
              ? "Te compensa un pase. Antes de comprarlo, verifica el precio del día y compáralo también con los pases regionales."
              : "Te sale mejor comprar billetes sueltos o un pase regional. Merece la pena reservar con antelación los trayectos y traslados clave."}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {r.verdictWorthIt ? (
              <AffLink href={aff.jrpass}>Ver precios del JR Pass</AffLink>
            ) : (
              <AffLink href={aff.civitatis}>Reservar actividades y traslados</AffLink>
            )}
            <AffLink href={aff.iati} variant="ghost">Comparar seguro de viaje</AffLink>
            <AffLink href={aff.holafly} variant="ghost">eSIM con datos para Japón</AffLink>
          </div>
          <p className="mt-3 text-xs text-fg-muted">
            Enlaces de afiliado: si compras a través de ellos podemos llevarnos una pequeña comisión, sin coste extra para ti.
          </p>
        </div>

        </div>{/* fin del live region de resultados */}

        {/* Captura de email: checklist de presupuesto + avisos de precios */}
        <div className="rounded-lg border border-secondary/30 bg-secondary/5 p-5">
          <p className="font-semibold text-fg">¿Te guardamos este cálculo?</p>
          <p className="mt-1 text-sm text-fg-muted">
            Te enviamos el checklist de presupuesto para Japón (en euros) y un aviso cuando cambien precios clave como el del JR Pass.
          </p>
          <div className="mt-3">
            <NewsletterForm
              source="calculadora"
              layout="stack"
              buttonLabel="Enviarme el checklist"
              note="Doble opt-in. Sin spam; te das de baja cuando quieras."
            />
          </div>
        </div>

        <p className="text-xs text-fg-muted">
          Datos actualizados: {DATA_UPDATED} · cambio {fxLive ? `1€ = ¥${fx} (ref. BCE${fxDate !== "—" ? `, ${fxDate}` : ""})` : `1€ = ¥${fx} (estimado)`}.
          Tipo de referencia, no incluye comisiones de cambio.
        </p>
      </div>
    </div>
  );
}

function AffLink({
  href,
  variant = "solid",
  children,
}: {
  href: string;
  variant?: "solid" | "ghost";
  children: React.ReactNode;
}) {
  const cls =
    variant === "solid"
      ? "bg-primary text-white hover:bg-primary-strong"
      : "border border-border text-fg hover:border-primary";
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex items-center justify-between gap-1.5 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${cls}`}
    >
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Row({ label, value, best }: { label: string; value: string; best: boolean }) {
  return (
    <tr className={`border-b border-border last:border-0 ${best ? "bg-success/5 font-semibold" : ""}`}>
      <td className="px-4 py-2">
        {label}
        {best && <span className="ml-2 rounded-sm bg-success px-1.5 py-0.5 text-xs font-medium text-white">más barata</span>}
      </td>
      <td className="px-4 py-2 text-right">{value}</td>
    </tr>
  );
}
