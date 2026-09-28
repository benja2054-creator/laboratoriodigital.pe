// Genera las imágenes para compartir (Open Graph, 1200×630) de cada página
// en public/og/. Es lo que se ve al pegar un enlace del sitio en WhatsApp,
// Facebook, LinkedIn, etc.
//
// Uso: npm run og
//
// Arma una página HTML por imagen con las fuentes y fotos del sitio, la
// fotografía con Microsoft Edge (o Chrome) sin ventana y la guarda en JPG.
// Solo hace falta volver a correrlo si cambian los textos o las fotos de
// abajo; las imágenes generadas se guardan en el repo.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { CLASES } from '../src/data/mazo.ts';
import { sitio } from '../src/data/sitio.ts';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const url = (ruta) => pathToFileURL(join(raiz, ruta)).href;
const ANCHO = 1200;
const ALTO = 630;

const navegador = [
  process.env.NAVEGADOR,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((ruta) => ruta && existsSync(ruta));
if (!navegador) throw new Error('No encontré Edge ni Chrome. Indica la ruta con la variable NAVEGADOR.');

// ---------- Piezas compartidas ----------

const fuente = (familia, peso, archivo) => `
  @font-face { font-family: '${familia}'; font-weight: ${peso};
    src: url('${url(`node_modules/@fontsource/${archivo}`)}') format('woff2'); }`;

const FUENTES = [
  fuente('Figtree', 600, 'figtree/files/figtree-latin-600-normal.woff2'),
  fuente('Figtree', 800, 'figtree/files/figtree-latin-800-normal.woff2'),
  fuente('Figtree', 900, 'figtree/files/figtree-latin-900-normal.woff2'),
  fuente('Nunito', 800, 'nunito/files/nunito-latin-800-normal.woff2'),
  fuente('Nunito', 900, 'nunito/files/nunito-latin-900-normal.woff2'),
  fuente('Lilita One', 400, 'lilita-one/files/lilita-one-latin-400-normal.woff2'),
].join('');

const MATRAZ = (tamano) => `
  <svg width="${tamano}" height="${tamano}" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round">
    <path d="M11 3h8M12.5 3v8L5 24.5A2 2 0 0 0 6.8 27.5h16.4a2 2 0 0 0 1.8-3L17.5 11V3"/><path d="M8.5 19h13"/>
  </svg>`;

const WHATSAPP = `
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7z"/>
    <path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a4.6 4.6 0 0 1-2.6-2.6l.9-1-1-2.2L9 8.5z"/>
  </svg>`;

const pagina = (estilos, cuerpo) => `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><style>
  ${FUENTES}
  * { box-sizing: border-box; margin: 0; }
  html, body { width: ${ANCHO}px; height: ${ALTO}px; overflow: hidden; }
  ${estilos}
</style></head><body>${cuerpo}</body></html>`;

// ---------- Diseño claro (portada, merch, crea tu marca) ----------

const ESTILOS_CLARO = `
  body { display: grid; grid-template-columns: 590px 1fr; background: #fff; color: #141414;
    font-family: 'Figtree', sans-serif; }
  .texto { padding: 52px 20px 52px 60px; display: flex; flex-direction: column; }
  .marca { display: flex; align-items: center; gap: 14px; }
  .marca__icono { width: 60px; height: 60px; border-radius: 16px; background: #141414; color: #fff;
    display: flex; align-items: center; justify-content: center; }
  .marca__nombre { font-weight: 900; font-size: 27px; line-height: 1.02; }
  .etiqueta { margin-top: auto; align-self: flex-start; padding: 8px 16px; border-radius: 999px;
    font-weight: 800; font-size: 17px; letter-spacing: 0.06em; }
  h1 { margin-top: 18px; font-weight: 900; font-size: 60px; line-height: 1.02; letter-spacing: -0.02em; }
  p { margin-top: 18px; font-weight: 600; font-size: 23px; line-height: 1.35; color: #3a3a3a; }
  .wa { margin-top: 30px; align-self: flex-start; display: flex; align-items: center; gap: 12px;
    padding: 12px 22px 12px 16px; border-radius: 14px; background: #128C4A; color: #fff;
    font-weight: 800; font-size: 22px; box-shadow: 0 5px 0 #0a5c30; }
  .panel { position: relative; display: flex; align-items: center; justify-content: center; }
  .foto { border-radius: 28px; background-size: cover; background-position: center;
    box-shadow: 0 18px 40px rgba(20, 20, 20, 0.18); }`;

const marcaClaro = `
  <div class="marca"><span class="marca__icono">${MATRAZ(32)}</span>
    <span class="marca__nombre">Laboratorio<br>Digital</span></div>`;

const botonWa = `<div class="wa">${WHATSAPP}Escríbenos · ${sitio.whatsapp.corto}</div>`;

function claro({ etiqueta, colorEtiqueta, titulo, texto, panel, fondoPanel }) {
  return pagina(
    ESTILOS_CLARO,
    `<div class="texto">${marcaClaro}
       <div class="etiqueta" style="background:${colorEtiqueta[0]};color:${colorEtiqueta[1]}">${etiqueta}</div>
       <h1>${titulo}</h1><p>${texto}</p>${botonWa}</div>
     <div class="panel" style="background:${fondoPanel}">${panel}</div>`,
  );
}

// ---------- Diseño mazo (azul, cartas) ----------

const FOTOS_MAZO = { dis: 'mazo-d01.jpg', mkt: 'mazo-m01.jpg', av: 'mazo-a01.jpg' };

const carta = (c, giro, x, y) => `
  <div class="carta" style="--marco:${c.colores.marco};--oscuro:${c.colores.oscuro};--tinte:${c.colores.tinte};
      transform: translate(${x}px, ${y}px) rotate(${giro}deg)">
    <div class="carta__num">${c.num}</div>
    <div class="carta__foto" style="background-image:url('${url(`src/assets/mazo/${FOTOS_MAZO[c.id]}`)}')"></div>
    <div class="carta__nombre">${c.nombre}</div>
    <div class="carta__clase">CLASE ${c.clase}</div>
  </div>`;

const mazo = () => {
  const [dis, mkt, av] = CLASES;
  return pagina(
    `
    body { background-color: #14184A; color: #FFF8E7; font-family: 'Nunito', sans-serif;
      background-image: radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2px),
        radial-gradient(circle at 85% 20%, rgba(139,92,246,0.55), transparent 55%),
        radial-gradient(circle at 0% 100%, rgba(255,90,54,0.25), transparent 45%);
      background-size: 26px 26px, 100% 100%, 100% 100%; position: relative; }
    .texto { position: absolute; left: 60px; top: 52px; bottom: 52px; width: 560px;
      display: flex; flex-direction: column; }
    .marca { display: flex; align-items: center; gap: 14px; }
    .marca__icono { width: 60px; height: 60px; border-radius: 16px; background: #FFC928; color: #0B0E33;
      border: 4px solid #0B0E33; box-shadow: 0 5px 0 #0B0E33; display: flex; align-items: center; justify-content: center; }
    .marca__nombre { font-family: 'Lilita One'; font-size: 30px; letter-spacing: 0.02em; }
    h1 { margin-top: auto; font-family: 'Lilita One'; font-weight: 400; font-size: 104px; line-height: 0.95;
      color: #FFC928; text-shadow: 0 6px 0 #0B0E33; }
    .clases { margin-top: 22px; display: flex; gap: 10px; }
    .clases span { padding: 7px 16px; border-radius: 999px; border: 3px solid #0B0E33; font-weight: 900;
      font-size: 19px; color: #0B0E33; box-shadow: 0 4px 0 #0B0E33; }
    p { margin-top: 24px; font-weight: 800; font-size: 25px; line-height: 1.3; color: #D6D9FF; }
    .cartas { position: absolute; left: 555px; top: 0; width: 620px; height: 630px; }
    .carta { position: absolute; left: 0; top: 0; width: 196px; height: 320px; border-radius: 18px;
      background: var(--marco); border: 5px solid #0B0E33; box-shadow: 0 9px 0 #0B0E33;
      padding: 10px; display: flex; flex-direction: column; }
    .carta__num { position: absolute; top: -18px; left: -18px; width: 44px; height: 44px; border-radius: 50%;
      background: #FFF8E7; border: 4px solid #0B0E33; color: #0B0E33; font-family: 'Lilita One';
      font-size: 20px; display: flex; align-items: center; justify-content: center; }
    .carta__foto { height: 178px; border-radius: 12px; border: 4px solid #0B0E33;
      background-size: cover; background-position: center; }
    .carta__nombre { margin-top: 14px; text-align: center; font-family: 'Lilita One'; font-size: 23px; white-space: nowrap;
      color: #FFF8E7; -webkit-text-stroke: 6px #0B0E33; paint-order: stroke fill; letter-spacing: 0.01em; }
    .carta__clase { margin-top: 6px; align-self: center; padding: 4px 12px; border-radius: 999px;
      background: var(--tinte); color: var(--oscuro); font-weight: 900; font-size: 11px; letter-spacing: 0.04em; white-space: nowrap; }`,
    `<div class="texto">
       <div class="marca"><span class="marca__icono">${MATRAZ(32)}</span><span class="marca__nombre">LABORATORIO DIGITAL</span></div>
       <h1>ARMA<br>TU MAZO</h1>
       <div class="clases">${CLASES.map((c) => `<span style="background:${c.colores.marco}">${c.nombre}</span>`).join('')}</div>
       <p>Elige módulos de diseño, marketing y video<br>y mira tu inversión al instante.</p>
     </div>
     <div class="cartas">
       ${carta(dis, -7, 8, 175)}${carta(mkt, 0, 212, 135)}${carta(av, 7, 416, 175)}
     </div>`,
  );
};

// ---------- Las imágenes ----------

const foto = (ruta, ancho, alto, extra = '') =>
  `<div class="foto" style="width:${ancho}px;height:${alto}px;background-image:url('${url(ruta)}');${extra}"></div>`;

const IMAGENES = {
  inicio: claro({
    etiqueta: 'LIMA · PERÚ',
    colorEtiqueta: ['#F2F2F0', '#141414'],
    titulo: 'Todo para tu marca, en un solo lugar.',
    texto: 'Diseño, marketing, video y merchandising para empresas, marcas y creadores.',
    fondoPanel: '#F2F2F0',
    panel: `
      <div style="position:absolute;left:60px;top:70px;transform:rotate(-6deg)">${foto('src/assets/mazo/mazo-d01.jpg', 300, 200, 'border:6px solid #14184A')}</div>
      <div style="position:absolute;right:40px;top:40px;transform:rotate(5deg)">${foto('src/assets/merch/merch-principal.jpg', 250, 250, 'border:6px solid #CFE4DA')}</div>
      <div style="position:absolute;left:120px;bottom:50px;transform:rotate(3deg)">${foto('src/assets/marca/marca-peluches-ancha.jpg', 360, 240, 'border:6px solid #FFE7C2')}</div>`,
  }),
  'diseno-marketing-video': mazo(),
  'merch-empresas': claro({
    etiqueta: 'MERCH PARA EMPRESAS',
    colorEtiqueta: ['#CFE4DA', '#0F5E36'],
    titulo: 'Merch con el logo de tu empresa',
    texto: 'Lo producimos, lo guardamos en nuestro almacén y lo entregamos en Lima y provincias.',
    fondoPanel: '#CFE4DA',
    panel: foto('src/assets/merch/merch-principal.jpg', 520, 520),
  }),
  'crea-tu-marca': claro({
    etiqueta: 'CREA TU MARCA',
    colorEtiqueta: ['#FFE7C2', '#9A3412'],
    titulo: 'Tu propia marca de productos',
    texto: 'Ropa, accesorios y peluches con tu diseño o tus personajes. Nosotros producimos y enviamos.',
    fondoPanel: '#FFE7C2',
    panel: foto('src/assets/marca/marca-peluches-ancha.jpg', 560, 373),
  }),
};

// ---------- Fotografiar ----------

const temporal = mkdtempSync(join(tmpdir(), 'og-'));
const destino = join(raiz, 'public', 'og');
mkdirSync(destino, { recursive: true });

try {
  for (const [nombre, html] of Object.entries(IMAGENES)) {
    const archivoHtml = join(temporal, `${nombre}.html`);
    const captura = join(temporal, `${nombre}.png`);
    writeFileSync(archivoHtml, html);
    execFileSync(navegador, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${ANCHO},${ALTO}`,
      '--virtual-time-budget=4000',
      '--allow-file-access-from-files',
      `--user-data-dir=${join(temporal, 'perfil')}`,
      `--screenshot=${captura}`,
      pathToFileURL(archivoHtml).href,
    ], { stdio: 'ignore' });

    const salida = join(destino, `${nombre}.jpg`);
    await sharp(captura)
      .resize(ANCHO, ALTO, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(salida);
    console.log(`✓ public/og/${nombre}.jpg`);
  }
} finally {
  rmSync(temporal, { recursive: true, force: true });
}
