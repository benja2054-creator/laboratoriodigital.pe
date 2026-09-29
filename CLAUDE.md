# Laboratorio Digital · web — contexto para Claude Code

Este archivo resume todo lo acordado en el chat donde se construyó el sitio (sept. 2026). Léelo antes de trabajar. Detalle de decisiones: `README.md`. Encargo original: `LEEME-CLAUDE-CODE.md` (si choca con este archivo, **manda este archivo**).

## El proyecto
- Sitio de **LABORATORIO DIGITAL E.I.R.L.** (RUC 20616378555, Lima). Siempre "Laboratorio Digital", nunca "La Morgue".
- Objetivo de todas las páginas: que el visitante escriba por **WhatsApp +51 966 495 267** con un mensaje ya armado. No hay carrito ni pagos.
- Páginas: `/` portada · `/diseno-marketing-video` (mazo de cartas) · `/merch-empresas` · `/crea-tu-marca` · `/terminos` · `/privacidad` · `404`.
- **En línea:** https://www.laboperu.com (desde el 29-sep-2026; también responde https://laboratoriodigital-pe.pages.dev). Cloudflare Pages, proyecto `laboratoriodigital-pe`.
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
- **Imágenes para compartir (Open Graph, 1200×630):** `public/og/{inicio,diseno-marketing-video,merch-empresas,crea-tu-marca}.jpg`, generadas con `npm run og` (`scripts/generar-og.mjs`: HTML con las fuentes y fotos del sitio → captura con Edge sin ventana → JPG; además anota la huella de cada una en `src/data/og-versiones.json`, que `Base.astro` agrega como `?v=` para que WhatsApp no muestre la vieja). Se guardan en el repo; volver a correr solo si cambian textos o fotos. Cada página elige la suya con `imagenCompartir` en `<Base>` (por defecto la de portada). `site` en `astro.config.mjs` = `https://www.laboperu.com` (URLs absolutas de canónica e imágenes; la canónica va sin `.html` y la 404 no tiene).
- Temas: `data-tema="claro"` (Figtree, blanco) y `"mazo"` (Lilita One + Nunito, azul #14184A).

## Decisiones ya tomadas (no reabrir)
- Menú igual en todo el sitio: Diseño, marketing y video · Merch para empresas · Crea tu marca.
- **Mazo:** empieza vacío y se guarda en `localStorage`; combos −10 % (2 clases) / −15 % (3); carta comodín "A cotizar"; SIN botón "Prefiero agendar una llamada" (se quitó a pedido del usuario, 28-sep); en la hoja de celular/tablet el título "Tu mazo" y "Seguir eligiendo" quedan fijos arriba al bajar; "DESDE" encima de cada precio, y también en el panel "Tu mazo" (cada módulo y el total), la barra de celular y el mensaje de WhatsApp; la imagen D-06 se queda como está (no regenerar); en escritorio las cartas mantienen proporción 288×470 y se achican en proporción según el alto (escalones en `Mazo.css`, sección "Cartas a escala"); los 3 pasos visibles en fila con el texto; al pasar el mouse por un módulo la carta muestra su imagen (18 en `src/assets/mazo/mazo-d01…a06.jpg`), título y descripción; la carta no vuelve al dibujo al cruzar huecos entre módulos (reset solo al salir de la lista); la imagen nueva entra encima de la anterior (sin asomar el dibujo). En celular NO hay franja de imagen ni fotos dentro de las cartas: la carta siempre muestra su dibujo y sus datos (el foco de módulo se ignora con `esCelular()` y `.mz-carta__foto` va oculto bajo 768 px).
- **Merch:** 8 categorías (sin poleras, gorras ni lapiceros; tomatodos+tazas+termos fusionados); Polos con 2 fotos que alternan al pasar el mouse; primera pantalla = portada + íconos (el catálogo aparece al bajar); en pantallas grandes la portada escala con el alto; al pulsar "O elige aquí lo que necesitas" se ve el catálogo completo con el botón "Siguiente"; servicios con ilustración vertical (escritorio) / horizontal (celular); PDF pendiente → botones "Pide el catálogo" por WhatsApp.
- **Crea tu marca:** orden = portada → 4 preguntas compactas (sin título "¿Te identificas con alguna?") → "¿Respondiste 'sí' a alguna?" → "¿Qué puedes crear?" (Polos, Tazas, Mousepads, Lanyards, Acrílicos, Peluches) → "¿Qué hacemos por ti?". Banda de clientes oculta (`MOSTRAR_BANDA_CLIENTES = false`), sin botón de pausa.
- **Portada:** 3 tarjetas grandes que crecen con la pantalla; todo entra sin bajar en escritorio.
- **Cookies:** aviso con Aceptar/Rechazar (mismo peso); Google Analytics solo se carga si acepta; "Preferencias de cookies" en el pie lo reabre; al retirar el consentimiento se borran las cookies `_ga*`.
- **Google Analytics:** `G-8G1HB5BXFK`, cuenta "Laboratorio Digital" / propiedad "Web Laboratorio Digital" (hora de Perú, PEN) en benja2054@gmail.com, flujo web "Sitio web" apuntando a `https://www.laboperu.com` (creado 28-sep-2026, URL cambiada el 29-sep).
- Fotos de clientes con personajes licenciados: el usuario tiene los derechos (no volver a advertir por esas).
- Foto principal de Crea tu marca (`marca-principal.jpg`, polo con un personaje que hace un gesto con el dedo medio): el usuario decidió dejarla por ahora (28-sep). No volver a advertir.
- Confirmados por el usuario: "Emitimos factura" y las características de los productos de Crea tu marca (incluidas las de Acrílicos).

## Pendientes (al 28-sep-2026, actualizado)
**Del usuario:** PDF del catálogo (`public/catalogo-merch.pdf` + `catalogoPdf`); URLs de redes.
**Dominio (29-sep-2026):** `laboperu.com` (registrado en OVH; zona DNS en Cloudflare de HostingPerú, NS clyde/irena; el usuario NO tiene acceso: cambios por ticket a soporte@hostingperu.com.pe, yo no toco el DNS). Activo: CNAME www → `laboratoriodigital-pe.pages.dev` (custom domain en Pages), A @ 192.0.2.1 con proxy + Redirect Rule laboperu.com → www, SPF y DKIM (`zohomail._domainkey`) de Zoho, MX de Zoho. `site` ya es `https://www.laboperu.com`. PENDIENTE: la Redirect Rule pierde la barra de la ruta (`laboperu.com/merch-empresas` → `www.laboperu.commerch-empresas`); pedir a HostingPerú destino `https://www.laboperu.com/${1}` (o `concat("https://www.laboperu.com", http.request.uri.path)`). URL del flujo de Google Analytics ya cambiada a https://www.laboperu.com (29-sep); datos confirmados en Tiempo real.
**A validar:** precios "desde" del mazo — el socio los está llenando en `../precios-mazo-para-completar.xlsx` (fuera del repo, una pestaña por clase, columna amarilla; también pregunta si el tiempo de entrega de cada clase es correcto). Cuando vuelva, pasar los montos a `precio` en `src/data/mazo.ts`.
**Trabajo técnico (paso 5):** sitemap + robots.txt + datos estructurados de empresa local (algunos requieren el dominio); auditoría Lighthouse de accesibilidad y velocidad.
