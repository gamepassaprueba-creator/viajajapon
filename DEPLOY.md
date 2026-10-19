# Despliegue y configuración de ViajaJapón

Stack: Next.js 16 + React 19 + Tailwind v4 + MDX · Hosting: **Cloudflare Workers + OpenNext**
(plan gratuito) · Dominio canónico: **https://viajajapon.com** (`.es`, `www.es` y `www.com`
redirigen con 308 conservando la ruta).

Última revisión de este documento: 2026-10-04.

---

## 1. Cómo se despliega

**Todo push a `master` despliega a producción** vía `.github/workflows/deploy.yml` (~1,5 min):

1. `npm ci` → diagnóstico de afiliados y de secrets del Worker (avisos `::warning::` si faltan).
2. `opennextjs-cloudflare build` (incluye `next build`; las páginas son estáticas/SSG).
3. `opennextjs-cloudflare deploy`.
4. Batería de comprobaciones contra producción (páginas clave, robots, sitemap, cabeceras de
   seguridad, widget embebible, redirecciones `.es`/`www`, endpoint SEO protegido).

El build se hace en Linux (GitHub Actions) porque en Windows OpenNext falla al trazar
`node_modules`. En local usa `npm run dev` / `npm run build`; **no** hace falta `cf:deploy`.

Los PR pasan por `validation.yml` y los guardrails (`affiliate-truth`, `adsense-readiness`,
`canonical-inheritance`, `newsletter-readiness`). Trabaja en una rama + PR siempre que puedas:
un push directo a `master` despliega sin pasar por ellos.

---

## 2. Dónde vive cada variable (importante: hay DOS sitios)

| Tipo | Se lee en | Dónde se configura | Efecto de cambiarla |
|---|---|---|---|
| Afiliados `AFF_*` | **build** (se hornean en el HTML estático) | **GitHub → Settings → Secrets and variables → Actions** | Hay que redeployar (re-run del workflow o push) |
| MailerLite, bridge SEO | **runtime** (Worker) | **Cloudflare → Workers → viajajapon → Settings → Variables and Secrets** (o `npx wrangler secret put NOMBRE`) | Inmediato |
| Despliegue | CI | GitHub secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | — |

⚠️ Poner un `AFF_*` como secret del Worker **no sirve de nada**: las páginas ya están generadas
cuando el Worker lo lee.

### Afiliados (GitHub secrets) — sin esto la web no gana dinero
Pega el enlace de tracking COMPLETO de cada panel. Vacíos → el enlace funciona pero apunta a la
URL canónica y no paga. IATI ya monetiza con un enlace fijo en `src/lib/affiliates.ts`.

| Variable | Programa | Notas |
|---|---|---|
| `AFF_CIVITATIS` | Civitatis Afiliados | El que más cajas tiene en la web (26) |
| `AFF_KLOOK` | Klook (Impact/Partnerize) | Entradas y actividades |
| `AFF_IATI` | IATI Afiliados | Opcional: sustituye al enlace fijo actual |
| `AFF_HEYMONDO` | Heymondo Afiliados | Seguro de viaje |
| `AFF_HOLAFLY` | Holafly Affiliates | eSIM datos ilimitados |
| `AFF_AIRALO` | Airalo (Partnerize) | eSIM por GB |
| `AFF_SKYSCANNER` | Skyscanner Partners | Vuelos |
| `AFF_JRPASS` | Revendedor de JR Pass con programa | Sin él, el enlace va a la web oficial japanrailpass.net |
| `AFF_REVOLUT` | Revolut Affiliate | Tarjeta sin comisiones |
| ~~`AFF_BOOKING`~~ | Booking.com (CJ) | **Ya no se usa**: Booking va por destino en código (ver abajo) |
| `AFF_GETYOURGUIDE` | GetYourGuide Partner Program | **Opcional**: GYG ya monetiza en código (partner_id `KGGGOIO`, enlaces por destino en `src/data/getyourguide-links.ts`, activo desde el 15-oct-2026). Si se define, sustituye a todos los enlaces por uno genérico |

### Booking.com (en código, no en secrets)
Booking tiene **un enlace por destino** (ciudad, barrio, ryokan: ~40) en `src/data/booking-links.ts`,
no un único `AFF_BOOKING`. Decisión (14-oct-2026): **en código**, porque los enlaces de CJ son
públicos (salen en el HTML), el secret no protege nada y en cambio esconde el estado real; en código
se revisan en el PR, quedan versionados y el build valida que cada `destino=` del MDX exista.

- Programa: **Booking.com Spain & Portugal (4347393)** en https://booking.cj.com, sitio promocional
  ViajaJapon.com **101904257**. Estado a 14-oct-2026: *solicitud pendiente* → todos los enlaces son
  las URL canónicas de booking.com, CTA neutro ("Ver alojamiento en Kioto en Booking.com") y `rel`
  sin `sponsored`.
- **Activar** (un único sitio): cuando CJ apruebe, en "Create a Deep Link" genera el enlace de una URL
  de la lista, pruébalo (debe redirigir a booking.com) y pon en `BOOKING_DEEPLINK_TEMPLATE` ese enlace
  con la URL codificada sustituida por `{url}`. Si el panel no permite plantilla, pega en `tracked`
  de cada destino el enlace generado para su URL. Rebuild + push: todas las cajas pasan a
  "enlace de afiliado", `rel="sponsored nofollow"` y el evento `affiliate_click` lleva `monetized=1`.
