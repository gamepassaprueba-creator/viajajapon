# Estrategia SEO para viajajapon.com
## Diagnóstico y Plan de Acción (Julio 2026)

---

## 📊 SITUACIÓN ACTUAL

### Métricas (10 jun - 7 jul 2026)
- **Impresiones**: 375 (últimos 28 días, crecimiento +98.8%)
- **Clics**: 0 en las principales consultas
- **CTR**: 0% → **PROBLEMA CRÍTICO**
- **Consultas indexadas**: 465 diferentes
- **Contenido**: 53 artículos publicados en 6 categorías

### ✅ Puntos Fuertes Técnicos
1. **Next.js optimizado**: sitemap dinámico, robots.txt correcto
2. **Metadata estructurada**: OpenGraph, Twitter Cards implementados
3. **Canonical URLs**: correctamente configuradas
4. **Redirects 301**: www y .es → .com (consolidación de dominio)
5. **Contenido de calidad**: artículos largos, bien estructurados, con datos actualizados
6. **Componentes MDX ricos**: StatCards, InfoBox, FAQ con schema markup

### 🚨 Problemas Críticos Identificados

#### 1. CTR 0% = Posiciones muy bajas (página 2-3+)
**Consultas con más impresiones pero sin clics:**
- "ruta 15 dias japon" (78 impresiones)
- "kimono" (77 impresiones)  
- "donde alojarse en kioto" (57 impresiones)
- "impuestos por comprar en japón" (75 impresiones)

**Causas:**
- Sitio nuevo (lanzado hace ~1 mes)
- Falta autoridad de dominio
- Competencia alta en keywords informacionales

#### 2. Títulos SEO No Optimizados para Clics
**Ejemplo actual:**
```
"Itinerario de 15 días por Japón: la ruta profunda (2026) · ViajaJapón"
```
**Problemas:**
- 70+ caracteres (se trunca en móvil)
- No incluye "GRATIS", "PDF", "Guía completa" (palabras que mejoran CTR)
- Falta urgencia/beneficio claro

#### 3. Meta Descriptions Genéricas
Actualmente se generan desde el frontmatter `description`, pero no están optimizadas para conversión.

#### 4. Falta Schema Markup Avanzado
- No hay BreadcrumbList
- Falta Article schema con autor y fechas
- No hay HowTo schema (oportunidad en guías prácticas)

---

## 🎯 ESTRATEGIA SEO: PRIORIDADES

### FASE 1: Quick Wins (Semana 1-2) 🔥
**Objetivo**: Mejorar CTR y captar primeros clics

#### Acción 1.1: Optimizar Títulos para CTR
**Consultas objetivo**:
- "ruta 15 dias japon" → **"Itinerario de 15 Días por Japón [2026] Día a Día + Presupuesto Real"**
- "kimono" → **"Kimono Japonés: Tipos, Cómo Ponérselo y Dónde Alquilar [Guía 2026]"**
- "donde alojarse en kioto" → **"Dónde Dormir en Kioto [2026]: Mejores Zonas + Mapa y Precios"**

**Patrón ganador:**
```
[Keyword Principal] [Año] + [Beneficio Tangible] + [Elemento de Autoridad]
```

**Implementación**:
- Modificar frontmatter `title` en los 10 artículos con más impresiones
- Máximo 60 caracteres para evitar truncado

#### Acción 1.2: Reescribir Meta Descriptions
**Fórmula de conversión**:
```
[Qué obtienes] + [Datos concretos] + [Call to Action] (150-155 caracteres)
```

**Ejemplo**:
```markdown
# Antes
description: "Itinerario de 15 días por Japón día a día: Tokio, Nikko, Kioto..."

# Después  
description: "Itinerario COMPLETO 15 días Japón ✓ Día a día ✓ Presupuesto real 1.700€ ✓ JR Pass: ¿compensa? ✓ Dónde dormir. Planifica tu viaje perfecto."
```

#### Acción 1.3: Crear Página Pilar "Guía Completa Japón 2026"
**URL**: `/guia-japon-2026` o `/guia-completa-viajar-japon`

**Contenido**:
- 5.000+ palabras
- Targeting: "viajar a japón", "guía japón", "japón por libre"
- Hub que enlaza internamente a TODOS los artículos clave
- Schema: Article + FAQ + BreadcrumbList

