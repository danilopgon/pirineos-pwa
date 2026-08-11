import { labels } from '../data/trip'
import type { Activity, ActivityId } from '../data/types'
import { StatsGrid } from './Stats'

interface ActivityCardProps {
  activity: Activity
  currentDayIndex: number
  headingLevel?: 'h3' | 'h4'
  isAdded: boolean
  onAdd: (activityId: ActivityId) => void
  onRemove: (activityId: ActivityId) => void
  onOpen: (activity: Activity) => void
}

export function ActivityCard({
  activity,
  currentDayIndex,
  headingLevel = 'h3',
  isAdded,
  onAdd,
  onRemove,
  onOpen,
}: ActivityCardProps) {
  const titleId = `activity-${activity.id}-title`
  const Heading = headingLevel

  return (
    <article
      className="activity-card"
      data-category={activity.category}
      data-effort={activity.effort}
      data-added={isAdded || undefined}
      aria-labelledby={titleId}
    >
      <header className="activity-card__header">
        <Heading id={titleId}>{activity.title}</Heading>
        <p>
          <span>{labels.activity.area}</span> {activity.areaLabel}
        </p>
      </header>

      <dl className="activity-card__facts" aria-label={labels.catalogue.quickFacts}>
        <div>
          <dt>{labels.activity.category}</dt>
          <dd>{labels.activity.categories[activity.category]}</dd>
        </div>
        <div>
          <dt>{labels.activity.effort}</dt>
          <dd>{labels.activity.efforts[activity.effort]}</dd>
        </div>
        <div>
          <dt>{labels.activity.duration}</dt>
          <dd>{labels.activity.durations[activity.duration]}</dd>
        </div>
        <div>
          <dt>{labels.activity.combinabilityLabel}</dt>
          <dd>{labels.activity.combinability[activity.combinability]}</dd>
        </div>
      </dl>

      {activity.stats && <StatsGrid stats={activity.stats} />}

      {isAdded && (
        <p className="activity-card__added">{labels.catalogue.added(currentDayIndex)}</p>
      )}

      <div className="activity-card__actions btns">
        <button
          type="button"
          className="btn ghost"
          aria-label={labels.catalogue.openActivity(activity.title)}
          onClick={() => onOpen(activity)}
        >
          {labels.catalogue.details}
        </button>
        {isAdded ? (
          <button
            type="button"
            className="btn"
            aria-label={labels.catalogue.removeActivity(activity.title, currentDayIndex)}
            onClick={() => onRemove(activity.id)}
          >
            {labels.catalogue.remove}
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            aria-label={labels.catalogue.addActivity(activity.title, currentDayIndex)}
            onClick={() => onAdd(activity.id)}
          >
            {labels.catalogue.add(currentDayIndex)}
          </button>
        )}
      </div>
    </article>
  )
}
