import { NextResponse } from "next/server";
import {
  VUELOS,
  VUELOS_CANALES,
  VUELOS_CAPTURA_MAX,
  VUELOS_CAPTURA_TIPOS,
  VUELOS_CLASES,
  VUELOS_DESTINOS,
  VUELOS_FLEXIBILIDAD,
  VUELOS_MALETAS,
  VUELOS_PRIORIDAD,
  VUELOS_VISTO_EN,
  VUELOS_ESTIMADO,
  calcularEstimado,
  euros,
} from "@/data/vuelos";

// Recibe las solicitudes del formulario de /vuelos-a-japon y las manda por Telegram SOLO al
// titular, que se las reenvía al colaborador (decisión del titular, 21-nov-2026).
// No guarda nada: ni los datos ni la captura se almacenan en ningún servidor nuestro.

const MAX_BODY_BYTES = VUELOS_CAPTURA_MAX + 64 * 1024;
const ALLOWED_ORIGINS = new Set([
  "https://viajajapon.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3123",
]);
const NO_STORE = { "Cache-Control": "no-store, max-age=0" };
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isAllowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  return origin !== null && ALLOWED_ORIGINS.has(origin);
}

function isConfigured() {
  return Boolean(
    process.env.VUELOS_ACTIVO === "1" && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID,
  );
}

export async function GET() {
  return NextResponse.json({ available: isConfigured() }, { headers: NO_STORE });
}

function text(form: FormData, key: string, max: number): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function oneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return (options as readonly string[]).includes(value);
}

function count(form: FormData, key: string, min: number, max: number): number | null {
  const n = Number(text(form, key, 3));
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
}

function fechaLarga(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(y, m - 1, d)),
  );
}

function plazo(horas: number) {
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(new Date(Date.now() + horas * 3600 * 1000));
}

function referencia() {
  const bytes = crypto.getRandomValues(new Uint8Array(3));
  const sufijo = Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 5).toUpperCase();
  return `VJ-${sufijo}`;
}

