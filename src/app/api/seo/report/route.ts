import { buildSeoReport } from "@/lib/seo-report";

function authorized(request: Request): boolean {
  const expected = process.env.SEO_REPORT_SECRET?.trim();
  if (!expected) return false;

  const auth = request.headers.get("authorization")?.trim();
  return auth === `Bearer ${expected}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return Response.json(
      { ok: false, error: "unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const report = await buildSeoReport();

    return Response.json(
      { ok: true, report },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    const safeMessage = message
      .replace(/-----BEGIN PRIVATE KEY-----[\s\S]*?-----END PRIVATE KEY-----/g, "[redacted]")
      .slice(0, 800);

    return Response.json(
      { ok: false, error: "report_failed", detail: safeMessage },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  }
}
