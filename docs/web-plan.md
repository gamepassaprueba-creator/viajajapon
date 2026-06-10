# ViajaJapón — Plan completo de la web

> Qué debe contener el sitio, por capas. **🟢 MVP** = se construye ahora. **🔵 Fase 2** = congelado hasta señal de dinero (mes 3-4). Principio rector: alta intención de compra + frescura + experiencia real. No competir de frente con japonismo.com.

---

## 1. Principios (no negociables)
- **Wedge:** logística práctica fresca + gastronomía/vida cotidiana, sobre experiencia REAL (fotos propias). Nunca inventar experiencia.
- **Monetización por orden:** afiliados + producto propio + email PRIMERO; display ads (Mediavine Journey ≥1k sesiones) como pata débil y tardía.
- **Calidad > volumen:** 2-3 piezas profundas/semana, terminadas a mano. Nada de firehose IA.
- **Frescura como ventaja:** lo que cambia cada año (yen, JR Pass, tasas, reservas) actualizado y con fecha visible.
- **Rendimiento + accesibilidad** desde el día 1 (CWV verdes, WCAG AA).

---

## 2. Arquitectura de información (mapa del sitio)

| Sección | Ruta | Tipo | Estado |
|---|---|---|---|
| Home | `/` | Portada editorial | 🟢 |
| **Viajes prácticos** (pilar) | `/logistica` | Pilar + cluster | 🟢 |
| **Reservas, permisos y tasas** (pilar) | `/reservas` | Pilar + cluster (frescura) | 🟢 parcial |
| **Gastronomía y vida diaria** (pilar) | `/gastronomia` | Pilar + cluster | 🔵 (1 pieza ancla en MVP) |
| **Itinerarios** | `/itinerarios` | Pilar + cluster | 🔵 |
| **Herramientas / Datos** | `/herramientas` | Índice de tools | 🟢 |
| Calculadora JR Pass + presupuesto | `/herramientas/jr-pass-calculadora` | Tool (hero) | 🟢 |
| Cambio yen-euro (dato vivo) | `/cambio-yen-euro` | Página viva | 🟢 |
| Tracker sakura/otoño | `/sakura` | Página viva semi-manual | 🔵 |
| Clima / qué llevar | `/clima` | Página viva | 🔵 |
| Eventos y festivos del mes | `/eventos-festivos` | Página viva | 🔵 |
| Sobre nosotros | `/sobre-nosotros` | Autoridad (E-E-A-T) | 🟢 (rellenar real) |
| Aviso legal / Privacidad / Cookies / Divulgación afiliados | `/aviso-legal` etc. | Legal | 🟢 (rellenar real) |

---

## 3. Páginas concretas (contenido)

### 🟢 MVP — Pilar "Viajes prácticos" (`/logistica`) + las 12-15 de alta intención
1. **JR Pass 2026: precios en euros y cuándo (no) compensa** — *hecho* (afiliado: JRPass)
2. Seguro de viaje Japón 2026: **IATI vs Heymondo** (mejor EPC; ~€15-32/venta)
3. **eSIM** Japón 2026: Holafly vs Airalo vs Saily (Holafly ~€4-5/venta)
4. Cómo comprar y activar el JR Pass paso a paso (QR 2026)
5. **Suica en iPhone** para extranjeros 2026 (Apple Wallet)
6. Pases regionales: JR East / West / Kansai / Hokkaido
7. Tokio → Kioto en tren: opciones y precio 2026
8. Del aeropuerto (Narita/Haneda) a Tokio 2026
9. Apps imprescindibles para viajar a Japón 2026 (empuja eSIM)
10. Reservar Shinkansen (SmartEX, equipaje grande)
11. Itinerario de 15 días por Japón (+ presupuesto) → enlaza calculadora + tripwire
12. Mejor época para viajar a Japón 2026 (sakura/otoño/precios)

### 🟢 MVP — Pilar "Reservas, permisos y tasas" (`/reservas`, frescura)
- **Tasa turística de Japón 2026** (⚠️ verificar cifra real antes de publicar)
- Atracciones con reserva obligatoria 2026 (tabla viva — imán de backlinks)
- Entradas Ghibli Park (Lawson paso a paso) · teamLab · Shibuya Sky · Monte Fuji
- Visado y entrada 2026 para españoles **y latinoamericanos** (ángulo LatAm)

