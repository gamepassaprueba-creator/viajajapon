import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";
import { ChevronDown, Info, Lightbulb, TriangleAlert } from "lucide-react";
import { AffiliateBox } from "./AffiliateBox";
import { Charla } from "./Charla";
import { PackingChecklist } from "./PackingChecklist";

/** Id de ancla a partir del texto del encabezado (sin tildes, kebab-case). */
function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function headingText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(headingText).join("");
  return "";
}

/** CTA reutilizable a la calculadora (para usar dentro de los MDX). */
export function CalculatorCTA() {
  return (
    <div className="my-6 rounded-lg border border-secondary/30 bg-secondary/5 p-5">
      <p className="font-semibold text-fg">Calcúlalo con tu ruta exacta</p>
      <p className="mt-1 text-sm text-fg-muted">La calculadora suma tus billetes reales y los compara con el pase, en euros.</p>
      <Link
        href="/herramientas/jr-pass-calculadora"
        className="mt-3 inline-flex rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
      >
        Abrir la calculadora →
      </Link>
    </div>
  );
}

/** Bloque de experiencia real del autor (E-E-A-T). Rellénalo con tu vivencia + foto. */
export function AuthorNote({ children }: { children: React.ReactNode }) {
  return <aside className="my-8 border-l-2 border-primary pl-4 italic text-fg-muted">{children}</aside>;
}

