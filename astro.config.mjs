// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// TODO: cuando haya dominio, agregar `site: 'https://laboratoriodigital.pe'`
// para que Astro genere URLs canónicas y de Open Graph absolutas.
export default defineConfig({
  integrations: [preact()],
  // Genera merch-empresas.html (no merch-empresas/index.html): así Cloudflare
  // Pages sirve /merch-empresas sin redirigir a /merch-empresas/.
  build: { format: 'file' },
});
