# Mockup "Descubre Tokio" → content/destinos/que-ver-en-tokio.mdx

Secciones del mockup EN ORDEN:
1. Hero a sangre → Article.tsx (frontmatter).
2. "Bienvenido a Tokio": 4 stat-cards (Población 14M · Área/23 distritos · Mejor época · Moneda/efectivo) → `StatCards`.
3. Caja intro 2 párrafos → prosa breve.
4. "Atracciones Principales": grid 2-col de 6 tarjetas grandes con foto+kanji+tags+datos (horario/precio/ubicación): Tokyo Tower, Senso-ji, Shibuya Crossing, Meiji, Skytree, Palacio Imperial → `Cards cols={2}` con img.
5. "Barrios de Tokio": grid 3-col de 8 tarjetas con foto+kanji+tags: Shibuya, Shinjuku, Ginza, Harajuku, Asakusa, Roppongi, Akihabara, Shimokitazawa → `Cards cols={3}` con img (mínimo 6; si no hay foto para alguno, TODOS sin foto o sacar a prosa).
6. "Transporte y Movilidad": grid 3-col de 6 tarjetas icono con bullets: Metro y JR, Tarjetas IC, Taxis, Autobuses, Pases de transporte, Apps recomendadas (¡Hyperdia muerto!) + caja "Consejos para moverse" (hora punta, último tren, silencio...) → `Cards` sin img con puntos + `InfoBox` o `DoDont`.
7. "Alojamiento en Tokio": tabs + 7 tarjetas de tipos con precio/noche y zonas → en nuestra web vive en /destinos/donde-dormir-en-tokio: basta tarjeta(s) resumen o CTA claro hacia esa guía (no duplicar contenido).
8. "Cultura y Tradiciones": 6 tarjetas con foto (té, templos-etiqueta, festivales, artes, onsen, etiqueta) → puede resolverse con Cards enlazando a /cultura/* (onsen, etiqueta) — equivalente visual, no prosa.
9. "Compras en Tokio": 6 tarjetas icono (electrónica, moda, lujo, artesanía, grandes almacenes, mercadillos) con "mejores lugares" + caja Tax-Free (requisitos ¥5.000, proceso) → `Cards` sin img con puntos + `InfoBox` tax-free.
10. "Vida Nocturna": 6 tarjetas (distritos, izakayas, clubes, karaoke, bares temáticos, espectáculos) — ¡trampas: Robot Restaurant y ageHa cerrados! → `Cards` sin img.
11. Banda "Gastronomía en Tokio" con foto + checks + botón → `CTABand` o Cards-link hacia /gastronomia/*.
12. "Planifica tu Viaje": 6 tarjetas (mejor época, duración, presupuesto diario, visado, internet, seguridad) → `Cards` sin img con datos/puntos enlazando a /logistica/*.
13. "Itinerarios Sugeridos": tabs 3/5/7 días + Con niños, timeline por día → `ItineraryDay` ×3 (plan de 3 días) + la sección "con niños" ya existente.
14. "Consejos Esenciales": 6 tarjetas pequeñas con borde de color (clima, dinero/propinas, etiqueta, basura, comida, idioma) → `Cards` sin img o `DoDont`.

Omitir: newsletter, tabs interactivos (sustituir por secciones/acordeones), testimonios.
