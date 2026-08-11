import type { Activity, InfoBlock, Place, Trip } from '../data/types'

/** Ruta en coche desde el origen del viaje hasta el punto. */
export function drivingUrl(origin: string, place: Place): string {
  const params = new URLSearchParams({
    api: '1',
    origin,
    destination: `${place.lat},${place.lng}`,
    travelmode: 'driving',
  })
  return `https://www.google.com/maps/dir/?${params}`
}

/** Ficha del punto en Google Maps. */
export function placeUrl(place: Place): string {
  const params = new URLSearchParams({ api: '1', query: `${place.lat},${place.lng}` })
  if (place.googlePlaceId) params.set('query_place_id', place.googlePlaceId)
  return `https://www.google.com/maps/search/?${params}`
}

/**
 * Deep link de Organic Maps. Esquema propio, no https: funciona en modo avion
 * y no debe pasar por ningun acortador ni redireccion.
 */
export function organicMapsUrl(places: Place[]): string {
  const parts = places.map(
    (p) => `ll=${p.lat},${p.lng}&n=${encodeURIComponent(p.name)}`,
  )
  return `om://map?v=1&${parts.join('&')}`
}

export interface PlaceIndexEntry {
  place: Place
  groupKey: string
  groupHeading: string
  activityId?: string
}

/** El grupo viaja con el punto; el nombre queda libre para ser texto editorial. */
export function allPlaceEntries(trip: Trip): PlaceIndexEntry[] {
  const out: PlaceIndexEntry[] = []
  const seen = new Set<string>()

  const push = (place: Place, groupKey: string, groupHeading: string, activityId?: string) => {
    const key = `${place.lat},${place.lng}`
    if (seen.has(key)) return
    seen.add(key)
    out.push({ place, groupKey, groupHeading, activityId })
  }

  const pushActivity = (activity: Activity) => {
    const add = (place: Place) => push(place, `area:${activity.area}`, activity.areaLabel, activity.id)
    for (const place of activity.places ?? []) add(place)
    for (const section of activity.sections ?? []) {
      for (const place of section.places ?? []) add(place)
    }
    for (const activityVariant of activity.variants ?? []) {
      for (const place of activityVariant.places ?? []) add(place)
    }
  }

  const pushInfo = (block: InfoBlock) => {
    const add = (place: Place) => push(place, `info:${block.id}`, block.title)
    for (const section of block.sections) {
      for (const place of section.places ?? []) add(place)
      for (const card of section.cards ?? []) {
        if (card.place) add(card.place)
      }
    }
  }

  for (const activity of trip.activities) pushActivity(activity)
  for (const block of trip.infoBlocks) pushInfo(block)
  return out
}

/** Catalogo deduplicado para el deep link offline. */
export function allPlaces(trip: Trip): Place[] {
  return allPlaceEntries(trip).map(({ place }) => place)
}
