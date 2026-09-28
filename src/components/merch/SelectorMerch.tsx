// Selector de merch: catálogo de categorías (selección múltiple), servicios y
// botón de WhatsApp con el mensaje armado. En celular agrega una barra fija
// por pasos (1: productos, 2: servicios, listo).
import { useEffect, useRef, useState } from 'preact/hooks';
import { CATEGORIAS, SERVICIOS, type ServicioMerch } from '../../data/merch';
import { enlaceWhatsApp, mensajeMerch } from '../../lib/whatsapp';
import './SelectorMerch.css';

type ServicioId = ServicioMerch['id'];

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 4.5" />
    </svg>
  );
}

function IconoWhatsApp({ tamano = 22 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7z" />
      <path d="M9 8.5c0 3.5 2.5 6.5 6.5 6.5l1-1.6-2.2-1-1 .9a4.6 4.6 0 0 1-2.6-2.6l.9-1-1-2.2L9 8.5z" />
    </svg>
  );
}

function Foto({ src, etiqueta, clase }: { src: string | null; etiqueta: string; clase: string }) {
  return src ? (
    <img class={clase} src={src} alt="" loading="lazy" decoding="async" />
  ) : (
    <span class={`${clase} sm-foto-pendiente`} aria-hidden="true">
      {etiqueta}
    </span>
  );
}

const CHIPS = ['Modelos y colores', 'Tallas', 'Técnicas de personalización', 'Cantidad mínima', 'Precios', 'Plazos de entrega'];

function textoCategorias(n: number) {
  return n === 1 ? '1 categoría' : `${n} categorías`;
}

// Imagen ya optimizada por la página (WebP en varios tamaños).
export interface FotoOptimizada {
  src: string;
  srcset: string;
}

// Tamaño en pantalla de cada foto de categoría, para que el navegador elija la versión justa.
const TAMANOS_CATEGORIA = '(max-width: 639px) 46vw, (max-width: 1099px) 24vw, 323px';

function FotosCategoria({ fotos }: { fotos: FotoOptimizada[] }) {
  if (fotos.length === 0) return <Foto src={null} etiqueta="FOTO" clase="sm-categoria__imagen" />;
  return (
    <>
      {fotos.slice(0, 2).map((f, i) => (
        <img
          key={f.src}
          class={`sm-categoria__imagen${i === 1 ? ' sm-categoria__imagen--alterna' : ''}`}
          src={f.src}
          srcset={f.srcset}
          sizes={TAMANOS_CATEGORIA}
          alt=""
          loading="lazy"
          decoding="async"
          width={1000}
          height={1000}
        />
      ))}
    </>
  );
}

