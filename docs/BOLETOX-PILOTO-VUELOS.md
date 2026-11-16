# Piloto de presupuestos de vuelos a Japón — BoletoX

Estado: **BORRADOR / NO LANZADO**. La ruta `/vuelos-japon` queda en `noindex`, no se enlaza en navegación y muestra "próximamente" si no está configurada.

## Implementación propuesta

- `src/app/vuelos-japon/page.tsx`: landing y aclaraciones de alcance.
- `src/app/vuelos-japon/FlightQuoteForm.tsx`: formulario de ruta, fechas, flexibilidad, viajeros, equipaje, presupuesto opcional, nombre, email, teléfono opcional y observaciones. **No solicita pasaporte, DNI, tarjeta ni fecha de nacimiento**.
- `src/lib/flight-quote.ts`: validación del servidor.
- `src/app/api/vuelos/presupuesto/route.ts`: GET de disponibilidad, POST con origen permitido, límites de tamaño, honeypot, Cloudflare Turnstile verificado en servidor y aviso interno por correo mediante API de Resend. No devuelve datos personales.
- ID aleatorio de solicitud en el asunto del aviso. **No hay base de datos ni panel ni estado persistente** todavía: el correo de notificación es el único registro inicial, y el identificador no permite consultar solicitudes.
- No se calcula ningún descuento, no se busca disponibilidad y no se realizan reservas o cobros.
- No se envía automáticamente información del formulario a BoletoX: únicamente al correo interno configurado, hasta formalizar el acuerdo y actualizar los avisos legales.

## Variables privadas runtime (Cloudflare Worker)

```dotenv
# Por defecto deshabilitado. Activar solo al terminar los bloqueantes.
VUELOS_ENABLED=0
VUELOS_RESEND_API_KEY=
VUELOS_FROM_EMAIL=
VUELOS_NOTIFY_EMAIL=
VUELOS_TURNSTILE_SITE_KEY=
VUELOS_TURNSTILE_SECRET=
```

`VUELOS_FROM_EMAIL` debe usar un dominio verificado con el proveedor de envío; `VUELOS_NOTIFY_EMAIL` debe ser un buzón controlado por ViajaJapón. No poner claves en variables `NEXT_PUBLIC_*`, HTML ni código. El sitio Turnstile debe autorizar `viajajapon.com` (para local, localhost en entorno de prueba).

## BLOQUEANTES antes de poner VUELOS_ENABLED=1

1. Confirmar con BoletoX proveedor real del vuelo, habilitación legal, soporte, condiciones de descuentos, operaciones y comisiones. Acordar las responsabilidades del tratamiento de los datos y si procede un contrato con encargado o comunicación a responsable independiente.
2. Completar `/privacidad` y la información junto al formulario: finalidad, base jurídica adecuada, destinatarios, proveedor del correo, plazos efectivos de retención, derechos y transferencias, además de política de eliminación. El texto actual de privacidad **no cubre aún el formulario comercial**. Validar el tratamiento antes de aceptar datos.
3. Configurar correo y Turnstile con secretos reales, activar rate limiting en Cloudflare para `/api/vuelos/presupuesto`, y establecer supervisión de cuota/errores. **El honeypot, Origin y captcha no sustituyen a límites de tráfico**.
4. Hacer pruebas de entrega a buzón real, reintento de envío, duplicados, token expirado, edad de menores, fechas inconsistentes, accesibilidad y móvil.
5. Evaluar consentimiento y modo de contacto con cliente. No añadirlo automáticamente al newsletter. Describir a BoletoX como colaborador solo cuando esté firmado el acuerdo.
6. Añadir prueba end-to-end de Cloudflare Workers y comprobar que los correos se entregan; PR CI local no acredita por sí solo las integraciones externas.
7. Si se desea un CRM y comisiones auditables, implementar almacenamiento cifrado con control de acceso, retención, borrado, idempotencia y una transición de estados antes de ampliar campañas.

## Integración posterior

Al validar el piloto, incorporar enlaces CTA en calculadora de presupuesto e itinerarios y medir `vuelo_presupuesto_solicitado` en GA4 **solo si el visitante aceptó analítica**. No medir emails ni datos personales. Añadir transparencia de comisiones en la página de divulgación de afiliados.

## Despliegue

**No hacer merge hasta cumplir los bloqueantes.** Push a `master` despliega automáticamente a producción. Esta rama es para revisión técnica y legal; no habilitar el endpoint en Cloudflare sin verificar el procesamiento real.
