# Mockup "Guía Completa del JR Pass" → content/logistica/jr-pass-2026.mdx (y como-comprar-jr-pass.mdx como satélite)

OJO: TODOS los precios del mockup son pre-2023 (33.610¥/7d etc.). Los reales viven en src/data/jrpass.ts y en el artículo. NO tocar cifras.

Secciones del mockup EN ORDEN:
1. Hero + badge actualizado → hero frontmatter.
2. "¿Qué es?": intro 2 párrafos + caja importante (solo Temporary Visitor) + 3 tarjetas icono (validez temporal, cobertura nacional, ahorro) → prosa breve + `InfoBox` + `Cards cols={3}` sin img.
3. "Tipos y Precios": TABLA nacional (7/14/21 días, adulto/niño, €) — densa PERMITIDA + tarjetas de pases regionales (JR East, West/Kansai, Hokkaido, Kyushu) + tarjeta Ordinary vs Green → tabla + `Cards` + `VsCards` (Ordinary/Green).
4. "Cómo Comprar": 5 pasos numerados + 4 tarjetas de proveedores + caja aviso (comprar antes de llegar; en Japón más caro) → `Steps` + `Cards cols={2}` + `InfoBox tipo="aviso"`. (Puede vivir en como-comprar-jr-pass.mdx con enlace claro.)
5. "Proceso de Canje en Japón": dónde (aeropuertos/estaciones + horarios) + 3 tarjetas de documentos (pasaporte, exchange order, formulario) + activación con ejemplo práctico → `Cards cols={3}` + `Steps`/`InfoBox`.
6. "Líneas y Trenes Cubiertos": incluidos (Shinkansen no-Nozomi, limited express, locales, ferry Miyajima, buses JR) VS no incluidos (Nozomi/Mizuho, privados, metros, literas) → `DoDont` (perfecto aquí) + TABLA de rutas Shinkansen principales (densa, permitida).
7. "¿Cuándo es rentable?": ejemplos de itinerario con ahorro (2 tarjetas) + calculadora → `Cards`/`VsCards` + `CalculatorCTA` (nuestra calculadora real).
8. "Cuándo NO es rentable": 4 tarjetas (una sola ciudad, pocos trayectos, vuelos domésticos, buses nocturnos) → `Cards cols={2}` sin img.
9. "Comparativa con otras opciones": tabla JR Pass vs billetes vs bus vs avión (densa, permitida) + pases regionales alternativos (3 cards: Tokyo Subway, Kansai Thru, Hakone Free) + estrategias combinadas → tabla + `Cards`.
10. FAQ (6: metro Tokio, reservar asiento, pérdida, residentes, cómo usar en estación, aeropuerto) → `FAQ`.
11. CTA → `CTABand` + `CalculatorCTA`.