### 🟢 MVP — 1 pieza ancla de gastronomía (moat de fotos reales)
- Qué comer en Japón: 25 platos con precio 2026 (fotos propias)

### 🔵 Fase 2 — resto de gastronomía/vida diaria
- Konbini (20 productos) · Comer barato (<10€) · Sin gluten (tarjeta descargable) · Vegetariano/vegano · Halal · Izakaya sin japonés · IC cards (Suica/Pasmo/Icoca) · Onsen con tatuajes

---

## 4. Tipos de página — qué debe tener cada una

**Home** 🟢: hero editorial (kicker + titular serif + CTA a calculadora), indicador "Yen hoy", rejilla de guías, captura de email, enlaces a pilares.

**Página-pilar** 🟢: intro + enlaces a todo su cluster (silo), CTA a la herramienta relacionada, breadcrumb.

**Artículo** 🟢: kicker (categoría) · titular · "última actualización [fecha]" · cuerpo con tablas de datos (tabular-nums) · **bloque "nota del autor" con experiencia REAL + foto propia** · 1-2 cajas de afiliado con disclosure · CTA a calculadora · FAQ (JSON-LD) · disclaimer "verifica en fuente oficial" · JSON-LD Article + BreadcrumbList.

**Herramienta / calculadora** 🟢: shell estático indexable + isla interactiva (cálculo en navegador) · veredicto verde/rojo con icono+texto (nunca solo color) · tabla comparativa · sello de datos+fecha · CTAs de afiliado contextuales · captura de email del resultado en PDF (Fase 1.1) · **versión `/embed` con backlink** (imán de enlaces) · JSON-LD WebApplication + FAQ.

**Página viva** 🟢/🔵: dato auto-actualizado en la MISMA URL (ISR + revalidate) · marco evergreen escrito a mano · "Actualizado el [fecha]" honesto (solo cambia si cambia el dato) · JSON-LD WebPage + Dataset · enlace a la calculadora.

**Legal / About** 🟢: contenido real (con gestor) · About con bio real + foto = señal E-E-A-T.

---

## 5. Componentes globales
- **Navbar** sticky (logo, nav, indicador "Yen hoy", menú móvil `<details>`) 🟢
- **Footer** (enlaces legales + disclosure permanente) 🟢
- **Skip-link**, foco visible, `color-scheme`/`theme-color` (modo oscuro) 🟢
- **ArticleCard**, **AffiliateBox** (disclosure obligatorio), **JsonLd**, **YenIndicator** 🟢
- **Captura de email** (lead magnet) 🟢 UI / 🔵 conexión real
- **Banner de cookies (CMP)** conforme AEPD 🔵 (antes de meter analítica/afiliados con cookies)
- **Widget embebible** de la calculadora (configurador + snippet con backlink) 🔵

---

## 6. SEO técnico
- **Metadata API** por página (title template, description, canonical absoluto, OpenGraph) 🟢
- **JSON-LD**: Organization + WebSite (global) 🟢; Article/BreadcrumbList (artículos) 🟢; WebApplication + FAQPage (calculadora) 🟢; WebPage + Dataset (páginas vivas) 🟢
- **sitemap.ts** (lastModified real) + **robots.ts** 🟢
- **Interlinking**: pilar↔cluster en silo; todo artículo de transporte/reservas/presupuesto → calculadora arriba del pliegue; bloque "Planifica tu viaje" en footer 🟢 (ampliar al crecer)
- **CWV**: Server Components por defecto, 1 sola isla cliente (calculadora), `next/image` con dimensiones, fuentes `display:swap` subset latin 🟢
- **Señales de frescura**: `dateModified` honesto + "última actualización" visible + changelog por página viva 🟢/🔵
- **Search Console + GA4** (o analítica cookieless) desde el lanzamiento 🔵

---

## 7. Monetización
**Afiliados (orden de alta):** Amazon.es (día 1, relleno) → **Civitatis** (tras ~10 artículos; nº1 ES) → **IATI + Heymondo** (seguro) → **Holafly + Airalo** (eSIM) → JRPass → Klook/GetYourGuide → JapanesePod101 (25% recurrente, en cultura) → Skyscanner (top-funnel). Mapa fijo intención→afiliado, máx 1-2 por artículo, disclosure visible.

**Email (lead magnets):** checklist de viaje · **PDF del resultado de la calculadora** · (Fase 2) tarjeta celíaca, itinerario tripwire.

