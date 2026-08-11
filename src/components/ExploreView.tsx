import { useMemo, useState } from 'react'
import { labels } from '../data/trip'
import type {
  Activity,
  ActivityCategory,
  ActivityId,
  TripDay,
  TripDayId,
} from '../data/types'
import { ActivityCard } from './ActivityCard'
import { ActivityDetail } from './ActivityDetail'
import { DaySelector } from './DaySelector'

const categoryFilters: readonly (ActivityCategory | 'all')[] = [
  'all',
  'montana',
  'cultura',
  'paseo',
  'pueblos',
  'agua',
  'relax',
]

interface ExploreViewProps {
  activities: readonly Activity[]
  days: readonly TripDay[]
  currentDayId: TripDayId
  addedActivityIds: readonly ActivityId[]
  selectedVariantIds?: Readonly<Record<ActivityId, string | undefined>>
  onSelectDay: (dayId: TripDayId) => void
  onAdd: (activityId: ActivityId) => void
  onRemove: (activityId: ActivityId) => void
  onSelectVariant: (activityId: ActivityId, variantId: string) => void
}

export function ExploreView({
  activities,
  days,
  currentDayId,
  addedActivityIds,
  selectedVariantIds = {},
  onSelectDay,
  onAdd,
  onRemove,
  onSelectVariant,
}: ExploreViewProps) {
  const [category, setCategory] = useState<ActivityCategory | 'all'>('all')
  const [easyOnly, setEasyOnly] = useState(false)
  const [openActivity, setOpenActivity] = useState<Activity>()
  const [announcement, setAnnouncement] = useState('')
  const currentDay = days.find((day) => day.id === currentDayId) ?? days[0]
  const currentDayIndex = currentDay?.index ?? 1
  const added = useMemo(() => new Set(addedActivityIds), [addedActivityIds])
  const visibleActivities = activities.filter((activity) => {
    const matchesCategory = category === 'all' || activity.category === category
    const matchesEffort = !easyOnly || activity.effort === 'muy-bajo' || activity.effort === 'bajo'
    return matchesCategory && matchesEffort
  })
  const headingId = 'explore-heading'
  const filtersId = 'explore-filters-heading'
  const catalogueId = 'activity-catalogue-heading'

  const addActivity = (activityId: ActivityId) => {
    onAdd(activityId)
    const activity = activities.find((candidate) => candidate.id === activityId)
    if (activity) {
      setAnnouncement(labels.today.addedAnnouncement(activity.title, currentDayIndex))
    }
  }

  const removeActivity = (activityId: ActivityId) => {
    onRemove(activityId)
    const activity = activities.find((candidate) => candidate.id === activityId)
    if (activity) {
      setAnnouncement(labels.today.removedAnnouncement(activity.title, currentDayIndex))
    }
  }

  return (
    <section className="explore-view" aria-labelledby={headingId}>
      <h2 className="visually-hidden" id={headingId}>{labels.catalogue.heading}</h2>
      <div className="explore-view__day">
        <p>{labels.catalogue.currentDay(currentDayIndex)}</p>
        <DaySelector
          days={days}
          currentDayId={currentDayId}
          onSelectDay={(dayId, dayIndex) => {
            onSelectDay(dayId)
            setAnnouncement(labels.today.daySelectedAnnouncement(dayIndex))
          }}
        />
      </div>

      <fieldset className="explore-filters" aria-labelledby={filtersId}>
        <legend id={filtersId}>{labels.catalogue.filtersHeading}</legend>
        <div className="explore-filters__categories">
          {categoryFilters.map((filter) => (
            <button
              type="button"
              className="btn ghost"
              aria-pressed={category === filter}
              key={filter}
              onClick={() => setCategory(filter)}
            >
              {labels.catalogue.filters[filter]}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        className="btn ghost explore-filters__easy"
        aria-pressed={easyOnly}
        onClick={() => setEasyOnly((current) => !current)}
      >
        {labels.catalogue.easyOnly}
      </button>

      <section aria-labelledby={catalogueId}>
        <h3 className="visually-hidden" id={catalogueId}>{labels.catalogue.landmark}</h3>
        <ul className="activity-catalogue">
          {visibleActivities.map((activity) => (
            <li key={activity.id}>
              <ActivityCard
                activity={activity}
                currentDayIndex={currentDayIndex}
                isAdded={added.has(activity.id)}
                onAdd={addActivity}
                onRemove={removeActivity}
                onOpen={setOpenActivity}
              />
            </li>
          ))}
          {visibleActivities.length === 0 && <li><p>{labels.catalogue.noMatches}</p></li>}
        </ul>
      </section>

      <p className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>

      {openActivity && (
        <ActivityDetail
          activity={openActivity}
          currentDayIndex={currentDayIndex}
          isAdded={added.has(openActivity.id)}
          selectedVariantId={selectedVariantIds[openActivity.id]}
          onAdd={addActivity}
          onRemove={removeActivity}
          onSelectVariant={onSelectVariant}
          onClose={() => setOpenActivity(undefined)}
        />
      )}
    </section>
  )
}
