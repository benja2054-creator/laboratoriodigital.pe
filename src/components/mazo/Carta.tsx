// Carta de una clase (Diseño, Marketing, Audiovisual).
import { MODULOS, type Clase, type Modulo } from '../../data/mazo';
import { ImagenModulo, type ImagenOptimizada } from './ImagenModulo';
import { ArteClase, IconoClase } from './Iconos';

export function estiloClase(c: Clase['colores']) {
  return {
    '--marco': c.marco,
    '--oscuro': c.oscuro,
    '--tinte': c.tinte,
    '--rayos': `repeating-conic-gradient(from 0deg at 50% 55%, ${c.rayos[0]} 0deg 10deg, ${c.rayos[1]} 10deg 20deg)`,
  };
}

interface Props {
  clase: Clase;
  abierta: boolean;
  cuenta: number; // módulos de esta clase que ya están en el mazo
  onElegir: () => void;
  modulo?: Modulo | null; // módulo bajo el mouse: su imagen reemplaza el dibujo
  imagenes?: Record<string, ImagenOptimizada>;
}

export function Carta({ clase, abierta, cuenta, onElegir, modulo, imagenes = {} }: Props) {
  return (
    <button
      type="button"
      class={`mz-carta${abierta ? ' mz-carta--abierta' : ''}`}
      style={estiloClase(clase.colores)}
      aria-pressed={abierta}
      aria-label={`${clase.nombre}. ${clase.habilidad}. ${cuenta} de 6 módulos en tu mazo. Ver módulos.`}
      data-carta={clase.id}
      onClick={onElegir}
    >
      <span class="mz-carta__interior">
        <span class="mz-carta__cabeza">
          <span class="mz-carta__nombre">{clase.nombre}</span>
          <span class="mz-carta__icono">
            <IconoClase clase={clase.id} />
          </span>
        </span>
        <span class="mz-carta__arte">
          <ArteClase clase={clase.id} />
          <ImagenModulo
            modulos={MODULOS.filter((m) => m.clase === clase.id)}
            activo={modulo}
            imagenes={imagenes}
            sizes="(max-width: 767px) 240px, 260px"
          />
        </span>
        <span class="mz-carta__datos">
          {/* Con el mouse sobre un módulo, la carta muestra su título y descripción. */}
          {modulo ? (
            <span class="mz-carta__modulo-titulo">{modulo.nombre}</span>
          ) : (
            <span>
              N.º {clase.num} · <span class="mz-solo-grande">CLASE </span>
              {clase.clase}
            </span>
          )}
          <span>★★★ · {cuenta}/6</span>
        </span>
        <span class={`mz-carta__habilidad${modulo ? ' mz-carta__habilidad--modulo' : ''}`}>
          {modulo ? (
            modulo.descripcion
          ) : (
            <>
              <b>Habilidad · </b>
              {clase.habilidad}
            </>
          )}
        </span>
        <span class="mz-carta__filas">
          <span class="mz-carta__fila mz-solo-grande">
            <b>IDEAL PARA</b>
            <span>{clase.idealPara}</span>
          </span>
          <span class="mz-carta__fila">
            <b>ENTREGA</b>
            <span>{clase.entrega}</span>
          </span>
        </span>
        <span class="mz-carta__cta">
          <span class="mz-solo-grande">{abierta ? '¡Carta en juego! ↓' : 'Ver módulos →'}</span>
          <span class="mz-solo-movil">Toca para abrir →</span>
        </span>
      </span>
    </button>
  );
}
