import { useEffect, useId, useRef } from 'react'
import { labels } from '../data/trip'
import type { Activity, ActivityId, Link, Place } from '../data/types'
import { Profile } from './Profile'
import { StatsGrid } from './Stats'
import {
  Btns,
  Bullets,
  DriveButton,
  ExternalLinks,
  Note,
  OfflineMapButton,
  Paragraphs,
  PlaceLink,
  Steps,
} from './Text'

interface ActivityDetailProps {
  activity: Activity
  currentDayIndex: number
  isAdded: boolean
  selectedVariantId?: string
  onAdd: (activityId: ActivityId) => void
  onRemove: (activityId: ActivityId) => void
  onSelectVariant: (activityId: ActivityId, variantId: string) => void
  onClose: () => void
}

interface MapRowProps {
  places?: Place[]
  links?: Link[]
  driveFirst?: boolean
}

function MapRow({ places = [], links, driveFirst = false }: MapRowProps) {
  if (!places.length && !links?.length) return null
  const first = places[0]

  return (
    <Btns>
      {driveFirst && first && (
        <DriveButton place={first} label={labels.detail.driveHere} />
      )}
      {places
        .filter((place, index) => !(driveFirst && index === 0 && !place.googlePlaceId))
        .map((place) => <PlaceLink key={place.name} place={place} />)}
      <ExternalLinks links={links} small />
      {places.length > 0 && <OfflineMapButton places={places} />}
    </Btns>
  )
}

export function ActivityDetail({
  activity,
  currentDayIndex,
  isAdded,
  selectedVariantId,
  onAdd,
  onRemove,
  onSelectVariant,
  onClose,
}: ActivityDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const hasAccess = Boolean(activity.access?.length || activity.accessLinks?.length)
  const accessPlaces = hasAccess ? activity.places?.slice(0, 1) : []
  const routePlaces = hasAccess ? activity.places?.slice(1) : activity.places

  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null

    if (!dialog) return
    dialog.showModal()
    closeRef.current?.focus()

    return () => {
      if (dialog.open) dialog.close()
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="activity-detail"
      data-category={activity.category}
      data-effort={activity.effort}
      aria-labelledby={titleId}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <header className="activity-detail__header">
        <h2 id={titleId}>{activity.title}</h2>
        <button
          ref={closeRef}
          type="button"
          className="btn ghost"
          aria-label={labels.detail.closeActivity(activity.title)}
          onClick={onClose}
        >
          {labels.detail.back}
        </button>
      </header>

      <div className="activity-detail__scroll">
        <div className="activity-detail__intro">
          <p>
            <span>{labels.activity.area}</span> {activity.areaLabel}
          </p>
          {activity.lede && <p className="lede">{activity.lede}</p>}
          {activity.tags.length > 0 && (
            <ul className="tags">
              {activity.tags.map((tag) => <li className="tag" key={tag}>{tag}</li>)}
            </ul>
          )}
        </div>

        <dl className="activity-detail__facts">
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

        <div className="activity-detail__actions btns">
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
          {isAdded && <p role="status">{labels.catalogue.added(currentDayIndex)}</p>}
        </div>

        {activity.stats && (
          <section aria-labelledby={`${titleId}-stats`}>
            <h3 id={`${titleId}-stats`}>{labels.detail.stats}</h3>
            <StatsGrid stats={activity.stats} />
          </section>
        )}

        {activity.elevationProfile && (
          <section aria-labelledby={`${titleId}-profile`}>
            <h3 id={`${titleId}-profile`}>{labels.detail.profile}</h3>
            <Profile profile={activity.elevationProfile} />
          </section>
        )}

        {hasAccess && (
          <section>
            <h3>{activity.accessHeading ?? labels.detail.access}</h3>
            <Paragraphs items={activity.access} />
            <MapRow places={accessPlaces} links={activity.accessLinks} driveFirst />
            <Note text={activity.accessNote} />
          </section>
        )}

        {activity.route?.length ? (
          <section>
            <h3>{activity.routeHeading ?? labels.detail.route}</h3>
            <Steps items={activity.route} />
            <MapRow places={routePlaces} />
            <Note text={activity.routeNote} />
          </section>
        ) : routePlaces?.length ? (
          <section>
            <h3>{labels.detail.places}</h3>
            <MapRow places={routePlaces} />
          </section>
        ) : null}

        {activity.sections?.map((section, index) => (
          <section key={`${section.heading}-${index}`}>
            <h3>{section.heading}</h3>
            <Paragraphs items={section.body} />
            <Bullets items={section.list} />
            <MapRow places={section.places} links={section.links} />
            <Note text={section.note} />
          </section>
        ))}

        {activity.variants?.length ? (
          <section aria-labelledby={`${titleId}-variants`}>
            <h3 id={`${titleId}-variants`}>{labels.detail.variants}</h3>
            <div
              className="activity-detail__variants"
              role="group"
              aria-label={labels.detail.variantsFor(activity.title)}
            >
              {activity.variants.map((variant) => {
                const selected = selectedVariantId === variant.id
                return (
                  <article className="activity-variant" data-selected={selected || undefined} key={variant.id}>
                    {variant.label && <p>{variant.label}</p>}
                    <h4>{variant.title}</h4>
                    {variant.stats && <StatsGrid stats={variant.stats} />}
                    <Paragraphs items={variant.summary} />
                    {variant.route?.length ? <Steps items={variant.route} /> : null}
                    <MapRow places={variant.places} />
                    <Note text={variant.note} />
                    <button
                      type="button"
                      className="btn"
                      disabled={!isAdded}
                      aria-pressed={selected}
                      aria-label={!isAdded
                        ? labels.detail.addBeforeVariantNamed(activity.title)
                        : selected
                          ? labels.detail.chosenVariantNamed(variant.title)
                          : labels.detail.chooseVariantNamed(variant.title)}
                      onClick={() => onSelectVariant(activity.id, variant.id)}
                    >
                      {!isAdded
                        ? labels.detail.addBeforeVariant
                        : selected
                          ? labels.detail.chosenVariant
                          : labels.detail.chooseVariant}
                    </button>
                  </article>
                )
              })}
            </div>
          </section>
        ) : null}
      </div>
    </dialog>
  )
}
