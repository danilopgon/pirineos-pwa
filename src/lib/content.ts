import { labels, trip } from '../data/trip'
import { allPlaces, organicMapsUrl } from './links'
import { fill, inline } from './markup'

/** Todos los puntos del viaje, ya con el nombre que lleva el deep link. */
export const tripPlaces = allPlaces(trip)

/** Un unico om:// con los puntos concatenados. Abre sin conexion. */
export const pointsUrl = organicMapsUrl(tripPlaces)

export const pointsLabel = fill(labels.points.load, tripPlaces.length)

/** Texto de trip.ts listo para pintar: cuenta de puntos + marcado en linea. */
export const md = (text: string) => inline(fill(text, tripPlaces.length))

/** Igual, pero donde no caben nodos (atributos, titulos). */
export const plain = (text: string) => fill(text, tripPlaces.length)
