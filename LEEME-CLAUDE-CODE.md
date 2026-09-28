# Web Laboratorio Digital: encargo para Claude Code

Este documento pasa el diseño aprobado en Claude Design a código real. La carpeta `diseno/` trae los archivos del lienzo (`.dc.html`). Son la referencia visual y de comportamiento: dentro tienen el HTML, los estilos y la lógica (datos, precios, armado de mensajes) en el bloque `<script type="text/x-dc">`. **No son código listo para usar**, porque dependen de un runtime del lienzo. Hay que reconstruirlos como sitio normal.

## Negocio
- **Marca:** Laboratorio Digital (siempre el nombre completo, nunca "La Morgue").
- **Razón social:** LABORATORIO DIGITAL E.I.R.L. · RUC 20616378555 · Lima, Perú.
- **WhatsApp:** +51 966 495 267 → `https://wa.me/51966495267?text=<mensaje codificado>`.
- **Objetivo de las 3 páginas:** que el visitante escriba por WhatsApp con un mensaje ya armado. No hay carrito ni pagos.

## Páginas (desktop 1440 px + celular 390 px)
| Página | Archivos de diseño | Estilo |
|---|---|---|
| Diseño, marketing y video (mazo de cartas) | `MainV3.dc.html`, `MobileV3.dc.html` | Lilita One + Nunito, fondo azul marino #14184A, cartas coral #FF5A36, amarilla #FFC928 y violeta #8B5CF6 |
| Merch para empresas | `EmpresasV1.dc.html`, `EmpresasMobileV1.dc.html` | Figtree, blanco, verde WhatsApp #128C4A, amarillo #FFC21A |
| Crea tu marca | `CreaMarcaV1.dc.html`, `CreaMarcaMobileV1.dc.html` | Figtree, crema #FFE7C2, acentos coral, turquesa, lila y amarillo |

Las tres comparten el menú: **Diseño, marketing y video · Merch para empresas · Crea tu marca**.

### 1. Diseño, marketing y video (mazo)
- 3 cartas (Diseño, Marketing, Audiovisual). Al abrir una se ven sus 6 módulos, 18 en total. Los datos están en `const MODS` dentro de `MainV3.dc.html`.
- Los módulos se agregan al "mazo". El total es referencial, sin IGV.
- Combos: módulos de 2 categorías distintas dan −10 %; de 3 categorías, −15 %. Deben ser fáciles de cambiar.
- **Carta comodín** (turquesa #2EC4B6) dentro del panel del mazo: el cliente escribe un servicio que no está en la lista (por ejemplo "Grabación con drones"). Entra al mazo como "A cotizar", sin sumar al total, y en WhatsApp aparece como `• Comodín (a cotizar): …`.
- El botón "¡Enviar mi mazo por WhatsApp!" arma el mensaje con los módulos, el total y los comodines.
- **Celular:**
  - Al abrir una carta, la franja "← Volver a las cartas" + contador queda fija arriba.
  - "Ver mi mazo" abre una hoja inferior con scroll propio.
  - El botón para cerrar esa hoja dice "Seguir eligiendo ⌄", no una X.
- **Precios referenciales todavía por validar.** Deben quedar en un solo archivo de datos fácil de editar.

### 2. Merch para empresas
- En la portada, botón grande "DESCARGA EL CATÁLOGO COMPLETO" que lleva al PDF (pendiente).
- Íconos de confianza: Te mostramos cómo quedará antes de fabricar · Almacén propio en Lima · Entregas en Lima y provincias · Emitimos factura.
- Catálogo de 12 categorías con selección múltiple y check verde.
- Servicios: Producción (siempre incluido), Almacenaje y Distribución (opcionales).
- Mensaje de WhatsApp: `Hola, estoy interesado en la producción de POLOS, TOMATODOS/TAZAS y PELUCHES. Servicios que necesito: producción, almacenaje y distribución.`
- El botón de WhatsApp es **siempre verde**. Si no hay nada elegido, lleva al catálogo.
- **Celular:** barra inferior por pasos ("Paso 1 de 2…", "Paso 2 de 2…", "Listo"); el paso a servicios hace scroll hacia la sección.

### 3. Crea tu marca
- Hero: "Crea tu propia marca de productos." con botón verde de WhatsApp.
- "¿Te identificas con alguna?": 4 preguntas con ilustraciones SVG propias (están en el archivo).
- "¿Qué puedes crear?": 6 productos, cada uno con foto y 3 características. **Las características están por validar.**
- "¿Qué hacemos por ti?": 6 servicios (diseño, producción por volumen, almacenaje, venta online, envío a clientes, postventa).
- Banda de fotos de productos de clientes que se desplaza a la izquierda. Se pausa al pasar el mouse y respeta `prefers-reduced-motion`.
- Cierre negro "¿Respondiste 'sí' a alguna?" + WhatsApp.
- Mensaje: `Hola, quiero crear mi propia marca de productos. ¿Me explican cómo funciona?`
- **Evitar** estilos que imiten el brochure de otra marca: nada de títulos en cursiva gruesa con sombra.

### Pie de página (las 3)
- Logo y línea de descripción.
- Redes: IG, TT, FB, in (pendientes).
- Servicios.
- Contacto: WhatsApp, correo (pendiente), Lima, Perú.
- **Libro de Reclamaciones** (obligatorio en Perú).
- "© 2026 LABORATORIO DIGITAL E.I.R.L. · RUC 20616378555 · Todos los derechos reservados", más Términos y condiciones y Política de privacidad.

## Recomendación técnica (a confirmar con Benjamín)
- Sitio estático con **Astro** y componentes interactivos pequeños (mazo, selector de merch). Rápido y barato de alojar (Vercel, Netlify o Cloudflare Pages, gratis para empezar).
- Datos editables (módulos, precios, categorías, productos) en archivos JSON o TS aparte del diseño.
- Responsive real: el diseño de celular de 390 px guía el comportamiento móvil.
- Accesibilidad: foco visible, botones de al menos 44 px, textos alternativos en fotos.
- SEO básico: título y descripción por página, Open Graph e imagen para compartir en WhatsApp.

## Pendientes de Benjamín
1. PDF del catálogo de merch.
2. Fotos reales: portadas, productos, trabajos de clientes para las bandas.
3. Correo de contacto y usuarios de redes.
4. Libro de Reclamaciones virtual, Términos y condiciones, Política de privacidad (se pueden redactar en Claude Code).
5. Validar precios del mazo y características de productos.
6. Confirmar las 12 categorías de merch y "Emitimos factura".
7. Dominio (por ejemplo laboratoriodigital.pe) y dónde alojar.

## Cambios posteriores al encargo
Ver la sección "Decisiones tomadas" de `README.md`. En particular: **no habrá Libro de Reclamaciones** (decisión del cliente), aunque arriba figure como obligatorio.

## Lienzo de diseño original
https://claude.ai/artifact/58X7pTd4x2mp8JyPhFURsU (Página 1 = versión vigente; Página 2 = archivo).
