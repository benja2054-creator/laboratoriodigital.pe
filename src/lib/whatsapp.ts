import { sitio } from '../data/sitio';
import { CATEGORIAS, SERVICIOS, type ServicioMerch } from '../data/merch';
import { claseDe, soles, type ResumenMazo } from './mazo';

/** Enlace a WhatsApp, con el mensaje ya armado si se pasa uno. */
export function enlaceWhatsApp(mensaje?: string): string {
  const base = `https://wa.me/${sitio.whatsapp.numero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** ["A", "B", "C"] → "A, B y C" */
export function unirConY(partes: readonly string[]): string {
  if (partes.length <= 1) return partes.join('');
  return partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1];
}

export const MENSAJE_CREA_MARCA = 'Hola, quiero crear mi propia marca de productos. ¿Me explican cómo funciona?';
export const MENSAJE_AGENDAR = 'Hola, quiero agendar una llamada con Laboratorio Digital.';
// Se usa mientras el PDF del catálogo no esté publicado.
export const MENSAJE_CATALOGO = 'Hola, ¿me pueden enviar el catálogo completo de merch para empresas?';

/** Mensaje del mazo: módulos con precio "desde", comodines y total referencial. */
export function mensajeMazo(resumen: ResumenMazo): string {
  const lineas = [
    ...resumen.modulos.map((m) => `• ${m.nombre} (${claseDe(m.clase).nombre}) desde ${soles(m.precio)}${m.unidad}`),
    ...resumen.comodines.map((texto) => `• Comodín (a cotizar): ${texto}`),
  ];
  if (lineas.length === 0) return 'Hola Laboratorio Digital, quiero cotizar un servicio.';

  const partes = ['Hola Laboratorio Digital, quiero cotizar este mazo:', ...lineas];
  // Si solo hay comodines no hay nada que sumar: se omite el total.
  if (resumen.modulos.length > 0) {
    const combo = resumen.porcentaje ? ` (combo −${resumen.porcentaje}%)` : '';
    partes.push(`Total referencial: desde ${soles(resumen.total)}${combo}`);
  }
  return partes.join('\n');
}

/**
 * Mensaje de merch. Devuelve null si no hay categorías elegidas (en ese caso
 * el botón lleva al catálogo en vez de a WhatsApp).
 */
export function mensajeMerch(
  categoriaIds: readonly string[],
  serviciosExtra: readonly ServicioMerch['id'][],
): string | null {
  const categorias = CATEGORIAS.filter((c) => categoriaIds.includes(c.id));
  if (categorias.length === 0) return null;
  const servicios = SERVICIOS.filter((s) => s.siempreIncluido || serviciosExtra.includes(s.id));
  return (
    `Hola, estoy interesado en la producción de ${unirConY(categorias.map((c) => c.mensaje))}. ` +
    `Servicios que necesito: ${unirConY(servicios.map((s) => s.enMensaje))}.`
  );
}
