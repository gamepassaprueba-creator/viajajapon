import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve AVIF (mejor compresión) con fallback a WebP. Mejora LCP del hero.
    formats: ["image/avif", "image/webp"],
  },
  // viajajapon.es y www → redirección permanente 308 al dominio canónico .com.
  // Next.js usa 308 (no 301) cuando permanent=true para conservar el método HTTP.
  // Regla explícita para la raíz ANTES del catch-all: en el adaptador de Cloudflare,
  // "/:path*" deja el token ":path*" sin interpolar cuando el path va vacío (raíz).
  // Con "/" exacto + "/:path+" (uno o más segmentos) cada caso interpola bien.
  async redirects() {
    return ["viajajapon.es", "www.viajajapon.es", "www.viajajapon.com"].flatMap((host) => [
      {
        source: "/",
        has: [{ type: "host" as const, value: host }],
        destination: "https://viajajapon.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host" as const, value: host }],
        destination: "https://viajajapon.com/:path+",
        permanent: true,
      },
    ]);
  },
  // Cabeceras de seguridad básicas (no rompen nada, suman en auditorías).
  async headers() {
    const base = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
    ];
    return [
      // Todo el sitio salvo /embed: prohibido incrustarlo en iframes ajenos.
      {
        source: "/:path((?!embed/).*)",
        headers: [...base, { key: "X-Frame-Options", value: "DENY" }],
      },
      // /embed/* es el widget para webs de terceros: DEBE poder ir en un iframe.
      // OpenNext aplica estas cabeceras por encima de las del route handler, así
      // que el permiso tiene que declararse aquí (frame-ancestors, no X-Frame-Options).
      {
        source: "/embed/:path*",
        headers: [...base, { key: "Content-Security-Policy", value: "frame-ancestors *" }],
      },
    ];
  },
};

export default nextConfig;

// Nota: si en el futuro se accede a bindings de Cloudflare (KV/R2/etc.) desde el código,
// añadir aquí `initOpenNextCloudflareForDev()` de "@opennextjs/cloudflare" para `next dev`.
// Ahora no se usa (todo va por process.env + fetch), así que se omite para no lanzar workerd en dev.
