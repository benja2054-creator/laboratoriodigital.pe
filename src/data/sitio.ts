// Datos generales del negocio. Todo lo que aparece en el menú y el pie de
// página sale de aquí. Los valores `null` son pendientes: el sitio los muestra
// como texto sin enlace hasta que se completen.

export const sitio = {
  marca: 'Laboratorio Digital',
  razonSocial: 'LABORATORIO DIGITAL E.I.R.L.',
  ruc: '20616378555',
  ciudad: 'Lima, Perú',
  descripcion: 'Diseño, marketing, video y merchandising para empresas, marcas y creadores.',
  anio: 2026,

  whatsapp: {
    numero: '51966495267', // formato internacional sin "+" ni espacios, para wa.me
    visible: '+51 966 495 267',
    corto: '966 495 267',
  },

  // Correo de contacto (Zoho Mail).
  correo: 'contacto@laboperu.com' as string | null,

  // Pendiente: usuarios de redes. Poner la URL completa, por ejemplo
  // 'https://www.instagram.com/laboratoriodigital'.
  redes: [
    { id: 'instagram', etiqueta: 'IG', nombre: 'Instagram', url: null as string | null },
    { id: 'tiktok', etiqueta: 'TT', nombre: 'TikTok', url: null as string | null },
    { id: 'facebook', etiqueta: 'FB', nombre: 'Facebook', url: null as string | null },
    { id: 'linkedin', etiqueta: 'in', nombre: 'LinkedIn', url: null as string | null },
  ],

  // Pendiente: PDF del catálogo de merch. Cuando esté, dejarlo en
  // `public/catalogo-merch.pdf` y poner aquí '/catalogo-merch.pdf'.
  catalogoPdf: null as string | null,
};

export type PaginaId = 'inicio' | 'estudio' | 'empresas' | 'marca';

// Las tres landings, en el orden del menú.
export const paginas = [
  { id: 'estudio', nombre: 'Diseño, marketing y video', ruta: '/diseno-marketing-video' },
  { id: 'empresas', nombre: 'Merch para empresas', ruta: '/merch-empresas' },
  { id: 'marca', nombre: 'Crea tu marca', ruta: '/crea-tu-marca' },
] as const satisfies ReadonlyArray<{ id: PaginaId; nombre: string; ruta: string }>;

export const legales = [
  { nombre: 'Términos y condiciones', ruta: '/terminos' },
  { nombre: 'Política de privacidad', ruta: '/privacidad' },
] as const;

// Google Analytics 4: ID de medición de la propiedad "Web Laboratorio Digital"
// (Analytics → Administrar → Flujos de datos → Sitio web). Solo se carga si el
// visitante acepta las cookies de analítica en el aviso de cookies.
export const googleAnalyticsId: string | null = 'G-8G1HB5BXFK';
