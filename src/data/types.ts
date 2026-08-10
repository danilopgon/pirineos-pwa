export type TripDayId = 'd1' | 'd2' | 'd3' | 'd4' | 'd5'
export type ActivityId = string
export type AreaId =
  | 'benasque' | 'llanos-hospital' | 'estos' | 'cerler' | 'solano'
  | 'ribagorza' | 'boi' | 'ainsa' | 'anisclo' | 'pineta'
  | 'bielsa-chistau' | 'llauset'

export type ActivityCategory =
  | 'montana' | 'paseo' | 'pueblos' | 'cultura' | 'agua' | 'relax'
export type ActivityEffort = 'muy-bajo' | 'bajo' | 'medio' | 'alto'
export type ActivityDuration = 'corta' | 'media-jornada' | 'dia-completo'
export type ActivityCombinability = 'facil' | 'normal' | 'standalone'

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

export interface TripDay {
  id: TripDayId
  index: 1 | 2 | 3 | 4 | 5
}

export interface ActivitySection {
  heading: string
  body?: string[]
  list?: string[]
  note?: string
  places?: Place[]
  links?: Link[]
}

export interface ActivityVariant {
  id: string
  title: string
  label?: string
  stats?: Stats
  summary: string[]
  note?: string
  route?: string[]
  places?: Place[]
}

export interface ActivityAffinity {
  activityId: ActivityId
  weight?: 1 | 2 | 3
  reason?: string
}

export interface Activity {
  id: ActivityId
  title: string
  short?: string
  area: AreaId
  areaLabel: string
  category: ActivityCategory
  effort: ActivityEffort
  duration: ActivityDuration
  combinability: ActivityCombinability
  tags: string[]
  stats?: Stats
  lede?: string
  accessHeading?: string
  access?: string[]
  accessLinks?: Link[]
  accessNote?: string
  routeHeading?: string
  route?: string[]
  routeNote?: string
  sections?: ActivitySection[]
  places?: Place[]
  elevationProfile?: ElevationProfile
  variants?: ActivityVariant[]
  affinities?: ActivityAffinity[]
}

export interface InfoCard {
  // Temporal hasta migrar los bloques: las tarjetas antiguas aun no tienen id.
  id?: string
  label: string
  title: string
  mini?: string[]
  body?: string[]
  note?: string
  place?: Place
  links?: Link[]
  widget?: 'puntos-uno-a-uno'
  kind?: AltKind
}

export interface InfoSection {
  id: string
  heading?: string
  body?: string[]
  list?: string[]
  note?: string
  links?: Link[]
  places?: Place[]
  cards?: InfoCard[]
  widget?: 'instalar' | 'puntos'
}

export interface InfoBlock {
  id: string
  title: string
  intro?: string
  sections: InfoSection[]
}

export interface PlannedDayState {
  activityIds: ActivityId[]
  completedActivityIds: ActivityId[]
  selectedVariantIds: Record<ActivityId, string>
}

export interface TripState {
  currentDayId: TripDayId
  days: Record<TripDayId, PlannedDayState>
}

export interface RankedSuggestion {
  activity: Activity
  score: number
  reasons: SuggestionReason[]
}

export type SuggestionReason =
  | 'same-area' | 'nearby' | 'explicit-affinity' | 'low-effort'
  | 'short' | 'easy-after' | 'afternoon-fit'

export type NearbyAreas = Readonly<Record<AreaId, readonly AreaId[]>>

// Transicion: el documento actual sigue vivo hasta el cambio de vistas.
export type Difficulty = 'facil' | 'moderado' | 'exigente'
export type AltKind = 'corta' | 'alternativa' | 'vago'

/** Acento cromatico: tine etiquetas de dia, pildoras y perfiles de altitud. */
export type Accent = 'agua' | 'bano' | 'cultura' | 'lejos'

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

export interface Trip {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  /** Origen de todas las rutas en coche. */
  origin: string
  days: Day[]
  blocks: Block[]
  footer: string[]
}
