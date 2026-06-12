# Mockup "Preparativos para viajar a Japón" (mobile) → content/logistica/japon-por-libre-primer-viaje.mdx

Mockup mobile con tarjetas-acordeón por tema. Secciones EN ORDEN:
1. Hero banner con título y subtítulo → hero frontmatter.
2. Tarjetas-acordeón temáticas, cada una con icono y contenido estructurado:
   - Documentación necesaria (pasaporte 6 meses, sin visado 90 días, formulario de entrada — hoy Visit Japan Web, seguro, reservas) → `Cards` sin img con puntos o `Steps`, enlazando /logistica/visado-japon-2026.
   - Mejor época (4 mini-cards de estación con color) → `Cards` o enlace fuerte a mejor-epoca-viajar-japon.
   - Qué empacar por temporada → enlace fuerte a que-llevar-maleta-japon + card resumen.
   - Reservas de alojamiento (4 tipos con precio/noche + consejo antelación) → `Cards`/VsCards + enlace donde-dormir.
   - Transporte y JR Pass (precios + tarjetas IC + pases regionales) → `Cards` + enlaces jr-pass-2026/suica (¡precios del mockup pre-2023!).
   - Presupuesto (3 tiers + desglose diario) → `VsCards` + enlace cuanto-cuesta-viajar-japon.
   - Seguro de viaje (coberturas + aseguradoras) → `Cards` + enlace seguro-viaje-japon.
   - Apps útiles (6 fichas icono — ¡Hyperdia muerto!) → `Cards cols={3}` sin img.
   - Etiqueta y costumbres (hacer/evitar + frases útiles) → `DoDont` + enlace etiqueta-y-costumbres.
3. CTA final → `CTABand`.

Este artículo es el "hub" de primer viaje: cada tema = sección visual compacta + enlace al artículo especializado. El fallo sería tenerlo como texto corrido.
