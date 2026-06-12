# Mockup "Osaka - La Ciudad del Buen Comer" (spec textual del usuario, 2026-06-12) → content/destinos/que-ver-en-osaka.mdx

Secciones EN ORDEN:
1. Hero Dotonbori de noche con gradiente + badge "Región de Kansai" → frontmatter (hero osaka-dotonbori-glico.jpg, CC BY-SA → heroCredito).
2. Información general: ubicación, mejor época, estancia 2-3 días, cómo llegar desde Tokio/Kioto → `StatCards`.
3. Atracciones principales: grid de tarjetas con foto, tiempo de visita, precio y horario: Castillo de Osaka (¥1.200 desde abr-2025), Dotonbori, USJ (Super Nintendo World), Kuromon → `Cards cols={2}` con img.
4. Guía de barrios (Namba, Umeda, Shinsekai) con imagen + qué ver + cómo llegar → `Cards cols={3}` con img.
5. Gastronomía: okonomiyaki, takoyaki, kushikatsu con foto, dónde probarlo y precios → `Cards cols={3}` con img + enlaces a /gastronomia/*.
6. Alojamiento por presupuesto → `Cards` sin img por zonas (sin precios cerrados, verifica) + enlace reservas + truco "dormir en Osaka para Kioto".
7. Transporte local: metro/ICOCA, Osaka Amazing Pass, JR Loop (JR Pass), a pie → `Cards` sin img.
8. Itinerarios 1/2/3 días con timeline → `ItineraryDay` ×3.
9. Mapa interactivo → OMITIR.
10. Información práctica 2x2: mejor época, festivales (Tenjin Matsuri 24-25 jul), compras (Shinsaibashi, Amerikamura, Den Den Town), carácter local → `Cards cols={2}` sin img.
11. Excursiones: Kioto, Nara, Kobe, Monte Koya con imagen, tiempo y cómo llegar → `Cards cols={2}` con img.
12. FAQ (5: días, Osaka vs Kioto, mejor okonomiyaki, JR Pass, seguridad) → `FAQ`.
13. CTA planifica → `CTABand`.
14. Artículos relacionados → "Sigue leyendo" automático de Article.tsx.
Omitir: clima/widgets meteo, PDF, tours personalizados, newsletter, mapa.
