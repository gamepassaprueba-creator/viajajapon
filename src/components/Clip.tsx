"use client";

/**
 * Clip: vídeo corto propio dentro de una guía (10-20 s, sin sonido, en bucle).
 * Diseño aprobado en el lienzo (tablero «Clip de vídeo dentro de una guía»).
 *
 * Antes de pulsar solo se carga la portada (next/image): el <video> no se
 * monta hasta el primer clic, así que la página no pesa más por llevar clips.
 * Los archivos se preparan con scripts/clip-propio.py (corte, marca de agua
 * con el logo, sin audio ni metadatos, < 3 MB).
 */
import Image from "next/image";
import { useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

function reloj(segundos: number) {
  const s = Math.max(0, Math.floor(segundos));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function Clip({
  src,
  poster,
  alt,
  caption,
  duracion,
  vertical,
}: {
  /** Ruta del MP4, p. ej. /videos/propias/himeji-kokoen-momiji.mp4 */
  src: string;
  /** Portada generada por el script, p. ej. /images/propias/himeji-kokoen-momiji-clip.jpg */
  poster: string;
  /** Qué se ve en el vídeo (texto alternativo de la portada y etiqueta del vídeo). */
  alt: string;
  caption?: string;
  /** Duración en segundos, para la etiqueta «Vídeo · 14 s · sin sonido». */
  duracion: number;
  /** Clips grabados en vertical: formato 4:5 centrado, como las fotos verticales. */
  vertical?: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [iniciado, setIniciado] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [segundo, setSegundo] = useState(0);
  const [total, setTotal] = useState(duracion);

  const iniciar = () => {
    setIniciado(true);
    trackEvent("clip_play", { clip: src });
  };

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const progreso = total > 0 ? Math.min(100, (segundo / total) * 100) : 0;

  return (
    <figure className={vertical ? "mx-auto my-6 max-w-[400px]" : "my-6"}>
      <div
        className={`relative overflow-hidden border-[3px] border-[#0a0a0a] bg-[#0a0a0a] ${vertical ? "aspect-[4/5]" : "aspect-video"}`}
      >
        {iniciado ? (
          <>
            <video
              ref={video}
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={alt}
              className="absolute inset-0 size-full cursor-pointer object-cover"
              onClick={alternar}
              onPlay={() => setPausado(false)}
              onPause={() => setPausado(true)}
              onTimeUpdate={(e) => setSegundo(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                if (Number.isFinite(e.currentTarget.duration)) setTotal(e.currentTarget.duration);
              }}
            />
            <button
              type="button"
              onClick={alternar}
              aria-label={pausado ? "Reanudar el vídeo" : "Pausar el vídeo"}
              className="absolute bottom-[22px] left-3 flex size-11 items-center justify-center border-[3px] border-[#0a0a0a] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
                {pausado ? (
                  <path d="M7 4 L20 12 L7 20 Z" fill="#0a0a0a" />
                ) : (
                  <path d="M6 4 H10 V20 H6 Z M14 4 H18 V20 H14 Z" fill="#0a0a0a" />
                )}
              </svg>
            </button>
            <span className="absolute bottom-[30px] right-3 bg-[#0a0a0a] px-2 py-1 font-mono text-[11px] font-bold tracking-[0.08em] text-white">
              {reloj(segundo)} / {reloj(total)}
            </span>
            <div className="absolute inset-x-0 bottom-0 h-2 bg-white" aria-hidden="true">
              <div className="h-full bg-[#e1352e]" style={{ width: `${progreso}%` }} />
            </div>
          </>
        ) : (
          <>
            <Image
              src={poster}
              alt={alt}
              fill
              sizes={vertical ? "(max-width: 768px) 100vw, 400px" : "(max-width: 768px) 100vw, 768px"}
              className="object-cover"
            />
            <span className="absolute left-3 top-3 bg-[#0a0a0a] px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              Vídeo · {Math.round(duracion)} s · sin sonido
            </span>
            <button
              type="button"
              onClick={iniciar}
              aria-label="Reproducir el vídeo"
              className="absolute left-1/2 top-1/2 flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center border-[3px] border-[#0a0a0a] bg-[#e1352e] shadow-[5px_5px_0_#0a0a0a] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24">
                <path d="M7 4 L20 12 L7 20 Z" fill="#ffffff" />
              </svg>
            </button>
          </>
        )}
      </div>
      {caption && <figcaption className="mt-2 text-[13px] leading-normal text-fg-muted">{caption}</figcaption>}
    </figure>
  );
}
