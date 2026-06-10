import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Uso de cookies en ViajaJapón.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Legal</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Política de cookies</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          [TODO: integrar un CMP conforme a la guía de la AEPD/LSSI art. 22.2 — rechazar tan fácil como aceptar,
          granular por categoría, sin casillas premarcadas. Bloquear cookies no esenciales (analítica, afiliados,
          anuncios) hasta el consentimiento.]
        </p>
        <p>De base usamos analítica sin cookies; el resto se carga solo con tu consentimiento.</p>
      </div>
    </article>
  );
}
