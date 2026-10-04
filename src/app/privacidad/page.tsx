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

        <h2 className="text-2xl font-bold text-fg mt-8">Qué datos tratamos, para qué y con qué base legal</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Newsletter:</strong> si te suscribes voluntariamente, tratamos tu dirección de
            correo para enviarte novedades de la web. Base legal: tu <strong>consentimiento</strong>{" "}
            (art. 6.1.a RGPD), que puedes retirar en cualquier momento con el enlace de baja de cada
            correo. No venderemos, alquilaremos ni cederemos tu correo a terceros.
          </li>
          <li>
            <strong>Contacto:</strong> si nos escribes a info@viajajapon.com, tratamos tu dirección y
            el contenido del mensaje para responderte. Base legal: tu consentimiento al escribirnos y
            nuestro interés legítimo en atender consultas y correcciones.
          </li>
          <li>
            <strong>Analítica (Google Analytics 4):</strong> solo si la aceptas, medimos de forma
            estadística qué páginas se visitan, de dónde llega el tráfico y eventos como clics en
            recomendaciones, mediante identificadores en cookies (<code>_ga</code>) y datos técnicos del
            navegador. Base legal: tu <strong>consentimiento</strong>. La etiqueta de Google Analytics
            solo se carga después de que aceptes la analítica; si la rechazas, no se activa.
          </li>
          <li>
            <strong>Datos técnicos de conexión:</strong> nuestro proveedor de alojamiento procesa la
            dirección IP y datos técnicos de cada petición para servir la web y protegerla frente a
            abusos. Base legal: interés legítimo en la seguridad y el funcionamiento del sitio.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-fg mt-8">Proveedores que tratan datos por nuestra cuenta</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Cloudflare, Inc.</strong> — alojamiento y entrega de la web.{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Política de privacidad de Cloudflare
            </a>
            .
          </li>
          <li>
            <strong>Google Ireland Ltd. / Google LLC</strong> — Google Analytics 4, solo con tu
            consentimiento.{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Políticas de privacidad de Google
            </a>
            .
          </li>
          <li>
            <strong>MailerLite (UAB MailerLite, Lituania)</strong> — envío de la newsletter, si te
            suscribes.{" "}
            <a
              href="https://www.mailerlite.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Política de privacidad de MailerLite
            </a>
            .
          </li>
        </ul>
        <p>
          Puedes retirar el consentimiento de analítica en cualquier momento desde{" "}
          <strong>Preferencias de cookies</strong> en el pie de página; al hacerlo borramos las
          cookies de Google Analytics de tu navegador.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Transferencias internacionales</h2>
        <p>
          Google y Cloudflare son empresas con sede en Estados Unidos y pueden tratar datos fuera del
          Espacio Económico Europeo. Esas transferencias se amparan en el Marco de Privacidad de
          Datos UE-EE. UU., al que ambas empresas están adheridas, y, en su caso, en las cláusulas
          contractuales tipo aprobadas por la Comisión Europea.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Publicidad</h2>
        <p>
          <strong>Actualmente ViajaJapón no muestra anuncios ni carga tecnologías publicitarias.</strong>{" "}
          El consentimiento para Google Analytics no activa publicidad, almacenamiento publicitario,
          personalización de anuncios ni medición publicitaria.
        </p>
        <p>
          Si en el futuro incorporamos publicidad, actualizaremos esta política antes de activarla y
          solicitaremos el consentimiento que corresponda mediante una plataforma de gestión del
          consentimiento adecuada.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Conservación de los datos</h2>
        <p>
          Tus datos de suscripción se conservarán hasta que solicites la baja. Puedes darte de baja
          en cualquier momento haciendo clic en el enlace que aparece al final de cada correo. Los
          correos de contacto se conservan el tiempo necesario para atender la consulta. Los datos
          de Google Analytics se conservan según la retención configurada en la herramienta (como
          máximo 14 meses) y las cookies <code>_ga</code> caducan a los 2 años. Tu elección sobre la
          analítica se guarda en tu navegador durante 12 meses; pasado ese plazo te la volvemos a
          preguntar.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión,
          oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento,
          escribiendo a <strong>info@viajajapon.com</strong> con el asunto &quot;Protección de
          Datos&quot;.
        </p>
        <p>
          Si consideras que no hemos atendido correctamente tus derechos, puedes presentar una
          reclamación ante la{" "}
          <a
            href="https://www.aepd.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Agencia Española de Protección de Datos
          </a>
          .
        </p>

        <p className="text-xs text-fg-muted mt-8">Última actualización: 4 de octubre de 2026.</p>
      </div>
    </article>
  );
}
