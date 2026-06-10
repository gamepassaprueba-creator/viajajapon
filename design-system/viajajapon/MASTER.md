# Design System Master — ViajaJapón

> **LÓGICA:** Al construir una página, primero revisa `design-system/viajajapon/pages/[page].md`. Si existe, sus reglas **anulan** este Master. Si no, sigue estrictamente lo de aquí.

**Proyecto:** ViajaJapón — web de planificación de viajes a Japón en español (alta intención: afiliados de seguros/eSIM/JR Pass) construida sobre experiencia y fotos reales.
**Estilo:** Magazine editorial minimalista, con sobriedad japonesa (espacio en blanco, tipografía protagonista, rojo como acento puntual). Light + Dark.
**Generado:** 2026-06-02 · corregido a mano (se descartó la salida genérica del generador: estilo "biophilic", acento rosa #EC4899 y fuentes Public Sans — NO se usan).

---

## 1. Color (tokens semánticos, WCAG AA verificado)

### Light (por defecto)
| Rol | Hex | CSS var | Uso / contraste |
|---|---|---|---|
| Paper (fondo) | `#FBF8F1` | `--color-bg` | Crema washi cálido |
| Surface (tarjeta) | `#FFFFFF` | `--color-surface` | Tarjetas sobre el crema |
| Ink (texto) | `#1C1917` | `--color-fg` | Texto principal · AAA sobre bg/surface |
| Ink-muted (texto 2º) | `#57534E` | `--color-fg-muted` | Metadatos · ≥5:1 ✓ |
| Rojo marca (primary/CTA) | `#C1121F` | `--color-primary` | Botones, kickers, acentos · blanco encima ≈6:1 ✓ |
| Rojo hover/active | `#9E0E19` | `--color-primary-strong` | Estados |
| Índigo (藍, 2º acento) | `#234E70` | `--color-accent` | Enlaces/tags · opcional, sobrio |
| Borde | `#E7E1D6` | `--color-border` | 1px cálido |
| Muted (secciones) | `#F3EEE3` | `--color-muted` | Bloques de fondo |
| Éxito ("sí compensa") | `#15803D` | `--color-success` | Veredicto verde (+ icono+texto) |
| Alerta ("no compensa") | `#C1121F` | `--color-danger` | Veredicto rojo (+ icono+texto) |
| Ring (focus) | `#234E70` | `--color-ring` | Anillo de foco visible 2-3px |

### Dark
| Rol | Hex |
|---|---|
| Paper | `#1A1714` (marrón-tinta cálido, no negro puro) |
| Surface | `#26211C` |
| Ink | `#F5F0E6` |
| Ink-muted | `#B8AFA2` (≥4.5:1 sobre paper) |
| Rojo marca | `#F26D5B`→ usar `#E8584A` para texto/acento (rojo desaturado más claro, legible en oscuro) |
| Borde | `#3A332C` |

**Reglas de color:** acento rojo SIEMPRE puntual (CTA, kicker, dato clave) — nunca inundar. El color nunca comunica solo (añadir icono/texto). Nada de degradados morados/rosas genéricos de IA.

---

## 2. Tipografía (pairing "Japanese Elegant")

- **Titulares:** **Noto Serif JP** (600, 700) — editorial, elegante, con glifos japoneses.
- **Cuerpo/UI:** **Noto Sans JP** (400, 500, 700).
- **Datos/precios:** Noto Sans JP con `font-variant-numeric: tabular-nums`. Eyebrow/kicker/fechas: opcional **JetBrains Mono** (uppercase, `tracking-wide`) para sabor editorial.
- **Carga (Core Web Vitals):** `next/font` con `subsets: ['latin']`, `display: 'swap'`, solo los pesos listados. Utilidad `.font-jp` (subset `japanese`) **solo** para texto japonés real (駅, nombres de platos), de forma puntual, para no cargar el set CJK completo de forma global.

**Escala:** 14 · 16(base) · 18 · 20 · 24 · 30 · 40 · 56(display). Line-height: cuerpo **1.65**, titulares **1.15**. Tracking: titulares `-0.01em`; eyebrow mono `+0.08em` uppercase. Medida de línea 60-75 car.

```css
/* next/font expone variables; mapeo Tailwind */
--font-serif: 'Noto Serif JP', Georgia, serif;
--font-sans: 'Noto Sans JP', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

---

## 3. Espaciado, radios y sombras

- **Espaciado** (escala 4/8): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96`. Ritmo vertical de sección: 24/40/64.
- **Radios (sobrios, NO blobs):** `--radius-sm 4px` (botones/inputs), `--radius 8px` (tarjetas). Máx 12px. Nada de 16-24px "orgánicos".
- **Sombras (mínimas, editorial = borde + aire):** `--shadow-sm: 0 1px 2px rgba(28,25,23,.06)`. Preferir borde 1px sobre sombra. Sombra mayor solo en modales/menús.
- **Contenedor:** `max-w-3xl` (artículos, ~720px para medida de lectura), `max-w-6xl` (home/listados).

---

## 4. Componentes base (specs)

- **Navbar:** sticky, fondo `--color-bg` con borde inferior 1px; logo (serif) a la izquierda; nav (Viajes · Gastronomía · Datos/Herramientas · Calculadora) en sans; mini-indicador **"Yen hoy ¥xxx/€"** que enlaza a la página viva. Foco visible, target ≥44px.
- **Hero (editorial):** kicker mono rojo + titular grande Noto Serif JP + subtítulo + CTA primario a la calculadora. Sin imagen de stock genérica; foto propia o composición tipográfica.
- **Card de artículo:** imagen 16:9 (next/image, AVIF, dimensiones declaradas), kicker categoría (mono, rojo), título serif, meta (autor real + fecha). Borde 1px, radius 8px, hover = sombra-sm + borde rojo sutil (sin desplazar layout).
- **Tabla de datos:** `tabular-nums`, cabecera muted, zebra muy sutil, alineación de números a la derecha; responsive (scroll-x con sombra de borde o reflow a tarjetas en móvil); ordenable más adelante con `aria-sort`.
- **Caja de afiliado/CTA:** recuadro con borde, fondo `--color-muted`, título + 1 frase + botón primario; **disclosure visible "enlace de afiliado"**; máx 1-2 por artículo.
- **Calculadora — caja de veredicto:** verde (`--color-success`) si compensa / rojo (`--color-danger`) si no; SIEMPRE con icono (SVG Lucide) + frase completa ("El JR Pass NO te compensa: ahorras 142€ con billetes sueltos"), nunca solo color. Cifras en `tabular-nums`. Sello "Datos actualizados: [fecha]".

**Botones:** primario = fondo `--color-primary`, texto blanco, radius 4px, peso 600, transición 200ms, `cursor-pointer`, focus-ring visible; hover = `--color-primary-strong` (sin transform que desplace). Secundario = transparente, borde 1px ink, texto ink.

---

## 5. Anti-patrones (NO usar)
- ❌ Acento rosa/morado o degradados "IA"; ❌ fuentes genéricas (Inter/Roboto/Space Grotesk); ❌ estilo "biophilic"/blobs redondeados; ❌ emojis como iconos (usar SVG Lucide/Heroicons); ❌ rojo inundando la página (es acento); ❌ imágenes de stock de turistas genéricas (usar fotos propias reales = el moat); ❌ hovers que desplazan layout; ❌ contraste <4.5:1; ❌ cambios de estado instantáneos (usar 150-300ms); ❌ foco invisible.

## 6. Checklist pre-entrega
- [ ] Contraste texto ≥4.5:1 (light y dark verificados por separado)
- [ ] Iconos SVG consistentes (Lucide), nunca emoji
- [ ] `cursor-pointer` + foco visible en todo lo clicable; targets ≥44px
- [ ] `prefers-reduced-motion` respetado; transiciones 150-300ms
- [ ] `next/image` con dimensiones (CLS<0.1); fuentes `display:swap` subset latin
- [ ] Color nunca comunica solo (icono/texto)
- [ ] Responsive 375 / 768 / 1024 / 1440; sin scroll horizontal en móvil
- [ ] Jerarquía de encabezados h1→h6 sin saltos; un solo CTA primario por vista
