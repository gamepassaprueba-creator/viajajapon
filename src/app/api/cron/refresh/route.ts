import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Motor de frescura v1. Un cron externo (Cloudflare Cron Trigger → fetch a esta URL)
 * marca como "stale" los datos vivos; se refrescan con stale-while-revalidate en la
 * siguiente visita. Protegido por CRON_SECRET (header Bearer o ?token=).
 *
 * Uso:  GET /api/cron/refresh?task=fx        (Authorization: Bearer <CRON_SECRET>)
 * Extensible: añade tags conforme aparezcan más datos vivos (festivos, clima, sakura…).
 */

export const dynamic = "force-dynamic";

const TASK_TAGS: Record<string, string[]> = {
  fx: ["fx"], // cambio EUR/JPY (lib/fx.ts usa next.tags=['fx'])
  all: ["fx"],
};

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Sin secreto configurado, el endpoint queda deshabilitado (no abrir un cron público).
    return NextResponse.json({ ok: false, error: "cron_disabled" }, { status: 503 });
  }

  const url = new URL(req.url);
  const provided =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("token") ??
    "";

  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const task = url.searchParams.get("task") ?? "all";
  const tags = TASK_TAGS[task] ?? TASK_TAGS.all;
  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({ ok: true, task, revalidated: tags });
}
