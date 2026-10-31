"use client";

import { NewsletterForm, NewsletterGate } from "@/components/NewsletterForm";

// Caja de newsletter al final de cada guía (tablero «NewsletterArticulo» del lienzo de
// Claude Design). Lo que promete es lo que entrega la automatización de bienvenida de
// MailerLite: el checklist de presupuesto (marketing/newsletter/bienvenida.md). Si se
// cambia una cosa, cambiar la otra. Sin proveedor configurado, NewsletterGate no pinta nada.
export function ArticleNewsletter({ source }: { source: string }) {
  return (
    <NewsletterGate>
      <section
        aria-labelledby="newsletter-guia"
        className="mt-12 grid gap-6 border-[3px] border-[#0a0a0a] bg-[#fff7f6] p-5 sm:p-7 md:grid-cols-2 md:items-center"
        style={{ boxShadow: "6px 6px 0 #e1352e" }}
      >
        <div className="flex flex-col gap-3">
          <span className="self-start bg-[#d32f2f] px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-white">
            Gratis · en tu correo
          </span>
          <h2 id="newsletter-guia" className="text-xl font-black leading-tight text-[#0a0a0a] sm:text-2xl">
            El checklist de presupuesto para Japón, en euros
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#333]">
            <li>Cuánto cuesta un día: mochilero, medio o cómodo</li>
            <li>8 cosas que revisar antes de reservar</li>
            <li>Aviso cuando cambien precios clave, como el JR Pass</li>
          </ul>
        </div>
        <NewsletterForm
          source={source}
          layout="stack"
          buttonLabel="Enviarme el checklist"
          note="Sin spam; te das de baja cuando quieras."
        />
      </section>
    </NewsletterGate>
  );
}
