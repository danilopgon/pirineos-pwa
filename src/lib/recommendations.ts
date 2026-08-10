import type {
  Activity,
  NearbyAreas,
  PlannedDayState,
  RankedSuggestion,
  SuggestionReason,
} from '../data/types'

export const nearbyAreas: NearbyAreas = {
  benasque: ['llanos-hospital', 'estos', 'cerler', 'solano'],
  'llanos-hospital': ['benasque'],
  estos: ['benasque'],
  cerler: ['benasque', 'solano'],
  solano: ['benasque', 'cerler', 'ribagorza'],
  ribagorza: ['solano', 'boi'],
  boi: ['ribagorza', 'llauset'],
  ainsa: ['anisclo', 'bielsa-chistau'],
  anisclo: ['ainsa', 'pineta'],
  pineta: ['anisclo', 'bielsa-chistau'],
  'bielsa-chistau': ['ainsa', 'pineta'],
  llauset: ['boi'],
}

const MAX_RESULTS = 10
const MIN_SCORE = 8

interface ScoredReason {
  key: SuggestionReason
  value: number
  priority: number
}

export function rankActivitySuggestions(
  activities: readonly Activity[],
  day: Readonly<PlannedDayState>,
): RankedSuggestion[] {
  const byId = new Map(activities.map((activity) => [activity.id, activity]))
  const planned = day.activityIds.flatMap((id) => {
    const activity = byId.get(id)
    return activity ? [activity] : []
  })

  // Un plan que ya ocupa el dia no necesita ruido adicional.
  if (planned.some((activity) => (
    activity.duration === 'dia-completo' && activity.combinability === 'standalone'
  ))) return []

  const excluded = new Set([...day.activityIds, ...day.completedActivityIds])
  const areas = new Set(planned.map((activity) => activity.area))
  const affinities = new Map<string, number>()

  for (const activity of planned) {
    for (const affinity of activity.affinities ?? []) {
      affinities.set(
        affinity.activityId,
        Math.max(affinities.get(affinity.activityId) ?? 0, affinity.weight ?? 1),
      )
    }
  }

  const hasFullDay = planned.some((activity) => activity.duration === 'dia-completo')
  const mediumCount = planned.filter((activity) => activity.duration === 'media-jornada').length
  const shortCount = planned.filter((activity) => activity.duration === 'corta').length
  const demandingCount = planned.filter((activity) => (
    activity.effort === 'medio' || activity.effort === 'alto'
  )).length

  return activities
    .filter((activity) => !excluded.has(activity.id))
    .map((activity): RankedSuggestion => {
      const evidence: ScoredReason[] = []
      let score = 0
      const affinityWeight = affinities.get(activity.id)
      const sameArea = areas.has(activity.area)
      const nearby = !sameArea && planned.some((current) => (
        nearbyAreas[current.area].includes(activity.area)
      ))

      if (affinityWeight) {
        const value = 15 + affinityWeight * 3
        score += value
        evidence.push({ key: 'explicit-affinity', value, priority: 0 })
      }
      if (sameArea) {
        score += 12
        evidence.push({ key: 'same-area', value: 12, priority: 1 })
      } else if (nearby) {
        score += 8
        evidence.push({ key: 'nearby', value: 8, priority: 2 })
      }

      if (activity.duration === 'corta') {
        score += 4
        evidence.push({
          key: planned.length ? 'afternoon-fit' : 'short',
          value: 4,
          priority: planned.length ? 3 : 4,
        })
      } else if (activity.duration === 'media-jornada') {
        score += 1
      }

      if (activity.effort === 'muy-bajo') {
        score += 4
        evidence.push({ key: 'low-effort', value: 4, priority: 5 })
      } else if (activity.effort === 'bajo') {
        score += 2
        evidence.push({ key: 'low-effort', value: 2, priority: 5 })
      }

      if (activity.combinability === 'facil') {
        score += 3
        if (planned.length) evidence.push({ key: 'easy-after', value: 3, priority: 6 })
      } else if (activity.combinability === 'standalone') {
        score -= 10
      }

      // Las categorias bastan para medir carga sin fingir precision horaria.
      if (hasFullDay) {
        score -= activity.duration === 'corta' && activity.combinability === 'facil' ? 6 : 14
      } else if (mediumCount > 0) {
        if (activity.duration === 'dia-completo') score -= 12
        else if (activity.duration === 'media-jornada') score -= 4
      } else if (shortCount >= 2) {
        if (activity.duration === 'dia-completo') score -= 10
        else if (activity.duration === 'media-jornada') score -= 3
      }

      if (demandingCount > 0) {
        if (activity.effort === 'alto') score -= 6
        else if (activity.effort === 'medio') score -= 3
      }

      const reasons = evidence
        .sort((left, right) => right.value - left.value || left.priority - right.priority)
        .slice(0, 2)
        .map(({ key }) => key)

      return { activity, score, reasons }
    })
    .filter((suggestion) => suggestion.score >= MIN_SCORE && suggestion.reasons.length > 0)
    .sort((left, right) => (
      right.score - left.score
      || (left.activity.id < right.activity.id ? -1 : left.activity.id > right.activity.id ? 1 : 0)
    ))
    .slice(0, MAX_RESULTS)
}
