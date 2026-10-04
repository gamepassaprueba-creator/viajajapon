import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 2048;
const ALLOWED_ORIGINS = new Set([
  "https://viajajapon.com",
  "http://localhost:3000",
  "http://localhost:3001",
]);

// Anti-abuso mínimo: solo aceptamos envíos desde nuestro propio formulario.
// Un navegador siempre manda Origin en un POST fetch; un script que no lo
// falsifique (o lo falsifique mal) queda fuera.
function isAllowedOrigin(req: Request) {
  const origin = req.headers.get("origin");
  return origin !== null && ALLOWED_ORIGINS.has(origin);
}

function isConfigured() {
  return Boolean(process.env.MAILERLITE_API_KEY && process.env.MAILERLITE_GROUP_ID);
}

export async function GET() {
  return NextResponse.json(
    { available: isConfigured() },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function POST(req: Request) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: { email?: string; source?: string; website?: string };
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "bad_request" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: un humano nunca rellena el campo oculto "website". Respondemos OK
  // para no dar pistas al bot, pero no llamamos a MailerLite.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, already: false });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) {
    console.warn("[suscribir] MailerLite no configurado completamente");
    return NextResponse.json({ ok: false, error: "config" }, { status: 503 });
  }

  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
      }),
    });

    if (res.status === 201) {
      return NextResponse.json({ ok: true, already: false });
    }
    if (res.status === 200) {
      return NextResponse.json({ ok: true, already: true });
    }

    console.error("[suscribir] MailerLite error", res.status);
    return NextResponse.json(
      { ok: false, error: res.status === 422 ? "validation" : "upstream" },
      { status: res.status === 422 ? 400 : 502 },
    );
  } catch (err) {
    console.error(
      "[suscribir] fallo de red con MailerLite",
      err instanceof Error ? err.name : "unknown",
    );
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
