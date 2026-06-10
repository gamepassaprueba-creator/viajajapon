import type { Metadata } from "next";
import { PillarIndex, pillarHasContent } from "@/components/PillarIndex";

export const metadata: Metadata = {
  title: "Destinos de Japón: guías por ciudad",
  description:
    "Guías de Tokio, Kioto, Osaka y más: qué ver, cómo moverte y dónde comer, con datos prácticos y actualizados.",
  alternates: { canonical: "/destinos" },
  ...(pillarHasContent("destinos") ? {} : { robots: { index: false, follow: true } }),
};

export default function Page() {
  return (
    <PillarIndex
      pillar="destinos"
      title="Destinos imprescindibles"
      intro="Guías por ciudad (Tokio, Kioto, Osaka y más) centradas en lo práctico: qué ver, cómo moverte y dónde comer."
    />
  );
}
