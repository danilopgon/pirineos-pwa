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

const activitiesById = new Map(trip.activities.map((activity) => [activity.id, activity]))

function stringItems(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : []
}

function parsePlannedDay(value: unknown): PlannedDayState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyDay()
  const day = value as Partial<PlannedDayState>
  const activityIds = [...new Set(
    stringItems(day.activityIds).filter((id) => activitiesById.has(id)),
  )]
  const planned = new Set(activityIds)
  const completedActivityIds = [...new Set(
    stringItems(day.completedActivityIds).filter((id) => planned.has(id)),
  )]
  const selectedVariantIds: Record<ActivityId, string> = {}

  if (day.selectedVariantIds && typeof day.selectedVariantIds === 'object' && !Array.isArray(day.selectedVariantIds)) {
    for (const [activityId, variantId] of Object.entries(day.selectedVariantIds)) {
      const activity = planned.has(activityId) ? activitiesById.get(activityId) : undefined
      if (typeof variantId === 'string' && activity?.variants?.some((variant) => variant.id === variantId)) {
        selectedVariantIds[activityId] = variantId
      }
    }
  }

  return { activityIds, completedActivityIds, selectedVariantIds }
}

export function parseTripState(raw: string | null): TripState {
  if (!raw) return createInitialTripState()

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return createInitialTripState()
    }

    const candidate = parsed as Partial<TripState>
    const days = candidate.days && typeof candidate.days === 'object' && !Array.isArray(candidate.days)
      ? candidate.days as Partial<Record<TripDayId, unknown>>
      : {}

    return {
      currentDayId: isDayId(candidate.currentDayId) ? candidate.currentDayId : 'd1',
      days: {
        d1: parsePlannedDay(days.d1),
        d2: parsePlannedDay(days.d2),
        d3: parsePlannedDay(days.d3),
        d4: parsePlannedDay(days.d4),
        d5: parsePlannedDay(days.d5),
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

  useEffect(() => {
    const adoptStoredState = (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === KEY && event.newValue) {
        setTripState(parseTripState(event.newValue))
      }
    }
    window.addEventListener('storage', adoptStoredState)
    return () => window.removeEventListener('storage', adoptStoredState)
  }, [])

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
    state: tripState,
    storageOk,
    selectCurrentDay,
    addActivity,
    removeActivity,
    toggleActivityDone,
    selectActivityVariant,
  }
}
