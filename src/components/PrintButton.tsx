"use client";

import { FileDown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * «Guardar en PDF» de los itinerarios: abre el diálogo de impresión del navegador, donde se elige
 * «Guardar como PDF». La hoja de impresión ya oculta la barra inferior y el aviso de cookies.
 */
export function PrintButton({ slug }: { slug: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        trackEvent("print_pdf", { content_slug: slug });
        window.print();
      }}
      className="flex min-h-11 items-center gap-1.5 font-medium text-[#0a0a0a] underline-offset-2 hover:underline print:hidden"
    >
      <FileDown size={16} aria-hidden="true" />
      Guardar en PDF
    </button>
  );
}
