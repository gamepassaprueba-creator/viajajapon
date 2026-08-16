# ViajaJapón — SEO + Product Growth Plan

**Estado:** 16 de agosto de 2026  
**Objetivo:** convertir tráfico orgánico cualificado en ingresos sostenibles sin degradar la utilidad, confianza ni experiencia de la web.

> Este documento sustituye el plan de julio de 2026. No usar métricas, tareas o hipótesis antiguas si contradicen este estado.

## 1. North star

No optimizamos para «publicar más» ni para una posición media aislada. La cadena que importa es:

**demanda orgánica → landing útil → interacción → intención comercial / lead → ingreso**

KPIs operativos:
- clics e impresiones orgánicas por landing y consulta (Search Console),
- CTR de páginas que ya tienen visibilidad,
- usuarios y sesiones orgánicas (GA4),
- `affiliate_click` y `newsletter_signup`,
- ingresos por afiliación / publicidad cuando cada canal esté aprobado y activo.

## 2. Baseline real

Ventana de referencia de Search Console auditada: **17 mayo–14 agosto 2026**.

Señales principales:
- el sitio ya obtiene clics; la hipótesis antigua de «CTR 0%» está obsoleta;
- `/itinerarios/itinerario-japon-1-mes` es la prueba de producto/SEO más fuerte: **30 clics, 347 impresiones, CTR 8,65%, posición media 10,7**;
- `/logistica/compras-y-tax-free-japon`: **864 impresiones** y demanda clara, todavía lejos del top 10;
- `/destinos/donde-dormir-en-kioto`: **927 impresiones**, pero posición media ~55: problema de autoridad/relevancia competitiva, no un simple cambio de title;
- `/gastronomia/tipos-restaurantes-japon`: alrededor de **posición 7** con pocas conversiones a clic: candidato a experimento de CTR;
- `/cultura/festivales-de-japon`: alrededor de **posición 10**: actualización 2026 ya ejecutada;
- `/cultura/geishas-y-maiko-japon`: tenía impresiones pero Google la dejó como **Crawled - currently not indexed**; se ha reescrito y reforzado, pendiente de recrawl;
- móvil acumula más impresiones y peor CTR que escritorio: cualquier experimento de snippet debe evaluarse especialmente en móvil.

GA4 se instaló y validó el **16 de agosto de 2026**. No existe histórico anterior comparable de Analytics.

## 3. Infraestructura ya cerrada

- Search Console accesible por bridge de solo lectura.
- GA4 `G-NGK9K8DWYP` / propiedad `550129763`, con consentimiento previo.
- `page_view` validado en navegación real.
- `affiliate_click` validado end-to-end.
- `newsletter_signup` instrumentado sin enviar email/PII a Analytics.
- canonical por artículo correcto; inspecciones prioritarias muestran que Google respeta el canonical.
- BreadcrumbList y Article JSON-LD operativos.
- sitemap dinámico y robots.txt controlados.
- `/buscar`: crawlable + `noindex,follow`; `/embed` bloqueado.
- enlazado interno editorial para las páginas con demanda demostrada.
- `viajajapon.es`, `www.viajajapon.es` y `www.viajajapon.com`: redirects permanentes definidos hacia `.com`; CI debe vigilar que sigan funcionando en producción.
- `ads.txt` y meta de verificación AdSense presentes; el script publicitario no se carga mientras AdSense no apruebe el sitio.
- páginas de confianza: Sobre nosotros, Contacto/correcciones, Política editorial, Privacidad, Cookies, Legal y divulgación de afiliados.

## 4. Cambios SEO ya ejecutados el 16/08

### Geisha / geiko / maiko
- answer-first para diferencias;
- intención alineada con consultas reales;
- reglas de Gion actualizadas desde fuentes oficiales de Kioto;
- enlaces internos desde/hacia Kioto, kimono e itinerarios;
- `dateModified` real, no frescura artificial.

**Estado:** publicado; Google todavía conserva el crawl antiguo de julio. No seguir reescribiendo hasta que recrawlee.

### Festivales 2026
- calendario verificable de Gion, Tenjin y Aomori Nebuta;
- corrección de Kanda 2026 (Kagematsuri, sin gran Honmatsuri público);
- title/description orientados a la intención `matsuri japon 2026`.

### Tipos de restaurantes
- experimento solo de metadata para aislar efecto CTR;
- no cambiar simultáneamente H1 y cuerpo hasta disponer de nueva muestra.

### Enlazado interno
- `CrossPillarLinks` ya no decide exclusivamente por recencia;
- páginas de oportunidad tienen destinos editoriales explícitos y fallback automático.

## 5. Monetización: estado real

