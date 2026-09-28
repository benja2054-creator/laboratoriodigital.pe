// Página "Crea tu marca": productos, servicios y la banda de fotos.
// `foto` es el nombre del archivo dentro de src/assets/marca/ (horizontal 3:2);
// mientras sea null se muestra un recuadro de "FOTO".

export interface ProductoMarca {
  nombre: string;
  caracteristicas: [string, string, string];
  foto: string | null;
  fotoAncha?: string; // encuadre más cerrado para pantallas de 1400 px o más
}

export const PRODUCTOS: ProductoMarca[] = [
  { nombre: 'Polos', caracteristicas: ['Algodón peruano', 'Serigrafía, DTF o bordado', 'Tallas de S a XXL'], foto: 'marca-polos.jpg' },
  { nombre: 'Tazas', caracteristicas: ['Cerámica de 11 y 15 oz', 'Sublimado a full color', 'Aptas para microondas'], foto: 'marca-tazas.jpg' },
  { nombre: 'Mousepads', caracteristicas: ['Normal y XL (90 × 40 cm)', 'Base antideslizante', 'Borde cosido'], foto: 'marca-mousepads.jpg', fotoAncha: 'marca-mousepads-ancha.jpg' },
  { nombre: 'Lanyards', caracteristicas: ['Sublimado a full color', 'Gancho metálico', 'Ideales para eventos'], foto: 'marca-lanyards.jpg' },
  { nombre: 'Acrílicos', caracteristicas: ['Impresión a full color', 'Corte con la forma de tu diseño', 'Llaveros, pines o stands'], foto: 'marca-acrilicos.jpg' },
  { nombre: 'Peluches', caracteristicas: ['De tus personajes originales', 'Muestra antes de producir', 'Varios tamaños'], foto: 'marca-peluches.jpg', fotoAncha: 'marca-peluches-ancha.jpg' },
];

// "¿Te identificas con alguna?". `ilustracion` es el dibujo del componente
// crea-marca/Ilustracion.astro.
export const PREGUNTAS = [
  { ilustracion: 'audiencia', texto: '¿Tienes una audiencia o comunidad en internet?' },
  { ilustracion: 'personajes', texto: '¿Quieres crear productos de tus personajes originales?' },
  { ilustracion: 'artista', texto: '¿Eres artista o creador de contenido?' },
  { ilustracion: 'marca-propia', texto: '¿Quieres crear tu propia marca de ropa, accesorios o peluches?' },
] as const;

// "¿Qué hacemos por ti?". El `id` es también el nombre de su ilustración.
export const SERVICIOS_MARCA = [
  { id: 'diseno', titulo: 'Diseñamos contigo', texto: 'Adaptamos tus ilustraciones o personajes a cada producto.', fondo: '#EDE7FF' },
  { id: 'volumen', titulo: 'Producimos según tu volumen', texto: 'Pocas o muchas unidades, según lo que necesites.', fondo: '#FFE1D8' },
  { id: 'almacen', titulo: 'Guardamos tu stock', texto: 'En nuestro almacén propio en Lima. Tú no ocupas espacio.', fondo: '#FFE7C2' },
  { id: 'online', titulo: 'Te ayudamos a vender online', texto: 'Tus productos publicados y listos para comprar.', fondo: '#D6F2EE' },
  { id: 'envio', titulo: 'Enviamos a tus clientes', texto: 'Despachamos cada pedido en Lima y provincias.', fondo: '#FFE1D8' },
  { id: 'postventa', titulo: 'Atención y postventa', texto: 'Seguimos cada pedido para que tu comunidad quede feliz.', fondo: '#EDE7FF' },
] as const;

// Banda "Algunos productos que ya hicimos para creadores". Oculta hasta tener
// trabajos para mostrar: poner en true para volver a mostrarla.
export const MOSTRAR_BANDA_CLIENTES = false;

// Fotos de la banda. Pendiente: fotos reales.
export const BANDA_CLIENTES = [
  { titulo: 'Polera de creador', fondo: '#FFE7C2', foto: null },
  { titulo: 'Peluche de personaje', fondo: '#D6F2EE', foto: null },
  { titulo: 'Gorra bordada', fondo: '#EDE7FF', foto: null },
  { titulo: 'Tote bag ilustrada', fondo: '#FFE1D8', foto: null },
  { titulo: 'Pines de colección', fondo: '#FFE7C2', foto: null },
  { titulo: 'Taza de comunidad', fondo: '#D6F2EE', foto: null },
  { titulo: 'Polo de artista', fondo: '#EDE7FF', foto: null },
  { titulo: 'Stickers y llaveros', fondo: '#FFE1D8', foto: null },
] as { titulo: string; fondo: string; foto: string | null }[];
