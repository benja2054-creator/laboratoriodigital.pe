# Laboratorio Digital · sitio web

Sitio estático hecho con [Astro](https://astro.build) y Preact (solo para las partes interactivas).
El encargo original está en `LEEME-CLAUDE-CODE.md` y los diseños de referencia en `diseno/`.

## Publicación

- **Sitio en línea:** https://laboratoriodigital-pe.pages.dev (Cloudflare Pages).
- **Código:** https://github.com/benja2054-creator/laboratoriodigital.pe
- **Cómo se actualiza:** cada cambio subido a la rama `main` de GitHub se publica solo en ~1 minuto.
- **Configuración en Cloudflare:** framework Astro, comando `npm run build`, carpeta `dist`, Node 22 (`.node-version`).
- **Dominio propio:** cuando se compre `laboratoriodigital.pe`, se conecta en Cloudflare → proyecto → Custom domains, y se agrega `site` en `astro.config.mjs`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala dependencias (solo la primera vez) |
| `npm run dev` | Sitio en http://localhost:4321 con recarga automática |
| `npm test` | Pruebas de precios, combos y mensajes de WhatsApp |
| `npm run build` | Genera el sitio final en `dist/` |
| `npm run revision` | Compila y sirve el sitio final en http://localhost:4400 (no se recarga solo: ideal para revisar) |
| `npm run check` | Revisa errores de tipos |

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| WhatsApp, RUC, correo, redes, PDF del catálogo | `src/data/sitio.ts` |
| Módulos del mazo, precios y % de combos | `src/data/mazo.ts` |
| Categorías y servicios de merch | `src/data/merch.ts` |
| Productos, servicios y banda de Crea tu marca | `src/data/crea-marca.ts` |
| Textos de los mensajes de WhatsApp | `src/lib/whatsapp.ts` |

Los datos pendientes (`null` en `sitio.ts`) se ven con un borde punteado rojo en
`npm run dev` y **no aparecen** en el sitio publicado hasta que se completen.

## Páginas

| Ruta | Página |
|---|---|
| `/` | Portada con las 3 opciones |
| `/diseno-marketing-video` | Mazo de cartas |
| `/merch-empresas` | Merch para empresas |
| `/crea-tu-marca` | Crea tu marca |

## Decisiones tomadas (después del encargo)

- **Sin Libro de Reclamaciones**: decisión del cliente (25/09/2026). No aparece en el pie ni tiene página.
- **Portada en `/`**: logo, una frase y 3 tarjetas, con el estilo limpio de Merch (Figtree, blanco).
- **"Prefiero agendar una llamada"** abre WhatsApp con: *Hola, quiero agendar una llamada con Laboratorio Digital.*
- **Menú unificado** en las 3 páginas: Diseño, marketing y video · Merch para empresas · Crea tu marca.
- **El mazo empieza vacío** (el diseño traía 2 módulos de ejemplo).
- **Banda de fotos de Crea tu marca** ("Algunos productos que ya hicimos"): **oculta** por ahora (`MOSTRAR_BANDA_CLIENTES = false` en `src/data/crea-marca.ts`). Cuando se reactive, se pausa al pasar el mouse (sin botón de pausa, decisión del cliente). El bloque "¿Respondiste 'sí' a alguna?" va justo después de las preguntas, antes de "¿Qué puedes crear?".
- **Catálogo PDF pendiente**: mientras `catalogoPdf` sea `null`, los botones dicen "PIDE EL CATÁLOGO COMPLETO" y abren WhatsApp pidiéndolo. Al poner el PDF en `public/` y su ruta en `sitio.ts`, pasan a "DESCARGA EL CATÁLOGO COMPLETO" y descargan el archivo.
- **Mazo en escritorio**: las cartas conservan su forma original (≈288×470). Si la pantalla no es lo bastante alta para verlas con los 6 módulos, se achican en proporción (90 %, 80 %, 70 %, 65 % o 60 %), idénticas por dentro; por debajo de 1215 px de alto se oculta la etiqueta, los 3 pasos pasan a la fila del texto y la cabecera es más baja. Todo entra sin bajar desde ~950 px de alto visible. Los escalones están en `Mazo.css` ("Cartas a escala").
- **Mazo en tablet (768–1199 px)**: cartas y módulos como en escritorio; el panel "Tu mazo" va en la hoja inferior (no había diseño para ese tamaño).
- **El mazo se guarda en el navegador del visitante**: si recarga o vuelve después, sigue armado. Solo guarda los ids; los precios siempre salen de `src/data/mazo.ts`.
- **Celular**: el botón "atrás" del teléfono cierra la vista de módulos y vuelve a las cartas. "Prefiero agendar una llamada" también aparece en la hoja inferior.
- **Mensaje del mazo**: si solo hay comodines se omite la línea de total; si el mazo está vacío se envía un saludo genérico.
