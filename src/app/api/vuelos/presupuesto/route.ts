import { NextResponse } from "next/server";
import { parseFlightQuote, type FlightQuote } from "@/lib/flight-quote";

const MAX_BODY_BYTES = 8192;
const ALLOWED_ORIGINS = new Set([
  "https://viajajapon.com",
  "http://localhost:3000",
  "http://localhost:3001",
]);

const jsonHeaders = { "Cache-Control": "no-store, max-age=0" };

function config() {
  const enabled = process.env.VUELOS_ENABLED === "1";
  const apiKey = process.env.VUELOS_RESEND_API_KEY?.trim();
  const from = process.env.VUELOS_FROM_EMAIL?.trim();
  const to = process.env.VUELOS_NOTIFY_EMAIL?.trim();
  const siteKey = process.env.VUELOS_TURNSTILE_SITE_KEY?.trim();
  const turnstileSecret = process.env.VUELOS_TURNSTILE_SECRET?.trim();
  return { enabled, apiKey, from, to, siteKey, turnstileSecret,
    available: Boolean(enabled && apiKey && from && to && siteKey && turnstileSecret) };
}

export async function GET() {
  const c = config();
  return NextResponse.json(
    { available: c.available, ...(c.available ? { siteKey: c.siteKey } : {}) },
    { headers: jsonHeaders },
  );
}

const destinationLabels: Record<FlightQuote["destination"], string> = {
  indiferente: "Cualquier aeropuerto de Japón",
  tokio: "Tokio (cualquiera de sus aeropuertos)",
  osaka: "Osaka (Kansai)",
  nagoya: "Nagoya",
  otro: "Otro aeropuerto de Japón",
};

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  try {
    const form = new FormData();
    form.set("secret", secret);
    form.set("response", token);
    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(7000),
    });
    if (!result.ok) return false;
    const data = (await result.json()) as { success?: boolean; hostname?: string; action?: string };
    return data.success === true &&
      (data.hostname === "viajajapon.com" || data.hostname === "localhost") &&
      data.action === "vuelos_japon";
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!ALLOWED_ORIGINS.has(req.headers.get("origin") ?? "")) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403, headers: jsonHeaders });
  }

  const c = config();
  if (!c.available || !c.apiKey || !c.from || !c.to || !c.turnstileSecret) {
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503, headers: jsonHeaders });
  }

  if (Number(req.headers.get("content-length") ?? "0") > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413, headers: jsonHeaders });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "too_large" }, { status: 413, headers: jsonHeaders });
    }
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400, headers: jsonHeaders });
  }

  // Campo trampa que el visitante no ve. Nunca se envían correos por esta ruta.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true, reference: "VJ-RECIBIDO" }, { headers: jsonHeaders });
  }

  const quote = parseFlightQuote(body);
  if (!quote) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400, headers: jsonHeaders });
  }
  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (token.length < 10 || token.length > 4096 || !(await verifyTurnstile(token, c.turnstileSecret))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400, headers: jsonHeaders });
  }

  const reference = "VJ-" + crypto.randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase();
  const text = [
    "SOLICITUD DE PRESUPUESTO · VIAJAJAPÓN",
    "Referencia: " + reference,
    "Origen: " + quote.origin,
    "Destino: " + destinationLabels[quote.destination],
    "Ida: " + quote.departureDate,
    "Vuelta: " + quote.returnDate,
    "Flexibilidad: " + quote.flexibility,
    "Adultos: " + quote.adults,
    "Menores: " + quote.minors,
    "Edades de menores: " + (quote.minorAges || "No aplica"),
    "Equipaje: " + quote.baggage,
    "Escalas: " + quote.stops,
    "Presupuesto máximo por persona: " + (quote.budgetPerPerson ? quote.budgetPerPerson + " EUR" : "Sin indicar"),
    "Nombre: " + quote.name,
    "Email: " + quote.email,
    "Teléfono: " + (quote.phone || "No indicado"),
    "Comentarios: " + (quote.notes || "Ninguno"),
    "Consentimiento para gestionar esta solicitud: sí",
    "",
    "NOTA: No es una reserva. Confirmar tarifa, disponibilidad y proveedor antes de cobrar.",
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + c.apiKey,
        "Content-Type": "application/json",
        "Idempotency-Key": reference,
      },
      body: JSON.stringify({
        from: c.from,
        to: [c.to],
        reply_to: quote.email,
        subject: "[" + reference + "] Solicitud de vuelo a Japón",
        text,
      }),
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) {
      console.error("[vuelos] envío fallido", res.status, reference);
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502, headers: jsonHeaders });
    }
    return NextResponse.json({ ok: true, reference }, { headers: jsonHeaders });
  } catch {
    console.error("[vuelos] error de conexión con proveedor", reference);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502, headers: jsonHeaders });
  }
}
