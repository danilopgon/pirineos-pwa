import { useMemo, useState } from 'react'
import { labels } from '../data/trip'
import type { Activity, ActivityCategory, ActivityId } from '../data/types'
import { ActivityCard } from './ActivityCard'
import { ActivityDetail } from './ActivityDetail'

const categoryFilters: readonly (ActivityCategory | 'all')[] = [
  'all',
  'montana',
  'paseo',
  'pueblos',
  'cultura',
  'agua',
  'relax',
]

interface ExploreViewProps {
  activities: readonly Activity[]
  addedActivityIds: readonly ActivityId[]
  selectedVariantIds?: Readonly<Record<ActivityId, string | undefined>>
  onAdd: (activityId: ActivityId) => void
  onRemove: (activityId: ActivityId) => void
  onSelectVariant: (activityId: ActivityId, variantId: string) => void
}

export function ExploreView({
  activities,
  addedActivityIds,
  selectedVariantIds = {},
  onAdd,
  onRemove,
  onSelectVariant,
}: ExploreViewProps) {
  const [category, setCategory] = useState<ActivityCategory | 'all'>('all')
  const [easyOnly, setEasyOnly] = useState(false)
  const [openActivity, setOpenActivity] = useState<Activity>()
  const added = useMemo(() => new Set(addedActivityIds), [addedActivityIds])
  const visibleActivities = activities.filter((activity) => {
    const matchesCategory = category === 'all' || activity.category === category
    const matchesEffort = !easyOnly || activity.effort === 'muy-bajo' || activity.effort === 'bajo'
    return matchesCategory && matchesEffort
  })
  const headingId = 'explore-heading'
  const filtersId = 'explore-filters-heading'

  return (
    <section className="explore-view" aria-labelledby={headingId}>
      <header className="explore-view__header">
        <h2 id={headingId}>{labels.catalogue.heading}</h2>
        <p>{labels.catalogue.intro}</p>
      </header>

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
        <button
          type="button"
          className="btn ghost explore-filters__easy"
          aria-pressed={easyOnly}
          onClick={() => setEasyOnly((current) => !current)}
        >
          {labels.catalogue.easyOnly}
        </button>
      </fieldset>

      <div className="activity-catalogue" aria-label={labels.catalogue.landmark}>
        {visibleActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isAdded={added.has(activity.id)}
            onAdd={onAdd}
            onRemove={onRemove}
            onOpen={setOpenActivity}
          />
        ))}
        {visibleActivities.length === 0 && <p>{labels.catalogue.noMatches}</p>}
      </div>

      {openActivity && (
        <ActivityDetail
          activity={openActivity}
          isAdded={added.has(openActivity.id)}
          selectedVariantId={selectedVariantIds[openActivity.id]}
          onAdd={onAdd}
          onRemove={onRemove}
          onSelectVariant={onSelectVariant}
          onClose={() => setOpenActivity(undefined)}
        />
      )}
    </section>
  )
}
