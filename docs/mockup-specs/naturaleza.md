# Mockup "Rutas Naturales en Japón" → content/destinos/naturaleza-en-japon.mdx

Secciones del mockup EN ORDEN:
1. Hero a sangre con 3 chips (50+ rutas, todos los niveles, todo el año) → Article.tsx + StatCards/KeyFacts.
2. "Mapa de Destinos Naturales" interactivo con pins → NO reproducible; equivalente: grid de tarjetas de destinos (puede fusionarse con la sección 3).
3. "Rutas de Senderismo Destacadas": filtros + grid 3-col de 6 tarjetas con foto, badge de dificultad (color), y 4 filas de datos (duración, distancia, desnivel, mejor época): Fuji, Kumano Kodo, Kamikochi, Bambú Arashiyama, Monte Misen, Nikko → `Cards cols={3}` con img + tags (dificultad) + datos.
4. "Calendario de Mejores Épocas": 4 tarjetas de estación con checks y temperatura media → `Cards cols={2}` o `VsCards` ×4.
5. "Parques Nacionales": 4 tarjetas horizontales grandes con foto, atracciones (3 bullets icono), cómo llegar y si el JR Pass vale: Fuji-Hakone-Izu, Nikko, Shiretoko, Aso-Kuju → `Cards cols={2}` con img+puntos+datos.
6. "Equipamiento y Preparación": 4 tarjetas checklist (vestimenta, equipo esencial, tecnología — ¡YAMAP ok!, seguridad) + caja "Consejos importantes" (registrar ruta, efectivo, mapas offline, basura) → `Cards` sin img con puntos + `InfoBox`.
7. "Transporte a Destinos Naturales": 6 tarjetas de trayecto (Tokio→Fuji, Osaka→Kumano, Nagoya→Alpes, Hiroshima→Miyajima, Tokio→Nikko, Tokio→Hokkaido) con opciones, precio ≈ y si JR Pass vale → `Cards cols={3}` sin img con datos (¡las coberturas JR del mockup tienen trampas: Tobu/Fujikyu/Alpico NO!).
8. "Galería de Paisajes" 9 fotos → opcional: `Foto` sueltas ya repartidas cuentan.
9. "Recursos Descargables" → OMITIR (no existen PDFs).
10. "Experiencias de Viajeros" (3 reseñas) → OMITIR SIEMPRE (testimonios falsos).
11. Banda CTA → `CTABand`.
