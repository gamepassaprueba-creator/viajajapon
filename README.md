# ViajaJapón

Web editorial en español para viajar a Japón por libre: guías en MDX, herramientas propias
(calculadora del JR Pass, cambio yen-euro, presupuesto, checklist) y afiliación medida con GA4.

- Producción: https://viajajapon.com
- Stack: Next.js 16 (App Router, SSG) + React 19 + Tailwind v4 + MDX, en Cloudflare Workers vía OpenNext.

## Desarrollo

```bash
npm install
npm run dev      # genera el manifest de contenido y arranca en http://localhost:3000
npm run lint
npm run build    # build de Next en local (el build de Cloudflare se hace en CI)
```

## Contenido

- Artículos: `content/<pilar>/<slug>.mdx` (pilares: logistica, itinerarios, destinos,
  gastronomia, cultura, blog). Al publicar uno, aparece solo en su pilar, el sitemap y el RSS.
- Componentes MDX disponibles: `src/components/mdx.tsx`.
- Créditos de imágenes: `docs/CREDITOS-IMAGENES.md` (obligatorio para fotos CC BY / CC BY-SA).
- Afiliados: siempre vía `<AffiliateBox partner="...">`, nunca enlaces de tracking a mano.

## Despliegue

Push a `master` → GitHub Actions → Cloudflare Workers. Variables, secrets e integraciones:
ver [DEPLOY.md](DEPLOY.md). Estrategia SEO vigente: [SEO-STRATEGY.md](SEO-STRATEGY.md).
