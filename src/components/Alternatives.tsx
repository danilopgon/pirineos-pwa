import { labels } from '../data/trip'
import type { Alternative, Day } from '../data/types'
import { miniItems } from '../lib/format'
import { Btns, Mini, Note, Paragraphs, PlaceLink } from './Text'

interface Props {
  day: Day
  chosen?: number
  onChoose: (index: number) => void
}

export function Alternatives({ day, chosen, onChoose }: Props) {
  if (!day.alternatives.length) return null

  return (
    <details>
      <summary>{day.altSummary ?? labels.day.altSummary}</summary>
      {day.alternatives.map((alt, i) => (
        <AltCard
          key={alt.title}
          alt={alt}
          chosen={chosen === i}
          onChoose={() => onChoose(i)}
        />
      ))}
    </details>
  )
}

function AltCard({
  alt,
  chosen,
  onChoose,
}: {
  alt: Alternative
  chosen: boolean
  onChoose: () => void
}) {
  return (
    <div className="alt" data-kind={alt.kind} data-chosen={chosen}>
      <span className="pill">{alt.label ?? labels.altKind[alt.kind]}</span>
      <h4>{alt.title}</h4>
      <Mini items={miniItems(alt.stats)} />
      <Paragraphs items={alt.body} />
      <Note text={alt.note} />
      {alt.place && (
        <>
          <Btns>
            <PlaceLink place={alt.place} />
          </Btns>
          <Note text={alt.place.note} />
        </>
      )}
      <button type="button" className="choose" aria-pressed={chosen} onClick={onChoose}>
        <span className="box" aria-hidden="true">
          {chosen ? '✓' : ''}
        </span>
        {chosen ? labels.day.chosen : labels.day.choose}
      </button>
    </div>
  )
}
