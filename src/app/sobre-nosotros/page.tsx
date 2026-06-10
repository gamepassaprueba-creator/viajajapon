import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description: "Quién está detrás de ViajaJapón y por qué puedes fiarte de lo que lees.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Sobre nosotros</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Quién hay detrás</h1>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-fg-muted">
        {/* TODO (autor): biografía REAL. Cuándo y cuántas veces has viajado a Japón, qué zonas conoces,
            por qué empezaste el proyecto. Esto es E-E-A-T: experiencia y autoría verificables. Añade foto real. */}
        <p>
          ViajaJapón lo escribe alguien que ha viajado a Japón y se cansó de encontrar guías desactualizadas.
          Aquí los precios, las tasas y las reservas están comprobados y con fecha.
        </p>
        <p>
          [TODO: completa tu biografía real — viajes, zonas que conoces, por qué montaste esto. Incluye una foto propia.]
        </p>
      </div>
    </article>
  );
}
