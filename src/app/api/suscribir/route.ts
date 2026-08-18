import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
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
