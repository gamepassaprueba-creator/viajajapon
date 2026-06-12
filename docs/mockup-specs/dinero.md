# Mockup "Guía Completa sobre Dinero en Japón" → content/logistica/como-pagar-en-japon.mdx

Secciones del mockup EN ORDEN:
1. "Tipo de Cambio Actual" con conversor interactivo y gráfico 6 meses → equivalente real: nuestra herramienta /cambio-yen-euro → tarjeta/CTA prominente hacia ella (existe `CalculatorCTA`? esa es del JR Pass; usar Cards con href o CTABand hacia /cambio-yen-euro).
2. "Dónde Cambiar Dinero": 4 tarjetas (bancos, casas de cambio, cajeros ATM, aeropuerto) con pros/contras y comisión aproximada → `Cards cols={2}` sin img con puntos + datos.
3. "Medios de Pago": 3 tarjetas GRANDES degradadas (Efectivo — cantidad recomendada/denominaciones/seguridad; Tarjetas — Visa/MC/JCB, comisiones, dónde aceptan; Pagos móviles — Suica/PayPay, limitaciones turistas) → `Cards cols={3}` con puntos+datos (img opcional: yenes-billetes, suica-tarjeta — all-or-none).
4. "Sistema Tax-Free": requisitos (mínimo ¥5.000, pasaporte, 6 meses) + proceso en tienda 4 pasos + proceso aeropuerto → `Cards cols={2}` (requisitos) + `Steps` (proceso).
5. "Consejos y Recomendaciones": 4 tarjetas de color (cuándo cambiar, evitar comisiones — ¡rechazar DCC!, seguridad efectivo, pérdida/robo con teléfonos) → `Cards cols={2}` sin img con puntos.
6. FAQ (6: límite ¥1M declarar, horarios bancarios, tarjeta no funciona → 7-Eleven/Japan Post, festivos, reclamar cargo, pagar en yenes vs DCC) → `FAQ`.
7. CTA final → `CTABand`.
