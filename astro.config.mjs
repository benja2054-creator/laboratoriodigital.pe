// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Dirección pública del sitio: con ella se arman las URLs canónicas y las de
// las imágenes para compartir (WhatsApp y redes exigen URLs completas).
export default defineConfig({
  site: 'https://www.laboperu.com',
  integrations: [preact()],
  // Genera merch-empresas.html (no merch-empresas/index.html): así Cloudflare
  // Pages sirve /merch-empresas sin redirigir a /merch-empresas/.
  build: { format: 'file' },
});
