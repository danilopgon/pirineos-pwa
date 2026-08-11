import { useMemo, useState } from 'react'
import { labels } from '../data/trip'
import type {
  Activity,
  ActivityId,
  PlannedDayState,
  TripDay,
  TripDayId,
  TripState,
} from '../data/types'
import { rankActivitySuggestions } from '../lib/recommendations'
import { ActivityCard } from './ActivityCard'
import { ActivityDetail } from './ActivityDetail'
import { DaySelector } from './DaySelector'

export const VISIBLE_SUGGESTIONS = 2

interface TodayViewProps {
  activities: readonly Activity[]
  days: readonly TripDay[]
  state: TripState
  onSelectDay: (dayId: TripDayId) => void
  onAdd: (dayId: TripDayId, activityId: ActivityId) => void
  onRemove: (dayId: TripDayId, activityId: ActivityId) => void
  onToggleDone: (dayId: TripDayId, activityId: ActivityId) => void
  onSelectVariant: (dayId: TripDayId, activityId: ActivityId, variantId: string) => void
  onExplore: () => void
}

interface PlannedActivityRowProps {
  activity: Activity
  day: PlannedDayState
  onToggleDone: (activity: Activity, isDone: boolean) => void
  onRemove: (activity: Activity) => void
  onSelectVariant: (activity: Activity, variantId: string) => void
  onOpen: (activity: Activity) => void
}

