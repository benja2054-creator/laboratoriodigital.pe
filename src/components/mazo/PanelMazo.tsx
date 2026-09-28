// Contenido de "Tu mazo": en escritorio es el panel lateral; en tablet y
// celular va dentro de la hoja inferior.
import { COMODIN } from '../../data/mazo';
import { claseDe, soles, textosCombo, type ResumenMazo } from '../../lib/mazo';
import { enlaceWhatsApp, mensajeMazo } from '../../lib/whatsapp';
import { estiloClase } from './Carta';
import { IconoCerrar, IconoEstrella, IconoFlechaAbajo } from './Iconos';

interface Props {
  variante: 'lateral' | 'hoja';
  resumen: ResumenMazo;
  borrador: string;
  onBorrador: (texto: string) => void;
  onAgregarComodin: () => void;
  onQuitarModulo: (id: string) => void;
  onQuitarComodin: (indice: number) => void;
  onCerrar?: () => void;
}

export function PanelMazo(p: Props) {
  const { resumen } = p;
  const total = resumen.modulos.length + resumen.comodines.length;
  const combo = textosCombo(resumen);
  const hoja = p.variante === 'hoja';

  return (
    <div class={`mz-panel mz-panel--${p.variante}`}>
      {hoja && <div class="mz-panel__asa" aria-hidden="true" />}

      <div class="mz-panel__cabeza">
        <h2>Tu mazo</h2>
        {hoja ? (
          <button type="button" class="mz-panel__seguir" onClick={p.onCerrar} aria-label="Cerrar mi mazo y seguir eligiendo" autofocus>
            Seguir eligiendo
            <IconoFlechaAbajo />
          </button>
        ) : (
          <span class="mz-panel__cuenta">{total === 1 ? '1 carta' : `${total} cartas`}</span>
        )}
      </div>

      {total === 0 && <div class="mz-panel__vacio">Tu mazo está vacío. Toca una carta y agrega módulos.</div>}

      {total > 0 && (
        <ul class="mz-panel__lista">
          {resumen.modulos.map((m) => {
            const clase = claseDe(m.clase);
            return (
              <li key={m.id} class="mz-item" style={estiloClase(clase.colores)}>
                <span class="mz-item__franja" />
                <span class="mz-item__texto">
                  <span class="mz-item__nombre">{m.nombre}</span>
                  <span class="mz-item__sub">
                    {clase.nombre} ·{' '}
                    <span class="mz-item__precio">
                      desde {soles(m.precio)}
                      {m.unidad}
                    </span>
                  </span>
                </span>
                <button type="button" class="mz-item__quitar" aria-label={`Quitar ${m.nombre}`} onClick={() => p.onQuitarModulo(m.id)}>
                  <IconoCerrar />
                </button>
              </li>
            );
          })}
          {resumen.comodines.map((texto, i) => (
            <li key={`c${i}`} class="mz-item" style={{ '--marco': COMODIN.marco, '--oscuro': COMODIN.oscuro, '--tinte': COMODIN.tinte }}>
              <span class="mz-item__franja" />
              <span class="mz-item__texto">
                <span class="mz-item__nombre">{texto}</span>
                <span class="mz-item__sub">COMODÍN · A cotizar</span>
              </span>
              <button type="button" class="mz-item__quitar" aria-label={`Quitar ${texto}`} onClick={() => p.onQuitarComodin(i)}>
                <IconoCerrar />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        class="mz-comodin"
        aria-label="Carta comodín"
        onSubmit={(e) => {
          e.preventDefault();
          p.onAgregarComodin();
        }}
      >
        <div class="mz-comodin__texto">
          <span class="mz-comodin__titulo">
            <span class="mz-comodin__estrella">
              <IconoEstrella />
            </span>
            Comodín · a tu medida
          </span>
          <span class="mz-comodin__ayuda">¿Necesitas algo que no está en las cartas? Escríbelo y lo cotizamos.</span>
        </div>
        <div class="mz-comodin__fila">
          <input
            type="text"
            aria-label="Servicio que no está en las cartas"
            placeholder="Ej. Grabación con drones"
            maxLength={80}
            value={p.borrador}
            onInput={(e) => p.onBorrador((e.target as HTMLInputElement).value)}
          />
          <button type="submit" class="mz-chunky">
            + Agregar
          </button>
        </div>
      </form>

      <div class={`mz-combo${resumen.porcentaje ? ' mz-combo--activo' : ''}`} aria-live="polite">
        <span class="mz-combo__etiqueta">{combo.etiqueta}</span>
        <span class="mz-combo__pista">{combo.pista}</span>
      </div>

      <div class="mz-totales">
        <div class="mz-totales__fila">
          <span>Subtotal</span>
          <span>{soles(resumen.subtotal)}</span>
        </div>
        <div class="mz-totales__fila">
          <span>Bonus combo</span>
          <span>{resumen.descuento ? `− ${soles(resumen.descuento)}` : soles(0)}</span>
        </div>
        <div class="mz-totales__total">
          <span>Inversión estimada</span>
          <strong>
            <small class="mz-desde">Desde</small> {soles(resumen.total)}
          </strong>
        </div>
        <span class="mz-totales__nota">
          Referencial, sin IGV. Los módulos mensuales se suman por el primer mes. La pauta publicitaria se paga aparte.
        </span>
      </div>

      <a class="mz-panel__enviar mz-chunky" href={enlaceWhatsApp(mensajeMazo(resumen))}>
        ¡Enviar mi mazo por WhatsApp!
      </a>
    </div>
  );
}

