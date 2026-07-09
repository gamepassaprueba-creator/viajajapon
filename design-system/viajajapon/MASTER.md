# Design System Master — ViajaJapón

> **LÓGICA:** Al construir una página, primero revisa `design-system/viajajapon/pages/[page].md`. Si existe, sus reglas **anulan** este Master. Si no, sigue estrictamente lo de aquí.

**Proyecto:** ViajaJapón — web de planificación de viajes a Japón en español.
**Dirección de marca:** Moderno, producto digital, aire "anime/manga" contemporáneo (NO editorial/revista/serif clásico).
**Última actualización real del código:** 9 jul 2026 (Fase 1 de transformación).
**Stack:** Next.js 16 + React 19 + Tailwind v4 (tokens en `@theme` de `globals.css`) + next/font/google.

> ⚠️ El documento anterior (editado 2026-06-02) describía un estilo "magazine editorial minimalista" con Noto Serif JP y paleta crema-washi. **YA NO ES VÁLIDO.** El código real usa el sistema definido en este documento.

---

## 1. Color (tokens semánticos, WCAG AA verificado)

Los tokens se definen en `src/app/globals.css` dentro del bloque `@theme`. El modo oscuro está implementado via `@media (prefers-color-scheme: dark) { :root { ... } }` fuera del bloque `@theme` (sin `@layer`) — las utilidades Tailwind los leen en runtime vía `var(...)`.

### Light (por defecto)
| Rol | Hex | CSS var | Uso |
|---|---|---|---|
| Fondo (bg) | `#FAFAFB` | `--color-bg` | Fondo base de página |
| Surface (tarjeta) | `#FFFFFF` | `--color-surface` | Tarjetas, navbar, superficies elevadas |
| Tinta (fg) | `#16181D` | `--color-fg` | Texto principal — NUNCA usar `text-gray-900` (rompe dark mode) |
| Tinta muted | `#545B6B` | `--color-fg-muted` | Metadatos, subtítulos |
| Rojo marca (primary) | `#E1352E` | `--color-primary` | CTAs, kickers, acentos · blanco encima ≈4.7:1 ✓ |
| Rojo hover | `#B8271F` | `--color-primary-strong` | Estado hover de primary |
| Índigo eléctrico (secondary) | `#2D4FE0` | `--color-secondary` | Acento secundario, info boxes, links en contexto |
| Borde | `#E3E5EC` | `--color-border` | Separadores, bordes de tarjetas |
| Muted (secciones) | `#F0F1F5` | `--color-muted` | Fondos de secciones, cajas info |
| Éxito | `#15803D` | `--color-success` | Veredictos positivos, checks |
| Peligro | `#E1352E` | `--color-danger` | Igual que primary (rojo) |
| Ring (foco) | `#2D4FE0` | `--color-ring` | Anillo de foco (índigo, visible en ambos modos) |

### Dark
| Rol | Hex |
|---|---|
| Fondo | `#131418` |
| Surface | `#1B1D23` |
| Tinta | `#F1F2F6` |
| Tinta muted | `#A8AFC2` |
| Rojo marca | `#FF5B4E` (más saturado para visibilidad en oscuro) |
| Rojo hover | `#FF7A6E` |
| Índigo | `#6E8CFF` |
| Borde | `#2B2E37` |
| Muted | `#1F212A` |
| Éxito | `#3FA873` |

**Regla crítica:** NUNCA usar `text-gray-*` ni `bg-gray-*` en elementos de contenido (rompe dark mode). Solo permitido en overlays explícitamente oscuros (ej. footer fijo `bg-gray-900`). Usar siempre tokens semánticos (`text-fg`, `bg-muted`, etc.).

---

## 2. Tipografía

**Fuentes cargadas** (`src/app/layout.tsx` vía `next/font/google`):
- `M_PLUS_1p` → variable CSS `--font-mplus` → pesos 400/500/700/900
- `JetBrains_Mono` → variable CSS `--font-jetbrains` → variable weight

