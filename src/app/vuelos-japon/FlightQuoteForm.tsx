"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type TurnstileApi = {
  render: (element: HTMLElement, options: {
    sitekey: string;
    action: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => string;
  remove: (id: string) => void;
};
type TurnstileWindow = Window & { turnstile?: TurnstileApi };

const input = "min-h-12 w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-base text-[#0a0a0a] outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#d32f2f]";
const label = "mb-1.5 block text-sm font-bold text-[#0a0a0a]";
const today = () => new Date().toLocaleDateString("sv-SE");

const defaults = {
  origin: "", destination: "indiferente", departureDate: "", returnDate: "",
  flexibility: "exactas", adults: 2, minors: 0, minorAges: "",
  baggage: "facturada", stops: "indiferente",
  budgetPerPerson: "", name: "", email: "", phone: "", notes: "",
  privacyAccepted: false, website: "",
};
type FormValues = typeof defaults;
type State = "checking" | "disabled" | "ready" | "sending" | "success" | "error";

export function FlightQuoteForm() {
  const [values, setValues] = useState<FormValues>(defaults);
  const [status, setStatus] = useState<State>("checking");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [siteKey, setSiteKey] = useState("");
  const [token, setToken] = useState("");
  const captcha = useRef<HTMLDivElement>(null);
  const tokenRef = useRef("");

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  useEffect(() => {
    let active = true;
    fetch("/api/vuelos/presupuesto", { cache: "no-store" })
      .then(async (r) => r.ok ? r.json() : { available: false })
      .then((v: { available?: boolean; siteKey?: string }) => {
        if (!active) return;
        if (v.available === true && typeof v.siteKey === "string") {
          setSiteKey(v.siteKey);
          setStatus("ready");
        } else setStatus("disabled");
      }).catch(() => { if (active) setStatus("disabled"); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!siteKey || status === "disabled" || !captcha.current) return;
    let cancelled = false;
    let widgetId: string | undefined;
    const scriptId = "viajajapon-turnstile-script";
    function render() {
      if (cancelled || widgetId || !captcha.current) return;
      const api = (window as TurnstileWindow).turnstile;
      if (!api) return;
      widgetId = api.render(captcha.current, {
        sitekey: siteKey, action: "vuelos_japon",
        callback: (value) => { tokenRef.current = value; setToken(value); },
        "expired-callback": () => { tokenRef.current = ""; setToken(""); },
        "error-callback": () => { tokenRef.current = ""; setToken(""); },
      });
    }
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!existing) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = render;
      document.head.appendChild(script);
    } else if ((window as TurnstileWindow).turnstile) render();
    else existing.addEventListener("load", render);
    return () => {
      cancelled = true;
      existing?.removeEventListener("load", render);
      if (widgetId) (window as TurnstileWindow).turnstile?.remove(widgetId);
    };
  }, [siteKey, status === "disabled"]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "ready" && status !== "error") return;
    if (!tokenRef.current) {
      setStatus("error");
      setMessage("Completa la comprobación de seguridad antes de enviar.");
      return;
    }
    if (values.returnDate <= values.departureDate) {
      setStatus("error");
      setMessage("La vuelta debe ser posterior a la ida.");
      return;
    }
    if (values.minors > 0) {
      const ages = values.minorAges.split(",").map((v) => Number(v.trim()));
      if (ages.length !== values.minors || ages.some((a) => !Number.isInteger(a) || a < 0 || a > 17)) {
        setStatus("error");
        setMessage("Indica las edades de todos los menores, separadas por comas (0 a 17 años).");
        return;
      }
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/vuelos/presupuesto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          adults: Number(values.adults),
          minors: Number(values.minors),
          budgetPerPerson: values.budgetPerPerson ? Number(values.budgetPerPerson) : null,
          turnstileToken: tokenRef.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || data.ok !== true || !data.reference) {
        setStatus(data.error === "unavailable" ? "disabled" : "error");
        setMessage(data.error === "captcha"
          ? "La comprobación de seguridad ha caducado. Actualiza la página y vuelve a intentarlo."
          : "No hemos podido enviar tu solicitud. Prueba de nuevo más tarde o escribe a info@viajajapon.com.");
        return;
      }
      setReference(data.reference);
      setStatus("success");
      trackEvent("vuelo_presupuesto_solicitado", { source: "formulario_vuelos" });
    } catch {
      setStatus("error");
      setMessage("No hay conexión con el servicio. Comprueba tu conexión y vuelve a intentarlo.");
    }
  }

  if (status === "checking") return <p role="status" className="border-2 border-border p-6">Comprobando si se pueden solicitar presupuestos…</p>;
  if (status === "disabled") return (
    <section className="border-[3px] border-[#0a0a0a] bg-[#f5f5f5] p-5 sm:p-7">
      <h2 className="text-2xl font-black">Próximamente</h2>
      <p className="mt-3 text-fg-muted">Estamos preparando este servicio con un colaborador de vuelos. Todavía no aceptamos solicitudes de presupuesto desde la web.</p>
      <p className="mt-3 text-sm">Para consultas generales puedes escribirnos a <a className="font-bold text-primary underline" href="mailto:info@viajajapon.com">info@viajajapon.com</a>.</p>
    </section>
  );
  if (status === "success") return (
    <section role="status" className="border-[3px] border-[#15803d] bg-[#f0fdf4] p-6 sm:p-8">
      <h2 className="text-2xl font-black">Solicitud enviada</h2>
      <p className="mt-3">Hemos recibido tu petición. Conserva tu referencia <strong className="font-mono">{reference}</strong>.</p>
      <p className="mt-3 text-sm">Esto no es una reserva ni confirma una tarifa. Nos pondremos en contacto mediante el correo indicado si podemos preparar una propuesta.</p>
    </section>
  );

  return (
    <form onSubmit={submit} className="space-y-8 border-[3px] border-[#0a0a0a] bg-white p-4 shadow-[5px_5px_0_#e1352e] sm:p-7">
      <fieldset className="space-y-4">
        <legend className="text-xl font-black">01 · Tu viaje</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="flight-origin">Aeropuerto o ciudad de salida *</label><input id="flight-origin" className={input} required maxLength={90} placeholder="Madrid, Barcelona, Valencia…" autoComplete="off" value={values.origin} onChange={(e) => set("origin", e.target.value)} /></div>
          <div><label className={label} htmlFor="flight-destination">Llegada a Japón *</label><select id="flight-destination" className={input} value={values.destination} onChange={(e) => set("destination", e.target.value)}>
            <option value="indiferente">Me da igual (mejor opción)</option><option value="tokio">Tokio</option><option value="osaka">Osaka / Kansai</option><option value="nagoya">Nagoya</option><option value="otro">Otro aeropuerto (detallar abajo)</option>
          </select></div>
          <div><label className={label} htmlFor="flight-departure">Fecha de ida *</label><input id="flight-departure" className={input} type="date" min={today()} required value={values.departureDate} onChange={(e) => set("departureDate", e.target.value)} /></div>
          <div><label className={label} htmlFor="flight-return">Fecha de vuelta *</label><input id="flight-return" className={input} type="date" min={values.departureDate || today()} required value={values.returnDate} onChange={(e) => set("returnDate", e.target.value)} /></div>
          <div><label className={label} htmlFor="flight-flexibility">Flexibilidad de fechas</label><select id="flight-flexibility" className={input} value={values.flexibility} onChange={(e) => set("flexibility", e.target.value)}><option value="exactas">Solo esas fechas</option><option value="tres_dias">± 3 días</option><option value="siete_dias">± 7 días</option></select></div>
          <div><label className={label} htmlFor="flight-stops">Preferencia de escalas</label><select id="flight-stops" className={input} value={values.stops} onChange={(e) => set("stops", e.target.value)}><option value="indiferente">Me da igual</option><option value="directo">Solo vuelo directo</option><option value="una_escala">Máximo una escala</option></select></div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t-2 border-border pt-6">
        <legend className="text-xl font-black">02 · Viajeros y equipaje</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="flight-adults">Adultos (18 años o más) *</label><input id="flight-adults" className={input} type="number" min={1} max={9} required value={values.adults} onChange={(e) => set("adults", Number(e.target.value))} /></div>
          <div><label className={label} htmlFor="flight-minors">Menores de 18 años</label><input id="flight-minors" className={input} type="number" min={0} max={6} required value={values.minors} onChange={(e) => set("minors", Number(e.target.value))} /></div>
          {values.minors > 0 && <div className="sm:col-span-2"><label className={label} htmlFor="flight-ages">Edades de los menores al viajar *</label><input id="flight-ages" className={input} required placeholder="Ejemplo: 4, 12" maxLength={80} value={values.minorAges} onChange={(e) => set("minorAges", e.target.value)} /><p className="mt-1 text-xs text-fg-muted">Una edad por menor, separadas por comas.</p></div>}
          <div><label className={label} htmlFor="flight-baggage">Equipaje</label><select id="flight-baggage" className={input} value={values.baggage} onChange={(e) => set("baggage", e.target.value)}><option value="facturada">Con maleta facturada</option><option value="mano">Solo equipaje de mano</option><option value="indiferente">Me da igual</option></select></div>
          <div><label className={label} htmlFor="flight-budget">Presupuesto máximo por persona (€)</label><input id="flight-budget" className={input} type="number" min={100} max={10000} step={1} placeholder="Opcional" value={values.budgetPerPerson} onChange={(e) => set("budgetPerPerson", e.target.value)} /></div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 border-t-2 border-border pt-6">
        <legend className="text-xl font-black">03 · ¿Dónde te respondemos?</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label} htmlFor="flight-name">Nombre *</label><input id="flight-name" className={input} autoComplete="name" maxLength={100} required value={values.name} onChange={(e) => set("name", e.target.value)} /></div>
          <div><label className={label} htmlFor="flight-email">Correo electrónico *</label><input id="flight-email" className={input} type="email" autoComplete="email" maxLength={254} required value={values.email} onChange={(e) => set("email", e.target.value)} /></div>
          <div><label className={label} htmlFor="flight-phone">Teléfono (opcional)</label><input id="flight-phone" className={input} type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={(e) => set("phone", e.target.value)} /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="flight-notes">Detalles adicionales (opcional)</label><textarea id="flight-notes" className={input + " min-h-28"} maxLength={600} placeholder="Otro aeropuerto, fechas alternativas, necesidades especiales…" value={values.notes} onChange={(e) => set("notes", e.target.value)} /></div>
        </div>
      </fieldset>

      <section className="space-y-4 border-t-2 border-border pt-6">
        <div className="flex items-start gap-3">
          <input id="flight-privacy" type="checkbox" className="mt-1 size-5 accent-[#d32f2f]" checked={values.privacyAccepted} onChange={(e) => set("privacyAccepted", e.target.checked)} required />
          <label htmlFor="flight-privacy" className="text-sm leading-relaxed">Acepto que ViajaJapón trate mis datos para gestionar esta solicitud de presupuesto y responderme por correo. He leído la <Link href="/privacidad" className="font-bold text-primary underline">política de privacidad</Link>. * No me suscribo a ninguna newsletter.</label>
        </div>
        <p className="text-xs leading-relaxed text-fg-muted">No pedimos pasaporte ni tarjeta bancaria. No se realiza ningún cargo. El presupuesto no garantiza precio ni disponibilidad; una eventual reserva se formalizará con el proveedor identificado en la oferta.</p>
        <div className="hidden" aria-hidden="true"><label htmlFor="flight-website">No rellenar</label><input id="flight-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} /></div>
        <div ref={captcha} aria-label="Comprobación de seguridad" />
        {status === "error" && <p role="alert" className="border-2 border-[#b91c1c] bg-[#fff5f4] p-3 text-sm font-bold text-[#b91c1c]">{message}</p>}
        <button className="btn-primary min-h-12 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto" type="submit" disabled={status === "sending" || !token || !values.privacyAccepted}>
          {status === "sending" ? "Enviando solicitud…" : "Solicitar presupuesto sin compromiso →"}
        </button>
      </section>
    </form>
  );
}
