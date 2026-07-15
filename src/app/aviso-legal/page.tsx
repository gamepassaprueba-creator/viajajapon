import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Información legal de ViajaJapón.",
  alternates: { canonical: "/aviso-legal" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Legal</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Aviso legal</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002,
          de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico
          (LSSICE), se informa que este sitio web es un proyecto divulgativo que podrá financiarse
          mediante enlaces de afiliación y publicidad.
        </p>
        <p>
          <strong>Titular:</strong> Sergio Morillo
          <br />
          <strong>Email de contacto:</strong> info@viajajapon.com
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Condiciones de uso</h2>
        <p>
          El acceso y uso de ViajaJapón atribuye la condición de usuario e implica la aceptación de
          las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los
          contenidos y a no emplearlos para actividades contrarias a la ley o a la buena fe.
        </p>
        <p>
          La información sobre viajes (precios, pases, visados, etc.) es orientativa, basada en
          experiencias propias y datos públicos en el momento de su publicación, y puede cambiar sin
          previo aviso. Verifica siempre la información en fuentes oficiales antes de viajar. El
          titular no se hace responsable de posibles perjuicios derivados del uso de la información
          contenida en esta web.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Propiedad intelectual</h2>
        <p>
          Los textos, estructura y diseño de la web pertenecen a Sergio Morillo. Las imágenes
          utilizadas son propias o cuentan con las licencias/créditos correspondientes. Queda
          prohibida la reproducción total o parcial de los contenidos de la web sin autorización
          expresa, salvo cita que incluya enlace a la fuente original (ViajaJapón).
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: julio de 2025.</p>
      </div>
    </article>
  );
}
