import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divulgación de afiliados y uso de IA",
  description: "Cómo se financia ViajaJapón y nuestra política de transparencia sobre enlaces de afiliado y contenido asistido por IA.",
  alternates: { canonical: "/afiliados-divulgacion" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Transparencia</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Divulgación de afiliados y uso de IA</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          Algunos enlaces de esta web son <strong>enlaces de afiliado</strong>: si compras a través de ellos
          (seguros de viaje, eSIM, JR Pass, actividades), podemos recibir una comisión sin coste adicional para ti.
          Nunca afecta al precio que pagas ni a nuestras recomendaciones: solo enlazamos lo que usaríamos nosotros.
        </p>
        <p>
          <strong>Uso de IA (Reglamento europeo de IA, art. 50):</strong> usamos herramientas de IA para acelerar
          la redacción y la estructura. Todo contenido se revisa, verifica y completa con experiencia real antes de
          publicarse. Los datos sensibles (precios, tasas, normas) se contrastan con fuentes oficiales.
        </p>
        <p>[TODO: ajustar con tu gestor según la entrada en vigor (ago-2026) y listar los programas de afiliados concretos.]</p>
      </div>
    </article>
  );
}
