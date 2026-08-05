export type Difficulty = 'facil' | 'moderado' | 'exigente'
export type AltKind = 'corta' | 'alternativa' | 'vago'

/** Acento cromatico: tine etiquetas de dia, pildoras y perfiles de altitud. */
export type Accent = 'agua' | 'bano' | 'cultura' | 'lejos'

/** Un dato puede ser un valor o un rango: 13 km, 6-7 km. */
export type Range = [number, number]

export interface Stats {
  distanceKm?: number | Range
  ascentM?: number | Range
  hours?: string // "5-6"
  driveMin?: number
  /** Matiz de la distancia: "i/v", "circular". Solo en las micro-stats. */
  distanceNote?: string
  /** Datos que no encajan en los cuatro campos anteriores. */
  extra?: StatExtra[]
}

export interface StatExtra {
  label?: string
  value: string
}

export interface Place {
  name: string
  lat: number
  lng: number
  googlePlaceId?: string
  note?: string
}

export interface Alternative {
  kind: AltKind
  /** Texto de la pildora. Si falta, se deriva de `kind`. */
  label?: string
  title: string
  stats: Stats
  body: string[] // parrafos
  note?: string // aviso destacado
  place?: Place
}

export interface Section {
  heading: string
  body: string[] // parrafos
  list?: string[]
  note?: string
  places?: Place[]
  links?: Link[]
}

export interface Link {
  label: string
  href: string
  ghost?: boolean
}

export interface ElevationProfile {
  start: number
  end: number
  startLabel?: string
  endLabel?: string
  /** Si esta, la leyenda pasa a tres tramos: salida → punto alto → llegada. */
  highLabel?: string
  /** [km desde el inicio, altitud en metros] */
  points: [number, number][]
}

export interface Day {
  id: string // "d1"
  index: number
  /** Nombre corto para el chip de navegacion. */
  short: string
  area: string // "Valle de Estos"
  title: string
  lede: string
  tags: string[]
  accent?: Accent
  stats: Stats
  difficulty: Difficulty
  elevationProfile?: ElevationProfile
  accessHeading?: string
  access: string[] // como llegar
  accessLinks?: Link[]
  accessNote?: string
  routeHeading?: string
  route: string[] // pasos numerados
  routeNote?: string
  sections?: Section[]
  places: Place[]
  altSummary?: string
  alternatives: Alternative[]
}

/** Tarjeta con pildora en los bloques que no son dias. */
export interface InfoCard {
  label: string
  kind?: AltKind
  title: string
  mini?: string[]
  body: string[]
  note?: string
  place?: Place
  links?: Link[]
  widget?: 'puntos-uno-a-uno'
}

export interface Block {
  id: string
  short: string
  title: string
  intro?: string
  sections: BlockSection[]
}

export interface BlockSection {
  heading?: string
  body?: string[]
  list?: string[]
  note?: string
  links?: Link[]
  places?: Place[]
  cards?: InfoCard[]
  /** Secciones con controles propios. */
  widget?: 'instalar' | 'puntos'
}

export interface Alert {
  id: string
  short: string
  title: string
  body: string[]
}

export interface Trip {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  /** Origen de todas las rutas en coche. */
  origin: string
  alert: Alert
  days: Day[]
  blocks: Block[]
  footer: string[]
}
