# Despliegue y configuración de ViajaJapón

Stack: Next.js 16 + React 19 + Tailwind v4 · Hosting: **Cloudflare Workers + OpenNext** (plan gratuito).

---

## 1. Variables de entorno (las rellenas tú)

Copia `.env.example` a `.env.local` para desarrollo local. En producción se cargan como
**secrets/vars del Worker** (no van al repo).

### Afiliados (sin esto la web NO gana dinero)
Pega el enlace de tracking COMPLETO que te da cada panel. Mientras estén vacíos, los enlaces
funcionan pero apuntan a la URL canónica (no pagan comisión).

| Variable | Programa | Notas |
|---|---|---|
| `AFF_CIVITATIS` | Civitatis Afiliados | El nº1 para audiencia en español |
| `AFF_KLOOK` | Klook (Impact/Partnerize) | Entradas y actividades |
| `AFF_IATI` | IATI Afiliados | Seguro de viaje (alto ticket) |
| `AFF_HEYMONDO` | Heymondo Afiliados | Seguro de viaje |
| `AFF_HOLAFLY` | Holafly Affiliates | eSIM datos ilimitados |
| `AFF_AIRALO` | Airalo (Partnerize) | eSIM por GB |
| `AFF_SKYSCANNER` | Skyscanner Partners | Vuelos (top-funnel) |
| `AFF_JRPASS` | **Revendedor** con programa | ⚠️ NO uses japanrailpass.net (paga 0€) |
| `AFF_REVOLUT` | Revolut Affiliate | Tarjeta sin comisiones |

### Email (MailerLite)
- `MAILERLITE_API_KEY` — MailerLite → Integrations → API.
- `MAILERLITE_GROUP_ID` — ID del grupo (en la URL del grupo). Activa **doble opt-in** en Settings.

### Cron (motor de frescura)
- `CRON_SECRET` — cadena larga y aleatoria. Sin ella, `/api/cron/refresh` queda deshabilitado.

---

## 2. Lo que SOLO tú puedes hacer (E-E-A-T = tu foso)
No se puede inventar; es lo que te diferencia de las webs-IA:
- **`src/lib/site.ts`** → `author.name`: tu nombre/firma pública real.
- **`src/app/sobre-nosotros/page.tsx`** → biografía real (cuándo viajaste, qué zonas conoces, por qué).
- **`content/**/*.mdx`** → rellenar los bloques `<AuthorNote>` con experiencia real en 1ª persona + **foto propia**. NO inventar cifras.
- Revisar las páginas legales (Aviso legal, Privacidad con DPA de MailerLite, Cookies) con un gestor.

---

## 3. Primer despliegue en Cloudflare

```bash
# 1. Login
npx wrangler login

# 2. Crear el namespace KV para la caché de ISR (una sola vez) y pegar el id en wrangler.jsonc
#    (KV y no R2: R2 exige añadir tarjeta a la cuenta aunque el tier sea gratis)
npx wrangler kv namespace create NEXT_INC_CACHE_KV

# 3. Cargar los secrets (uno por uno; repetir por cada variable de arriba)
npx wrangler secret put MAILERLITE_API_KEY
npx wrangler secret put CRON_SECRET
npx wrangler secret put AFF_CIVITATIS
# ...etc.

# 4. Construir el worker y desplegar
npm run cf:deploy
```

> ⚠️ **Build desde Linux/CI/WSL.** En Windows, `opennextjs-cloudflare build` muestra
> `ERROR Failed to copy ...` al trazar algunos `node_modules` (rutas largas). El worker se
> genera igual y nuestras páginas de artículo son estáticas (no afecta a runtime), pero para
> un build limpio usa WSL o un runner Linux (GitHub Actions / Cloudflare CI).

### Dominio y cron (en el panel de Cloudflare)
- Apunta los nameservers de **viajajapon.com** (en Arsys) a Cloudflare; añade el dominio al Worker
  (Custom Domain). Redirige **viajajapon.es → viajajapon.com** con una Redirect Rule 301.
- **Cron Trigger** (Workers → Triggers): programa una llamada periódica que haga
  `GET https://viajajapon.com/api/cron/refresh?task=fx` con la cabecera
  `Authorization: Bearer <CRON_SECRET>` (o `?token=<CRON_SECRET>`). Refresca el cambio del yen.
  *Plan gratuito = máx. 5 cron triggers por cuenta.*

---

## 4. Desarrollo local
```bash
npm run dev          # servidor de desarrollo Next.js
npm run build        # build de producción (verifica que todo compila)
npm run cf:preview   # previsualiza el worker de Cloudflare en local (wrangler)
```
