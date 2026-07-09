# Deploy y Monitoreo SEO - viajajapon.com

**Fecha de deploy**: 9 julio 2026  
**Responsable**: Sergio Morillo + Claude Sonnet 4.5

---

## 📦 QUÉ SE DESPLEGÓ

### Commits
- **a2ee6f3**: SEO: Optimización integral Fase 1 (Quick Wins)
- **4dc203f**: Fix: cambiar Comparativa por VsCards en página pilar

### Cambios en Producción

#### 1. Títulos y Meta Descriptions Optimizados (10 artículos)
| Artículo | Título Anterior | Título Optimizado |
|---|---|---|
| Itinerario 15 días | "Itinerario de 15 días por Japón: la ruta profunda (2026)" | "Itinerario 15 Días Japón [2026] Día a Día + Presupuesto Real" |
| Kimono | "El kimono: tipos, cómo se lleva y dónde alquilarlo" | "Kimono Japonés [Guía 2026]: Tipos, Cómo Ponérselo + Alquilar" |
| Dónde dormir Kioto | "Dónde dormir en Kioto: qué zona elegir (2026)" | "Dónde Dormir en Kioto [2026]: Mejores Zonas + Mapa y Consejos" |
| Monte Fuji | "Monte Fuji: dónde verlo y cómo subir (2026)" | "Monte Fuji [2026]: Cómo Verlo, Subirlo + Mejores Miradores" |
| Compras | "Compras en Japón y tax-free: guía para 2026" | "Compras Japón + Tax Free [2026]: Cómo Ahorrar 10% IVA" |
| Daruma | "Daruma: el muñeco japonés de los deseos (y sus ojos)" | "Daruma: Muñeco Japonés de la Suerte [Significado + Ritual Ojos]" |
| Festivales | "Festivales de Japón: matsuri y el calendario del año (2026)" | "Festivales Japón [2026]: Calendario Matsuri + Fechas Exactas" |
| Qué ver Kioto | "Qué ver en Kioto: templos, Gion y un plan de 2 días (2026)" | "Qué Ver en Kioto [2026]: 15 Imprescindibles + Itinerario 2-3 Días" |
| Idioma | "Idioma en Japón: frases útiles y apps para viajar" | "Viajar a Japón sin Saber Japonés [2026]: Frases + Apps" |

**Patrón aplicado**: `[Keyword] [Año] + [Beneficio Concreto]`

#### 2. Schema Markup Implementado
- ✅ **BreadcrumbList** en todos los artículos (6 pilares)
- ✅ **Article schema** con publisher logo
- ✅ **HowTo schema** en itinerarios (ya existente)
- ✅ **FAQ schema** en página pilar

#### 3. Contenido Nuevo/Expandido
- ✅ **Nueva página pilar**: `/logistica/guia-completa-japon-2026` (5.200+ palabras)
- ✅ **Sección nueva** en compras: "Impuestos por comprar en Japón" (responde query con 75 impresiones)

#### 4. Internal Linking
- ✅ Componente `RelatedArticles.tsx` creado
- ✅ Implementado en itinerario 15 días (6 enlaces)
- ✅ Implementado en página pilar (30+ enlaces)

---

## 🚀 PROCESO DE DEPLOY

### Problema Encontrado
El comando `npm run cf:deploy` falla en Windows debido a limitación de OpenNext con symlinks:
```
Error: EPERM: operation not permitted, symlink
```

### Solución Aplicada
**Deploy vía GitHub → Cloudflare Pages** (automático):

```bash
# 1. Commit de cambios
git add -A
git commit -m "SEO: mensaje descriptivo"

# 2. Push a GitHub
git push origin master

# 3. Cloudflare Pages detecta el push y despliega automáticamente (5-10 min)
```

### Alternativas de Deploy
1. **GitHub Actions** (recomendado para CI/CD): ya existe workflow en `.github/workflows/`
2. **WSL (Windows Subsystem for Linux)**: permite `npm run cf:deploy` sin errores
3. **Cloudflare Dashboard**: deploy manual subiendo carpeta `.open-next/`

---

## 🔍 VERIFICACIÓN POST-DEPLOY

### Checklist Inmediato (Hoy)

- [ ] **Cloudflare Dashboard** → viajajapon.com → verificar deploy exitoso
- [ ] **Verificar página pilar**: https://viajajapon.com/logistica/guia-completa-japon-2026
- [ ] **Verificar títulos** en 3 artículos aleatorios:
  - https://viajajapon.com/itinerarios/itinerario-japon-15-dias
  - https://viajajapon.com/cultura/kimono
  - https://viajajapon.com/destinos/donde-dormir-en-kioto
- [ ] **Verificar breadcrumbs** (View Source → buscar `"@type":"BreadcrumbList"`)
- [ ] **Verificar RelatedArticles** visualmente al final del artículo

