// Mazo interactivo: cartas, módulos, panel "Tu mazo" y, en pantallas chicas,
// barra inferior + hoja con el mazo. Se monta dentro de la grilla de la
// página (astro-island usa display: contents), así cada sección cae en su área.
//
//   Escritorio (≥1200 px): panel lateral fijo.
//   Tablet (768–1199 px): cartas y módulos igual; el mazo va en la hoja inferior.
//   Celular (<768 px): cartas en carrusel; al tocar una se abre la vista de
//   módulos a pantalla completa con la franja "Volver a las cartas" fija.
import { useEffect, useRef, useState } from 'preact/hooks';
import { CLASES, MODULOS, type ClaseId } from '../../data/mazo';
import { resumirMazo, soles, textosCombo } from '../../lib/mazo';
import { Carta, estiloClase } from './Carta';
import { PanelMazo } from './PanelMazo';
import type { ImagenOptimizada } from './ImagenModulo';
import { TarjetaModulo } from './TarjetaModulo';
import './Mazo.css';

const CLAVE_GUARDADO = 'ld-mazo-v1';
const CELULAR = '(max-width: 767px)';
const esCelular = () => typeof window !== 'undefined' && window.matchMedia(CELULAR).matches;

interface Guardado {
  mazo: string[];
  comodines: string[];
}

function leerGuardado(): Guardado | null {
  try {
    const crudo = localStorage.getItem(CLAVE_GUARDADO);
    if (!crudo) return null;
    const d = JSON.parse(crudo);
    const ids = new Set(MODULOS.map((m) => m.id));
    return {
      mazo: Array.isArray(d.mazo) ? d.mazo.filter((id: unknown) => typeof id === 'string' && ids.has(id)) : [],
      comodines: Array.isArray(d.comodines) ? d.comodines.filter((t: unknown) => typeof t === 'string').slice(0, 20) : [],
    };
  } catch {
    return null;
  }
}

