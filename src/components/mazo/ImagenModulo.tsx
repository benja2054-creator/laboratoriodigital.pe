// Imagen del módulo dentro del recuadro de la carta (escritorio) o de la
// franja fija (celular). Si el módulo aún no tiene imagen, muestra un
// recuadro provisional con su código y nombre.
import type { Modulo } from '../../data/mazo';

export interface ImagenOptimizada {
  src: string;
  srcset: string;
}

interface Props {
  modulos: Modulo[]; // módulos de la carta (se precargan todas sus imágenes)
  activo: Modulo | null | undefined;
  imagenes: Record<string, ImagenOptimizada>;
  sizes: string;
}

export function ImagenModulo({ modulos, activo, imagenes, sizes }: Props) {
  return (
    <>
      {modulos.map((m) =>
        imagenes[m.id] ? (
          <img
            key={m.id}
            class={`mz-carta__foto mz-carta__foto--img${activo?.id === m.id ? ' mz-carta__foto--visible' : ''}`}
            src={imagenes[m.id].src}
            srcset={imagenes[m.id].srcset}
            sizes={sizes}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : null,
      )}
      {activo && !imagenes[activo.id] && (
        <span class="mz-carta__foto mz-carta__foto--visible" aria-hidden="true">
          <b>{activo.codigo}</b>
          {activo.nombre}
        </span>
      )}
    </>
  );
}