**Estructura**:
1. Preparativos (visado, seguro, eSIM)
2. Transporte (JR Pass calculadora, Suica)
3. Itinerarios (7, 10, 15 días, 1 mes)
4. Destinos TOP (Tokio, Kioto, Osaka)
5. Presupuesto y Época
6. Cultura y Gastronomía

---

### FASE 2: Autoridad y Enlaces (Semana 3-4) 🔗

#### Acción 2.1: Estrategia de Internal Linking
**Sistema de silos temáticos**:
```
SILO ITINERARIOS:
├── /itinerarios (hub)
├── /itinerarios/itinerario-japon-15-dias
│   └── Enlaces a: /logistica/jr-pass-2026
│   └── Enlaces a: /destinos/donde-dormir-en-kioto
│   └── Enlaces a: /logistica/cuanto-cuesta-viajar-japon
└── /itinerarios/itinerario-japon-10-dias

SILO LOGÍSTICA:
├── /logistica (hub)
├── /logistica/jr-pass-2026
│   └── Enlaces a: /herramientas/jr-pass-calculadora
└── /logistica/esim-japon
```

**Implementación**:
- Añadir 3-5 enlaces internos contextuales por artículo
- Anchor text natural con keywords
- Crear componente MDX `<RelatedArticles>` para mostrar artículos relacionados al final

#### Acción 2.2: Clusters de Contenido
**Crear artículos satélite para consultas long-tail**:

**Cluster "Itinerarios"**:
- ✅ Ya existe: 7, 10, 15 días, 1 mes
- ⚠️ Falta: "itinerario japon 3 dias", "ruta japon 21 dias"

**Cluster "Kioto"**:
- ✅ Ya existe: donde-dormir-en-kioto, que-ver-en-kioto
- ⚠️ Falta: "kioto en 1 dia", "kioto en 3 dias", "mejor zona kioto"

**Cluster "JR Pass"**:
- ✅ Ya existe: jr-pass-2026, calculadora
- ⚠️ Falta: "jr pass regional", "alternativas jr pass", "jr pass niños"

---

### FASE 3: Contenido de Alto Impacto (Mes 2) 📝

#### Acción 3.1: Crear Contenido para Consultas con Impresiones
**Prioridad ALTA** (ya tienen impresiones, solo falta contenido mejor):

1. **"impuestos por comprar en japón"** (75 impresiones)
   - Ya existe: `/logistica/compras-y-tax-free-japon`
   - **Acción**: Crear H2 específico "Impuestos por comprar en Japón: qué pagar y cómo recuperar el tax-free"
   - Añadir tabla comparativa: IVA España vs Tax Japón

2. **"comprar en japón sin saber japonés"** (33 impresiones)
   - Expandir artículo actual con sección dedicada
   - Video embebido (YouTube) con frases útiles

3. **"monte fuji"** (37 impresiones)
   - Ya existe: `/destinos/monte-fuji`
   - **Optimización**: Título más específico "Cómo Visitar el Monte Fuji [2026]: Subir, Verlo desde Hakone o Kawaguchiko"

#### Acción 3.2: Contenido Estacional (ROI Alto)
**Cerezos 2027** (empezar en enero 2027):
- "cuando ver cerezos en flor japon 2027"
- "previsión sakura 2027"
- "mejores sitios cerezos tokio"

**Momiji 2026** (empezar en agosto 2026):
- "cuando ver momiji japon 2026"
- "mejores sitios hojas otoño kioto"

---

### FASE 4: SEO Técnico Avanzado (Mes 2-3) ⚙️

#### Acción 4.1: Implementar Schema Markup Avanzado

**1. BreadcrumbList** (prioridad ALTA)
```typescript
// src/lib/jsonld.ts
export function breadcrumbLd(items: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}
```

**2. Article Schema** (ya parcial, completar)
```json
{
  "@type": "Article",
  "headline": "...",
  "author": {
    "@type": "Person",
    "name": "Sergio Morillo",
    "url": "https://viajajapon.com/sobre-nosotros"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ViajaJapón",
    "logo": "..."
  },
  "datePublished": "2026-06-10",
  "dateModified": "2026-06-12"
}
```

