# Laboratorio Digital · web — contexto para Claude Code

Este archivo resume todo lo acordado en el chat donde se construyó el sitio (sept. 2026). Léelo antes de trabajar. Detalle de decisiones: `README.md`. Encargo original: `LEEME-CLAUDE-CODE.md` (si choca con este archivo, **manda este archivo**).

## El proyecto
- Sitio de **LABORATORIO DIGITAL E.I.R.L.** (RUC 20616378555, Lima). Siempre "Laboratorio Digital", nunca "La Morgue".
- Objetivo de todas las páginas: que el visitante escriba por **WhatsApp +51 966 495 267** con un mensaje ya armado. No hay carrito ni pagos.
- Páginas: `/` portada · `/diseno-marketing-video` (mazo de cartas) · `/merch-empresas` · `/crea-tu-marca` · `/terminos` · `/privacidad` · `404`.
- **En línea:** https://laboratoriodigital-pe.pages.dev (Cloudflare Pages, proyecto `laboratoriodigital-pe`).
- **Repo:** https://github.com/benja2054-creator/laboratoriodigital.pe (PÚBLICO, rama `main`).

## Cómo trabajar con el usuario (Benjamín)
- Habla en **español**, frases claras, sin jerga innecesaria. El usuario no es programador: explica el porqué cuando algo no es obvio.
- **Flujo de publicación:** edito en la PC → pruebo → `git push` a `main` → Cloudflare publica solo en ~1 min. Todo push **queda público**: pregunta antes de publicar algo dudoso (textos legales, precios, datos personales).
- **Commits:** autor `benja2054-creator` con correo `330628136+benja2054-creator@users.noreply.github.com` (ya configurado en el repo; nunca el Gmail, el repo es público). Mensajes en español.
- **Revisión:** el usuario revisa en **http://localhost:4400** (`npm run revision` = build + preview; config "revision" en `../.claude/launch.json`). No usar el servidor de desarrollo (4321) para que revise: recarga sus pestañas con cada guardado. Tras cada cambio: `npx astro build` para que 4400 muestre lo nuevo (el preview sirve `dist/`). Si 4400 no responde, reiniciarlo con la config "revision".
- Verifica con capturas reales (Edge headless / CDP) en **390 px (celular), 820 (tablet), 1440 y 2560×1285 (su monitor)** antes de decir que algo está listo.
- El usuario sube imágenes a **`../imagenes-originales/<pagina>/`** (fuera del repo), a veces con nombres `.png.png`. Flujo: revisar la imagen, convertir con `sharp` a JPG (calidad 88, mozjpeg) en `src/assets/<pagina>/` con el nombre correcto, dejar el original intacto, compilar y probar.
- No volver a agregar el **Libro de Reclamaciones** (decisión del cliente; ya se avisó del riesgo legal una vez, no insistir).

## Stack y estructura
- Astro 7 (estático, `build.format: 'file'`), Preact solo para islas interactivas, CSS normal con variables. Node ≥ 22 (`.node-version`).
- Comandos: `npm run build` · `npm run revision` · `npm test` (Vitest, 21 pruebas) · `npm run check`.
- **Datos editables:** `src/data/sitio.ts` (WhatsApp, RUC, correo, redes, `catalogoPdf`, `googleAnalyticsId`), `src/data/mazo.ts` (clases, 18 módulos, precios, `COMBOS`), `src/data/merch.ts` (8 categorías, servicios), `src/data/crea-marca.ts` (preguntas, 6 productos, servicios, `MOSTRAR_BANDA_CLIENTES`).
- **Mensajes de WhatsApp y cálculo del mazo:** `src/lib/whatsapp.ts`, `src/lib/mazo.ts` (con pruebas en `whatsapp.test.ts`).
- **Textos legales:** `src/legal/terminos.md`, `src/legal/privacidad.md` (renderizados por `src/pages/terminos.astro` / `privacidad.astro`).
- **Imágenes:** `src/assets/{merch,marca,mazo}/`, optimizadas a WebP con `getImage` en cada página (búsqueda por nombre con `import.meta.glob`).
- Temas: `data-tema="claro"` (Figtree, blanco) y `"mazo"` (Lilita One + Nunito, azul #14184A).

## Decisiones ya tomadas (no reabrir)
- Menú igual en todo el sitio: Diseño, marketing y video · Merch para empresas · Crea tu marca.
- **Mazo:** empieza vacío y se guarda en `localStorage`; combos −10 % (2 clases) / −15 % (3); carta comodín "A cotizar"; "Prefiero agendar una llamada" abre WhatsApp con "Hola, quiero agendar una llamada con Laboratorio Digital."; "DESDE" encima de cada precio; en escritorio las cartas mantienen proporción 288×470 y se achican en proporción según el alto (escalones en `Mazo.css`, sección "Cartas a escala"); los 3 pasos visibles en fila con el texto; al pasar el mouse por un módulo la carta muestra su imagen (18 en `src/assets/mazo/mazo-d01…a06.jpg`), título y descripción; la carta no vuelve al dibujo al cruzar huecos entre módulos (reset solo al salir de la lista); la imagen nueva entra encima de la anterior (sin asomar el dibujo). En celular NO hay franja de imagen.
- **Merch:** 8 categorías (sin poleras, gorras ni lapiceros; tomatodos+tazas+termos fusionados); Polos con 2 fotos que alternan al pasar el mouse; primera pantalla = portada + íconos (el catálogo aparece al bajar); en pantallas grandes la portada escala con el alto; al pulsar "O elige aquí lo que necesitas" se ve el catálogo completo con el botón "Siguiente"; servicios con ilustración vertical (escritorio) / horizontal (celular); PDF pendiente → botones "Pide el catálogo" por WhatsApp.
- **Crea tu marca:** orden = portada → 4 preguntas compactas (sin título "¿Te identificas con alguna?") → "¿Respondiste 'sí' a alguna?" → "¿Qué puedes crear?" (Polos, Tazas, Mousepads, Lanyards, Acrílicos, Peluches) → "¿Qué hacemos por ti?". Banda de clientes oculta (`MOSTRAR_BANDA_CLIENTES = false`), sin botón de pausa.
- **Portada:** 3 tarjetas grandes que crecen con la pantalla; todo entra sin bajar en escritorio.
- **Cookies:** aviso con Aceptar/Rechazar (mismo peso); Google Analytics solo se carga si acepta; "Preferencias de cookies" en el pie lo reabre.
- Fotos de clientes con personajes licenciados: el usuario tiene los derechos (no volver a advertir por esas).

## Pendientes (al 28-sep-2026)
**Del usuario:** ID de Google Analytics (`G-…` → `googleAnalyticsId`); PDF del catálogo (`public/catalogo-merch.pdf` + `catalogoPdf`); correo y URLs de redes; dominio `laboratoriodigital.pe` (conectar en Cloudflare → Custom domains y poner `site` en `astro.config.mjs`).
**A validar:** precios del mazo; características de productos de Crea tu marca (las de Acrílicos las propuse yo); "Emitimos factura".
**Preguntas abiertas:** ¿"desde" también en el panel "Tu mazo" y en el mensaje de WhatsApp?; ¿regenerar la imagen D-06 (personajes parecidos a Tony the Tiger, Cuphead, oso de Coca-Cola)?
**Trabajo técnico (paso 5):** imagen para compartir (Open Graph) por página — era lo siguiente recomendado; sitemap + robots.txt + datos estructurados de empresa local (algunos requieren el dominio); auditoría Lighthouse de accesibilidad y velocidad.
