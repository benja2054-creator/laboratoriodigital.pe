import { CLASES, COMBOS, MODULOS, type Clase, type Modulo } from '../data/mazo';

export interface ResumenMazo {
  modulos: Modulo[]; // en el orden del catálogo
  comodines: string[];
  clasesDistintas: number;
  porcentaje: number; // descuento aplicado, 0 si no hay combo
  subtotal: number;
  descuento: number;
  total: number;
}

const formatoSoles = new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 });

/** 2500 → "S/ 2,500" */
export function soles(monto: number): string {
  return 'S/ ' + formatoSoles.format(monto);
}

export function porcentajeCombo(clasesDistintas: number, combos = COMBOS): number {
  if (clasesDistintas >= 3) return combos.tresClases;
  if (clasesDistintas === 2) return combos.dosClases;
  return 0;
}

export function claseDe(id: Modulo['clase']): Clase {
  const clase = CLASES.find((c) => c.id === id);
  if (!clase) throw new Error(`Clase desconocida: ${id}`);
  return clase;
}

/** Textos del bloque de combo y de la barra inferior de celular. */
export function textosCombo(resumen: Pick<ResumenMazo, 'clasesDistintas' | 'porcentaje'>, combos = COMBOS) {
  const { clasesDistintas: n, porcentaje: pct } = resumen;
  let pista = 'Agrega módulos para empezar tu mazo.';
  if (n === 1) pista = `Juega una carta de otra clase y activa −${combos.dosClases}%.`;
  if (n === 2) pista = `Juega la tercera carta y sube a −${combos.tresClases}%.`;
  if (n >= 3) pista = 'Mazo completo: bonus máximo activado.';
  return {
    etiqueta: pct ? `¡COMBO x${n}! −${pct}%` : 'Sin combo todavía',
    pista,
    barra: pct ? `¡COMBO −${pct}% ACTIVADO!` : 'INVERSIÓN ESTIMADA',
  };
}

/**
 * Calcula el mazo a partir de los ids elegidos. Los comodines no suman al
 * total ni cuentan para el combo: se cotizan aparte.
 */
export function resumirMazo(
  ids: readonly string[],
  comodines: readonly string[] = [],
  modulos: readonly Modulo[] = MODULOS,
  combos = COMBOS,
): ResumenMazo {
  const elegidos = modulos.filter((m) => ids.includes(m.id));
  const clasesDistintas = new Set(elegidos.map((m) => m.clase)).size;
  const porcentaje = porcentajeCombo(clasesDistintas, combos);
  const subtotal = elegidos.reduce((suma, m) => suma + m.precio, 0);
  const descuento = Math.round((subtotal * porcentaje) / 100);
  return {
    modulos: elegidos,
    comodines: [...comodines],
    clasesDistintas,
    porcentaje,
    subtotal,
    descuento,
    total: subtotal - descuento,
  };
}