**Producto propio (🔵):** itinerario PDF €5-9 (tripwire) → guía premium €19-25 → (más adelante) plantilla/mini-curso.

**Display ads (🔵):** Mediavine Journey al llegar a 1.000 sesiones; Mediavine completo a 50k. (Ezoic exige 250k; Raptive vetada para tráfico ES/LatAm.)

---

## 8. Datos y frescura (fuentes + cadencia)
- **Yen EUR/JPY**: Frankfurter/BCE (gratis, sin key) — cron 6h en sitio 🟢
- **JR Pass / tarifas / pases**: `src/data/jrpass.ts` — revisión trimestral; ⚠️ **subida oct-2026** obligatoria 🟢
- **Festivos JP**: holidays-jp (gratis) 🔵
- **Clima/tifón**: JMA bosai JSON (cachear; nunca veredictos de seguridad por IA) 🔵
- **Sakura/otoño**: semi-manual estacional (no hay API) 🔵
- **NO** scraping de Google Trends/redes.

---

## 9. Legal / cumplimiento
- **Cookies (AEPD/LSSI 22.2):** rechazar tan fácil como aceptar, granular, sin premarcar; bloquear no esenciales hasta consentir.
- **Disclosure afiliados** visible + página dedicada.
- **EU AI Act art. 50** (desde **ago-2026**): aviso "contenido asistido por IA, revisado por [nombre]".
- **Páginas obligatorias:** Aviso Legal (LSSI 10), Privacidad (RGPD 13-14, encargado=proveedor email), Cookies, T&C de productos.
- **YMYL/seguridad:** datos oficiales + enlace a fuente; sin veredictos de seguridad por IA.
- **Autónomo/Hacienda:** declarar todo desde el primer euro; IVA intracomunitario; **W-8BEN** para plataformas US. Consultar gestor al haber ingresos.

---

## 10. Stack y despliegue
- **Next.js 16 + React 19 + Tailwind v4** (App Router, TS) 🟢
- **Hosting:** Cloudflare Workers + **OpenNext** (gratis; sin veto comercial, ISR + Cron Triggers) 🔵 deploy
- **Email:** MailerLite (free hasta 500 subs) 🔵
- **Analítica:** Cloudflare Web Analytics (cookieless) + GA4 para embudo 🔵
- **Imágenes:** fotos propias + Pexels/Unsplash de relleno; **nunca IA fotorrealista**
- **Coste total objetivo:** ~15-25€/mes
- **(🔵 Fase 2) VPS** (Hetzner ~5€) solo si se activa el motor de vídeo (FFmpeg+Whisper, voz/footage propios, canal aislado)

---

## 11. Estado actual (lo ya construido)
✅ Scaffold Next.js + design system (crema/rojo carmín + Noto) · home · **calculadora JR Pass funcional** · **página viva del yen (en vivo)** · pilar logística + artículo JR Pass · sitemap/robots · legales stub · build verde · lint limpio · accesibilidad auditada.
⏳ Falta: contenido real (bio/experiencia + fotos), conectar email, deploy Cloudflare, y escribir el resto de las 12-15 páginas de alta intención.

---

## 12. Roadmap por fases
- **Fase 0 (ahora):** terminar el MVP-slice → contenido real + email + deploy. Aplicar a Amazon.es + Civitatis.
- **Fase 1 (mes 1-3):** publicar las 12-15 piezas de alta intención (2-3/sem), altas de afiliados, lead magnets, distribuir el widget.
- **Criterio de descongelar (mes 3-4):** si hay clics de afiliado + lista de email creciendo + primeras ventas → añadir la siguiente pieza.
- **Fase 2:** motor de frescura ampliado (sakura/clima/eventos) → display ads (Journey) → producto propio → vídeo (canal aislado).

---

## 13. "Definición de hecho" por página (checklist de calidad)
- [ ] Titular serif + kicker + "última actualización" (si aplica)
- [ ] Experiencia real + ≥1 foto propia (artículos)
- [ ] 1-2 afiliados relevantes con disclosure
- [ ] CTA a calculadora / interlinking al pilar
- [ ] Metadata + JSON-LD correctos
- [ ] Contraste AA, foco visible, encabezados jerárquicos, responsive 375/768/1440 + dark
- [ ] Datos verificados en fuente oficial + disclaimer
