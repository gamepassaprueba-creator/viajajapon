import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="kicker text-primary">Error 404</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Esta página no existe</h1>
      <p className="mt-4 text-fg-muted">
        Puede que el enlace esté roto o que la página se haya movido. Prueba con una de estas:
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-strong">
          Ir al inicio
        </Link>
        <Link href="/herramientas/jr-pass-calculadora" className="rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary">
          Calculadora JR Pass
        </Link>
        <Link href="/logistica" className="rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary">
          Guías prácticas
        </Link>
        <Link href="/blog" className="rounded-md border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary">
          Noticias
        </Link>
      </div>
    </div>
  );
}
