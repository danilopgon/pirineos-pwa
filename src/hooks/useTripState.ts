import { useCallback, useEffect, useState } from 'react'
import { trip } from '../data/trip'
import type {
  Activity,
  ActivityId,
  PlannedDayState,
  TripDayId,
  TripState,
} from '../data/types'

const KEY = 'pirineos:estado:v2'
const DAY_IDS: readonly TripDayId[] = ['d1', 'd2', 'd3', 'd4', 'd5']

function emptyDay(): PlannedDayState {
  return { activityIds: [], completedActivityIds: [], selectedVariantIds: {} }
}

export function createInitialTripState(): TripState {
  return {
    currentDayId: 'd1',
    days: {
      d1: emptyDay(),
      d2: emptyDay(),
      d3: emptyDay(),
      d4: emptyDay(),
      d5: emptyDay(),
    },
  }
}

function isDayId(value: unknown): value is TripDayId {
  return typeof value === 'string' && DAY_IDS.includes(value as TripDayId)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isVariantMap(value: unknown): value is Record<ActivityId, string> {
  return Boolean(
    value
      && typeof value === 'object'
      && !Array.isArray(value)
      && Object.values(value).every((variantId) => typeof variantId === 'string'),
  )
}

function isPlannedDay(value: unknown): value is PlannedDayState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const day = value as Partial<PlannedDayState>
  if (
    !isStringArray(day.activityIds)
    || !isStringArray(day.completedActivityIds)
    || !isVariantMap(day.selectedVariantIds)
  ) return false

  const activities = new Set(day.activityIds)
  return activities.size === day.activityIds.length
    && day.completedActivityIds.every((id) => activities.has(id))
    && Object.keys(day.selectedVariantIds).every((id) => activities.has(id))
}

export function parseTripState(raw: string | null): TripState {
  if (!raw) return createInitialTripState()

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return createInitialTripState()
    }

    const candidate = parsed as Partial<TripState>
    if (!isDayId(candidate.currentDayId) || !candidate.days || typeof candidate.days !== 'object') {
      return createInitialTripState()
    }

    for (const dayId of DAY_IDS) {
      if (!isPlannedDay(candidate.days[dayId])) return createInitialTripState()
    }

    return {
      currentDayId: candidate.currentDayId,
      days: {
        d1: candidate.days.d1,
        d2: candidate.days.d2,
        d3: candidate.days.d3,
        d4: candidate.days.d4,
        d5: candidate.days.d5,
      },
    }
  } catch {
    return createInitialTripState()
  }
}

export function selectCurrentDayState(state: TripState, dayId: TripDayId): TripState {
  return state.currentDayId === dayId ? state : { ...state, currentDayId: dayId }
}

export function addActivityState(
  state: TripState,
  dayId: TripDayId,
  activityId: ActivityId,
): TripState {
  const day = state.days[dayId]
  if (day.activityIds.includes(activityId)) return state

  return {
    ...state,
    days: {
      ...state.days,
      [dayId]: { ...day, activityIds: [...day.activityIds, activityId] },
    },
  }
}

export function removeActivityState(
  state: TripState,
  dayId: TripDayId,
  activityId: ActivityId,
): TripState {
  const day = state.days[dayId]
  if (!day.activityIds.includes(activityId)) return state

  const selectedVariantIds = { ...day.selectedVariantIds }
  delete selectedVariantIds[activityId]

  return {
    ...state,
    days: {
      ...state.days,
      [dayId]: {
        activityIds: day.activityIds.filter((id) => id !== activityId),
        completedActivityIds: day.completedActivityIds.filter((id) => id !== activityId),
        selectedVariantIds,
      },
    },
  }
}

export function toggleActivityDoneState(
  state: TripState,
  dayId: TripDayId,
  activityId: ActivityId,
): TripState {
  const day = state.days[dayId]
  if (!day.activityIds.includes(activityId)) return state

  const completedActivityIds = day.completedActivityIds.includes(activityId)
    ? day.completedActivityIds.filter((id) => id !== activityId)
    : [...day.completedActivityIds, activityId]

  return {
    ...state,
    days: {
      ...state.days,
      [dayId]: { ...day, completedActivityIds },
    },
  }
}

export function selectActivityVariantState(
  state: TripState,
  dayId: TripDayId,
  activityId: ActivityId,
  variantId: string,
  activities: readonly Activity[],
): TripState {
  const day = state.days[dayId]
  if (!day.activityIds.includes(activityId)) return state

  const activity = activities.find((candidate) => candidate.id === activityId)
  if (!activity?.variants?.some((variant) => variant.id === variantId)) return state
  if (day.selectedVariantIds[activityId] === variantId) return state

  return {
    ...state,
    days: {
      ...state.days,
      [dayId]: {
        ...day,
        selectedVariantIds: { ...day.selectedVariantIds, [activityId]: variantId },
      },
    },
  }
}

interface Loaded {
  state: TripState
  storageOk: boolean
}

function read(): Loaded {
  try {
    return { state: parseTripState(localStorage.getItem(KEY)), storageOk: true }
  } catch {
    return { state: createInitialTripState(), storageOk: false }
  }
}

const legacyEmpty = Object.freeze({}) as Readonly<Record<string, never>>
const legacyNoop = (..._args: unknown[]) => undefined

/** El estado viejo queda inerte hasta que el shell cambie de vistas. */
export function useTripState() {
  const [loaded] = useState(read)
  const [tripState, setTripState] = useState<TripState>(loaded.state)
  const [storageOk, setStorageOk] = useState(loaded.storageOk)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tripState))
    } catch {
      setStorageOk(false)
    }
  }, [tripState])

  const selectCurrentDay = useCallback((dayId: TripDayId) => {
    setTripState((state) => selectCurrentDayState(state, dayId))
  }, [])

  const addActivity = useCallback((dayId: TripDayId, activityId: ActivityId) => {
    setTripState((state) => addActivityState(state, dayId, activityId))
  }, [])

  const removeActivity = useCallback((dayId: TripDayId, activityId: ActivityId) => {
    setTripState((state) => removeActivityState(state, dayId, activityId))
  }, [])

  const toggleActivityDone = useCallback((dayId: TripDayId, activityId: ActivityId) => {
    setTripState((state) => toggleActivityDoneState(state, dayId, activityId))
  }, [])

  const selectActivityVariant = useCallback((
    dayId: TripDayId,
    activityId: ActivityId,
    variantId: string,
  ) => {
    setTripState((state) => selectActivityVariantState(
      state,
      dayId,
      activityId,
      variantId,
      trip.activities,
    ))
  }, [])

  return {
    // Compatibilidad inerte: el documento antiguo desaparece en la tarea 7.
    state: { ...tripState, done: legacyEmpty, choice: legacyEmpty },
    storageOk,
    initialLast: undefined,
    toggleDone: legacyNoop,
    chooseAlternative: legacyNoop,
    clearChoice: legacyNoop,
    rememberSection: legacyNoop,
    selectCurrentDay,
    addActivity,
    removeActivity,
    toggleActivityDone,
    selectActivityVariant,
  }
}
