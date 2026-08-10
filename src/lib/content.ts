import { labels, trip } from '../data/trip'
import type { Place } from '../data/types'
import { allPlaces, organicMapsUrl } from './links'
import { fill, inline } from './markup'

/** Todos los puntos del viaje, ya con el nombre que lleva el deep link. */
export const tripPlaces = allPlaces(trip)

/** Un unico om:// con los puntos concatenados. Abre sin conexion. */
export const pointsUrl = organicMapsUrl(tripPlaces)

export const pointsLabel = fill(labels.points.load, tripPlaces.length)

/** Texto de trip.ts listo para pintar: cuenta de puntos + marcado en linea. */
export const md = (text: string) => inline(fill(text, tripPlaces.length))

export interface PlaceGroup {
  key: string
  heading: string
  /** Nombre ya sin el prefijo del dia: lo lleva el encabezado del grupo. */
  items: { place: Place; label: string }[]
}

const DAY_PREFIX = /^D(\d+)\s+(.*)$/
const DAY_SUFFIX = /\(alt\. D(\d+)\)$/

/**
 * Los puntos sueltos, agrupados por dia. En una sola fila eran dieciocho
 * botones identicos sin orden ni pista: nadie encuentra nada ahi.
 */
export const placeGroups: PlaceGroup[] = buildGroups()

function buildGroups(): PlaceGroup[] {
  const byDay = new Map<number, PlaceGroup['items']>()
  const others: PlaceGroup['items'] = []

  for (const place of tripPlaces) {
    const prefix = DAY_PREFIX.exec(place.name)
    const suffix = DAY_SUFFIX.exec(place.name)
    const day = prefix ? Number(prefix[1]) : suffix ? Number(suffix[1]) : null

    if (day === null) {
      others.push({ place, label: place.name })
      continue
    }
    const items = byDay.get(day) ?? []
    items.push({ place, label: prefix?.[2] ?? place.name })
    byDay.set(day, items)
  }

  const groups = [...byDay.entries()]
    .sort(([a], [b]) => a - b)
    .map(([day, items]) => ({
      key: `d${day}`,
      heading: fill(labels.points.dayGroup, day),
      items,
    }))

  if (others.length) {
    groups.push({ key: 'otros', heading: labels.points.otherGroup, items: others })
  }
  return groups
}
