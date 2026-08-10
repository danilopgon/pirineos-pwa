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

/**
 * "1.760 m parking → 2.050 m Plan d'Aigualluts · el tramo más duro sube
 *  435 m en 1,6 km · perfil orientativo"
 *
 * Los extremos solos leen plano. La pendiente del tramo mas duro es lo que
 * responde a "¿puedo con esto?", y hasta ahora solo existia como pixeles:
 * el dibujo es `aria-hidden`, asi que quien no lo ve no tenia el dato.
 */
export function profileCaption(profile: ElevationProfile): string {
  const stops = [stop(profile.start, profile.startLabel)]
  if (profile.highLabel) {
    const high = Math.max(...profile.points.map(([, y]) => y))
    stops.push(stop(high, profile.highLabel))
  }
  stops.push(stop(profile.end, profile.endLabel))

  const parts = [stops.join(' → ')]
  const climb = steepestClimb(profile)
  if (climb) parts.push(climb)
  parts.push(labels.day.profileCaption)
  return parts.join(' · ')
}

/**
 * Subida continua mas exigente del perfil, en metros por kilometro. Solo se
 * cuenta si merece mencion: por debajo de 120 m no cambia la decision.
 */
function steepestClimb(profile: ElevationProfile): string | null {
  const { points } = profile
  if (points.length < 2) return null

  let best: { gain: number; km: number } | null = null
  let start = points[0]
  if (!start) return null

  for (let i = 1; i <= points.length; i++) {
    const current = points[i]
    const previous = points[i - 1]
    if (!previous) break
    if (current && current[1] > previous[1]) continue

    const gain = previous[1] - start[1]
    const km = previous[0] - start[0]
    if (gain > 0 && km > 0 && (!best || gain > best.gain)) best = { gain, km }
    if (current) start = current
  }

  if (!best || best.gain < 120) return null
  return `${labels.day.steepest} ${number(best.gain)} m en ${number(round(best.km))} km`
}

const stop = (metres: number, label?: string): string =>
  label ? `${number(metres)} m ${label}` : `${number(metres)} m`
