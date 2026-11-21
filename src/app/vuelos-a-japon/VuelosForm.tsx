"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Estimado } from "./Estimado";
import {
  VUELOS,
  VUELOS_CANALES,
  VUELOS_CAPTURA_MAX,
  VUELOS_CLASES,
  VUELOS_DESTINOS,
  VUELOS_FLEXIBILIDAD,
  VUELOS_MALETAS,
  VUELOS_ORIGENES,
  telegramHref,
  whatsappHref,
} from "@/data/vuelos";

type Availability = "checking" | "available" | "unavailable";
type Datos = {
  origen: string;
  otroOrigen: string;
  destino: string;
  ida: string;
  vuelta: string;
  flexibilidad: string;
  adultos: number;
  ninos: number;
  bebes: number;
  maletas: string;
  clase: string;
  precio: string;
  nombre: string;
  canal: string;
  contacto: string;
  consentimiento: boolean;
};

const INICIAL: Datos = {
  origen: "Madrid",
  otroOrigen: "",
  destino: "Tokio",
  ida: "",
  vuelta: "",
  flexibilidad: "Fechas fijas",
  adultos: 2,
  ninos: 0,
  bebes: 0,
  maletas: "2",
  clase: "Turista",
  precio: "",
  nombre: "",
  canal: "WhatsApp",
  contacto: "",
  consentimiento: false,
};

const PASOS = ["Tu vuelo", "Precio y contacto"] as const;
const ULTIMO = PASOS.length - 1;


