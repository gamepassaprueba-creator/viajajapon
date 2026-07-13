import { getAllArticles } from "@/lib/content";
import { SearchClient } from "./SearchClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar artículos | ViajaJapón",
  description: "Busca guías, itinerarios y consejos para tu viaje a Japón.",
};

export default function BuscarPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <SearchClient articles={articles} />
    </main>
  );
}
