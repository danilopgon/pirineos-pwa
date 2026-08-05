import { labels } from '../data/trip'
import type { Day } from '../data/types'
import { Alternatives } from './Alternatives'
import { Profile } from './Profile'
import { StatsGrid } from './Stats'
import {
  Btns,
  Bullets,
  DriveButton,
  ExternalLinks,
  Note,
  Paragraphs,
  PlaceButton,
  Steps,
} from './Text'

interface Props {
  day: Day
  done: boolean
  chosen?: number
  onToggleDone: () => void
  onChoose: (index: number) => void
}

export function DayCard({ day, done, chosen, onToggleDone, onChoose }: Props) {
  const [main, ...rest] = day.places
  const chosenAlt = chosen === undefined ? undefined : day.alternatives[chosen]

  return (
    <section id={day.id}>
      <article className="day" data-accent={day.accent} data-done={done}>
        <div className="day-h">
          <span className="eyebrow">
            {labels.day.dayPrefix} {day.index} · {day.area}
          </span>
          <h2>{day.title}</h2>
          <p className="lede">{day.lede}</p>
          <div className="tags">
            {day.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
            <span className="tag plain">{labels.difficulty[day.difficulty]}</span>
          </div>
          <button type="button" className="done" aria-pressed={done} onClick={onToggleDone}>
            <span className="box" aria-hidden="true">
              {done ? '✓' : ''}
            </span>
            {done ? labels.day.done : labels.day.markDone}
          </button>
          {chosenAlt && (
            <p className="chosen-note">
              {labels.day.chosenPrefix} <b>{chosenAlt.title}</b>
            </p>
          )}
        </div>

        <StatsGrid stats={day.stats} />
        <Profile profile={day.elevationProfile} />

        <div className="body">
          <h3>{day.accessHeading ?? labels.day.access}</h3>
          <Paragraphs items={day.access} />
          {(main || day.accessLinks?.length) && (
            <Btns>
              {main && <DriveButton place={main} label={labels.day.driveHere} />}
              {main?.googlePlaceId && <PlaceButton place={main} />}
              <ExternalLinks links={day.accessLinks} />
            </Btns>
          )}
          <Note text={day.accessNote} />

          <h3>{day.routeHeading ?? labels.day.route}</h3>
          <Steps items={day.route} />
          {rest.length > 0 && (
            <Btns>
              {rest.map((place) => (
                <PlaceButton key={place.name} place={place} />
              ))}
            </Btns>
          )}
          <Note text={day.routeNote} />

          {day.sections?.map((section) => (
            <div key={section.heading}>
              <h3>{section.heading}</h3>
              <Paragraphs items={section.body} />
              <Bullets items={section.list} />
              {section.places?.length ? (
                <Btns>
                  {section.places.map((place) => (
                    <DriveButton key={place.name} place={place} ghost small />
                  ))}
                </Btns>
              ) : null}
              <Note text={section.note} />
            </div>
          ))}

          <Alternatives day={day} chosen={chosen} onChoose={onChoose} />
        </div>
      </article>
    </section>
  )
}
