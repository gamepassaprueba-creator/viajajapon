import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/content";
import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Imagen Open Graph de marca para un artículo (1200×630).
 * Se genera en build (SSG) con la fuente por defecto de next/og, sin leer
 * archivos en runtime — compatible con el deploy en Cloudflare Workers.
 */
export function articleOgImage(pillar: string, slug: string) {
  const article = getArticle(pillar, slug);
  const title = article?.meta.title ?? `${SITE.name} — ${SITE.tagline}`;
  const kicker = article?.meta.kicker ?? "Japón";
  // Títulos largos bajan de cuerpo para no desbordar el lienzo.
  const fontSize = title.length > 70 ? 50 : 62;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBF8F1",
          padding: "72px 72px 56px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 14,
            backgroundColor: "#d32f2f",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: 5,
              fontSize: 27,
              color: "#b71c1c",
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize,
              lineHeight: 1.15,
              color: "#231d1a",
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="60" height="60" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#d32f2f" />
            <g fill="#ffffff">
              <rect x="5.5" y="8.5" width="21" height="3" rx="1" />
              <rect x="8" y="13" width="16" height="2.4" rx="0.8" />
              <rect x="9.5" y="11.5" width="3" height="13" rx="0.9" />
              <rect x="19.5" y="11.5" width="3" height="13" rx="0.9" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#231d1a" }}>viajajapon.com</div>
            <div style={{ fontSize: 21, color: "#6e645d" }}>{SITE.tagline}</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
