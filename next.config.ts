import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve AVIF (mejor compresión) con fallback a WebP. Mejora LCP del hero.
    formats: ["image/avif", "image/webp"],
  },
  // viajajapon.es y www → 301 al dominio canónico .com (mismo worker sirve ambos).
  async redirects() {
    return ["viajajapon.es", "www.viajajapon.es", "www.viajajapon.com"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://viajajapon.com/:path*",
      permanent: true,
    }));
  },
  // Cabeceras de seguridad básicas (no rompen nada, suman en auditorías).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;

// Nota: si en el futuro se accede a bindings de Cloudflare (KV/R2/etc.) desde el código,
// añadir aquí `initOpenNextCloudflareForDev()` de "@opennextjs/cloudflare" para `next dev`.
// Ahora no se usa (todo va por process.env + fetch), así que se omite para no lanzar workerd en dev.
