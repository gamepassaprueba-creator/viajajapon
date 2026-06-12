# Mockup "Guía del Japón Friki - Cultura Otaku" → content/cultura/japon-friki-guia-otaku.mdx

Secciones del mockup EN ORDEN:
1. Hero + badge "Entretenimiento & Cultura Pop" + 3 chips (Tokio/Osaka/Kioto · Todo el año · 3-7 días) → Article.tsx + StatCards.
2. Intro 2 párrafos + 3 stat-cards (1000+ tiendas, 50+ eventos, 200+ cafés temáticos) → `StatCards` (cifras acotadas con ≈).
3. "Barrios Imprescindibles": grid 2-col de 4 tarjetas GRANDES con foto, badge ciudad, kanji, 4 filas de datos con icono (Chuo Dori, Radio Kaikan...) y caja de consejo: Akihabara, Nakano Broadway, Den Den Town, Ikebukuro/Otome Road → `Cards cols={2}` con img (hay friki-akihabara-dia, friki-nakano...) + datos + puntos.
4. "Tiendas Especializadas" en 3 grupos con cabecera de icono:
   - Manga y libros: Mandarake, Book Off, Animate, Kinokuniya (4 cards)
   - Figuras: Kotobukiya, Good Smile, AmiAmi, Radio Kaikan (4 cards)
   - Videojuegos: Super Potato, Yodobashi, Sofmap, Trader (4 cards)
   → 3 × `Cards cols={3}` (o 2) sin img, cada card con ubicación+especialidad.
5. "Cafés Temáticos": 2 tarjetas grandes con foto (Maid café con etiqueta!, Anime cafés/colaboraciones — Pokémon Café reserva obligatoria) + 3 pequeñas (Sanrio, Square Enix, Capcom) → `Cards cols={2}` con img + `Cards cols={3}` sin img. Foto disponible: friki-square-enix-cafe, friki-capcom-store.
6. "Museos y Centros Culturales": 6 tarjetas con foto: Museo Ghibli (¡reserva meses antes!), Pokémon Center, Nintendo Tokyo, Museo del Manga de Kioto, Gundam (¡OJO: Gundam Factory Yokohama CERRÓ en 2024 — el Gundam que sigue es el de Odaiba!), otros (Fujiko F Fujio...) → `Cards cols={2|3}` con img (friki-museo-ghibli, friki-pokemon-store, friki-nintendo-tokyo, tokio-gundam).
7. "Eventos y Convenciones": 2 grandes (Comiket — fechas/Big Sight/entrada, AnimeJapan) + 4 pequeñas (Tokyo Game Show, Jump Festa, Wonder Festival, C3) → `Cards cols={2}` + `Cards cols={2}` sin img con datos calendario.
8. "Arcades y Centros de Juegos": 3 tarjetas con foto (arcades, purikura, UFO catchers/gashapon) + 4 fichas rhythm games (Taiko, maimai, Sound Voltex, DDR) → `Cards cols={3}` con img (friki-ufo-catcher, friki-gashapon, friki-akihabara-noche) + Cards sin img.
9. "Consejos Prácticos": mejor época (Comiket ago/dic, AnimeJapan mar; evitar Golden Week/Obon), presupuesto por día (tabla corta o VsCards), qué comprar / apps / frases / etiqueta (3 cards + DoDont) → `Cards`/`VsCards`/`DoDont`.
10. "Itinerarios Sugeridos": 3 columnas con horarios (Día otaku Tokio, Ruta museos, Finde gamer) → `ItineraryDay` ×3 o Cards con puntos horarios.
11. FAQ (7 preguntas: japonés, dinero, garantías, series antiguas, segunda mano, falsificaciones, inglés) → `FAQ`.

Omitir: newsletter, footer. Trampa extra: el mockup dice "Gundam Factory Yokohama" como vigente — verificar cómo lo trata ya el artículo (cerró en marzo de 2024).
