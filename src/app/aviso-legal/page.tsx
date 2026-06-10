import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Información legal de ViajaJapón.",
  alternates: { canonical: "/aviso-legal" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Legal</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Aviso legal</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          [TODO con gestor — LSSI art. 10]: identidad del titular (nombre/NIF), datos de contacto, y condiciones de
          uso del sitio. Añadir aquí cuando esté constituida la actividad (autónomo).
        </p>
        <p>
          La información sobre viajes (precios, tasas, reservas) es orientativa y puede cambiar; verifica siempre en
          las fuentes oficiales antes de contratar o viajar.
        </p>
      </div>
    </article>
  );
}
