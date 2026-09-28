// Íconos y dibujos del mazo (tomados del diseño aprobado).
import type { ClaseId } from '../../data/mazo';

/** Ícono chico de la clase: llama, rayo o play. */
export function IconoClase({ clase, tamano = 18 }: { clase: ClaseId; tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      {clase === 'dis' && <path d="M10 1c3 4 6 6.5 6 11a6 6 0 0 1-12 0c0-2.5 1.2-4 2.6-5.4.3 1.8 1.2 2.8 2.4 3.2C8.4 6.8 8.6 4 10 1z" />}
      {clase === 'mkt' && <path d="M11.5 1 3 11.5h5.5L7.5 19 17 7.5h-5.8z" />}
      {clase === 'av' && <path d="M6 3.5v13l11-6.5z" />}
    </svg>
  );
}

/** Dibujo grande de la carta: pluma, diana o cámara. */
export function ArteClase({ clase }: { clase: ClaseId }) {
  const comun = { viewBox: '0 0 88 92', stroke: 'currentColor', 'stroke-width': 3.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'aria-hidden': true } as const;
  if (clase === 'dis')
    return (
      <svg {...comun} fill="#FFF8E7" class="mz-arte">
        <path d="M44 8 L68 40 L52 76 H36 L20 40 Z" />
        <circle cx="44" cy="46" r="6" />
        <path d="M44 8 V40" fill="none" />
        <path d="M32 86 H56" />
      </svg>
    );
  if (clase === 'mkt')
    return (
      <svg {...comun} fill="none" class="mz-arte">
        <circle cx="42" cy="50" r="32" fill="#FFF8E7" />
        <circle cx="42" cy="50" r="19" />
        <circle cx="42" cy="50" r="6" fill="currentColor" />
        <path d="M42 50 L76 16" />
        <path d="M64 14 H78 V28" />
      </svg>
    );
  return (
    <svg {...comun} fill="#FFF8E7" class="mz-arte">
      <rect x="8" y="28" width="54" height="40" rx="7" />
      <path d="M62 40 L82 29 V67 L62 56 Z" />
      <circle cx="28" cy="48" r="10" />
      <path d="M14 20 H30" fill="none" />
    </svg>
  );
}

export function IconoCerrar({ tamano = 16 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  );
}

export function IconoEstrella({ tamano = 14 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
    </svg>
  );
}

export function IconoFlechaAbajo({ tamano = 14 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 6l5 5 5-5" />
    </svg>
  );
}