/** Índice de la guía: enlaces de ancla a los h2 (los ids se generan solos del texto). */
export function Toc({ items }: { items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="En esta guía" className="my-6 rounded-lg border border-border bg-muted/60 p-5">
      <p className="kicker text-fg-muted">En esta guía</p>
      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className="text-sm font-medium text-primary underline-offset-2 hover:underline">{i.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Ficha de datos clave al inicio del artículo (respuesta rápida / AEO). */
export function KeyFacts({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="nums my-6 grid gap-x-6 gap-y-4 rounded-lg border border-border bg-muted/60 p-5 sm:grid-cols-2">
      {items.map((f) => (
        <div key={f.label}>
          <p className="kicker text-fg-muted">{f.label}</p>
          <p className="mt-0.5 font-semibold text-fg">{f.value}</p>
        </div>
      ))}
    </div>
  );
}

const INFOBOX_VARIANTS = {
  info: { Icon: Info, frame: "border-secondary/40 bg-secondary/5", icon: "text-secondary" },
  consejo: { Icon: Lightbulb, frame: "border-success/40 bg-success/5", icon: "text-success" },
  aviso: { Icon: TriangleAlert, frame: "border-primary/40 bg-primary/5", icon: "text-primary" },
} as const;

/** Caja destacada: variant "info" (azul), "consejo" (verde) o "aviso" (rojo). */
export function InfoBox({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof INFOBOX_VARIANTS;
  title?: string;
  children: React.ReactNode;
}) {
  const v = INFOBOX_VARIANTS[variant] ?? INFOBOX_VARIANTS.info;
  return (
    <aside className={`my-6 flex gap-3 rounded-lg border p-4 ${v.frame}`}>
      <v.Icon size={20} className={`mt-0.5 shrink-0 ${v.icon}`} aria-hidden="true" />
      <div className="min-w-0 text-sm leading-relaxed text-fg-muted [&>p]:mt-2 [&>p:first-child]:mt-0">
        {title && <p className="font-semibold text-fg">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

/** Proceso numerado paso a paso. */
export function Steps({ items }: { items: { titulo: string; texto: string }[] }) {
  return (
    <ol className="my-6 space-y-4">
      {items.map((s, i) => (
        <li key={s.titulo} className="flex gap-4">
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-fg">{s.titulo}</p>
            {s.texto && <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{s.texto}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Foto dentro del artículo, con pie y crédito de licencia (obligatorio para
 * imágenes CC de Wikimedia Commons; en fotos propias basta el caption).
 */
export function Foto({
  src,
  alt,
  caption,
  credito,
}: {
  src: string;
  alt: string;
  caption?: string;
  credito?: string;
}) {
  return (
    <figure className="my-6">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
      {(caption || credito) && (
        <figcaption className="mt-2 text-xs text-fg-muted">
          {caption}
          {caption && credito ? " · " : ""}
          {credito && <>Foto: {credito}</>}
        </figcaption>
      )}
    </figure>
  );
}

/** Ruta del itinerario por etapas: timeline vertical numerado. */
export function RouteStops({ items }: { items: { ciudad: string; dias: string; nota?: string }[] }) {
  return (
    <ol className="my-6 space-y-0">
      {items.map((s, i) => (
        <li key={s.ciudad + i} className="relative flex gap-4 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden="true" className="absolute left-4 top-9 h-[calc(100%-1.75rem)] w-px -translate-x-1/2 bg-border" />
          )}
          <span aria-hidden="true" className="z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 pt-1">
            <p className="font-semibold text-fg">
              {s.ciudad} <span className="nums ml-1 font-normal text-fg-muted">· {s.dias}</span>
            </p>
            {s.nota && <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{s.nota}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Día del itinerario en acordeón nativo (details). El contenido va como markdown hijo. */
export function ItineraryDay({
  dia,
  titulo,
  ciudad,
  abierto = false,
  children,
}: {
  dia: number;
  titulo: string;
  ciudad: string;
  abierto?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={abierto || undefined} className="group my-3 overflow-hidden rounded-lg border border-border bg-surface">
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {dia}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-snug text-fg">{titulo}</span>
          <span className="mt-0.5 block text-xs uppercase tracking-wider text-fg-muted">{ciudad}</span>
        </span>
        <ChevronDown size={18} className="shrink-0 text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-border px-5 pb-5 [&>p]:mt-3 [&>ul]:mt-3">{children}</div>
    </details>
  );
}

/** Preguntas frecuentes en acordeón nativo (details/summary: accesible, sin JS). */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-surface">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-border last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-fg [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown size={18} className="shrink-0 text-fg-muted transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-5 pb-5 text-sm leading-relaxed text-fg-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const mdxComponents = {
  h2: ({ children, ...p }: ComponentProps<"h2">) => (
    <h2 id={slugify(headingText(children)) || undefined} className="mt-10 scroll-mt-24 text-2xl font-bold" {...p}>
      {children}
    </h2>
  ),
  h3: ({ children, ...p }: ComponentProps<"h3">) => (
    <h3 id={slugify(headingText(children)) || undefined} className="mt-6 scroll-mt-24 text-xl font-bold" {...p}>
      {children}
    </h3>
  ),
  p: (p: ComponentProps<"p">) => <p className="mt-4 leading-relaxed text-fg-muted" {...p} />,
  ul: (p: ComponentProps<"ul">) => <ul className="mt-4 list-disc space-y-1 pl-5 text-fg-muted" {...p} />,
  ol: (p: ComponentProps<"ol">) => <ol className="mt-4 list-decimal space-y-1 pl-5 text-fg-muted" {...p} />,
  a: ({ href, ...p }: ComponentProps<"a">) => {
    const h = href ?? "#";
    // Enlaces internos (rutas propias o anclas) → next/link para navegación SPA.
    const isInternal = h.startsWith("/") || h.startsWith("#");
    if (isInternal) {
      return <Link href={h} className="text-primary underline-offset-2 hover:underline" {...p} />;
    }
    // Enlaces externos → nueva pestaña + rel sponsored/nofollow (cumple Google y disclosure de afiliados).
    return (
      <a
        href={h}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="text-primary underline-offset-2 hover:underline"
        {...p}
      />
    );
  },
  strong: (p: ComponentProps<"strong">) => <strong className="font-semibold text-fg" {...p} />,
  table: (p: ComponentProps<"table">) => (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border">
      <table className="nums w-full text-sm" {...p} />
    </div>
  ),
  thead: (p: ComponentProps<"thead">) => <thead className="bg-muted text-left" {...p} />,
  th: (p: ComponentProps<"th">) => <th className="border-b border-border px-4 py-2 font-medium" {...p} />,
  td: (p: ComponentProps<"td">) => <td className="border-b border-border px-4 py-2" {...p} />,
  AffiliateBox,
  CalculatorCTA,
  AuthorNote,
  Toc,
  KeyFacts,
  InfoBox,
  Steps,
  FAQ,
  RouteStops,
  ItineraryDay,
  PackingChecklist,
  Foto,
  Charla,
};
