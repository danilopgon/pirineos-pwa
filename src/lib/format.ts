import { labels } from '../data/trip'
import type { Range, StatExtra, Stats } from '../data/types'

// `useGrouping: always` porque en es-ES los millares de cuatro cifras van sin
// punto por defecto y las altitudes de la guia se escriben "2.050 m".
const es = new Intl.NumberFormat('es-ES', {
  maximumFractionDigits: 1,
  useGrouping: 'always',
})

export const number = (value: number): string => es.format(value)

const isRange = (value: number | Range): value is Range => Array.isArray(value)

const dash = (value: string): string => value.replace(/(\d)\s*-\s*(\d)/g, '$1–$2')

export function distance(value: number | Range): string {
  return isRange(value)
    ? `${number(value[0])}–${number(value[1])} km`
    : `${number(value)} km`
}

export function ascent(value: number | Range): string {
  return isRange(value)
    ? `${number(value[0])}–${number(value[1])} m`
    : `≈${number(value)} m`
}

/** "5-6" → "5–6 h". Un valor que ya trae unidades ("2 h 30") se respeta. */
export function hours(value: string): string {
  return /[a-z]/i.test(value) ? value : `${dash(value)} h`
}

export function drive(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} h` : `${h} h ${m}`
}

/** Celdas de la rejilla de un dia: etiqueta arriba, dato abajo. */
export function statCells(stats: Stats): StatExtra[] {
  const cells: StatExtra[] = []
  if (stats.distanceKm !== undefined) {
    cells.push({ label: labels.stats.distance, value: distance(stats.distanceKm) })
  }
  if (stats.ascentM !== undefined) {
    cells.push({ label: labels.stats.ascent, value: ascent(stats.ascentM) })
  }
  if (stats.hours !== undefined) {
    cells.push({ label: labels.stats.hours, value: hours(stats.hours) })
  }
  if (stats.driveMin !== undefined) {
    cells.push({ label: labels.stats.drive, value: drive(stats.driveMin) })
  }
  return [...cells, ...(stats.extra ?? [])]
}

/** Micro-stats de una alternativa. Devuelve marcado en linea. */
export function miniItems(stats: Stats): string[] {
  const items: string[] = []
  if (stats.distanceKm !== undefined) {
    const tail = stats.distanceNote ? ` ${stats.distanceNote}` : ''
    items.push(`**${distance(stats.distanceKm)}**${tail}`)
  }
  if (stats.ascentM !== undefined) items.push(`**${ascent(stats.ascentM)}**`)
  if (stats.hours !== undefined) items.push(`**${hours(stats.hours)}**`)
  if (stats.driveMin !== undefined) {
    items.push(`${labels.stats.drive} **${drive(stats.driveMin)}**`)
  }
  for (const extra of stats.extra ?? []) {
    items.push(extra.label ? `${extra.label} **${extra.value}**` : extra.value)
  }
  return items
}
