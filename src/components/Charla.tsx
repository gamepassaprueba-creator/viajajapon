/**
 * Charla: diálogo madre-hijo (la marca de la casa). REGLA INNEGOCIABLE: solo
 * frases reales o reconstrucciones fieles aprobadas por el autor — jamás
 * guionizar a personas reales.
 *
 * Avatares: /public/avatares/{madre,hijo}.webp — retratos estilo anime/acuarela
 * generados por el propio autor (ilustración asistida por IA, declarada en
 * docs/CREDITOS-IMAGENES.md). Para cambiar un avatar, sustituir el archivo.
 */

const NOMBRES = { madre: "Mamá", hijo: "Yo" } as const;

function Avatar({ quien }: { quien: "madre" | "hijo" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG estático diminuto: next/image no aporta y complica servir SVG
    <img
      src={`/avatares/${quien}.webp`}
      alt={`Avatar de ${NOMBRES[quien] === "Yo" ? "el autor" : "la madre del autor"}`}
      width={40}
      height={40}
      loading="lazy"
      className="size-10 shrink-0 rounded-full"
    />
  );
}

export function Charla({ lineas }: { lineas: { quien: "madre" | "hijo"; texto: string }[] }) {
  return (
    <figure className="my-8 space-y-3" role="group" aria-label="Conversación entre la madre y el hijo, autores de la web">
      {lineas.map((l, i) => {
        const esMadre = l.quien === "madre";
        return (
          <div key={i} className={`flex items-end gap-3 ${esMadre ? "" : "flex-row-reverse"}`}>
            <Avatar quien={l.quien} />
            <div
              className={`max-w-[80%] rounded-2xl border px-4 py-2.5 ${
                esMadre
                  ? "rounded-bl-sm border-border bg-muted"
                  : "rounded-br-sm border-primary/20 bg-primary/5"
              }`}
            >
              <p className="kicker text-fg-muted">{NOMBRES[l.quien]}</p>
              <p className="mt-0.5 leading-relaxed text-fg">{l.texto}</p>
            </div>
          </div>
        );
      })}
      <figcaption className="sr-only">Conversación real de los autores durante su viaje a Japón</figcaption>
    </figure>
  );
}
