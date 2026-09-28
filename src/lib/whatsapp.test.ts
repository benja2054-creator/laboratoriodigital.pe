import { describe, expect, it } from 'vitest';
import { enlaceWhatsApp, mensajeMazo, mensajeMerch, unirConY, MENSAJE_AGENDAR } from './whatsapp';
import { resumirMazo, soles, textosCombo } from './mazo';

describe('textosCombo', () => {
  it('sin módulos', () => {
    expect(textosCombo(resumirMazo([]))).toEqual({
      etiqueta: 'Sin combo todavía',
      pista: 'Agrega módulos para empezar tu mazo.',
      barra: 'INVERSIÓN ESTIMADA',
    });
  });
  it('una clase: invita a sumar otra', () => {
    expect(textosCombo(resumirMazo(['d1'])).pista).toBe('Juega una carta de otra clase y activa −10%.');
  });
  it('dos clases', () => {
    const t = textosCombo(resumirMazo(['d1', 'a1']));
    expect(t.etiqueta).toBe('¡COMBO x2! −10%');
    expect(t.pista).toBe('Juega la tercera carta y sube a −15%.');
    expect(t.barra).toBe('¡COMBO −10% ACTIVADO!');
  });
  it('tres clases', () => {
    const t = textosCombo(resumirMazo(['d1', 'm1', 'a1']));
    expect(t.etiqueta).toBe('¡COMBO x3! −15%');
    expect(t.pista).toBe('Mazo completo: bonus máximo activado.');
  });
});

describe('soles', () => {
  it('usa separador de miles peruano', () => {
    expect(soles(2500)).toBe('S/ 2,500');
    expect(soles(250)).toBe('S/ 250');
    expect(soles(0)).toBe('S/ 0');
  });
});

describe('resumirMazo', () => {
  it('sin combo con una sola clase', () => {
    const r = resumirMazo(['d1', 'd2']);
    expect(r.clasesDistintas).toBe(1);
    expect(r.porcentaje).toBe(0);
    expect(r.total).toBe(3400);
  });

  it('−10 % con dos clases', () => {
    const r = resumirMazo(['d2', 'a1']); // 2500 + 1200
    expect(r.porcentaje).toBe(10);
    expect(r.descuento).toBe(370);
    expect(r.total).toBe(3330);
  });

  it('−15 % con tres clases', () => {
    const r = resumirMazo(['d4', 'm4', 'a5']); // 250 + 400 + 600
    expect(r.porcentaje).toBe(15);
    expect(r.subtotal).toBe(1250);
    expect(r.descuento).toBe(188); // 187.5 redondeado
    expect(r.total).toBe(1062);
  });

  it('los comodines no suman ni activan combo', () => {
    const r = resumirMazo(['d1'], ['Grabación con drones']);
    expect(r.porcentaje).toBe(0);
    expect(r.total).toBe(900);
  });

  it('respeta combos configurables', () => {
    const r = resumirMazo(['d1', 'm3'], [], undefined, { dosClases: 20, tresClases: 30 });
    expect(r.porcentaje).toBe(20);
  });

  it('ignora ids desconocidos', () => {
    expect(resumirMazo(['zzz']).modulos).toHaveLength(0);
  });
});

describe('mensajeMazo', () => {
  it('lista módulos, comodines y total con combo', () => {
    const msg = mensajeMazo(resumirMazo(['a1', 'd2', 'm1'], ['Grabación con drones']));
    expect(msg).toBe(
      [
        'Hola Laboratorio Digital, quiero cotizar este mazo:',
        '• Identidad de marca (DISEÑO) desde S/ 2,500',
        '• Gestión de redes (MARKETING) desde S/ 1,500/mes',
        '• Pack de 4 reels (AUDIOVISUAL) desde S/ 1,200',
        '• Comodín (a cotizar): Grabación con drones',
        'Total referencial: desde S/ 4,420 (combo −15%)',
      ].join('\n'),
    );
  });

  it('sin combo no agrega el paréntesis', () => {
    expect(mensajeMazo(resumirMazo(['d1']))).toBe(
      'Hola Laboratorio Digital, quiero cotizar este mazo:\n• Logotipo (DISEÑO) desde S/ 900\nTotal referencial: desde S/ 900',
    );
  });

  it('solo comodines: sin línea de total', () => {
    expect(mensajeMazo(resumirMazo([], ['Drones']))).toBe(
      'Hola Laboratorio Digital, quiero cotizar este mazo:\n• Comodín (a cotizar): Drones',
    );
  });

  it('mazo vacío: mensaje genérico', () => {
    expect(mensajeMazo(resumirMazo([]))).toBe('Hola Laboratorio Digital, quiero cotizar un servicio.');
  });
});

describe('mensajeMerch', () => {
  it('arma la lista de categorías y servicios', () => {
    expect(mensajeMerch(['peluches', 'polos', 'tomatodos'], ['almacenaje', 'distribucion'])).toBe(
      'Hola, estoy interesado en la producción de POLOS, TOMATODOS/TAZAS/TERMOS y PELUCHES. Servicios que necesito: producción, almacenaje y distribución.',
    );
  });

  it('producción siempre va incluida', () => {
    expect(mensajeMerch(['pines'], [])).toBe(
      'Hola, estoy interesado en la producción de PINES/LLAVEROS. Servicios que necesito: producción.',
    );
  });

  it('null si no hay categorías', () => {
    expect(mensajeMerch([], ['almacenaje'])).toBeNull();
  });
});

describe('enlaceWhatsApp', () => {
  it('sin mensaje', () => {
    expect(enlaceWhatsApp()).toBe('https://wa.me/51966495267');
  });

  it('codifica el mensaje', () => {
    expect(enlaceWhatsApp(MENSAJE_AGENDAR)).toBe(
      'https://wa.me/51966495267?text=Hola%2C%20quiero%20agendar%20una%20llamada%20con%20Laboratorio%20Digital.',
    );
  });
});

describe('unirConY', () => {
  it('casos borde', () => {
    expect(unirConY([])).toBe('');
    expect(unirConY(['A'])).toBe('A');
    expect(unirConY(['A', 'B'])).toBe('A y B');
  });
});
