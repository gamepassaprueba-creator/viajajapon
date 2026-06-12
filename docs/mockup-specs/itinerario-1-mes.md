# Mockup "Itinerario de 1 Mes en Japón" → content/itinerarios/itinerario-japon-1-mes.mdx

Secciones del mockup EN ORDEN:
1. Hero degradado con badge "30 días" + 4 stat-cards translúcidas (12 destinos · 30 días · presupuesto · nivel) → hero frontmatter + `StatCards`.
2. "Resumen del Viaje": 6 tarjetas icono (Ruta completa, Mejor época, Tipo de viajero, Transporte/JR Pass, Alojamiento, Experiencias únicas) + caja "Consejo del Experto" → `Cards cols={3}` sin img + `InfoBox tipo="consejo"`. La ruta también puede ir en `RouteStops`.
3. "Itinerario Día a Día" por semanas, con sidebar de navegación y tarjetas de día con timeline (hora — actividad — detalle), foto lateral y presupuesto del día → `ItineraryDay` por día/bloque agrupados con h2 por semana; presupuesto del día como línea final. Sidebar → `Toc`.
4. "Presupuesto Estimado": 3 tarjetas (económico/medio/alto) + desglose detallado por categoría (vuelos, JR Pass, alojamiento, comidas, entradas, compras, extras) con TOTAL → `VsCards` ×3 + tabla (densa, permitida) o KeyFacts.
5. "Consejos para Ahorrar": caja con 5 checks → `InfoBox` o Cards puntos.
6. "Consejos Prácticos": 6 tarjetas (qué llevar, apps — ¡Hyperdia muerto!, dinero, idioma, salud/seguridad, etiqueta) → `Cards cols={3}` sin img con puntos.
7. Banda CTA final → `CTABand`.

Omitir: botones PDF/compartir/personalizar, newsletter.