### Afiliados
El código soporta:
`CIVITATIS`, `KLOOK`, `IATI`, `HEYMONDO`, `HOLAFLY`, `AIRALO`, `SKYSCANNER`, `JRPASS`, `REVOLUT`, `BOOKING`, `GETYOURGUIDE`.

El pipeline ya inyecta `AFF_*` en build y muestra diagnóstico seguro. **Actualmente 0/11 están configurados** porque las altas siguen pendientes. Nunca inventar IDs ni convertir una URL normal en «afiliada».

### AdSense
Publisher: `pub-7277317479691987`.

Google rechazó `viajajapon.com` el 9/08/2026 con un email genérico. El motivo exacto debe leerse en el panel de AdSense. Antes de solicitar nueva revisión:
- mantener ads.txt + meta de verificación,
- no cargar anuncios antes de aprobación,
- asegurar navegación, autoría, contacto, política editorial y contenido útil,
- corregir el motivo concreto que muestre el panel.

### Newsletter
La UI existe pero **MailerLite no está configurado en el Worker**. Mientras falte `MAILERLITE_API_KEY`, el formulario operativo no se muestra. No captar emails hasta tener proveedor, doble opt-in y configuración legal real.

## 6. Regla de priorización SEO

No reescribir en masa.

1. **Posición 1–15 + impresiones suficientes + CTR débil** → probar snippet/intención antes que contenido nuevo.
2. **Posición 15–40 + demanda clara** → mejorar cobertura, enlaces internos y autoridad del cluster.
3. **Posición >40** → no asumir que un title arreglará el problema; comprobar intención, competencia y autoridad.
4. **Rastreada/no indexada** → resolver calidad/duplicidad/enlazado/frescura real y esperar recrawl antes de volver a tocar.
5. **Sin impresiones** → no producir satélites por intuición salvo que exista una razón estratégica o demanda externa demostrada.

Umbral orientativo para un test de CTR: preferir páginas con **≥30 impresiones recientes y posición media ≤15**. No declarar ganador con muestras diminutas.

## 7. Qué NO hacer

- No publicar decenas de artículos generados por IA para «llenar clusters».
- No añadir palabras como GRATIS, PDF, «mejor» o superlativos si la página no entrega exactamente eso.
- No cambiar title + H1 + intro + URL a la vez cuando queremos medir CTR.
- No actualizar `dateModified` sin una revisión material.
- No afirmar que un enlace monetiza si `isMonetized()` es falso.
- No activar AdSense hasta aprobación y consentimiento publicitario adecuado.
- No crear páginas finas por cada conversión de yenes (`280 yenes a euros`, etc.); la herramienta general debe resolver esa intención.
- No sustituir experiencia/fuentes por una respuesta de IA sin verificación.

## 8. Próximos bloques

### A. Esperar señal, no inmovilidad
- observar recrawl de geishas y evolución del test de restaurantes;
- acumular 30 días de GA4 para conocer landing → engagement → clic comercial;
- revisar consultas nuevas semanalmente, no solo keywords históricas.

### B. Monetización
1. Resolver motivo exacto de AdSense y volver a revisión.
2. Activar Civitatis/IATI/Holafly solo cuando llegue aprobación y tracking oficial.
3. Crear MailerLite (u otro ESP) y habilitar doble opt-in antes de reactivar captación.
4. Medir ingreso por landing y proveedor, no únicamente clics.

### C. Contenido/autoridad
Priorizar clusters respaldados por datos existentes:
- compras / tax-free / cómo pagar / presupuesto;
- Kioto: qué ver / dónde dormir / cultura tradicional;
- itinerarios: proteger el ganador de 1 mes y transferir autoridad hacia rutas de menor duración;
- JR Pass/calculadora: herramienta como activo enlazable, evitando artículos redundantes.

Antes de crear un artículo nuevo, responder: **qué consulta satisface, qué página actual no la satisface y cómo contribuye a tráfico o monetización**.

### D. Distribución social (posterior)
El usuario quiere estudiar una capa automatizada con IA para redes sociales. No abrir ese frente hasta estabilizar SEO/medición/monetización básica. Cuando se haga, reutilizar contenido existente con adaptación por canal, revisión humana, calendario, UTM y medición de conversiones; no publicar clones automáticos en masa.

## 9. Cadencia de decisión

- **Semanal:** GSC por página/query, indexación de páginas cambiadas, errores técnicos.
- **Mensual:** GA4 orgánico, engagement, conversiones, ingresos y páginas asistidas.
- **Trimestral:** arquitectura de clusters, contenido obsoleto, consolidaciones y nuevas oportunidades.

La siguiente acción siempre sale de datos nuevos o de un bloqueo demostrado, no de una checklist genérica.