**3. HowTo Schema** (para guías prácticas)
Artículos objetivo:
- `/logistica/como-comprar-jr-pass`
- `/cultura/onsen-guia-practica`
- `/logistica/como-pagar-en-japon`

#### Acción 4.2: Optimizar Core Web Vitals
**Revisar**:
- LCP (Largest Contentful Paint): Hero images AVIF ✅ (ya implementado)
- CLS (Cumulative Layout Shift): Reservar espacio para imágenes
- FID (First Input Delay): Revisar componentes interactivos

#### Acción 4.3: Crear `/feed.xml` (RSS)
Ya existe `alternates.types` en metadata, implementar feed real:
```typescript
// src/app/feed.xml/route.ts
export async function GET() {
  const articles = getAllArticles()
  // Generar RSS Feed
}
```

---

## 🎯 KPIs y Objetivos

### Mes 1 (Julio 2026)
- ✅ CTR: de 0% → **2-3%** (primeros clics)
- ✅ Posición media: de 40+ → **25-30**
- ✅ Optimizar 10 artículos clave
- ✅ Crear página pilar

### Mes 2 (Agosto 2026)
- ✅ CTR: **5-7%**
- ✅ Posición media: **15-20**
- ✅ 5 artículos nuevos (contenido estacional)
- ✅ Schema markup en 100% artículos

### Mes 3 (Septiembre 2026)
- ✅ CTR: **10%+**
- ✅ Posición media: **8-12**
- ✅ 100 clics/día
- ✅ 10.000 impresiones/día

---

## 📋 CHECKLIST SEMANAL

### Semana 1
- [ ] Optimizar títulos 10 artículos top
- [ ] Reescribir meta descriptions
- [ ] Implementar BreadcrumbList schema
- [ ] Añadir enlaces internos (3-5 por artículo)

### Semana 2
- [ ] Crear página pilar "Guía Completa Japón 2026"
- [ ] Expandir artículos con impresiones (impuestos, monte fuji)
- [ ] Implementar Article schema completo

### Semana 3
- [ ] 3 artículos nuevos (clusters)
- [ ] Auditoría enlaces internos
- [ ] Implementar HowTo schema

### Semana 4
- [ ] 2 artículos nuevos
- [ ] RSS Feed
- [ ] Core Web Vitals audit
- [ ] Revisión KPIs mes 1

---

## 🔧 HERRAMIENTAS NECESARIAS

1. **Google Search Console** (ya conectado) ✅
2. **Google Analytics 4** (verificar implementación)
3. **Ahrefs / Semrush** (análisis competencia) - Opcional
4. **Schema Markup Validator** (https://validator.schema.org)
5. **PageSpeed Insights** (Core Web Vitals)

---

## 💡 NOTAS IMPORTANTES

### Por qué 0 clics no es alarmante (todavía)
- Sitio lanzado hace ~1 mes (muy reciente)
- Google necesita 3-6 meses para posicionar contenido nuevo
- Las impresiones crecientes (+98.8%) son una señal positiva
- Competencia alta en keywords informacionales de Japón

### Ventajas Competitivas a Explotar
1. ✅ **Contenido actualizado 2026** (la competencia tiene info antigua)
2. ✅ **Datos de experiencia real** (presupuestos en euros, fechas exactas)
3. ✅ **Calculadora JR Pass** (herramienta interactiva)
4. ✅ **Diseño moderno** (Next.js, carga rápida)

### Riesgos a Evitar
- ❌ Keyword stuffing (mantener naturalidad)
- ❌ Contenido duplicado (cada artículo único)
- ❌ Enlaces externos spam (solo fuentes oficiales: JR, embajadas)
- ❌ Clickbait sin sustancia (mantener calidad)

---

## 📈 PRÓXIMOS PASOS INMEDIATOS

1. **HOY**: Optimizar títulos y descriptions de los 10 artículos con más impresiones
2. **Esta semana**: Implementar BreadcrumbList schema
3. **Próxima semana**: Crear página pilar
4. **Mes que viene**: Empezar contenido estacional (momiji otoño 2026)

---

**Última actualización**: 9 julio 2026  
**Responsable SEO**: Claude (Sergio Morillo)  
**Próxima revisión**: 16 julio 2026
