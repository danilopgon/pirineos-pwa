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
    <li className="planned-activity" data-done={isDone || undefined}>
      <div className="planned-activity__summary">
        <h3>{activity.title}</h3>
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
          className="btn ghost"
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

  const addActivity = (activity: Activity) => {
    onAdd(currentDayId, activity.id)
    setAnnouncement(labels.today.addedAnnouncement(activity.title, currentDayIndex))
  }

  const removeActivity = (activity: Activity) => {
    onRemove(currentDayId, activity.id)
    setAnnouncement(labels.today.removedAnnouncement(activity.title, currentDayIndex))
  }

  const selectVariant = (activity: Activity, variantId: string) => {
    onSelectVariant(currentDayId, activity.id, variantId)
    const variant = activity.variants?.find((candidate) => candidate.id === variantId)
    if (variant) setAnnouncement(labels.today.variantAnnouncement(variant.title, activity.title))
  }

  return (
    <section className="today-view" aria-labelledby="today-heading">
      <header className="today-view__header">
        <h2 id="today-heading">{labels.today.heading}</h2>
        <fieldset className="today-view__days">
          <legend>{labels.today.daySelector}</legend>
          <div className="chips">
            {days.map((tripDay) => (
              <button
                type="button"
                className="chip-pin"
                aria-pressed={tripDay.id === currentDayId}
                aria-label={labels.today.dayButton(tripDay.index)}
                key={tripDay.id}
                onClick={() => {
                  onSelectDay(tripDay.id)
                  setShowAllSuggestions(false)
                  setAnnouncement(labels.today.daySelectedAnnouncement(tripDay.index))
                }}
              >
                {tripDay.index}
              </button>
            ))}
          </div>
        </fieldset>
      </header>

      <section className="today-view__plan" aria-labelledby="today-plan-heading">
        <h2 id="today-plan-heading">{labels.today.dayPlan(currentDayIndex)}</h2>
        {plannedActivities.length ? (
          <>
            <h3>{labels.today.plannedHeading}</h3>
            <ul className="planned-activities">
              {plannedActivities.map((activity) => (
                <PlannedActivityRow
                  activity={activity}
                  day={day}
                  key={activity.id}
                  onToggleDone={(selectedActivity, isDone) => {
                    onToggleDone(currentDayId, selectedActivity.id)
                    setAnnouncement(isDone
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
            <h3>{labels.today.emptyHeading}</h3>
            <p>{labels.today.emptyText}</p>
            <button type="button" className="btn" onClick={onExplore}>
              {labels.today.explore}
            </button>
          </div>
        )}
      </section>

      <section className="today-view__suggestions" aria-labelledby="today-suggestions-heading">
        <h2 id="today-suggestions-heading">{labels.today.suggestionsHeading}</h2>
        {visibleSuggestions.length ? (
          <div className="today-suggestions">
            {visibleSuggestions.map(({ activity, reasons }) => (
              <div
                className="today-suggestion"
                aria-label={labels.today.suggestionFor(activity.title)}
                key={activity.id}
              >
                <ActivityCard
                  activity={activity}
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
              </div>
            ))}
          </div>
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
                setAnnouncement(current
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

      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {announcement}
      </p>

      {openActivity && (
        <ActivityDetail
          activity={openActivity}
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
