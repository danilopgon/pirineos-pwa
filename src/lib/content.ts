import { labels, trip } from '../data/trip'
import type { Place } from '../data/types'
import { allPlaceEntries, allPlaces, organicMapsUrl } from './links'
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
  items: { place: Place; label: string }[]
}

/** El indice explicito evita que un cambio de titulo vacie el mapa offline. */
export const placeGroups: PlaceGroup[] = buildGroups()

function buildGroups(): PlaceGroup[] {
  const groups = new Map<string, PlaceGroup>()

  for (const entry of allPlaceEntries(trip)) {
    const group = groups.get(entry.groupKey) ?? {
      key: entry.groupKey,
      heading: entry.groupHeading,
      items: [],
    }
    group.items.push({ place: entry.place, label: entry.place.name })
    groups.set(entry.groupKey, group)
  }

  return [...groups.values()]
}
