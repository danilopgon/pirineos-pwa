import { labels } from '../data/trip'
import type { Alternative, Day } from '../data/types'
import { miniItems } from '../lib/format'
import { Btns, Mini, Note, OfflineMapButton, Paragraphs, PlaceLink } from './Text'

interface Props {
  day: Day
  chosen?: number
  onChoose: (index: number) => void
  onClearChoice: () => void
}

export function Alternatives({ day, chosen, onChoose, onClearChoice }: Props) {
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
      {/* Salida explicita del estado elegido: volver a pulsar un boton que ya
          dice ELEGIDA no se lee como "deshacer". */}
      {chosen !== undefined && (
        <button type="button" className="undo" onClick={onClearChoice}>
          {labels.day.backToMainPlan}
        </button>
      )}
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
            <OfflineMapButton places={[alt.place]} />
          </Btns>
          <Note text={alt.place.note} />
        </>
      )}
      <button
        type="button"
        className="choose"
        aria-pressed={chosen}
        aria-label={`${chosen ? labels.day.chosen : labels.day.choose}: ${alt.title}`}
        onClick={onChoose}
      >
        <span className="box" aria-hidden="true">
          {chosen ? '✓' : ''}
        </span>
        {chosen ? labels.day.chosen : labels.day.choose}
      </button>
    </div>
  )
}
