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
| `AFF_BOOKING` | Booking.com Partner Program | Aún no se usa en ninguna página |
| `AFF_GETYOURGUIDE` | GetYourGuide Affiliate | Aún no se usa en ninguna página |

### Newsletter (secrets del Worker)
- `MAILERLITE_API_KEY` — MailerLite → Integrations → API.
- `MAILERLITE_GROUP_ID` — ID del grupo (en la URL del grupo).
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
- Caché: assets estáticos de OpenNext (sin KV ni R2).
- Cabeceras de seguridad en `next.config.ts` (HSTS, nosniff, X-Frame-Options DENY salvo
  `/embed/*`, que permite iframes de terceros con `frame-ancestors *`).

## 5. Si "la web no carga" desde tu red
Antes de tocar nada, prueba con datos móviles: los bloqueos de LaLiga a IPs de Cloudflare en
algunos operadores españoles tumban la web en horario de partido. Si en el móvil va, no es la web.