async function telegram(method: string, body: BodyInit, json: boolean) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: json ? { "Content-Type": "application/json" } : undefined,
    body,
  });
  return res.ok;
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  if (!isConfigured()) {
    return NextResponse.json({ ok: false, error: "config" }, { status: 503 });
  }
  const length = Number(req.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: un humano no rellena el campo oculto «website».
  if (text(form, "website", 200) !== "") {
    return NextResponse.json({ ok: true, ref: referencia(), plazo: plazo(VUELOS.respuestaHoras) });
  }

  const origen = text(form, "origen", 80);
  const destino = text(form, "destino", 20);
  const ida = text(form, "ida", 10);
  const vuelta = text(form, "vuelta", 10);
  const flexibilidad = text(form, "flexibilidad", 30);
  const adultos = count(form, "adultos", 1, 9);
  const ninos = count(form, "ninos", 0, 9);
  const bebes = count(form, "bebes", 0, 9);
  const maletas = text(form, "maletas", 10);
  const clase = text(form, "clase", 20);
  const precio = text(form, "precio", 12).replace(/[^\d.,]/g, "");
  const vistoEn = text(form, "vistoEn", 20);
  const prioridad = text(form, "prioridad", 20);
  const nota = text(form, "nota", 400);
  const nombre = text(form, "nombre", 60);
  const canal = text(form, "canal", 10);
  const contacto = text(form, "contacto", 120);
  const consentimiento = text(form, "consentimiento", 3) === "si";

  const errors: string[] = [];
  if (origen.length < 2) errors.push("origen");
  if (!oneOf(destino, VUELOS_DESTINOS)) errors.push("destino");
  if (!DATE_RE.test(ida)) errors.push("ida");
  if (!DATE_RE.test(vuelta) || vuelta < ida) errors.push("vuelta");
  if (!oneOf(flexibilidad, VUELOS_FLEXIBILIDAD)) errors.push("flexibilidad");
  if (adultos === null || ninos === null || bebes === null || bebes > adultos) errors.push("viajeros");
  if (!oneOf(maletas, VUELOS_MALETAS)) errors.push("maletas");
  if (!oneOf(clase, VUELOS_CLASES)) errors.push("clase");
  if (vistoEn && !oneOf(vistoEn, VUELOS_VISTO_EN)) errors.push("vistoEn");
  if (prioridad && !oneOf(prioridad, VUELOS_PRIORIDAD)) errors.push("prioridad");
  if (nombre.length < 2) errors.push("nombre");
  if (!oneOf(canal, VUELOS_CANALES)) errors.push("canal");
  if (canal === "Correo" ? !EMAIL_RE.test(contacto) : contacto.replace(/\D/g, "").length < 6 && !/^@?\w{4,}$/.test(contacto)) {
    errors.push("contacto");
  }
  if (!consentimiento) errors.push("consentimiento");

  const captura = form.get("captura");
  const file = captura instanceof File && captura.size > 0 ? captura : null;
  if (file && (file.size > VUELOS_CAPTURA_MAX || !oneOf(file.type, VUELOS_CAPTURA_TIPOS))) errors.push("captura");

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: "validation", fields: errors }, { status: 400 });
  }

  const ref = referencia();
  const respondeAntes = plazo(VUELOS.respuestaHoras);
  const viajeros = [
    `${adultos} adulto${adultos === 1 ? "" : "s"}`,
    ninos ? `${ninos} niño${ninos === 1 ? "" : "s"}` : "",
    bebes ? `${bebes} bebé${bebes === 1 ? "" : "s"}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  // La misma cuenta que vio el lector en el formulario, rehecha aquí con la regla vigente.
  const est = calcularEstimado(precio, (adultos ?? 1) + (ninos ?? 0));
  const codigo = VUELOS_ESTIMADO?.codigo ?? null;
  const pctEstimado = VUELOS_ESTIMADO ? Math.round(VUELOS_ESTIMADO.descuento * 100) : 0;
  const regla = !VUELOS_ESTIMADO
    ? ""
    : codigo
      ? `${pctEstimado} % de descuento − código ${
          codigo.tipo === "porcentaje"
            ? `${Math.round(codigo.valor * 1000) / 10} %`
            : `${euros(codigo.valor)}${codigo.porPersona ? " por persona" : ""}`
        }`
      : `le enseñamos un ahorro neto del ${pctEstimado} %; tu oferta no debe quedar por debajo`;
  const lineaEstimado = est
    ? est.compensa
      ? `Le hemos mostrado: ≈ ${euros(est.total)} (${euros(est.porPersona)}/persona, ahorro ≈ ${euros(est.ahorro)}) · regla: ${regla}`
      : `Le hemos dicho que con ese precio el código no compensa (ahorro ≈ ${euros(est.ahorro)}) · regla: ${regla}`
    : "";

  // Enlace para que el colaborador conteste al lector con un toque desde el móvil.
  const saludo = `Hola ${nombre}, te escribo de parte de ViajaJapón por tu solicitud ${ref} de vuelo a Japón: `;
  const digitos = contacto.replace(/\D/g, "");
  const responder =
    canal === "Correo"
      ? `mailto:${contacto}?subject=${encodeURIComponent(`Tu vuelo a Japón (${ref})`)}&body=${encodeURIComponent(saludo)}`
      : canal === "WhatsApp"
        ? `https://wa.me/${digitos}?text=${encodeURIComponent(saludo)}`
        : contacto.startsWith("@") || !/^\+?[\d\s]+$/.test(contacto)
          ? `https://t.me/${contacto.replace(/^@/, "")}`
          : `https://t.me/+${digitos}`;

  // Mensaje 1, aviso para el titular. Mensaje 2, la solicitud completa que se reenvía al colaborador,
  // que es quien atiende al lector (así lo dicen el formulario y la política de privacidad).
  const paraColaborador = [
    `✈️ Solicitud ${ref} de ViajaJapón · responder antes del ${respondeAntes}`,
    `Cliente: ${nombre} · prefiere ${canal}: ${contacto}`,
    `Contestar: ${responder}`,
    "",
    `${origen} → ${destino}`,
    `Ida ${fechaLarga(ida)}, vuelta ${fechaLarga(vuelta)} (${flexibilidad.toLowerCase()})`,
    `${viajeros} · ${maletas} maleta(s) facturada(s) por persona · ${clase}`,
    precio ? `Visto a ${precio} €${vistoEn ? ` en ${vistoEn}` : ""}` : "Aún no ha mirado precio",
    lineaEstimado,
    prioridad ? `Valora: ${prioridad.toLowerCase()}` : "",
    file ? "Captura del vuelo: en el mensaje siguiente" : "Sin captura",
    nota ? `Nota: ${nota}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const enviar = (chat: string, texto: string) =>
    telegram("sendMessage", JSON.stringify({ chat_id: chat, text: texto, link_preview_options: { is_disabled: true } }), true);
  const enviarCaptura = async (chat: string) => {
    if (!file) return;
    const photo = new FormData();
    photo.append("chat_id", chat);
    photo.append("caption", `${ref} · captura del lector`);
    photo.append("document", file, `${ref}.${file.type.split("/")[1]}`);
    // Si la captura falla, la solicitud ya ha llegado: no se lo hacemos repetir al lector.
    if (!(await telegram("sendDocument", photo, false))) console.error("[vuelos] Telegram rechazó la captura");
  };

  try {
    const titular = process.env.TELEGRAM_CHAT_ID as string;

    // Mensaje 1, aviso para el titular. Mensaje 2, la solicitud completa que él reenvía al colaborador.
    const privado = [
      `🔔 Nueva solicitud ${ref} (${nombre}, ${origen} → ${destino})`,
      `Hay que responder antes del ${respondeAntes}.`,
      "",
      `👇 Reenvía a ${VUELOS.colaborador.nombre || "nuestro colaborador"} el mensaje de abajo: lleva todo lo que necesita para escribir al cliente.`,
    ].join("\n");
    const sent = await enviar(titular, privado);
    const reenviable = sent && (await enviar(titular, paraColaborador));
    if (!sent || !reenviable) {
      console.error("[vuelos] Telegram rechazó el mensaje");
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
    await enviarCaptura(titular);
  } catch (err) {
    console.error("[vuelos] fallo de red con Telegram", err instanceof Error ? err.name : "unknown");
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, ref, plazo: respondeAntes }, { headers: NO_STORE });
}
