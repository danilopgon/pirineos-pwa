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
  /** Mantiene estable el mapa general cuando el punto solo sirve a una ficha. */
  includeInTripMap?: boolean
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
  id: string
  label: string
  title: string
  mini?: string[]
  body?: string[]
  note?: string
  place?: Place
  links?: Link[]
  widget?: 'puntos-uno-a-uno'
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

export interface Trip {
  eyebrow: string
  title: string
  titleAccent: string
  intro: string
  /** Origen de todas las rutas en coche. */
  origin: string
  days: TripDay[]
  activities: Activity[]
  infoBlocks: InfoBlock[]
}
