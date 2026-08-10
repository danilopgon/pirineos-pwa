import type { ReactNode } from 'react'
import { labels, trip } from '../data/trip'
import type { Link, Place } from '../data/types'
import { useIsOnline } from '../hooks/onlineContext'
import { md } from '../lib/content'
import { drivingUrl, organicMapsUrl, placeUrl } from '../lib/links'
import { fill } from '../lib/markup'

export function Paragraphs({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <>
      {items.map((text, i) => (
        <p key={i}>{md(text)}</p>
      ))}
    </>
  )
}

export function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null
  return (
    <ul>
      {items.map((text, i) => (
        <li key={i}>{md(text)}</li>
      ))}
    </ul>
  )
}

export function Steps({ items }: { items: string[] }) {
  return (
    <ol>
      {items.map((text, i) => (
        <li key={i}>{md(text)}</li>
      ))}
    </ol>
  )
}

export function Note({ text }: { text?: string }) {
  if (!text) return null
  return <p className="note">{md(text)}</p>
}

export function Mini({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <ul className="mini">
      {items.map((text, i) => (
        <li key={i}>{md(text)}</li>
      ))}
    </ul>
  )
}

export function Btns({ children }: { children: ReactNode }) {
  return <div className="btns">{children}</div>
}

interface ButtonProps {
  label: string
  href: string
  ghost?: boolean
  small?: boolean
  /** Enlace https que no abre nada sin cobertura. */
  needsSignal?: boolean
}

export function LinkButton({ label, href, ghost, small, needsSignal }: ButtonProps) {
  const online = useIsOnline()
  const degraded = Boolean(needsSignal) && !online
  const className = ['btn', ghost ? 'ghost' : '', small ? 'sm' : ''].filter(Boolean).join(' ')

  return (
    <a
      className={className}
      href={href}
      data-needs-signal={degraded || undefined}
      aria-label={degraded ? `${label} — ${labels.maps.needsSignal}` : undefined}
    >
      {label}
    </a>
  )
}

export function ExternalLinks({ links, small }: { links?: Link[]; small?: boolean }) {
  if (!links?.length) return null
  return (
    <>
      {links.map((link) => (
        <LinkButton
          key={link.href}
          label={link.label}
          href={link.href}
          ghost={link.ghost}
          small={small}
          needsSignal
        />
      ))}
    </>
  )
}

/**
 * El camino que sigue funcionando en el monte. Va una sola vez por fila y
 * carga de golpe todos los puntos de esa fila, asi que no duplica botones:
 * en las filas de varios puntos hay menos que antes.
 *
 * Con cobertura acompana a Google; sin ella, pasa a ser el boton principal.
 */
export function OfflineMapButton({ places }: { places: Place[] }) {
  const online = useIsOnline()
  if (!places.length) return null

  const label =
    places.length === 1 ? labels.points.oneByOne : fill(labels.points.batch, places.length)

  return (
    <a
      className={`btn offline-first${online ? ' sm' : ''}`}
      href={organicMapsUrl(places)}
      data-primary={!online}
    >
      {label}
    </a>
  )
}

/** Ruta en coche desde la base del viaje hasta el punto. */
export function DriveButton({
  place,
  label,
  ghost,
  small,
}: {
  place: Place
  label?: string
  ghost?: boolean
  small?: boolean
}) {
  return (
    <LinkButton
      label={label ?? `${labels.day.routeTo} ${place.name}`}
      href={drivingUrl(trip.origin, place)}
      ghost={ghost}
      small={small}
      needsSignal
    />
  )
}

/** Ficha del punto en Google Maps. */
export function PlaceButton({ place }: { place: Place }) {
  return <LinkButton label={place.name} href={placeUrl(place)} ghost small needsSignal />
}

/**
 * Ficha del sitio cuando lo tenemos identificado, y ruta en coche cuando no.
 * Los puntos con `googlePlaceId` son sitios a los que se llega andando (una
 * cascada, un pueblo); pedir ruta hasta sus coordenadas manda al coche por
 * accesos que no lo son.
 */
export function PlaceLink({ place }: { place: Place }) {
  return place.googlePlaceId ? (
    <PlaceButton place={place} />
  ) : (
    <DriveButton place={place} ghost small />
  )
}