export default function Mazo({ imagenes = {} }: { imagenes?: Record<string, ImagenOptimizada> }) {
  const [abierta, setAbierta] = useState<ClaseId>('dis');
  const [mazo, setMazo] = useState<string[]>([]);
  const [comodines, setComodines] = useState<string[]>([]);
  const [borrador, setBorrador] = useState('');
  const [vistaModulos, setVistaModulos] = useState(false); // solo celular
  const [hojaAbierta, setHojaAbierta] = useState(false);
  const [anuncio, setAnuncio] = useState('');
  const [enfocado, setEnfocado] = useState<string | null>(null); // módulo bajo el mouse o con foco
  const [cargado, setCargado] = useState(false);

  const refHoja = useRef<HTMLDialogElement>(null);
  const refVolver = useRef<HTMLButtonElement>(null);
  const refModulos = useRef<HTMLElement>(null);

  // --- Guardado local (comodidad: el mazo sobrevive si el visitante vuelve) ---
  useEffect(() => {
    const g = leerGuardado();
    if (g) {
      setMazo(g.mazo);
      setComodines(g.comodines);
    }
    setCargado(true);
  }, []);
  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(CLAVE_GUARDADO, JSON.stringify({ mazo, comodines }));
    } catch {
      /* sin almacenamiento disponible: no pasa nada */
    }
  }, [mazo, comodines, cargado]);

  // --- Vista de módulos en celular: bloqueo de scroll, foco y botón "atrás" ---
  useEffect(() => {
    document.documentElement.classList.toggle('mz-bloqueo', vistaModulos);
    if (vistaModulos) {
      refModulos.current?.scrollTo(0, 0);
      refVolver.current?.focus({ preventScroll: true });
    }
  }, [vistaModulos, abierta]);

  useEffect(() => {
    const alVolver = () => setVistaModulos(false);
    window.addEventListener('popstate', alVolver);
    // Si la pantalla crece a tablet/escritorio, la vista a pantalla completa no aplica.
    const mq = window.matchMedia(CELULAR);
    const alCambiar = () => {
      if (!mq.matches) setVistaModulos(false);
    };
    mq.addEventListener('change', alCambiar);
    return () => {
      window.removeEventListener('popstate', alVolver);
      mq.removeEventListener('change', alCambiar);
    };
  }, []);

  const elegirCarta = (id: ClaseId) => {
    setAbierta(id);
    if (esCelular()) {
      setVistaModulos(true);
      history.pushState({ mzModulos: true }, '');
    }
  };

  const volverACartas = () => {
    if (history.state?.mzModulos) history.back(); // dispara popstate → cierra
    else setVistaModulos(false);
    const carta = document.querySelector<HTMLButtonElement>(`[data-carta="${abierta}"]`);
    carta?.focus({ preventScroll: false });
  };

  // Esc también cierra la vista de módulos.
  useEffect(() => {
    if (!vistaModulos) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !refHoja.current?.open) volverACartas();
    };
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  });

  // --- Hoja inferior (dialog nativo: foco, Esc y fondo resueltos por el navegador) ---
  const abrirHoja = () => {
    refHoja.current?.showModal();
    setHojaAbierta(true);
  };
  const cerrarHoja = () => refHoja.current?.close();

  // --- Acciones del mazo ---
  const alternarModulo = (id: string) => {
    const modulo = MODULOS.find((m) => m.id === id);
    const estaba = mazo.includes(id);
    setMazo((actual) => (actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id]));
    if (modulo) setAnuncio(`${modulo.nombre} ${estaba ? 'quitado de' : 'agregado a'} tu mazo.`);
  };
  const agregarComodin = () => {
    const texto = borrador.trim();
    if (!texto) return;
    setComodines((actual) => [...actual, texto]);
    setBorrador('');
    setAnuncio(`Comodín "${texto}" agregado a tu mazo.`);
  };
  const quitarComodin = (indice: number) => {
    setComodines((actual) => actual.filter((_, i) => i !== indice));
    setAnuncio('Comodín quitado de tu mazo.');
  };

  const resumen = resumirMazo(mazo, comodines);
  const combo = textosCombo(resumen);
  const claseAbierta = CLASES.find((c) => c.id === abierta)!;
  const modulosAbiertos = MODULOS.filter((m) => m.clase === abierta);
  const cuentaDe = (id: ClaseId) => MODULOS.filter((m) => m.clase === id && mazo.includes(m.id)).length;
  const cartasEnMazo = resumen.modulos.length + resumen.comodines.length;

  const propsPanel = {
    resumen,
    borrador,
    onBorrador: setBorrador,
    onAgregarComodin: agregarComodin,
    onQuitarModulo: alternarModulo,
    onQuitarComodin: quitarComodin,
  };

  return (
    <>
      {/* Cartas */}
      <section class="mz-area-cartas" aria-label="Cartas">
        <div class="mz-pista-carrusel mz-solo-movil" aria-hidden="true">
          <span>TOCA UNA CARTA</span>
          <span>DESLIZA →</span>
        </div>
        <div class="mz-cartas">
          {CLASES.map((c) => (
            <Carta key={c.id} clase={c} abierta={c.id === abierta} cuenta={cuentaDe(c.id)} onElegir={() => elegirCarta(c.id)} modulo={MODULOS.find((m) => m.id === enfocado && m.clase === c.id)} imagenes={imagenes} />
          ))}
        </div>
        <p class="mz-cartas__ayuda mz-solo-movil">Toca una carta para abrirla y ver sus 6 módulos.</p>
      </section>

      {/* Módulos de la carta abierta */}
      <section
        ref={refModulos}
        class={`mz-area-modulos mz-modulos${vistaModulos ? ' mz-modulos--vista' : ''}`}
        style={estiloClase(claseAbierta.colores)}
        aria-labelledby="mz-modulos-titulo"
      >
        {/* Celular: franja fija + cabecera de la carta */}
        <div class="mz-modulos__franja mz-solo-movil">
          <button type="button" ref={refVolver} class="mz-modulos__volver mz-chunky" onClick={volverACartas}>
            ← Volver a las cartas
          </button>
          <span class="mz-modulos__cuenta">{cuentaDe(abierta)}/6 en tu mazo</span>
        </div>
        <div class="mz-modulos__cabecera-movil mz-solo-movil">
          <span class="mz-modulos__num">
            N.º {claseAbierta.num} · {claseAbierta.clase}
          </span>
          <span class="mz-modulos__nombre-movil">{claseAbierta.nombre}</span>
          <span class="mz-modulos__habilidad">
            <b>Habilidad · </b>
            {claseAbierta.habilidad}
          </span>
        </div>

        {/* Tablet y escritorio: título "Módulos de ..." */}
        <div class="mz-modulos__cabeza">
          <h2 id="mz-modulos-titulo">
            Módulos de <span class="mz-modulos__chip">{claseAbierta.nombre}</span>
          </h2>
          <span class="mz-modulos__nota">
            <span class="mz-solo-movil">Elige tus módulos · </span>Precios referenciales “desde”, en soles, sin IGV
          </span>
        </div>

        {/* Al salir de un módulo la carta sigue mostrando el último; recién al
            salir de toda la lista vuelve a su dibujo (evita parpadeos en los espacios). */}
        <div class="mz-modulos__lista" onMouseLeave={() => setEnfocado(null)}>
          {modulosAbiertos.map((m) => (
            <TarjetaModulo key={m.id} modulo={m} clase={claseAbierta} enMazo={mazo.includes(m.id)} onAlternar={() => alternarModulo(m.id)} onEnfocar={(activo) => setEnfocado((actual) => (activo ? m.id : actual === m.id ? null : actual))} />
          ))}
        </div>
      </section>

      {/* Escritorio: panel lateral */}
      <aside class="mz-area-panel" aria-label="Tu mazo">
        <PanelMazo variante="lateral" {...propsPanel} />
      </aside>

      {/* Tablet y celular: barra inferior + hoja */}
      <div class="mz-barra">
        <div class="mz-barra__total">
          <span class={`mz-barra__etiqueta${resumen.porcentaje ? ' mz-barra__etiqueta--combo' : ''}`}>{combo.barra}</span>
          <strong>{soles(resumen.total)}</strong>
        </div>
        <button type="button" class="mz-barra__boton mz-chunky" aria-haspopup="dialog" aria-expanded={hojaAbierta} onClick={abrirHoja}>
          Ver mi mazo ({cartasEnMazo})
        </button>
      </div>

      <dialog
        ref={refHoja}
        class="mz-hoja"
        aria-label="Tu mazo"
        onClose={() => setHojaAbierta(false)}
        onClick={(e) => {
          if (e.target === refHoja.current) cerrarHoja();
        }}
      >
        <PanelMazo variante="hoja" onCerrar={cerrarHoja} {...propsPanel} />
      </dialog>

      <p class="solo-lectores" aria-live="polite">
        {anuncio}
      </p>
    </>
  );
}
