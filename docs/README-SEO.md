# Documentación SEO - viajajapon.com

Índice de documentos y guía rápida para gestión SEO del proyecto.

---

## 📚 Documentos Disponibles

### 1. **SEO-STRATEGY.md** (Raíz del proyecto)
Estrategia SEO completa para 3 meses.

**Contiene**:
- Diagnóstico actual (métricas, problemas, fortalezas)
- Plan de acción por fases (FASE 1, 2, 3)
- KPIs y objetivos mensuales
- Checklist semanal
- Herramientas y notas importantes

**Cuándo leer**: Antes de planificar nuevas acciones SEO.

### 2. **SEO-DEPLOYMENT.md** (docs/)
Proceso de deploy y monitoreo post-deploy.

**Contiene**:
- Qué se desplegó (changelog detallado)
- Proceso de deploy (cómo hacerlo sin errores)
- Verificación post-deploy
- Cronograma de acciones semanales/mensuales
- Plantilla de seguimiento semanal
- Troubleshooting

**Cuándo leer**: Antes de cada deploy y cada lunes para seguimiento.

### 3. **CHANGELOG-SEO.md** (Raíz del proyecto)
Registro cronológico de todos los cambios SEO.

**Contiene**:
- Fecha de cada cambio
- Qué se implementó
- Métricas antes/después
- Commits relacionados
- Verificaciones realizadas

**Cuándo actualizar**: Después de cada deploy SEO.

### 4. **README-SEO.md** (Este archivo)
Índice y guía de navegación rápida.

---

## 🚀 Inicio Rápido

### Si es tu primera vez aquí:

1. **Lee** `SEO-STRATEGY.md` (20 min) → Entenderás el plan completo
2. **Revisa** `CHANGELOG-SEO.md` → Ver qué se ha hecho hasta ahora
3. **Usa** `SEO-DEPLOYMENT.md` → Para seguimiento semanal

### Si vas a hacer cambios SEO:

1. **Planifica** usando checklist de `SEO-STRATEGY.md`
2. **Implementa** los cambios (contenido, código)
3. **Commit** con mensaje descriptivo
4. **Push** a GitHub: `git push origin master`
5. **Verifica** deploy en Cloudflare (5-10 min)
6. **Actualiza** `CHANGELOG-SEO.md` con cambios realizados
7. **Programa** revisión en 1 semana

### Si es lunes (día de seguimiento):

1. **Abre** Google Search Console
2. **Usa** plantilla de seguimiento semanal de `SEO-DEPLOYMENT.md`
3. **Anota** métricas: clics, impresiones, CTR, posición
4. **Identifica** oportunidades (impresiones sin clics)
5. **Planifica** acciones para la semana

---

## 📊 Métricas Clave (Resumen)

### Estado Actual (9 julio 2026)
| Métrica | Valor | Objetivo Mes 1 | Objetivo Mes 3 |
|---|---|---|---|
| CTR | 0% | 2-3% | 10%+ |
| Clics/día | 0 | 20-50 | 100+ |
| Impresiones/día | ~13 | 100-200 | 10.000+ |
| Posición media | 40+ | 25-30 | 8-12 |

**Próxima revisión**: 16 julio 2026

---

## 🔧 Comandos Útiles

### Deploy
```bash
# Método recomendado (Windows)
git add -A
git commit -m "SEO: descripción del cambio"
git push origin master
# Cloudflare Pages despliega automáticamente en 5-10 min
```

### Verificación Local
```bash
# Ver títulos de artículo en producción
curl -s "https://viajajapon.com/itinerarios/itinerario-japon-15-dias" | grep -oP '<title>.*?</title>'

# Verificar schema breadcrumbs
curl -s "https://viajajapon.com/cultura/kimono" | grep -A 20 '"@type":"BreadcrumbList"'

# Listar todas URLs del sitemap
curl -s "https://viajajapon.com/sitemap.xml" | grep -oP '<loc>\K[^<]+'
```

### Build Local (si es necesario)
```bash
npm install
npm run build
# Si falla en Windows, usar deploy vía GitHub
```

---

## 📅 Cronograma Rápido

### Esta Semana (15 julio)
- [ ] Lunes: Primera revisión GSC post-deploy
- [ ] Miércoles: Añadir RelatedArticles a 5 artículos
- [ ] Viernes: Revisar primeros cambios CTR

### Próximas 2 Semanas
- [ ] Crear artículo "Comprar sin japonés" (33 impresiones)
- [ ] Expandir Monte Fuji
- [ ] Añadir RelatedArticles a 10 artículos más

### Mes 2 (Agosto)
- [ ] 5 artículos nuevos (clusters)
- [ ] Contenido estacional (momiji)
- [ ] RSS Feed
- [ ] Core Web Vitals audit

---

## 🎯 Objetivos por Fase

### ✅ FASE 1 (Julio) - COMPLETADO
- Optimizar títulos/descriptions (10 artículos)
- Schema markup avanzado
- Página pilar
- Sistema enlaces internos

### FASE 2 (Agosto)
- 5 artículos nuevos
- Contenido estacional
- Mejoras técnicas

### FASE 3 (Septiembre)
- 5 artículos long-tail
- Link building (opcional)
- Optimizaciones avanzadas

---

## 🔗 Enlaces Rápidos

### Herramientas
- [Google Search Console](https://search.google.com/search-console)
- [Schema Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)

### Proyecto
- Repositorio: https://github.com/gamepassaprueba-creator/viajajapon
- Sitio web: https://viajajapon.com
- Documentación: `/docs/` en el repositorio

---

## 📝 Plantilla Commit SEO

```bash
git commit -m "SEO: [tipo] [descripción breve]

[Detalle de cambios]
- Cambio 1
- Cambio 2

Objetivo: [métrica a mejorar]
Afecta a: [número] artículos

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Tipos**:
- `content`: Nuevos artículos o contenido expandido
- `optimization`: Títulos, descriptions, keywords
- `technical`: Schema, performance, estructura
- `internal-links`: RelatedArticles y enlaces internos
- `fix`: Corrección de errores

---

## ❓ FAQ

### ¿Por qué no funciona `npm run cf:deploy` en Windows?
OpenNext no es compatible con symlinks de Windows. Usa deploy vía GitHub push.

### ¿Cuánto tarda en actualizarse Google?
- **Títulos/descriptions**: 24-48 horas
- **Breadcrumbs**: 3-7 días
- **Posiciones**: 1-4 semanas

### ¿Dónde veo las métricas actuales?
Google Search Console → Rendimiento → Últimos 28 días.

### ¿Cuándo reviso las métricas?
Cada lunes a las 9:00h usando plantilla de `SEO-DEPLOYMENT.md`.

### ¿Cómo sé si un cambio funcionó?
Compara métricas semana a semana. Si CTR sube 0.5-1% o posición mejora 3-5 posiciones, está funcionando.

---

## ✅ Checklist Pre-Deploy

Antes de hacer push:

- [ ] Cambios testeados localmente (`npm run build` exitoso)
- [ ] Commit con mensaje descriptivo
- [ ] `dateModified` actualizado en MDX si aplica
- [ ] Schema markup válido (si tocaste jsonld.ts)
- [ ] Sin enlaces rotos (verificar internos)

---

**Mantenido por**: Sergio Morillo  
**Última actualización**: 9 julio 2026  
**Próxima revisión**: 16 julio 2026
