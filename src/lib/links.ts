import type { Place, Trip } from '../data/types'

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

/**
 * Todos los puntos del viaje, en orden de lectura y con el dia al que
 * pertenecen delante del nombre.
 */
export function allPlaces(trip: Trip): Place[] {
  const out: Place[] = []
  const seen = new Set<string>()

  const push = (place: Place, name: string) => {
    const key = `${place.lat},${place.lng}`
    if (seen.has(key)) return
    seen.add(key)
    out.push({ ...place, name })
  }

  for (const day of trip.days) {
    for (const place of day.places) push(place, `D${day.index} ${place.name}`)
    for (const alt of day.alternatives) {
      if (alt.place) push(alt.place, `${alt.place.name} (alt. D${day.index})`)
    }
  }

  for (const block of trip.blocks) {
    for (const section of block.sections) {
      for (const place of section.places ?? []) push(place, place.name)
      for (const card of section.cards ?? []) {
        if (card.place) push(card.place, card.place.name)
      }
    }
  }

  return out
}
