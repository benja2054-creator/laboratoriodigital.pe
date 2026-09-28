// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// TODO: cuando haya dominio, agregar `site: 'https://laboratoriodigital.pe'`
// para que Astro genere URLs canónicas y de Open Graph absolutas.
export default defineConfig({
  integrations: [preact()],
});
