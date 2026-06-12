# BRIEF para agentes de paridad con mockups (leer ANTES de auditar o editar)

## La regla innegociable
El mockup del usuario ES la spec visual. Cada sección del mockup debe tener un equivalente **visual** (tarjetas, grids, iconos, comparativas) en el artículo — NUNCA prosa corrida ni listas de bullets "porque es más rápido". Los DATOS del mockup se tiran siempre: están desactualizados o inventados. La estructura se respeta; los hechos salen del artículo ya publicado (ya verificado) o se acotan con ≈ y "verifica".

## Kit de componentes (src/components/mdx.tsx) — todos sangran más anchos que la columna
- `<StatCards items={[{icon?, label, value, sub?}]} />` — fila de 2-4 métricas con icono.
- `<Cards cols={2|3} items={[{title, desc, img?, alt?, credito?, jp?, tags?:[string], datos?:[{icon?,texto}], puntos?:[string], href?, cta?}]} />` — EL bloque estrella. title se pinta como h3 real con ancla (slugify). `credito` se superpone sobre la foto. `datos` = filas con icono (horario/precio/ubicación). `puntos` = bullets con check. `jp` = chip kanji.
- `<VsCards items={[{title, badge?, precio?, destacado?, puntos:[string], nota?}]} />` — comparativas lado a lado (presupuestos, temporadas, opciones).
- `<DoDont hacer={[{titulo, texto?}]} evitar={[{titulo, texto?}]} />` — qué hacer / qué evitar.
- `<CTABand title texto href cta href2? cta2? />` — banda CTA de cierre.
- `<ItineraryDay dia={n} titulo ciudad abierto?>` markdown dentro `</ItineraryDay>` — acordeón de día.
- `<KeyFacts items={[{label,value}]} />`, `<Toc items={[{href:"#ancla",label}]} />`, `<InfoBox tipo="info|consejo|aviso" titulo?>`, `<Steps items={[{titulo,texto}]} />`, `<FAQ items={[{q,a}]} />` (a = string plano, sin JSX), `<Foto src alt caption? credito? />`, `<RouteStops items={[{ciudad,dias,nota?}]} />`, `<PackingChecklist .../>` (ver uso actual en que-llevar-maleta-japon), `<Charla>`/`<AuthorNote>` (experiencia real — NO crear nuevas, conservar las existentes tal cual), `<AffiliateBox title partner cta>`, `<CalculatorCTA />` (calculadora JR Pass).

## Iconos disponibles (prop icon/datos.icon)
reloj, yen, pin, tren, bus, calendario, estrella, camara, montana, comida, cerveza, te, hoja, arbol, sol, luna, personas, edificio, templo, ticket, brillo, mapa, cartera, tarjeta, movil, info, ninos, compras, escudo, wifi.

## Reglas duras
1. **Grids all-or-none**: dentro de un `<Cards>`, o TODAS las tarjetas llevan `img` o NINGUNA. Jamás mixto.
2. **Solo imágenes existentes** en `public/images/` (lista abajo). El `credito` exacto sale de `docs/CREDITOS-IMAGENES.md` (formato "Autor, LICENCIA"). Si la imagen es CC0/dominio público el credito es opcional. NO inventes rutas ni créditos.
3. **Tablas** solo para datos densos comparables (precios de pases, trayectos). Listas de "cosas" (barrios, platos, tiendas, parques) van SIEMPRE en Cards.
4. **Cero experiencia inventada**: no añadir AuthorNote/Charla nuevos ni frases tipo "nosotros probamos/visitamos". Las existentes se conservan literalmente.
5. **Cero testimonios/reseñas falsas** (los mockups traen reviews inventadas — se omiten siempre). Omitir también: newsletter, PDFs descargables, mapas interactivos, botones muertos ("Ver detalles").
6. **Cifras**: conservar las cifras ya publicadas en el artículo (están verificadas). Cifras nuevas solo si son de bajo riesgo, con ≈ y "verifica". Conversión ¥185 = 1 €. NUNCA copiar precios del mockup.
7. **Trampas conocidas de los mockups** (datos muertos, no reproducir): Robot Restaurant CERRADO; club ageHa CERRADO; Hyperdia MUERTO (decir Google Maps/Navitime); la lonja de Tsukiji se mudó a Toyosu en 2018 (el mercado exterior de Tsukiji sigue); teamLab Borderless está ahora en Azabudai Hills; los pandas de Ueno volvieron a China; Sukiyabashi Jiro no acepta reservas del público; el pase de bus de Kioto (¥700) YA NO EXISTE; precios del JR Pass del mockup son pre-2023 (los reales están en src/data/jrpass.ts y jr-pass-2026.mdx); Keihan/Hankyu/Kintetsu/Tobu/Fujikyu/Alpico NO van con JR Pass.
8. **Toc**: anclas = slugify del h2 (NFD → sin diacríticos → minúsculas → quitar [^a-z0-9\s-] → espacios a guiones). Los títulos de Cards también generan anclas h3 — conservar títulos existentes cuando tengan tráfico.
9. **Frontmatter**: no tocar salvo `dateModified: "2026-06-12"` si editas el cuerpo. No tocar `hero`/`heroCredito` salvo error.
10. El hero a sangre lo pinta Article.tsx desde el frontmatter — el mockup hero NO se reconstruye en el cuerpo.
11. Mantener los enlaces internos existentes; añadir enlaces a artículos hermanos donde el mockup tiene secciones que en nuestra web viven en otro artículo (p. ej. "Alojamiento" → /destinos/donde-dormir-en-tokio).

## Imágenes disponibles (public/images/)
akihabara, arashiyama-bambu, bamboo, estacion-tokio, festival, friki-akihabara-dia, friki-akihabara-noche, friki-capcom-store, friki-gashapon, friki-museo-ghibli, friki-nakano, friki-nintendo-tokyo, friki-pokemon-store, friki-square-enix-cafe, friki-ufo-catcher, fuji-yoshida-sendero, fushimi-inari-toriis, gion-calle, hakone-ashi, hero-fuji, izakaya-omoide-yokocho, kaiseki-ryokan, kaiten-zushi-otaru, kamakura-buda, kamikochi-kappabashi, kenrokuen-jardin, kimono, kioto-gion, kioto-kinkakuji, kioto-kiyomizu-noche, kioto-kiyomizu-pagoda, kioto-ryoanji, kioto-wagashi, kioto-yudofu, kioto, konbini-japon, kumano-kodo-daimonzaka, matcha-ceremonia, miyajima-torii, momiji-otono, nara-todaiji, nikko-kegon, nikko-senjogahara, nikko-toshogu, nishiki-market, onsen-rotenburo, osaka, parque-disneyland, parque-disneysea, parque-fujiq, parque-usj-nintendo, ramen, sake-barriles-meiji, sake-tokkuri, sakura-cerezos, shibuya-cruce, shinkansen-tren, shirakawa-go, suica-tarjeta, sushi, taquillas-estacion, tea, ticket-machine, tokio-ameyoko, tokio-ginza, tokio-gundam, tokio-meiji-torii, tokio-palacio-nijubashi, tokio-sensoji-kaminarimon, tokio-shibuya-noche, tokio-shibuya-sky, tokio-takeshita, tokio-teamlab, tokio-tower-noche, tokio-tsukiji, tokio, whisky-yamazaki-bodega, yatai, yenes-billetes, yokohama-minatomirai (todas .jpg)

## Artículo de referencia del patrón
`content/destinos/que-ver-en-kioto.mdx` y `content/destinos/que-ver-en-tokio.mdx` — léelos para calibrar tono y densidad de componentes.