function PlannedActivityRow({
  activity,
  day,
  onToggleDone,
  onRemove,
  onSelectVariant,
  onOpen,
}: PlannedActivityRowProps) {
  const isDone = day.completedActivityIds.includes(activity.id)
  const selectedVariantId = day.selectedVariantIds[activity.id] ?? ''

  return (
    <li
      className="planned-activity"
      data-category={activity.category}
      data-effort={activity.effort}
      data-done={isDone || undefined}
    >
      <div className="planned-activity__summary">
        <h5>{activity.title}</h5>
        <p>{labels.today.activityMeta(
          activity.areaLabel,
          labels.activity.durations[activity.duration],
        )}</p>
      </div>

      {activity.variants?.length ? (
        <label className="planned-activity__variant">
          <span>{labels.today.variantFor(activity.title)}</span>
          <select
            value={selectedVariantId}
            aria-label={labels.today.variantFor(activity.title)}
            onChange={(event) => {
              if (event.target.value) onSelectVariant(activity, event.target.value)
            }}
          >
            <option value="">{labels.today.chooseVariant}</option>
            {activity.variants.map((variant) => (
              <option value={variant.id} key={variant.id}>{variant.title}</option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="planned-activity__actions btns">
        <button
          type="button"
          className="btn"
          aria-pressed={isDone}
          aria-label={isDone
            ? labels.today.markPending(activity.title)
            : labels.today.markDone(activity.title)}
          onClick={() => onToggleDone(activity, isDone)}
        >
          {isDone ? labels.today.done : labels.today.pending}
        </button>
        <button
          type="button"
          className="btn ghost"
          aria-label={labels.catalogue.openActivity(activity.title)}
          onClick={() => onOpen(activity)}
        >
          {labels.catalogue.details}
        </button>
        <button
          type="button"
          className="btn text"
          aria-label={labels.today.removeActivity(activity.title)}
          onClick={() => onRemove(activity)}
        >
          {labels.today.remove}
        </button>
      </div>
    </li>
  )
}

export function TodayView({
  activities,
  days,
  state,
  onSelectDay,
  onAdd,
  onRemove,
  onToggleDone,
  onSelectVariant,
  onExplore,
}: TodayViewProps) {
  const [openActivity, setOpenActivity] = useState<Activity>()
  const [showAllSuggestions, setShowAllSuggestions] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [removedActivity, setRemovedActivity] = useState<{
    activity: Activity
    dayId: TripDayId
    dayIndex: number
    isDone: boolean
    variantId?: string
  }>()
  const currentDay = days.find((day) => day.id === state.currentDayId) ?? days[0]
  const currentDayId = currentDay?.id ?? state.currentDayId
  const currentDayIndex = currentDay?.index ?? 1
  const day = state.days[currentDayId]
  const activitiesById = useMemo(
    () => new Map(activities.map((activity) => [activity.id, activity])),
    [activities],
  )
  const plannedActivities = day.activityIds.flatMap((activityId) => {
    const activity = activitiesById.get(activityId)
    return activity ? [activity] : []
  })
  const suggestions = useMemo(
    () => rankActivitySuggestions(activities, day),
    [activities, day],
  )
  const visibleSuggestions = showAllSuggestions
    ? suggestions
    : suggestions.slice(0, VISIBLE_SUGGESTIONS)
  const addedActivityIds = new Set(day.activityIds)

  const announce = (message: string) => {
    setRemovedActivity(undefined)
    setAnnouncement(message)
  }

  const addActivity = (activity: Activity) => {
    onAdd(currentDayId, activity.id)
    announce(labels.today.addedAnnouncement(activity.title, currentDayIndex))
  }

  const removeActivity = (activity: Activity) => {
    setRemovedActivity({
      activity,
      dayId: currentDayId,
      dayIndex: currentDayIndex,
      isDone: day.completedActivityIds.includes(activity.id),
      variantId: day.selectedVariantIds[activity.id],
    })
    onRemove(currentDayId, activity.id)
    setAnnouncement(labels.today.removedAnnouncement(activity.title, currentDayIndex))
  }

  const undoRemove = () => {
    if (!removedActivity) return
    const { activity, dayId, dayIndex, isDone, variantId } = removedActivity
    onAdd(dayId, activity.id)
    if (variantId) onSelectVariant(dayId, activity.id, variantId)
    if (isDone) onToggleDone(dayId, activity.id)
    setRemovedActivity(undefined)
    setAnnouncement(labels.today.restoredAnnouncement(activity.title, dayIndex))
  }

  const selectVariant = (activity: Activity, variantId: string) => {
    onSelectVariant(currentDayId, activity.id, variantId)
    const variant = activity.variants?.find((candidate) => candidate.id === variantId)
    if (variant) announce(labels.today.variantAnnouncement(variant.title, activity.title))
  }

  return (
    <section className="today-view" aria-labelledby="today-heading">
      <header className="today-view__header">
        <h2 id="today-heading">{labels.today.heading}</h2>
        <DaySelector
          days={days}
          currentDayId={currentDayId}
          onSelectDay={(dayId, dayIndex) => {
            onSelectDay(dayId)
            setShowAllSuggestions(false)
            announce(labels.today.daySelectedAnnouncement(dayIndex))
          }}
        />
      </header>

      <section className="today-view__plan" aria-labelledby="today-plan-heading">
        <h3 id="today-plan-heading">{labels.today.dayPlan(currentDayIndex)}</h3>
        {plannedActivities.length ? (
          <>
            <h4>{labels.today.plannedHeading}</h4>
            <ul className="planned-activities">
              {plannedActivities.map((activity) => (
                <PlannedActivityRow
                  activity={activity}
                  day={day}
                  key={activity.id}
                  onToggleDone={(selectedActivity, isDone) => {
                    onToggleDone(currentDayId, selectedActivity.id)
                    announce(isDone
                      ? labels.today.pendingAnnouncement(selectedActivity.title)
                      : labels.today.doneAnnouncement(selectedActivity.title))
                  }}
                  onRemove={removeActivity}
                  onSelectVariant={selectVariant}
                  onOpen={setOpenActivity}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="today-view__empty">
            <h4>{labels.today.emptyHeading}</h4>
            <p>{labels.today.emptyText}</p>
            <button type="button" className="btn" onClick={onExplore}>
              {labels.today.explore}
            </button>
          </div>
        )}
      </section>

      <section className="today-view__suggestions" aria-labelledby="today-suggestions-heading">
        <h3 id="today-suggestions-heading">{labels.today.suggestionsHeading}</h3>
        {visibleSuggestions.length ? (
          <ul className="today-suggestions">
            {visibleSuggestions.map(({ activity, reasons }) => (
              <li className="today-suggestion" key={activity.id}>
                <ActivityCard
                  activity={activity}
                  currentDayIndex={currentDayIndex}
                  headingLevel="h4"
                  isAdded={addedActivityIds.has(activity.id)}
                  onAdd={() => addActivity(activity)}
                  onRemove={() => removeActivity(activity)}
                  onOpen={setOpenActivity}
                />
                <ul className="today-suggestion__reasons">
                  {reasons.map((reason) => (
                    <li key={reason}>{labels.suggestionReasons[reason]}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>{labels.today.noSuggestions}</p>
        )}

        {suggestions.length > VISIBLE_SUGGESTIONS && (
          <button
            type="button"
            className="btn ghost"
            aria-expanded={showAllSuggestions}
            onClick={() => {
              setShowAllSuggestions((current) => {
                announce(current
                  ? labels.today.suggestionsCollapsedAnnouncement
                  : labels.today.suggestionsExpandedAnnouncement)
                return !current
              })
            }}
          >
            {showAllSuggestions
              ? labels.today.showFewerSuggestions
              : labels.today.showMoreSuggestions}
          </button>
        )}
      </section>

      <div
        className={removedActivity ? 'today-status' : 'visually-hidden'}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span>{announcement}</span>
        {removedActivity && (
          <button type="button" className="btn ghost sm" onClick={undoRemove}>
            {labels.today.undoRemove}
          </button>
        )}
      </div>

      {openActivity && (
        <ActivityDetail
          activity={openActivity}
          currentDayIndex={currentDayIndex}
          isAdded={addedActivityIds.has(openActivity.id)}
          selectedVariantId={day.selectedVariantIds[openActivity.id]}
          onAdd={() => addActivity(openActivity)}
          onRemove={() => removeActivity(openActivity)}
          onSelectVariant={(_, variantId) => selectVariant(openActivity, variantId)}
          onClose={() => setOpenActivity(undefined)}
        />
      )}
    </section>
  )
}
