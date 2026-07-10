import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="kicker text-primary">Error 404</p>
      <h1 className="mt-2 text-4xl font-black text-[#0a0a0a] sm:text-5xl">Esta página no existe</h1>
      <p className="mt-4 text-[#555]">
        Puede que el enlace esté roto o que la página se haya movido. Prueba con una de estas:
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Ir al inicio
        </Link>
        <Link href="/herramientas/jr-pass-calculadora" className="btn-outline">
          Calculadora JR Pass
        </Link>
        <Link href="/logistica" className="btn-outline">
          Guías prácticas
        </Link>
        <Link href="/blog" className="btn-outline">
          Noticias
        </Link>
      </div>
    </div>
  );
}
