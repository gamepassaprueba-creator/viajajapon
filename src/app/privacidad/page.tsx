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
          En ViajaJapón nos tomamos muy en serio tu privacidad. En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD), te informamos sobre cómo tratamos tus datos personales.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Responsable del tratamiento</h2>
        <p>
          <strong>Titular:</strong> Sergio Morillo<br />
          <strong>Email:</strong> info@viajajapon.com
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Finalidad y base legal</h2>
        <p>
          Recogemos tu dirección de correo electrónico única y exclusivamente si decides suscribirte voluntariamente a nuestra newsletter. La base legal es tu <strong>consentimiento expreso</strong> mediante doble confirmación (doble opt-in). Los correos se utilizarán únicamente para enviarte novedades de la web. No venderemos, alquilaremos ni cederemos tu correo a terceros.
        </p>
        <p>
          Adicionalmente, si otorgas tu consentimiento en nuestro aviso de cookies, utilizamos servicios de terceros como <strong>Google AdSense</strong> para mostrar publicidad. Google y sus proveedores tecnológicos certificados pueden utilizar datos personales (como tu dirección IP) y cookies para personalizar los anuncios y analizar el tráfico. Puedes encontrar más información sobre cómo utiliza Google la información de sitios web en sus <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">políticas de privacidad</a>.
        </p>

        <h2 className="text-2xl font-bold text-fg mt-8">Terceros y transferencias internacionales</h2>
        <p>
          Al utilizar los servicios publicitarios de Google LLC, algunos datos de navegación e identificadores pueden ser transferidos a servidores situados fuera del Espacio Económico Europeo (ej. Estados Unidos). Estas transferencias están amparadas bajo los mecanismos y cláusulas contractuales tipo aprobados por la Comisión Europea.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Conservación de los datos</h2>
        <p>
          Tus datos se conservarán hasta que solicites la baja. Puedes darte de baja en cualquier momento haciendo clic en el enlace que aparece al final de cada correo que recibas de nosotros.
        </p>
        
        <h2 className="text-2xl font-bold text-fg mt-8">Tus derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar o suprimir tus datos en cualquier momento. Para ejercer tus derechos, escríbenos a <strong>info@viajajapon.com</strong> indicando &quot;Protección de Datos&quot; en el asunto.
        </p>
      </div>
    </article>
  );
}
