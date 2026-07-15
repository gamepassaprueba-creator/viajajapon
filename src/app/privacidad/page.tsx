import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo tratamos tus datos en ViajaJapón.",
  alternates: { canonical: "/privacidad" },
};

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="kicker text-primary">Legal</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Política de privacidad</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
        <p>
          En ViajaJapón nos tomamos muy en serio tu privacidad. En cumplimiento del Reglamento (UE)
          2016/679 del Parlamento Europeo y del Consejo (RGPD), te informamos sobre cómo tratamos tus
          datos personales.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Responsable del tratamiento</h2>
        <p>
          <strong>Titular:</strong> Sergio Morillo
          <br />
          <strong>Email:</strong> info@viajajapon.com
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Finalidad y base legal</h2>
        <p>
          Recogemos tu dirección de correo electrónico única y exclusivamente si decides suscribirte
          voluntariamente a nuestra newsletter. La base legal es tu{" "}
          <strong>consentimiento expreso</strong> mediante doble confirmación (doble opt-in). Los
          correos se utilizarán únicamente para enviarte novedades de la web. No venderemos,
          alquilaremos ni cederemos tu correo a terceros.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Servicios de terceros actualmente activos</h2>
        <p>
          Utilizamos <strong>Cloudflare Web Analytics</strong> para medir el tráfico de forma
          agregada y anónima. Este servicio no instala cookies ni rastrea a los usuarios entre sitios.
          Más información en la{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            política de privacidad de Cloudflare
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">
          Publicidad (Google AdSense — pendiente de activación)
        </h2>
        <p>
          ViajaJapón tiene previsto mostrar publicidad a través de <strong>Google AdSense</strong>{" "}
          cuando la integración esté habilitada y se haya obtenido el consentimiento necesario.
          Cuando eso ocurra, Google LLC y sus proveedores tecnológicos certificados podrán tratar
          datos de navegación (como identificadores de dispositivo o dirección IP) para personalizar
          anuncios, medir su eficacia y limitar su frecuencia.
        </p>
        <p>
          <strong>Actualmente no hay anuncios activos</strong> y no se tratan datos con esa
          finalidad. Antes de activar cualquier servicio publicitario se solicitará consentimiento
          mediante una plataforma de gestión del consentimiento (CMP) certificada por Google.
        </p>
        <p>
          Cuando Google AdSense esté activo, algunos datos podrán ser tratados en servidores fuera
          del Espacio Económico Europeo. En ese caso, dichas transferencias estarán amparadas en los
          mecanismos legales aplicables según la normativa europea vigente. Puedes consultar las{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            políticas de privacidad de Google
          </a>{" "}
          para más información.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Conservación de los datos</h2>
        <p>
          Tus datos de suscripción se conservarán hasta que solicites la baja. Puedes darte de baja
          en cualquier momento haciendo clic en el enlace que aparece al final de cada correo.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Tus derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar o suprimir tus datos en cualquier momento. Para
          ejercer tus derechos, escríbenos a <strong>info@viajajapon.com</strong> indicando
          &quot;Protección de Datos&quot; en el asunto.
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: 15 de julio de 2026.</p>
      </div>
    </article>
  );
}
