import type { Metadata } from "next";
import { PillarIndex, pillarHasContent } from "@/components/PillarIndex";

export const metadata: Metadata = {
  title: "Itinerarios por Japón: 7, 10, 15 días y 1 mes",
  description:
    "Itinerarios para Japón según la duración de tu viaje, con rutas, presupuesto y enlaces a la calculadora del JR Pass.",
  alternates: { canonical: "/itinerarios" },
  // Indexar solo cuando haya contenido publicado; si está vacío, noindex (evita thin content).
  ...(pillarHasContent("itinerarios") ? {} : { robots: { index: false, follow: true } }),
};

export default function Page() {
  return (
    <PillarIndex
      pillar="itinerarios"
      title="Itinerarios por duración"
      intro="Rutas para 7, 10, 15 días y 1 mes, con presupuesto en euros y la cuenta del JR Pass."
    />
  );
}
