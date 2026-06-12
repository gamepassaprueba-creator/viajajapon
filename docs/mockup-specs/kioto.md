# Mockup "Descubre Kioto" → content/destinos/que-ver-en-kioto.mdx

Secciones del mockup EN ORDEN (cada una necesita equivalente visual):
1. Hero a sangre con breadcrumb, H1, kanji 京都, excerpt, 2 botones → lo pinta Article.tsx (frontmatter). OK si hay hero.
2. "Bienvenido a Kioto": 4 stat-cards con icono y degradado (Templos 2.000+/UNESCO · Población · Mejor época · Desde Tokio 2h15) → `StatCards` (4 items).
3. Caja de intro con 2 párrafos de contexto → prosa breve de intro (aceptable como texto).
4. "Templos y Atracciones Principales": grid 2-col de 6 tarjetas GRANDES con foto, título+chip kanji, descripción, 3 tags de color, 3 filas de datos (horario ri-time, precio ri-money-yen, ubicación ri-map-pin) → `Cards cols={2}` todas con img+jp+tags+datos. Los 6: Kinkaku-ji, Fushimi Inari, Arashiyama, Gion, Kiyomizu-dera, Ryoan-ji.
5. "Experiencias Culturales Únicas": grid 2-col de 4 tarjetas con icono en círculo (sin foto): Ceremonia del té, Encuentro con geishas, Ryokan, Meditación zen — cada una con duración/precio/lugar → `Cards` sin img con datos.
6. "Gastronomía de Kioto": grid 3-col con foto: Kaiseki, Yudofu, Wagashi, cada una con precio → `Cards cols={3}` con img.
7. "Transporte en Kioto": 3 tarjetas con icono: Autobuses (¡trampa: el pase ¥700 ya no existe!), Bicicletas, Metro y trenes — con bullets check → `Cards` sin img con puntos.
8. "Itinerarios Sugeridos": tabs 2 días / 3 días / Ruta templos con timeline horario por día → `ItineraryDay` (día 1 y 2) + sección "tercer día: Nara".
9. "Mejor Época": 2 tarjetas grandes Primavera-sakura vs Otoño-momiji con fechas, lugares, nota → `VsCards` (2 items).
10. Banda CTA roja de cierre → `CTABand` (sin newsletter).

Omitir: newsletter, footer, botones "Ver detalles".