export default function SelectorMerch({
  fotoServicios = null,
  fotosCategorias = {},
}: {
  // Vertical para computadora (≥1100 px) y horizontal para tablet y celular.
  fotoServicios?: { vertical: FotoOptimizada | null; horizontal: FotoOptimizada | null } | null;
  fotosCategorias?: Record<string, FotoOptimizada[]>;
}) {
  const [elegidas, setElegidas] = useState<string[]>([]);
  const [extras, setExtras] = useState<ServicioId[]>([]);
  const [vioServicios, setVioServicios] = useState(false);
  const refServicios = useRef<HTMLElement>(null);
  const refTituloServicios = useRef<HTMLHeadingElement>(null);

  // El paso 2 de la barra de celular termina cuando la sección de servicios
  // se ve en pantalla (o al tocar un servicio).
  useEffect(() => {
    const el = refServicios.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setVioServicios(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const alternarCategoria = (id: string) =>
    setElegidas((actual) => (actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id]));

  const alternarServicio = (servicio: ServicioMerch) => {
    setVioServicios(true);
    if (servicio.siempreIncluido) return;
    setExtras((actual) => (actual.includes(servicio.id) ? actual.filter((x) => x !== servicio.id) : [...actual, servicio.id]));
  };

  const irAServicios = (e: MouseEvent) => {
    e.preventDefault();
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    refServicios.current?.scrollIntoView({ behavior: sinMovimiento ? 'auto' : 'smooth', block: 'start' });
    refTituloServicios.current?.focus({ preventScroll: true });
    setVioServicios(true);
  };

  const n = elegidas.length;
  const mensaje = mensajeMerch(elegidas, extras);
  const hrefWhatsApp = mensaje ? enlaceWhatsApp(mensaje) : '#catalogo';
  const paso = n === 0 ? 1 : vioServicios ? 3 : 2;

  return (
    <>
      <section id="catalogo" class="sm-catalogo" aria-labelledby="catalogo-titulo">
        <div class="sm-catalogo__cabeza">
          <h2 id="catalogo-titulo">¿Qué necesitas producir?</h2>
          <p>
            Marca todas las categorías que te interesan.<span class="sm-solo-escritorio"> Luego elige el servicio y nos escribes.</span>
          </p>
        </div>

        <ul class="sm-categorias">
          {CATEGORIAS.map((c) => {
            const activa = elegidas.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  class={`sm-categoria${activa ? ' sm-categoria--activa' : ''}`}
                  aria-pressed={activa}
                  onClick={() => alternarCategoria(c.id)}
                >
                  <span class="sm-categoria__foto">
                    <FotosCategoria fotos={fotosCategorias[c.id] ?? []} />
                    <span class="sm-casilla">{activa && <Check />}</span>
                  </span>
                  <span class="sm-categoria__nombre">{c.nombre}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div class="sm-catalogo__pie">
          <span class="sm-contador" aria-live="polite">
            {n === 0 ? 'Ninguna categoría elegida' : `${textoCategorias(n)} ${n === 1 ? 'elegida' : 'elegidas'}`}
          </span>
          {n > 0 && (
            <button type="button" class="sm-limpiar" onClick={() => setElegidas([])}>
              Limpiar selección
            </button>
          )}
          <a class="sm-siguiente" href="#servicios">
            Siguiente: elegir servicio ↓
          </a>
        </div>
      </section>

      <section id="servicios" ref={refServicios} class="sm-servicios" aria-labelledby="servicios-titulo">
        <div class="sm-servicios__foto">
          {fotoServicios?.horizontal ? (
            <picture>
              {fotoServicios.vertical && (
                <source media="(min-width: 1100px)" srcset={fotoServicios.vertical.srcset} sizes="688px" />
              )}
              <img
                class="sm-servicios__imagen sm-servicios__imagen--ilustracion"
                src={fotoServicios.horizontal.src}
                srcset={fotoServicios.horizontal.srcset}
                sizes="100vw"
                alt="Ilustración de nuestro proceso: producción en taller, almacén con estanterías y reparto en moto"
                loading="lazy"
                decoding="async"
              />
            </picture>
          ) : (
            <Foto src={null} etiqueta="FOTO · FÁBRICA, ALMACÉN Y REPARTO" clase="sm-servicios__imagen" />
          )}
        </div>
        <div class="sm-servicios__panel">
          <h2 id="servicios-titulo" ref={refTituloServicios} tabIndex={-1}>
            ¿Qué servicio necesitas?
          </h2>
          <p class="sm-servicios__intro">
            La producción siempre va incluida. Suma almacenaje y distribución si quieres
            <span class="sm-solo-escritorio"> que nos encarguemos de todo</span>.
          </p>

          <ul class="sm-lista-servicios">
            {SERVICIOS.map((s) => {
              const activo = s.siempreIncluido || extras.includes(s.id);
              const etiqueta = s.siempreIncluido ? 'Siempre incluido' : activo ? 'Agregado' : 'Opcional';
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    class={`sm-servicio${activo ? ' sm-servicio--activo' : ''}`}
                    aria-pressed={activo}
                    aria-disabled={s.siempreIncluido ? true : undefined}
                    onClick={() => alternarServicio(s)}
                  >
                    <span class="sm-casilla sm-casilla--chica">{activo && <Check />}</span>
                    <span class="sm-servicio__texto">
                      <span class="sm-servicio__nombre">{s.nombre}</span>
                      <span class="sm-servicio__desc">{s.descripcion}</span>
                    </span>
                    <span class="sm-servicio__etiqueta">{etiqueta}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div class="sm-mensaje">
            <span class="sm-mensaje__titulo">TU MENSAJE</span>
            <span class="sm-mensaje__texto">{mensaje ?? 'Marca al menos una categoría del catálogo para armar tu mensaje.'}</span>
          </div>

          <div class="sm-asesor">
            <span class="sm-asesor__icono" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 5h16v11H9l-5 4z" />
                <path d="M8 9h8M8 12h5" />
              </svg>
            </span>
            <div class="sm-asesor__texto">
              <span>Al escribirnos, un asesor te atenderá por WhatsApp y te dará todos los detalles de tu pedido:</span>
              <ul class="sm-chips">
                {CHIPS.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          <a class="sm-boton-wa sm-solo-sin-barra" href={hrefWhatsApp}>
            <IconoWhatsApp />
            Enviar por WhatsApp
          </a>
        </div>
      </section>

      {/* Celular: barra fija por pasos */}
      <div class="sm-barra">
        <span class="sm-barra__paso" aria-live="polite">
          {paso === 1 && 'Paso 1 de 2 · Elige tus productos'}
          {paso === 2 && 'Paso 2 de 2 · Elige tus servicios'}
          {paso === 3 && `Listo · ${textoCategorias(n)} y servicios elegidos`}
        </span>
        {paso === 2 ? (
          <a class="sm-barra__boton sm-barra__boton--negro" href="#servicios" onClick={irAServicios}>
            Siguiente: elegir servicio ↓
          </a>
        ) : (
          <a class="sm-barra__boton" href={hrefWhatsApp}>
            <IconoWhatsApp tamano={20} />
            {paso === 1 ? 'Elige tus productos primero' : 'Enviar por WhatsApp'}
          </a>
        )}
      </div>
    </>
  );
}
