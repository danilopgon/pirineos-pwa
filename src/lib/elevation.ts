import { labels } from '../data/trip'
import { number } from './format'
import type { ElevationProfile } from '../data/types'

export const VIEW = { width: 320, height: 70, top: 10, bottom: 58 }

/**
 * Proyecta los puntos del perfil sobre el viewBox. Sin puntos no hay dibujo:
 * antes ninguna curva que una curva inventada.
 */
export function profilePoints(profile: ElevationProfile): string | null {
  const { points } = profile
  if (points.length < 2) return null

  const xs = points.map(([x]) => x)
  const ys = points.map(([, y]) => y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  if (maxX === minX) return null

  const spanY = maxY - minY || 1
  const usable = VIEW.bottom - VIEW.top

  return points
    .map(([x, y]) => {
      const px = ((x - minX) / (maxX - minX)) * VIEW.width
      const py = VIEW.bottom - ((y - minY) / spanY) * usable
      return `${round(px)},${round(py)}`
    })
    .join(' ')
}

const round = (value: number): number => Math.round(value * 10) / 10

/** "1.760 m parking → 2.050 m Plan d'Aigualluts · perfil orientativo" */
export function profileCaption(profile: ElevationProfile): string {
  const stops = [stop(profile.start, profile.startLabel)]
  if (profile.highLabel) {
    const high = Math.max(...profile.points.map(([, y]) => y))
    stops.push(stop(high, profile.highLabel))
  }
  stops.push(stop(profile.end, profile.endLabel))
  return `${stops.join(' → ')} · ${labels.day.profileCaption}`
}

const stop = (metres: number, label?: string): string =>
  label ? `${number(metres)} m ${label}` : `${number(metres)} m`
