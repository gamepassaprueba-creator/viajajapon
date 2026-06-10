import type { Metadata } from "next";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Viajes prácticos: logística para tu viaje a Japón",
  description:
    "Transporte, JR Pass, eSIM, seguros, reservas y trámites: todo lo práctico y actualizado para planificar tu viaje a Japón en 2026.",
  alternates: { canonical: "/logistica" },
};

const fmtDate = (iso: string) =>
  new Intl.DateTimeFormat("es-ES", { month: "short", year: "numeric" }).format(new Date(iso));

export default function Page() {
  const articles = getArticles("logistica");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="kicker text-primary">Pilar</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Viajes prácticos</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">
        Lo que cambia cada año y nadie actualiza: precios del JR Pass, tasas, reservas con fechas exactas, eSIM
        y seguros. Con cifras de 2026 y enlaces a las herramientas.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard
            key={a.slug}
            href={`/logistica/${a.slug}`}
            kicker={a.kicker}
            title={a.title}
            excerpt={a.excerpt}
            date={`Actualizado · ${fmtDate(a.dateModified)}`}
          />
        ))}
      </div>
    </div>
  );
}
