// Módulo dentro de una carta, con su precio y el botón para sumarlo al mazo.
import type { Clase, Modulo } from '../../data/mazo';
import { soles } from '../../lib/mazo';
import { estiloClase } from './Carta';

interface Props {
  modulo: Modulo;
  clase: Clase;
  enMazo: boolean;
  onAlternar: () => void;
  onEnfocar?: (activo: boolean) => void;
}

export function TarjetaModulo({ modulo, clase, enMazo, onAlternar, onEnfocar }: Props) {
  return (
    <article class={`mz-modulo${enMazo ? ' mz-modulo--en-mazo' : ''}`} style={estiloClase(clase.colores)}
      data-modulo={modulo.id}
      onMouseEnter={() => onEnfocar?.(true)}
      onFocusIn={() => onEnfocar?.(true)}
      onFocusOut={() => onEnfocar?.(false)}
    >
      <div class="mz-modulo__franja" />
      <div class="mz-modulo__cuerpo">
        <div class="mz-modulo__meta">
          <span>{modulo.codigo}</span>
          <span>{modulo.tipo}</span>
        </div>
        <h3 class="mz-modulo__nombre">{modulo.nombre}</h3>
        <p class="mz-modulo__desc">{modulo.descripcion}</p>
        <span class="mz-modulo__precio">
          <small class="mz-modulo__desde">Desde</small>
          <span>
            {soles(modulo.precio)}
            <small>{modulo.unidad}</small>
          </span>
        </span>
        <button type="button" class="mz-modulo__boton mz-chunky" aria-pressed={enMazo} onClick={onAlternar}>
          {enMazo ? (
            '¡En tu mazo! ✓'
          ) : (
            <>
              + Agregar<span class="mz-solo-movil"> al mazo</span>
            </>
          )}
          <span class="solo-lectores">: {modulo.nombre}</span>
        </button>
      </div>
    </article>
  );
}
