/**
 * Charla: diálogo madre-hijo (la marca de la casa). REGLA INNEGOCIABLE: solo
 * frases reales o reconstrucciones fieles aprobadas por el autor — jamás
 * guionizar a personas reales.
 *
 * Avatares: /public/avatares/{madre,hijo}.webp — retratos estilo anime/acuarela
 * generados por el propio autor (ilustración asistida por IA, declarada en
 * docs/CREDITOS-IMAGENES.md). Para cambiar un avatar, sustituir el archivo.
 *
 * variant="dark": sobre fondo oscuro (sección home bg-fg). Por defecto: fondo claro (artículos).
 */

const NOMBRES = { madre: "Mamá", hijo: "Yo" } as const;

function Avatar({ quien, dark }: { quien: "madre" | "hijo"; dark?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- webp de 12-19 KB ya optimizado a su tamaño final: next/image no aporta nada aquí
    <img
      src={`/avatares/${quien}.webp`}
      alt={`Avatar de ${NOMBRES[quien] === "Yo" ? "el autor" : "la madre del autor"}`}
      width={40}
      height={40}
      loading="lazy"
      className={`size-10 shrink-0 rounded-full border-2 ${dark ? "border-white/20" : "border-border"}`}
    />
  );
}

export function Charla({
  lineas,
  variant = "light",
}: {
  lineas: { quien: "madre" | "hijo"; texto: string }[];
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <figure className="space-y-4" role="group" aria-label="Conversación entre la madre y el hijo, autores de la web">
      {lineas.map((l, i) => {
        const esMadre = l.quien === "madre";
        return (
          <div key={i} className={`flex items-end gap-3 ${esMadre ? "" : "flex-row-reverse"}`}>
            <Avatar quien={l.quien} dark={dark} />
            <div
              className={`max-w-[80%] border-2 px-4 py-3 ${
                esMadre
                  ? dark
                    ? "border-white/20 bg-white/5"
                    : "border-border bg-muted"
                  : dark
                    ? "border-primary/60 bg-primary/10"
                    : "border-primary/30 bg-primary/5"
              }`}
            >
              <p className={`font-mono text-[10px] font-bold uppercase tracking-widest ${dark ? "text-white/40" : "text-fg-muted"}`}>
                {NOMBRES[l.quien]}
              </p>
              <p className={`mt-1 leading-relaxed ${dark ? "text-white/90" : "text-fg"}`}>{l.texto}</p>
            </div>
          </div>
        );
      })}
      <figcaption className="sr-only">Conversación real de los autores durante su viaje a Japón</figcaption>
    </figure>
  );
}
