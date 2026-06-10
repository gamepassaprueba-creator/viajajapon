import Link from "next/link";
import type { ComponentProps } from "react";
import { AffiliateBox } from "./AffiliateBox";

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

export const mdxComponents = {
  h2: (p: ComponentProps<"h2">) => <h2 className="mt-10 text-2xl font-bold" {...p} />,
  h3: (p: ComponentProps<"h3">) => <h3 className="mt-6 text-xl font-bold" {...p} />,
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
};
