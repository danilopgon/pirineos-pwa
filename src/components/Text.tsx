import type { ReactNode } from 'react'
import { labels, trip } from '../data/trip'
import type { Link, Place } from '../data/types'
import { md } from '../lib/content'
import { drivingUrl, placeUrl } from '../lib/links'

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
}

export function LinkButton({ label, href, ghost, small }: ButtonProps) {
  const className = ['btn', ghost ? 'ghost' : '', small ? 'sm' : ''].filter(Boolean).join(' ')
  return (
    <a className={className} href={href}>
      {label}
    </a>
  )
}

export function ExternalLinks({ links, small }: { links?: Link[]; small?: boolean }) {
  if (!links?.length) return null
  return (
    <>
      {links.map((link) => (
        <LinkButton key={link.href} label={link.label} href={link.href} ghost={link.ghost} small={small} />
      ))}
    </>
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
    />
  )
}

/** Ficha del punto en Google Maps. */
export function PlaceButton({ place }: { place: Place }) {
  return <LinkButton label={place.name} href={placeUrl(place)} ghost small />
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
