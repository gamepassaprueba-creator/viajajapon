/**
 * Charla: diálogo madre-hijo (la marca de la casa). REGLA INNEGOCIABLE: solo
 * frases reales o reconstrucciones fieles aprobadas por el autor — jamás
 * guionizar a personas reales. Avatares provisionales en SVG (chibi plano)
 * hasta que lleguen las ilustraciones definitivas.
 */

const NOMBRES = { madre: "Mamá", hijo: "Yo" } as const;

function AvatarMadre() {
  return (
    <svg viewBox="0 0 48 48" className="size-10 shrink-0" role="img" aria-label="Avatar de la madre">
      <circle cx="24" cy="24" r="23" fill="#fdf1e7" stroke="#e8d5c4" strokeWidth="1" />
      {/* moño y pelo gris */}
      <circle cx="24" cy="9" r="6" fill="#b9b3ad" />
      <path d="M8 26c0-10 7-17 16-17s16 7 16 17l-4-2c0-8-5-13-12-13S12 16 12 24z" fill="#cfc8c1" />
      {/* gafas */}
      <circle cx="17.5" cy="25" r="4.5" fill="none" stroke="#8a8580" strokeWidth="1.6" />
      <circle cx="30.5" cy="25" r="4.5" fill="none" stroke="#8a8580" strokeWidth="1.6" />
      <path d="M22 25h4" stroke="#8a8580" strokeWidth="1.6" />
      {/* ojos y sonrisa */}
      <circle cx="17.5" cy="25" r="1.4" fill="#5a554f" />
      <circle cx="30.5" cy="25" r="1.4" fill="#5a554f" />
      <path d="M19 33c2.8 2.6 7.2 2.6 10 0" fill="none" stroke="#c46a5a" strokeWidth="1.8" strokeLinecap="round" />
      {/* coloretes */}
      <circle cx="13" cy="30" r="2" fill="#f4b8a8" opacity="0.6" />
      <circle cx="35" cy="30" r="2" fill="#f4b8a8" opacity="0.6" />
    </svg>
  );
}

function AvatarHijo() {
  return (
    <svg viewBox="0 0 48 48" className="size-10 shrink-0" role="img" aria-label="Avatar del hijo">
      <circle cx="24" cy="24" r="23" fill="#fdf1e7" stroke="#e8d5c4" strokeWidth="1" />
      {/* gorra roja (guiño torii) */}
      <path d="M9 22c0-9 7-15 15-15s15 6 15 15l-2 1c0-8-6-12-13-12S11 15 11 23z" fill="#d32f2f" />
      <path d="M7 23c5-2 29-2 34 0l-1 3c-5-2-27-2-32 0z" fill="#b71c1c" />
      {/* ojos y sonrisa */}
      <circle cx="17.5" cy="28" r="1.5" fill="#3d3833" />
      <circle cx="30.5" cy="28" r="1.5" fill="#3d3833" />
      <path d="M19 34c2.8 2.4 7.2 2.4 10 0" fill="none" stroke="#b8694f" strokeWidth="1.8" strokeLinecap="round" />
      {/* barba de tres días sutil */}
      <path d="M16 35c2.5 3 13.5 3 16 0" fill="none" stroke="#d9c4b4" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function Charla({ lineas }: { lineas: { quien: "madre" | "hijo"; texto: string }[] }) {
  return (
    <figure className="my-8 space-y-3" role="group" aria-label="Conversación entre la madre y el hijo, autores de la web">
      {lineas.map((l, i) => {
        const esMadre = l.quien === "madre";
        return (
          <div key={i} className={`flex items-end gap-3 ${esMadre ? "" : "flex-row-reverse"}`}>
            {esMadre ? <AvatarMadre /> : <AvatarHijo />}
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
