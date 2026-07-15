import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divulgación de afiliados y uso de IA",
  description:
    "Cómo se financia ViajaJapón y nuestra política de transparencia sobre enlaces de afiliado y contenido asistido por IA.",
  alternates: { canonical: "/afiliados-divulgacion" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Transparencia</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Divulgación de afiliados y uso de IA</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <h2 className="text-2xl font-bold text-fg mt-2">Financiación</h2>
        <p>
          ViajaJapón puede financiarse mediante <strong>enlaces de afiliado</strong> y, en el futuro,
          mediante <strong>publicidad</strong>. Si compras a través de un enlace de afiliado (seguros
          de viaje, eSIM, JR Pass, actividades), podemos recibir una comisión sin coste adicional
          para ti. Esto nunca afecta al precio que pagas ni a las recomendaciones que publicamos:
          solo enlazamos productos que usaríamos nosotros mismos.
        </p>
        <p>
          Cuando Google AdSense esté habilitado podremos mostrar anuncios gráficos de terceros. El
          contenido editorial es completamente independiente de los anuncios que puedan aparecer. En
          ese momento se solicitará consentimiento explícito antes de activar cualquier cookie
          publicitaria.{" "}
          <strong>Actualmente no hay anuncios activos en la web.</strong>
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Uso de IA (Reglamento europeo de IA, art. 50)</h2>
        <p>
          Usamos herramientas de IA para acelerar la redacción y la estructura. Todo contenido se
          revisa, verifica y completa con experiencia real antes de publicarse. Los datos sensibles
          (precios, tasas, normas) se contrastan con fuentes oficiales.
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: julio de 2025.</p>
      </div>
    </article>
  );
}
