import { getAllArticles } from "@/lib/content";
import { SearchClient } from "./SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar artículos | ViajaJapón",
  description: "Busca guías, itinerarios y consejos para tu viaje a Japón.",
  // El buscador interno puede generar muchas variantes ?q=. Deben ser útiles para
  // usuarios y para enlazado, pero no competir como páginas indexables en Google.
  robots: { index: false, follow: true },
};

export default function BuscarPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <SearchClient articles={articles} />
    </main>
  );
}
