// Página "Diseño, marketing y video": las 3 cartas (clases), sus 18 módulos
// y los descuentos por combo.
//
// PRECIOS REFERENCIALES POR VALIDAR. Son precios "desde", en soles, sin IGV.
// Para cambiar un precio basta con editar `precio`. Si el módulo es mensual,
// `unidad` es '/mes' y se suma al total por el primer mes.

export type ClaseId = 'dis' | 'mkt' | 'av';

export interface Clase {
  id: ClaseId;
  num: string;
  nombre: string;
  clase: string; // "CLASE FUEGO CREATIVO", etc. En celular se muestra sin "CLASE".
  habilidad: string;
  idealPara: string;
  entrega: string;
  colores: {
    marco: string; // color principal de la carta
    oscuro: string; // bordes y textos sobre el color
    tinte: string; // fondo claro
    rayos: [string, string]; // los dos tonos del fondo de rayos
  };
}

export interface Modulo {
  id: string;
  clase: ClaseId;
  codigo: string;
  tipo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  unidad: '' | '/mes';
}

// Descuento según cuántas clases distintas hay en el mazo.
export const COMBOS = {
  dosClases: 10, // % de descuento con módulos de 2 clases
  tresClases: 15, // % de descuento con módulos de las 3 clases
};

// Color de la carta comodín (servicios "a cotizar").
export const COMODIN = {
  marco: '#2EC4B6',
  oscuro: '#0E5E57',
  tinte: '#DDF7F3',
};

export const CLASES: Clase[] = [
  {
    id: 'dis',
    num: '01',
    nombre: 'DISEÑO',
    clase: 'FUEGO CREATIVO',
    habilidad: 'Identidad de marca y piezas gráficas',
    idealPara: 'Marcas nuevas o en rebranding',
    entrega: '5 a 15 días',
    colores: { marco: '#FF5A36', oscuro: '#8A2208', tinte: '#FFE4D9', rayos: ['#FF8A5B', '#FFB08A'] },
  },
  {
    id: 'mkt',
    num: '02',
    nombre: 'MARKETING',
    clase: 'ELÉCTRICA',
    habilidad: 'Redes, pauta y estrategia digital',
    idealPara: 'Negocios que quieren vender online',
    entrega: 'Plan mensual',
    colores: { marco: '#FFC928', oscuro: '#7A4E00', tinte: '#FFF3C4', rayos: ['#FFD84D', '#FFE88F'] },
  },
  {
    id: 'av',
    num: '03',
    nombre: 'AUDIOVISUAL',
    clase: 'VISIÓN',
    habilidad: 'Video, foto y post-producción',
    idealPara: 'Lanzamientos, eventos y contenido',
    entrega: '3 a 20 días',
    colores: { marco: '#8B5CF6', oscuro: '#3B1782', tinte: '#ECE4FF', rayos: ['#A98BFF', '#C9B8FF'] },
  },
];

export const MODULOS: Modulo[] = [
  // Diseño
  { id: 'd1', clase: 'dis', codigo: 'D-01', tipo: 'PROYECTO', nombre: 'Logotipo', descripcion: 'Concepto, logo final, adaptación para redes y papelería básica.', precio: 900, unidad: '' },
  { id: 'd2', clase: 'dis', codigo: 'D-02', tipo: 'PROYECTO', nombre: 'Identidad de marca', descripcion: 'Brandbook: logo, paleta, tipografía, tono de voz y línea gráfica.', precio: 2500, unidad: '' },
  { id: 'd3', clase: 'dis', codigo: 'D-03', tipo: 'PACK', nombre: 'Pack de 12 piezas', descripcion: 'Posts, stories y portadas con la línea gráfica de tu marca.', precio: 600, unidad: '' },
  { id: 'd4', clase: 'dis', codigo: 'D-04', tipo: 'POR PIEZA', nombre: 'Diseño publicitario', descripcion: 'Afiches, volantes, banners o vallas en formato impreso y digital.', precio: 250, unidad: '' },
  { id: 'd5', clase: 'dis', codigo: 'D-05', tipo: 'PROYECTO', nombre: 'Packaging y etiquetas', descripcion: 'Diseño de empaque y etiquetas listo para producción.', precio: 1200, unidad: '' },
  { id: 'd6', clase: 'dis', codigo: 'D-06', tipo: 'PROYECTO', nombre: 'Ilustración y personajes', descripcion: 'Personajes, mascotas de marca o ilustración a medida.', precio: 800, unidad: '' },
  // Marketing
  { id: 'm1', clase: 'mkt', codigo: 'M-01', tipo: 'MENSUAL', nombre: 'Gestión de redes', descripcion: 'Parrilla, diseño de contenidos, copies y community management.', precio: 1500, unidad: '/mes' },
  { id: 'm2', clase: 'mkt', codigo: 'M-02', tipo: 'MENSUAL', nombre: 'Campañas de Ads', descripcion: 'Configuración y optimización en Meta y TikTok. Pauta aparte.', precio: 900, unidad: '/mes' },
  { id: 'm3', clase: 'mkt', codigo: 'M-03', tipo: 'PROYECTO', nombre: 'Estrategia de contenidos', descripcion: 'Análisis de marca y competencia, pilares y plan de 3 meses.', precio: 1200, unidad: '' },
  { id: 'm4', clase: 'mkt', codigo: 'M-04', tipo: 'MENSUAL', nombre: 'Métricas y reportes', descripcion: 'Análisis de resultados y recomendaciones cada mes.', precio: 400, unidad: '/mes' },
  { id: 'm5', clase: 'mkt', codigo: 'M-05', tipo: 'CAMPAÑA', nombre: 'Campaña con influencers', descripcion: 'Selección, coordinación y seguimiento de colaboraciones.', precio: 1500, unidad: '' },
  { id: 'm6', clase: 'mkt', codigo: 'M-06', tipo: 'MENSUAL', nombre: 'Comunicación interna', descripcion: 'Piezas para colaboradores: saludos, logros y bienvenidas.', precio: 700, unidad: '/mes' },
  // Audiovisual
  { id: 'a1', clase: 'av', codigo: 'A-01', tipo: 'PACK', nombre: 'Pack de 4 reels', descripcion: 'Guion, grabación y edición vertical para redes.', precio: 1200, unidad: '' },
  { id: 'a2', clase: 'av', codigo: 'A-02', tipo: 'PROYECTO', nombre: 'Video institucional', descripcion: 'Guion, rodaje con equipo completo, colorización y formatos.', precio: 3500, unidad: '' },
  { id: 'a3', clase: 'av', codigo: 'A-03', tipo: 'EVENTO', nombre: 'Registro de evento', descripcion: 'Fotos del evento y video reel de 1 minuto.', precio: 1200, unidad: '' },
  { id: 'a4', clase: 'av', codigo: 'A-04', tipo: 'SESIÓN', nombre: 'Fotos de producto', descripcion: 'Sesión en estudio con retoque, lista para ecommerce y redes.', precio: 800, unidad: '' },
  { id: 'a5', clase: 'av', codigo: 'A-05', tipo: 'POR VIDEO', nombre: 'Edición, post y VFX', descripcion: 'Edición, color, chroma, tracking y limpieza de material.', precio: 600, unidad: '' },
  { id: 'a6', clase: 'av', codigo: 'A-06', tipo: 'PROYECTO', nombre: 'Animación 2D / motion', descripcion: 'Guion, diseño de personajes y animación con motion graphics.', precio: 2000, unidad: '' },
];