**Mapeo en `@theme`:**
```css
--font-sans:    var(--font-mplus), system-ui, sans-serif;   /* cuerpo y UI */
--font-serif:   var(--font-mplus), system-ui, sans-serif;   /* sin serif real: apunta a mplus */
--font-display: var(--font-mplus), system-ui, sans-serif;   /* logo y titulares: usa font-black (900) */
--font-mono:    var(--font-jetbrains), ui-monospace, monospace; /* datos, kickers, fechas */
```

**Usos:**
- Titulares/logo: `font-display font-black` (M PLUS 1p 900) → estilo impactante, "pop japonés"
- Cuerpo/UI: `font-sans` por defecto (M PLUS 1p 400/500/700)
- Kickers/precios/fechas: clase `.kicker` o `font-mono` (JetBrains Mono)
- `.font-jp`: pila de sistema japonés para texto kanji/kana real (no carga subconjunto CJK globalmente)

---

## 3. Espaciado, radios y sombras

- Radios: `rounded-lg` (8px) para tarjetas estándar, `rounded-xl` (12px) para tarjetas destacadas. No usar > 12px.
- Sombras: `shadow-sm` preferido. Sombra mayor (`shadow-lg`) solo en modales/menús.
- Contenedor artículo: `max-w-3xl` (~720px). Listados/home: `max-w-7xl`.

---

## 4. Componentes clave (ubicación real)

| Componente | Archivo | Notas |
|---|---|---|
| `Breadcrumbs` | `src/components/Breadcrumbs.tsx` | Emite visual + JSON-LD BreadcrumbList. Props: `items`, `variant` (onDark/onLight), `className` |
| `Article` | `src/components/Article.tsx` | Motor de artículos. Prop `extraJsonLd?: object[]` para schema adicional (ej. HowTo en itinerarios) |
| `AffiliateBox` | `src/components/AffiliateBox.tsx` | Partner del registro central. Título: `font-bold` (no font-serif) |
| `YenIndicator` | `src/components/YenIndicator.tsx` | Server component async. Montado en Navbar desktop |
| `PillarArticles` | `src/components/PillarIndex.tsx` | Grid auto de artículos por pilar |
| Kit MDX (17 comps) | `src/components/mdx.tsx` | `Cards`, `InfoBox`, `StatCards`, `VsCards`, `DoDont`, `FAQ`, `ItineraryDay`, etc. |

---

## 5. Registro de afiliados

11 partners en `src/lib/affiliates.ts`: civitatis, klook, iati, heymondo, holafly, airalo, skyscanner, jrpass, revolut, **booking**, **getyourguide** (últimos dos añadidos en Fase 1, sin IDs reales todavía).

Variables de entorno en `.env.example` y en Cloudflare Worker secrets para producción.

---

## 6. Anti-patrones (NO usar)

- ❌ `text-gray-*` / `bg-gray-*` en elementos de contenido — rompe dark mode (usar `text-fg`, `bg-muted`)
- ❌ `font-serif` con intención de serif real — ahora apunta a M PLUS 1p (sans)
- ❌ Hardcodear colores hex en clases Tailwind — usar siempre tokens semánticos
- ❌ `breadcrumbLd()` manual inline — usar el componente `<Breadcrumbs>` que lo emite automáticamente
- ❌ `getArticles("logistica")` + `getArticles("blog")` para cubrir todo — usar `getAllArticles()`
- ❌ Fuentes Poppins / Pacifico — eliminadas en Fase 1

---

## 7. Checklist pre-entrega

- [ ] H1 y títulos principales usan `text-fg` (nunca `text-gray-900`)
- [ ] Breadcrumbs presentes en artículo y en hub (visual + JSON-LD via componente `<Breadcrumbs>`)
- [ ] Contraste ≥4.5:1 verificado en light Y dark
- [ ] `prefers-reduced-motion` respetado (`globals.css` lo cubre globalmente)
- [ ] `next/image` con dimensiones declaradas; fuentes `display:swap`
- [ ] Iconos SVG Lucide — nunca emoji como icono
- [ ] Targets táctiles ≥44px en elementos interactivos
