/**
 * Charla: diálogo madre-hijo estilo viñeta manga.
 * REGLA INNEGOCIABLE: solo frases reales aprobadas por el autor.
 * Ver docs/EXPERIENCIAS-DOCUMENTADAS.md.
 *
 * Avatares: /public/avatares/{madre,hijo}.webp — estilo anime/acuarela.
 */

const NOMBRES = { madre: "Mamá", hijo: "Yo" } as const;

function Avatar({ quien }: { quien: "madre" | "hijo" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/avatares/${quien}.webp`}
      alt={quien === "madre" ? "Avatar de la madre del autor" : "Avatar del autor"}
      width={52}
      height={52}
      loading="lazy"
      className="shrink-0 rounded-full border-3 border-[#0a0a0a] shadow-[2px_2px_0_#0a0a0a]"
      style={{ border: "2.5px solid #0a0a0a" }}
    />
  );
}

export function Charla({ lineas }: { lineas: { quien: "madre" | "hijo"; texto: string }[] }) {
  return (
    <figure
      className="space-y-8 py-2"
      role="group"
      aria-label="Conversación real entre los autores durante su viaje a Japón"
    >
      {lineas.map((l, i) => {
        const esMadre = l.quien === "madre";
        return (
          <div key={i} className={`flex items-end gap-3 ${esMadre ? "flex-row" : "flex-row-reverse"}`}>
            <div className="shrink-0 flex flex-col items-center gap-1.5">
              <Avatar quien={l.quien} />
              <span
                className="font-mono text-[9px] font-black uppercase tracking-wider text-[#0a0a0a]"
              >
                {NOMBRES[l.quien]}
              </span>
            </div>
            {/* Globo de texto manga */}
            <div
              className={`relative max-w-[75%] ${esMadre ? "globo globo-left" : "globo globo-right"}`}
              style={{ marginBottom: "20px" }}
            >
              <p className="text-sm leading-relaxed text-[#0a0a0a]">{l.texto}</p>
            </div>
          </div>
        );
      })}
      <figcaption className="sr-only">Conversación real de los autores durante su viaje a Japón en diciembre de 2025</figcaption>
    </figure>
  );
}