function Chips({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2.5 text-[15px] font-black text-fg">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-h-11 border-2 border-[#0a0a0a] px-3.5 font-bold ${
              value === o ? "bg-[#0a0a0a] text-white" : "bg-white text-[#0a0a0a] hover:bg-[#f5f5f5]"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Contador({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-bold">{label}</span>
      <span className="flex items-center gap-2.5">
        <button
          type="button"
          aria-label={`Menos: ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="h-11 w-11 border-2 border-[#0a0a0a] bg-white text-xl font-black disabled:opacity-40"
        >
          −
        </button>
        <span aria-live="polite" className="min-w-7 text-center font-mono text-xl font-bold">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Más: ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="h-11 w-11 border-2 border-[#0a0a0a] bg-white text-xl font-black disabled:opacity-40"
        >
          +
        </button>
      </span>
    </div>
  );
}

const inputCls =
  "min-h-11 border-2 border-[#0a0a0a] bg-white px-3 text-[15px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary";

export function VuelosForm() {
  const id = useId();
  const [availability, setAvailability] = useState<Availability>("checking");
  const [paso, setPaso] = useState(0);
  const [d, setD] = useState<Datos>(INICIAL);
  const [captura, setCaptura] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState<{ ref: string; plazo: string } | null>(null);
  const empezado = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/vuelos", { cache: "no-store" })
      .then(async (res) => (res.ok ? ((await res.json()) as { available?: boolean }).available === true : false))
      .then((ok) => active && setAvailability(ok ? "available" : "unavailable"))
      .catch(() => active && setAvailability("unavailable"));
    return () => {
      active = false;
    };
  }, []);

  function set<K extends keyof Datos>(key: K, value: Datos[K]) {
    if (!empezado.current) {
      empezado.current = true;
      trackEvent("vuelos_form_start");
    }
    setError(null);
    setD((prev) => ({ ...prev, [key]: value }));
  }

  function validar(p: number): string | null {
    if (p === 0) {
      if ((d.origen === "Otra" || d.origen === "Fuera") && d.otroOrigen.trim().length < 2)
        return d.origen === "Fuera" ? "Escribe la ciudad y el país desde los que sales." : "Escribe desde qué ciudad o aeropuerto sales.";
      if (!d.ida || !d.vuelta) return "Pon la fecha de ida y la de vuelta.";
      if (d.vuelta < d.ida) return "La vuelta no puede ser antes que la ida.";
      if (d.bebes > d.adultos) return "Cada bebé tiene que viajar con un adulto.";
    }
    if (p === 1) {
      if (captura && captura.size > VUELOS_CAPTURA_MAX) return "La captura pesa más de 5 MB.";
      if (d.nombre.trim().length < 2) return "Dinos tu nombre.";
      if (d.contacto.trim().length < 4) return d.canal === "Correo" ? "Escribe tu correo." : `Escribe tu ${d.canal}.`;
      if (!d.consentimiento) return "Necesitamos tu permiso para escribirte por esta solicitud.";
    }
    return null;
  }

  function irA(p: number) {
    setPaso(p);
    setError(null);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function siguiente() {
    const e = validar(paso);
    if (e) return setError(e);
    trackEvent("vuelos_form_step", { paso: paso + 2 });
    irA(paso + 1);
  }

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    if (paso < ULTIMO) return siguiente();
    const e = validar(ULTIMO);
    if (e) return setError(e);
    setEnviando(true);
    const body = new FormData();
    body.append(
      "origen",
      d.origen === "Fuera" ? `Fuera de España: ${d.otroOrigen}` : d.origen === "Otra" ? d.otroOrigen : d.origen,
    );
    for (const k of ["destino", "ida", "vuelta", "flexibilidad", "maletas", "clase", "precio", "nombre", "canal", "contacto"] as const) {
      body.append(k, d[k]);
    }
    body.append("adultos", String(d.adultos));
    body.append("ninos", String(d.ninos));
    body.append("bebes", String(d.bebes));
    body.append("consentimiento", d.consentimiento ? "si" : "no");
    body.append("website", honeypot.current?.value ?? "");
    if (captura) body.append("captura", captura);
    try {
      const res = await fetch("/api/vuelos", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; ref?: string; plazo?: string; error?: string };
      if (res.ok && data.ok && data.ref) {
        trackEvent("vuelos_form_submit", { canal: d.canal });
        setHecho({ ref: data.ref, plazo: data.plazo ?? "" });
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setError(
          data.error === "validation"
            ? "Revisa los datos: hay algún campo que no está bien."
            : "No hemos podido enviar la solicitud. Prueba otra vez en un momento.",
        );
      }
    } catch {
      setError("No hemos podido enviar la solicitud. Revisa tu conexión y prueba otra vez.");
    } finally {
      setEnviando(false);
    }
  }

  const wa = whatsappHref();
  const tg = telegramHref();

  if (hecho) {
    return (
      <div ref={topRef} className="scroll-mt-24 border-[3px] border-[#0a0a0a] bg-white p-6 shadow-[6px_6px_0_#e1352e]" role="status">
        <h2 className="text-2xl font-black">Solicitud recibida</h2>
        <p className="mt-3 font-mono text-2xl font-bold">{hecho.ref}</p>
        <p className="mt-3 text-[15px] leading-relaxed">
          Te escribirá nuestro colaborador, {VUELOS.colaborador.nombre}, por {d.canal} antes del <b>{hecho.plazo}</b>. Guarda tu referencia por si nos escribes.
        </p>
        {(wa || tg) && (
          <>
            <p className="mt-4 text-sm text-fg-muted">¿Tienes una captura o quieres añadir algo?</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("vuelos_contacto_directo", { canal: "whatsapp" })} className="flex min-h-11 items-center justify-center border-2 border-[#0a0a0a] bg-[#0a0a0a] px-4 font-bold text-white">
                  Seguir por WhatsApp
                </a>
              )}
              {tg && (
                <a href={tg} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("vuelos_contacto_directo", { canal: "telegram" })} className="flex min-h-11 items-center justify-center border-2 border-[#0a0a0a] bg-white px-4 font-bold text-[#0a0a0a]">
                  Seguir por Telegram
                </a>
              )}
            </div>
          </>
        )}
        <p className="mt-4 text-sm text-fg-muted">
          Mientras tanto:{" "}
          <Link href="/herramientas/calculadora-presupuesto" className="font-bold text-primary underline underline-offset-2">
            calcula el presupuesto del viaje
          </Link>
          .
        </p>
      </div>
    );
  }

  if (availability !== "available") {
    return (
      <div ref={topRef} className="border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-6">
        <p className="kicker text-primary">{availability === "checking" ? "Un momento" : "Servicio cerrado"}</p>
        <p className="mt-2 text-lg font-bold">
          {availability === "checking" ? "Cargando el formulario…" : "Ahora mismo no estamos aceptando solicitudes de vuelos."}
        </p>
        {availability === "unavailable" && (
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Vuelve en unos días. Mientras tanto, puedes calcular el presupuesto de tu viaje en la{" "}
            <Link href="/herramientas/calculadora-presupuesto" className="font-bold text-primary underline underline-offset-2">
              calculadora
            </Link>
            .
          </p>
        )}
      </div>
    );
  }

  const contactoLabel = d.canal === "Correo" ? "Tu correo" : d.canal === "Telegram" ? "Tu usuario o número de Telegram" : "Tu número de WhatsApp";

  return (
    <form
      onSubmit={enviar}
      noValidate
      className="flex scroll-mt-24 flex-col gap-6 border-[3px] border-[#0a0a0a] bg-white p-5 shadow-[6px_6px_0_#e1352e] sm:p-6"
    >
      <div ref={topRef} className="scroll-mt-24" />
      <ol className="m-0 grid list-none grid-cols-2 gap-1.5 p-0 font-mono text-[11px] font-bold uppercase tracking-[0.06em]">
        {PASOS.map((nombre, i) => (
          <li
            key={nombre}
            aria-current={i === paso ? "step" : undefined}
            className={`border-2 border-[#0a0a0a] px-2.5 py-2 ${i === paso ? "bg-[#0a0a0a] text-white" : i < paso ? "bg-[#fff5f4] text-[#0a0a0a]" : "text-[#555555]"}`}
          >
            {i + 1} · {nombre}
          </li>
        ))}
      </ol>

      {paso === 0 && (
        <>
          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-2.5 text-[15px] font-black">¿Desde dónde sales?</legend>
            <div className="flex flex-wrap items-center gap-2">
              {[...VUELOS_ORIGENES, "Otra", "Fuera"].map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={d.origen === o}
                  onClick={() => set("origen", o)}
                  className={`min-h-11 border-2 border-[#0a0a0a] px-3.5 font-bold ${d.origen === o ? "bg-[#0a0a0a] text-white" : "bg-white hover:bg-[#f5f5f5]"}`}
                >
                  {o === "Otra" ? "Otra ciudad de España" : o === "Fuera" ? "Fuera de España" : o}
                </button>
              ))}
            </div>
            {(d.origen === "Otra" || d.origen === "Fuera") && (
              <div className="mt-3 flex flex-col gap-1">
                <label htmlFor={`${id}-otro`} className="text-[13px] font-bold">
                  {d.origen === "Fuera" ? "Ciudad y país de salida" : "Ciudad o aeropuerto de salida"}
                </label>
                <input
                  id={`${id}-otro`}
                  className={`${inputCls} w-full`}
                  placeholder={d.origen === "Fuera" ? "Por ejemplo: Ciudad de México, México" : "Por ejemplo: Valencia"}
                  value={d.otroOrigen}
                  onChange={(e) => set("otroOrigen", e.target.value)}
                  maxLength={60}
                />
                {d.origen === "Fuera" && (
                  <span className="text-xs text-fg-muted">
                    Iberia vuela a Japón desde Madrid: te diremos si con la escala te compensa frente a un vuelo directo.
                  </span>
                )}
              </div>
            )}
          </fieldset>
          <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
            <legend className="mb-2.5 text-[15px] font-black">¿Qué días?</legend>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor={`${id}-ida`} className="text-[13px] font-bold">Ida</label>
                <input id={`${id}-ida`} type="date" className={`${inputCls} w-full font-mono font-bold`} value={d.ida} onChange={(e) => set("ida", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor={`${id}-vuelta`} className="text-[13px] font-bold">Vuelta</label>
                <input id={`${id}-vuelta`} type="date" min={d.ida || undefined} className={`${inputCls} w-full font-mono font-bold`} value={d.vuelta} onChange={(e) => set("vuelta", e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Flexibilidad de fechas">
              {VUELOS_FLEXIBILIDAD.map((o) => (
                <button key={o} type="button" aria-pressed={d.flexibilidad === o} onClick={() => set("flexibilidad", o)} className={`min-h-11 border-2 border-[#0a0a0a] px-3.5 font-bold ${d.flexibilidad === o ? "bg-[#0a0a0a] text-white" : "bg-white hover:bg-[#f5f5f5]"}`}>
                  {o}
                </button>
              ))}
            </div>
            <p className="m-0 text-xs text-fg-muted">Con margen de días es más fácil mejorar el precio.</p>
          </fieldset>
          <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
            <legend className="mb-2.5 text-[15px] font-black">¿Cuántos viajáis?</legend>
            <Contador label="Adultos" value={d.adultos} min={1} max={9} onChange={(v) => set("adultos", v)} />
            <Contador label="Niños (2-11 años)" value={d.ninos} min={0} max={9} onChange={(v) => set("ninos", v)} />
            <Contador label="Bebés (menos de 2)" value={d.bebes} min={0} max={9} onChange={(v) => set("bebes", v)} />
          </fieldset>
          <details className="group border-2 border-[#0a0a0a]">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3.5 py-2 [&::-webkit-details-marker]:hidden">
              <span className="text-sm">
                <b>Más opciones:</b> {d.destino === "Me da igual" ? "cualquier ciudad" : d.destino} · {d.maletas} maleta
                {d.maletas === "1" ? "" : "s"} por persona · {d.clase}
              </span>
              <ChevronDown size={18} aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="flex flex-col gap-5 border-t-2 border-[#0a0a0a] p-3.5">
              <Chips legend="¿A qué ciudad de Japón?" options={VUELOS_DESTINOS} value={d.destino} onChange={(v) => set("destino", v)} />
              <Chips legend="Maletas facturadas por persona" options={VUELOS_MALETAS} value={d.maletas} onChange={(v) => set("maletas", v)} />
              <Chips legend="Clase" options={VUELOS_CLASES} value={d.clase} onChange={(v) => set("clase", v)} />
            </div>
          </details>
        </>
      )}

      {paso === 1 && (
        <>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${id}-precio`} className="text-[15px] font-black">¿Cuánto te sale en total?</label>
            <div className="flex flex-wrap items-center gap-2.5">
              <input id={`${id}-precio`} inputMode="decimal" className={`${inputCls} w-36 font-mono text-lg font-bold`} placeholder="1.240" value={d.precio} onChange={(e) => set("precio", e.target.value)} maxLength={12} />
              <span className="font-bold">€</span>
              <span className="text-xs text-fg-muted">Para todos los viajeros. Si aún no has mirado, déjalo vacío.</span>
            </div>
          </div>
          <Estimado precio={d.precio} personas={d.adultos + d.ninos} />
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-captura`} className="text-[15px] font-black">Captura del vuelo (opcional)</label>
            <input
              id={`${id}-captura`}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                setError(null);
                setCaptura(e.target.files?.[0] ?? null);
              }}
              className="min-h-[72px] w-full cursor-pointer border-2 border-dashed border-[#0a0a0a] bg-[#f5f5f5] p-4 text-sm font-bold file:mr-3 file:border-2 file:border-[#0a0a0a] file:bg-white file:px-3 file:py-2 file:font-bold"
            />
            <span className="text-xs text-fg-muted">Nos ayuda a encontrar exactamente el mismo vuelo. JPG, PNG o WebP, hasta 5 MB.</span>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor={`${id}-nombre`} className="text-[15px] font-black">Tu nombre</label>
            <input id={`${id}-nombre`} autoComplete="given-name" className={`${inputCls} w-full`} placeholder="Nombre" value={d.nombre} onChange={(e) => set("nombre", e.target.value)} maxLength={60} />
          </div>
          <Chips legend="¿Por dónde te escribimos?" options={VUELOS_CANALES} value={d.canal} onChange={(v) => set("canal", v)} />
          <div className="flex flex-col gap-1">
            <label htmlFor={`${id}-contacto`} className="text-[15px] font-black">{contactoLabel}</label>
            <input
              id={`${id}-contacto`}
              type={d.canal === "Correo" ? "email" : d.canal === "WhatsApp" ? "tel" : "text"}
              autoComplete={d.canal === "Correo" ? "email" : d.canal === "WhatsApp" ? "tel" : "off"}
              className={`${inputCls} w-full`}
              placeholder={d.canal === "Correo" ? "tu@email.com" : d.canal === "Telegram" ? "@usuario o +34 600 000 000" : "+34 600 000 000"}
              value={d.contacto}
              onChange={(e) => set("contacto", e.target.value)}
              maxLength={120}
            />
          </div>
          <div className="grid grid-cols-[24px_1fr] items-start gap-2.5">
            <input id={`${id}-ok`} type="checkbox" checked={d.consentimiento} onChange={(e) => set("consentimiento", e.target.checked)} className="m-0 h-[22px] w-[22px] accent-[#e1352e]" />
            <label htmlFor={`${id}-ok`} className="text-[13px] leading-normal">
              He leído la{" "}
              <Link href="/privacidad" className="font-bold text-primary underline underline-offset-2">
                política de privacidad
              </Link>{" "}
              y acepto que ViajaJapón y su colaborador me escriban por esta solicitud.
            </label>
          </div>
          <p className="m-0 text-xs text-fg-muted">
            Pasamos tu solicitud, con tu nombre y tu contacto, a nuestro colaborador ({VUELOS.colaborador.nombre}), que es
            quien te escribe con el precio y el código.
          </p>
        </>
      )}

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Web</label>
        <input id={`${id}-website`} ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="m-0 border-2 border-primary bg-[#fff5f4] px-3 py-2 text-sm font-bold text-[#0a0a0a]">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {paso > 0 ? (
          <button type="button" onClick={() => irA(paso - 1)} className="min-h-11 px-1 font-bold underline underline-offset-2">
            ← Atrás
          </button>
        ) : (
          <span className="text-[13px] text-fg-muted">2 pasos · 1 minuto · sin registro</span>
        )}
        <button
          type="submit"
          disabled={enviando}
          className="min-h-12 border-[3px] border-[#0a0a0a] bg-[#e1352e] px-5 font-mono text-[13px] font-bold uppercase text-white disabled:opacity-60"
        >
          {paso < ULTIMO ? `Siguiente: ${PASOS[paso + 1].toLowerCase()} →` : enviando ? "Enviando…" : "Pedir mi precio"}
        </button>
      </div>
    </form>
  );
}
