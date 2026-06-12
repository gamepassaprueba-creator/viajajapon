# Mockup "Lista Completa de Equipaje para Japón" → content/logistica/que-llevar-maleta-japon.mdx

Secciones del mockup EN ORDEN:
1. Hero claro con badge + 2 botones (descargar/imprimir → omitir botones muertos).
2. "Selecciona tu Temporada": 4 tarjetas de estación CON FOTO, rango de temperatura en caja de color y 3 ítems clave de ropa → `Cards cols={2}` con img (sakura-cerezos, festival, momiji-otono, shirakawa-go) + datos (temperatura) + puntos (3 ítems).
3. "Checklist Completa por Categorías": acordeones con checkboxes y barra de progreso por categoría (Documentos 8, Ropa 10, Tecnología 8, Aseo 9, Medicamentos 7, Accesorios 8) → `PackingChecklist` (componente interactivo ya existente — verificar que el artículo lo usa por categorías, no listas planas).
4. "Recomendaciones de Peso y Tamaño": 3 tarjetas (cabina 55x40x25/7-10kg, facturada 158cm/23kg, tips de optimización) + caja aviso aerolíneas japonesas estrictas → `Cards cols={3}` sin img + `InfoBox tipo="aviso"`.
5. "Qué Comprar en Japón vs Traer de Casa": 2 columnas verde/rojo con ítems explicados (comprar allí: cosmética, paraguas konbini, Heattech Uniqlo, adaptadores, mascarillas / traer: medicamentos con receta, tallas grandes, desodorante occidental...) → `DoDont` (hacer=comprar allí, evitar=no confíes en encontrarlo → traer).
6. "Restricciones de Aduanas": caja roja con grupos (alimentos prohibidos, medicamentos con pseudoefedrina/codeína ¡Yakkan Shoumei!, efectivo >¥1M declarar, alcohol/tabaco límites) → `InfoBox tipo="aviso"` + `Cards` sin img o DoDont.
7. "Galería de Consejos Visuales": 6 tarjetas (enrollado, adaptador tipo A, capas, productos japoneses, organizadores, calzado) → `Cards cols={3}` sin img (las fotos del mockup son IA).
8. "Consejos Adicionales": 4 tarjetas (lockers 300-700¥, takkyubin, lavanderías, vestimenta templos/onsen) → `Cards` sin img con datos.
9. "Recursos Relacionados": 3 tarjetas-enlace → enlaces internos o `CTABand`.
