import type { Metadata } from "next";
import { PillarIndex, pillarHasContent } from "@/components/PillarIndex";

export const metadata: Metadata = {
  title: "Gastronomía y vida diaria en Japón",
  description:
    "Qué comer en Japón, dónde y a qué precio: platos imprescindibles, konbini y opciones para celíacos, veganos y halal. Con fotos reales.",
  alternates: { canonical: "/gastronomia" },
  ...(pillarHasContent("gastronomia") ? {} : { robots: { index: false, follow: true } }),
};

export default function Page() {
  return (
    <PillarIndex
      pillar="gastronomia"
      title="Gastronomía y vida diaria"
      intro="Qué probar y dónde, con fotos reales y precios actuales — y opciones para celíacos, veganos y halal."
    />
  );
}
