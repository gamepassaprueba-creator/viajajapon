import type { Metadata } from "next";
import { PillarIndex, pillarHasContent } from "@/components/PillarIndex";

export const metadata: Metadata = {
  title: "Cultura y costumbres de Japón",
  description:
    "Etiqueta, festivales, ryokan, onsen y alquiler de kimono: lo que necesitas saber para disfrutar la cultura japonesa con respeto.",
  alternates: { canonical: "/cultura" },
  ...(pillarHasContent("cultura") ? {} : { robots: { index: false, follow: true } }),
};

export default function Page() {
  return (
    <PillarIndex
      pillar="cultura"
      title="Cultura y costumbres"
      intro="Etiqueta, festivales (matsuri), ryokan y onsen, y alquiler de kimono: para disfrutar la cultura japonesa con respeto."
    />
  );
}