- Comprobación: `curl -s https://viajajapon.com/destinos/donde-dormir-en-kioto | grep -o 'href="[^"]*booking[^"]*"'`.
- Nunca pegues un enlace de tracking que no hayas generado en el panel y probado.

### Newsletter (secrets del Worker)
- `MAILERLITE_API_KEY` — MailerLite → Integrations → API.
- `MAILERLITE_GROUP_ID` — ID del grupo (en la URL del grupo). Grupo «Web viajajapon.com»: `201760947340051982`.
- Lo más cómodo: guárdalos como **GitHub secrets** (`gh secret set MAILERLITE_API_KEY`, que pide el valor sin mostrarlo) y el deploy los copia al Worker, igual que los del bridge SEO.
- En MailerLite activa **double opt-in para suscripciones por API** (Settings) antes de
  anunciarlo en ningún texto.
- Mientras falte cualquiera de las dos, las secciones de newsletter **no se muestran**.
- La calculadora promete "te enviamos el checklist de presupuesto": crea en MailerLite la
  automatización de bienvenida con ese checklist antes de activar la newsletter.

### Bridge SEO `/api/seo/report` (secrets del Worker, o GitHub secrets que el deploy sincroniza)
- `SEO_REPORT_SECRET` — cadena larga aleatoria. Se envía en la cabecera
  `Authorization: Bearer <secreto>` (nunca en la URL).
- `GOOGLE_SERVICE_ACCOUNT_JSON` — JSON completo de una service account de Google Cloud con:
  - **Search Console**: añadida como usuario (lectura) en `sc-domain:viajajapon.com`.
  - **GA4**: rol *Lector* en la propiedad `550129763`.
  - APIs habilitadas en el proyecto: *Google Search Console API* y *Google Analytics Data API*.
- `GA4_PROPERTY_ID` — `550129763` (el ID numérico, no el `G-…`).
- Si están en GitHub secrets, el deploy los copia al Worker automáticamente.
- Prueba: `curl -H "Authorization: Bearer $SEO_REPORT_SECRET" https://viajajapon.com/api/seo/report`.
- Automatización opcional: cron-job.org → GET a esa URL con la cabecera, 1 vez por semana.

### Variables públicas (opcionales, en el build)
- `NEXT_PUBLIC_GA4_ID` — por defecto `G-NGK9K8DWYP` (ya fijado en el código).
- `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` — beacon de Cloudflare Web Analytics. **No activo.** Si lo
  activas, actualiza antes `/privacidad` y `/cookies`.
- `NEXT_PUBLIC_ADSENSE_CLIENT` — **no activo.** Mostrar anuncios en la UE exige una CMP
  certificada por Google (TCF) y actualizar las políticas antes.

---

## 3. Lo que SOLO tú puedes hacer
- **Aviso legal (LSSI art. 10):** falta tu **NIF** y un **domicilio** en
  `src/app/aviso-legal/page.tsx`. Con afiliados activos es obligatorio.
- **Fotos propias del viaje:** sustituyen a las de Wikimedia Commons (`docs/CREDITOS-IMAGENES.md`).
- **`{/* TODO AuthorNote … */}`** en los MDX: secciones donde falta tu experiencia real.

---

## 4. Infraestructura Cloudflare
- Worker `viajajapon` con custom domains `viajajapon.com` y `www.viajajapon.com`; zona
  `viajajapon.es` también en Cloudflare (las redirecciones las hace `next.config.ts`).
- `workers_dev: false` en `wrangler.jsonc`: el sitio no se sirve por `*.workers.dev`.
- **http → https:** lo hace Cloudflare con **"Always Use HTTPS"** (SSL/TLS → Edge Certificates,
  activado el 13-oct-2026 en `viajajapon.com`). Actúa antes del Worker y cubre también los assets;
  no hay ninguna regla en el repo. El smoke test del deploy lo comprueba: si falla, es el panel.
- Caché: assets estáticos de OpenNext (sin KV ni R2). Sus cabeceras se declaran en
  **`public/_headers`** (chunks/fuentes inmutables un año; `/images/*` un día): sin ese fichero
  todo salía con `max-age=0`. No afecta al HTML (lo genera el Worker) ni a `/_next/image`
  (lo intercepta OpenNext antes de Next y hoy no lleva `Cache-Control`; pendiente de ciclo 2).
- Newsletter: la variable de repositorio `NEWSLETTER_ENABLED` (GitHub → Settings → Variables)
  debe valer `1` para que las páginas consulten `/api/suscribir`. Mientras no existan los secrets
  de MailerLite en el Worker, déjala vacía: ni petición ni formulario.
- Cabeceras de seguridad en `next.config.ts` (HSTS, nosniff, X-Frame-Options DENY salvo
  `/embed/*`, que permite iframes de terceros con `frame-ancestors *`).

## 5. Si "la web no carga" desde tu red
Antes de tocar nada, prueba con datos móviles: los bloqueos de LaLiga a IPs de Cloudflare en
algunos operadores españoles tumban la web en horario de partido. Si en el móvil va, no es la web.
