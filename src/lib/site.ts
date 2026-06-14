export const SITE = {
  name: "ViajaJapón",
  url: "https://viajajapon.com",
  tagline: "Guía práctica para viajar a Japón en 2026",
  description:
    "Planifica tu viaje a Japón en 2026: calculadora del JR Pass, presupuesto en euros, reservas, transporte y consejos prácticos con datos actualizados y experiencia real.",
  locale: "es_ES",
  author: {
    name: "Sergio Morillo",
    url: "https://viajajapon.com/sobre-nosotros",
  },
  nav: [
    { href: "/itinerarios", label: "Planifica" },
    { href: "/destinos", label: "Destinos" },
    { href: "/cultura", label: "Cultura" },
    { href: "/gastronomia", label: "Gastronomía" },
    { href: "/blog", label: "Blog" },
    { href: "/logistica", label: "Consejos" },
  ],
} as const;