### Comandos de Verificación

```bash
# 1. Ver título y meta description de página
curl -s "https://viajajapon.com/itinerarios/itinerario-japon-15-dias" | grep -oP '<title>.*?</title>|content="[^"]*" name="description"'

# 2. Verificar schema breadcrumbs
curl -s "https://viajajapon.com/cultura/kimono" | grep -A 20 '"@type":"BreadcrumbList"'

# 3. Ver todas las URLs en sitemap
curl -s "https://viajajapon.com/sitemap.xml" | grep -oP '<loc>\K[^<]+'
```

### Verificación Visual (Navegador)

1. **Títulos en pestañas**: Abrir 3 artículos optimizados y verificar que el título de la pestaña sea el nuevo
2. **Meta descriptions en Google**: Buscar `site:viajajapon.com itinerario 15 dias` y ver si aparece nueva description (puede tardar 24-48h)
3. **Breadcrumbs en Google**: Buscar artículo por nombre y ver si aparece ruta (puede tardar 3-7 días)

---

## 📊 MONITOREO SEO (Semanal)

### Herramientas a Usar

1. **Google Search Console** (principal)
   - URL: https://search.google.com/search-console
   - Métricas: Clics, Impresiones, CTR, Posición media

2. **Google Analytics 4** (secundario)
   - Tráfico orgánico
   - Páginas más visitadas

3. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Verificar JSON-LD de artículos

### Métricas Clave a Monitorear

| Métrica | Valor Actual | Objetivo Semana 1 | Objetivo Mes 1 | Objetivo Mes 3 |
|---|---|---|---|---|
| **CTR medio** | 0% | 0.5-1% | 2-3% | 10%+ |
| **Posición media** | 40+ | 35-38 | 25-30 | 8-12 |
| **Clics/día** | 0 | 1-5 | 20-50 | 100+ |
| **Impresiones/día** | ~13 | 30-50 | 100-200 | 10.000+ |
| **URLs indexadas** | ~53 | ~55 | ~60 | ~70 |

### Frecuencia de Revisión

**Semanal** (cada lunes 9:00h):
- [ ] Revisar GSC: clics, impresiones, CTR, posición
- [ ] Anotar top 5 queries con más impresiones
- [ ] Identificar artículos con impresiones pero 0 clics → optimizar

**Mensual** (primer lunes de mes):
- [ ] Informe completo de métricas vs objetivos
- [ ] Análisis de contenido: qué funciona, qué no
- [ ] Plan de acción para siguiente mes

---

## 📅 CRONOGRAMA DE ACCIONES

### Esta Semana (15 julio 2026)

**Lunes 15 julio**:
- [ ] Primera revisión GSC post-deploy
- [ ] Verificar que Google indexó página pilar
- [ ] Captura de pantalla de métricas baseline

**Miércoles 17 julio**:
- [ ] Añadir `<RelatedArticles>` a 5 artículos más:
  - `/logistica/jr-pass-2026`
  - `/destinos/que-ver-en-tokio`
  - `/logistica/cuanto-cuesta-viajar-japon`
  - `/cultura/kimono`
  - `/gastronomia/que-comer-en-japon`

**Viernes 19 julio**:
- [ ] Revisar GSC: primeros cambios en CTR
- [ ] Commit de RelatedArticles añadidos

### Semana 2 (22-26 julio)

- [ ] Crear artículo "Comprar en Japón sin saber japonés" (33 impresiones sin clic)
- [ ] Expandir artículo Monte Fuji con sección "Desde dónde verlo: guía por ciudad"
- [ ] Añadir `<RelatedArticles>` a 10 artículos más

### Mes 2 (Agosto 2026)

**Semana 1-2**:
- [ ] Crear artículo estacional "Momiji Otoño 2026: Mejores sitios y fechas"
- [ ] Crear artículo "Kioto en 3 días: itinerario día a día"
- [ ] Implementar RSS Feed completo

**Semana 3-4**:
- [ ] Auditoría Core Web Vitals (PageSpeed Insights)
- [ ] Optimizar imágenes si LCP > 2.5s
- [ ] Añadir lazy loading a imágenes below the fold

### Mes 3 (Septiembre 2026)

- [ ] Revisar métricas mes 1 y ajustar estrategia
- [ ] Crear 5 artículos cluster para keywords long-tail
- [ ] Implementar mejoras técnicas según audit

---

## 🎯 OBJETIVOS Y KPIS

### Objetivo General
**Pasar de 0 clics/día → 100 clics/día en 3 meses**

### KPIs por Fase

#### FASE 1 - Mes 1 (Julio 2026) ✅ COMPLETADO
**Acciones**:
- ✅ Optimizar títulos y descriptions (10 artículos)
- ✅ Implementar schema markup avanzado
- ✅ Crear página pilar
- ✅ Sistema de enlaces internos

