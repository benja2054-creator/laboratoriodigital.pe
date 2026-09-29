// Sitemap para buscadores: portada, las 3 landings y las páginas legales
// (sin la 404). Las rutas salen de sitio.ts, así que una página nueva en el
// menú aparece aquí sola.
import type { APIRoute } from 'astro';
import { legales, paginas } from '../data/sitio';

export const GET: APIRoute = ({ site }) => {
  const rutas = ['/', ...paginas.map((p) => p.ruta), ...legales.map((l) => l.ruta)];
  const urls = rutas.map((ruta) => `  <url><loc>${new URL(ruta, site).href}</loc></url>`).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
