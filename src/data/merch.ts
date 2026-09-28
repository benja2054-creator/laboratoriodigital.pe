// Página "Merch para empresas": categorías del catálogo y servicios.
//
// `mensaje` es cómo aparece la categoría en el WhatsApp (en mayúsculas).
// `fotos` son nombres de archivo dentro de src/assets/merch/ (cuadradas).
// Si hay dos, la segunda aparece al pasar el mouse. Sin fotos se muestra un
// recuadro de "FOTO".

export interface CategoriaMerch {
  id: string;
  nombre: string;
  mensaje: string;
  fotos: string[];
}

export interface ServicioMerch {
  id: 'produccion' | 'almacenaje' | 'distribucion';
  nombre: string;
  descripcion: string;
  enMensaje: string; // cómo aparece en "Servicios que necesito: ..."
  siempreIncluido?: boolean;
}

export const CATEGORIAS: CategoriaMerch[] = [
  { id: 'polos', nombre: 'Polos', mensaje: 'POLOS', fotos: ['merch-polos-1.jpg', 'merch-polos-2.jpg'] },
  { id: 'uniformes', nombre: 'Uniformes y ropa de trabajo', mensaje: 'UNIFORMES', fotos: ['merch-uniformes.jpg'] },
  { id: 'bolsas', nombre: 'Mochilas y bolsas', mensaje: 'MOCHILAS/BOLSAS', fotos: ['merch-bolsas.jpg'] },
  { id: 'tomatodos', nombre: 'Tomatodos, tazas y termos', mensaje: 'TOMATODOS/TAZAS/TERMOS', fotos: ['merch-tomatodos.jpg'] },
  { id: 'peluches', nombre: 'Peluches', mensaje: 'PELUCHES', fotos: ['merch-peluches.jpg'] },
  { id: 'pines', nombre: 'Pines y llaveros', mensaje: 'PINES/LLAVEROS', fotos: ['merch-pines.jpg'] },
  { id: 'credenciales', nombre: 'Credenciales y lanyards', mensaje: 'CREDENCIALES/LANYARDS', fotos: ['merch-credenciales.jpg'] },
  { id: 'empaques', nombre: 'Cajas y empaques', mensaje: 'CAJAS/EMPAQUES', fotos: ['merch-empaques.jpg'] },
];

export const SERVICIOS: ServicioMerch[] = [
  { id: 'produccion', nombre: 'Producción', descripcion: 'Fabricamos tus productos con tu logo.', enMensaje: 'producción', siempreIncluido: true },
  { id: 'almacenaje', nombre: 'Almacenaje', descripcion: 'Guardamos tu stock en nuestro almacén propio y lo retiras por partes.', enMensaje: 'almacenaje' },
  { id: 'distribucion', nombre: 'Distribución', descripcion: 'Lo entregamos en tus sedes, eventos o a tus colaboradores, en Lima y provincias.', enMensaje: 'distribución' },
];
