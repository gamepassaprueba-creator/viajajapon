import { NextResponse } from "next/server";

/**
 * Alta de suscriptor en MailerLite (API v2 "connect").
 * El doble opt-in se activa en la cuenta de MailerLite (Settings → Double opt-in).
 * Sin MAILERLITE_API_KEY responde 503 (honesto: no finge que funciona).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "web").slice(0, 60);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    console.warn("[suscribir] MAILERLITE_API_KEY no configurada; alta NO registrada:", email);
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
        ...(groupId ? { groups: [groupId] } : {}),
        fields: { source },
      }),
    });

    // 200 (existente, actualizado) / 201 (creado) = OK. 422 = ya suscrito/validación → éxito suave.
    if (res.ok) {
      return NextResponse.json({ ok: true });
    }
    if (res.status === 422) {
      return NextResponse.json({ ok: true, already: true });
    }
    const detail = await res.text().catch(() => "");
    console.error("[suscribir] MailerLite respondió", res.status, detail);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  } catch (err) {
    console.error("[suscribir] fallo de red con MailerLite", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}
