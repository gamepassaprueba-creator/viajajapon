# Mockup "Japón Profundo: 15 días" → content/itinerarios/itinerario-japon-15-dias.mdx

Secciones del mockup EN ORDEN:
1. Hero con badge "15 días / 14 noches" + 4 chips (5 ciudades, presupuesto, época, nivel) → hero + `KeyFacts`/`StatCards`.
2. 4 stat-cards degradadas (15 días · 5 ciudades · presupuesto · primavera/otoño) → `StatCards`.
3. "Ruta del Itinerario": mapa (omitir) + 6 tarjetas numeradas de ciudad con noches (Tokio 4, Nikko excursión, Kioto 4, Hiroshima 2, Kanazawa 2, regreso 2) → `RouteStops`.
4. "Itinerario Día por Día": 15 acordeones de día con timeline horario, restaurantes recomendados y consejos del día → `ItineraryDay` ×15 (los principales con detalle, los demás compactos).
5. "Transporte: JR Pass de 14 días": cards por qué + precio/activación + TABLA de trayectos cubiertos con precios sueltos y ahorro + consejos (¡cifras del mockup pre-2023 = trampa; usar las del repo/jr-pass-2026!) → `Cards` + tabla densa (permitida) + `InfoBox` + `CalculatorCTA`.
6. "Presupuesto Detallado": 3 tarjetas tier + TABLA comparativa por categoría (densa, permitida) + notas → `VsCards` + tabla.
7. "Alojamiento por Ciudad": 4 bloques grandes (Tokio/Kioto/Hiroshima/Kanazawa) cada uno con 3 tarjetas de tier (presupuesto/medio/premium: precio por noche, zonas, tipo) + consejo → `Cards cols={3}` sin img por ciudad, o VsCards por ciudad.
8. "Mejores Épocas": 2 tarjetas grandes (primavera con ventajas/desventajas, otoño ídem) + 2 compactas (verano, invierno) + banda recomendación → `VsCards`.
9. "Experiencias Imprescindibles": 6 tarjetas con foto (ceremonia té, onsen ryokan, okonomiyaki Hiroshima, templos Nikko, Miyajima, distrito geishas Kanazawa) con lugar y precio ≈ → `Cards cols={3}` con img (matcha-ceremonia, onsen-rotenburo, nikko-toshogu, miyajima-torii, kenrokuen-jardin... regla all-or-none).
10. "Personaliza tu Itinerario": 2 tarjetas (extensiones posibles / ajustes recomendados) → `Cards cols={2}` sin img con puntos.
11. "Consejos Prácticos": 6 tarjetas (qué llevar, apps, dinero, reservas anticipadas, equipaje/takkyubin, idioma) → `Cards cols={3}` sin img.
12. FAQ (6 preguntas) → `FAQ`.
13. "Contenido Relacionado" 4 tarjetas-enlace → enlaces o `CTABand`.