**Métricas esperadas**:
- CTR: 0% → 2-3%
- Posición: 40+ → 25-30
- Clics/día: 0 → 20-50

#### FASE 2 - Mes 2 (Agosto 2026)
**Acciones**:
- [ ] 5 artículos nuevos (clusters temáticos)
- [ ] Contenido estacional (momiji)
- [ ] RSS Feed
- [ ] Auditoría técnica Core Web Vitals

**Métricas esperadas**:
- CTR: 2-3% → 5-7%
- Posición: 25-30 → 15-20
- Clics/día: 20-50 → 50-80

#### FASE 3 - Mes 3 (Septiembre 2026)
**Acciones**:
- [ ] 5 artículos long-tail
- [ ] Optimizaciones técnicas
- [ ] Link building (opcional)

**Métricas esperadas**:
- CTR: 5-7% → 10%+
- Posición: 15-20 → 8-12
- Clics/día: 50-80 → 100+

---

## 📝 PLANTILLA DE SEGUIMIENTO SEMANAL

```markdown
# Seguimiento SEO - Semana del [FECHA]

## Métricas Google Search Console
- Clics totales: [número] (vs semana anterior: [+/- X%])
- Impresiones: [número] (vs semana anterior: [+/- X%])
- CTR medio: [%] (vs semana anterior: [+/- X pp])
- Posición media: [número] (vs semana anterior: [+/- X])

## Top 5 Queries (más impresiones)
1. [query] - [impresiones] imp, [clics] clics, [CTR]%
2. [query] - [impresiones] imp, [clics] clics, [CTR]%
3. [query] - [impresiones] imp, [clics] clics, [CTR]%
4. [query] - [impresiones] imp, [clics] clics, [CTR]%
5. [query] - [impresiones] imp, [clics] clics, [CTR]%

## Artículos con más clics
1. [URL] - [clics] clics
2. [URL] - [clics] clics
3. [URL] - [clics] clics

## Oportunidades detectadas
- [ ] [Query con muchas impresiones pero 0 clics] → Optimizar título/description
- [ ] [Artículo en posición 11-20] → Mejorar contenido
- [ ] [Keyword nueva apareciendo] → Crear contenido

## Acciones realizadas esta semana
- [x] [Acción 1]
- [x] [Acción 2]

## Plan próxima semana
- [ ] [Acción 1]
- [ ] [Acción 2]
```

---

## 🔧 TROUBLESHOOTING

### Problema: Títulos no actualizan en Google
**Solución**:
1. Google Search Console → Inspección de URLs → pegar URL
2. "Solicitar indexación"
3. Esperar 24-48h

### Problema: Breadcrumbs no aparecen en resultados
**Solución**:
1. Verificar schema con https://validator.schema.org/
2. Verificar que Google indexó la versión nueva (puede tardar 3-7 días)
3. Rich Results Test: https://search.google.com/test/rich-results

### Problema: CTR no mejora después de 2 semanas
**Posibles causas**:
1. Posición aún muy baja (>20) → seguir mejorando contenido
2. Description no atractiva → A/B test con otra
3. Competencia muy fuerte → apuntar a long-tail keywords

### Problema: Build falla en local (Windows)
**Solución**:
```bash
# Usar deploy vía GitHub push
git add -A
git commit -m "mensaje"
git push origin master
# Cloudflare Pages hará el build automáticamente
```

---

## 📚 RECURSOS Y DOCUMENTACIÓN

### Documentos del Proyecto
- `SEO-STRATEGY.md` - Estrategia SEO completa (3 meses)
- `SEO-DEPLOYMENT.md` - Este documento
- `.github/workflows/` - GitHub Actions para CI/CD

### Herramientas Externas
- Google Search Console: https://search.google.com/search-console
- Schema Validator: https://validator.schema.org/
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/
- Cloudflare Dashboard: https://dash.cloudflare.com/

### Referencias SEO
- Google Search Central: https://developers.google.com/search
- Schema.org Article: https://schema.org/Article
- BreadcrumbList: https://schema.org/BreadcrumbList

---

## ✅ CHECKLIST DE DEPLOY FUTURO

Cada vez que hagas cambios SEO importantes:

- [ ] Commit con mensaje descriptivo
- [ ] Push a GitHub: `git push origin master`
- [ ] Verificar deploy en Cloudflare (5-10 min)
- [ ] Verificar cambios en producción (URLs específicas)
- [ ] Solicitar indexación en GSC de páginas modificadas
- [ ] Anotar en changelog qué se cambió y cuándo
- [ ] Programar revisión en 1 semana

---

**Última actualización**: 9 julio 2026  
**Próxima revisión**: 16 julio 2026  
**Responsable**: Sergio Morillo
