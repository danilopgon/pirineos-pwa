import { trip } from './trip'
import type { Activity } from './types'

/**
 * Actividades añadidas durante el viaje que no forman parte del contenido
 * original de trip.ts. Mantener aquí evita tocar el fichero editorial grande
 * para cambios pequeños y permite que el estado persistido las reconozca.
 */
const extraActivities: Activity[] = [
  {
    id: 'compras-descanso-benasque',
    title: 'Compras y descanso en Benasque',
    short: 'Compras y descanso',
    area: 'benasque',
    areaLabel: 'Benasque',
    category: 'relax',
    effort: 'muy-bajo',
    duration: 'media-jornada',
    combinability: 'facil',
    tags: ['Último día', 'Sin prisas', 'Víspera de vuelta'],
    lede: 'Día de bajar pulsaciones antes de volver: paseo por Benasque, compras pendientes, comer tranquilo y descansar de verdad. Cero necesidad de convertir el último día en otra expedición.',
    sections: [
      {
        heading: 'El plan',
        body: [
          'Mañana sin despertador heroico. Dar una vuelta por el centro de Benasque y aprovechar para comprar recuerdos, producto local o cualquier cosa que haya quedado pendiente durante la semana.',
          'Comer con calma y dejar la tarde deliberadamente vacía: terraza, café, lectura, siesta o simplemente no hacer absolutamente nada con desnivel acumulado.',
          'Antes de cenar, dejar medio resueltas las maletas, mochilas y el coche para que la vuelta del día siguiente empiece sin convertir el checkout en una prueba contrarreloj.',
        ],
        note: 'El objetivo del día es llegar descansados a la vuelta, no exprimir una última actividad porque sí.',
      },
    ],
  },
]

export const activities: readonly Activity[] = [...trip.activities, ...extraActivities]
