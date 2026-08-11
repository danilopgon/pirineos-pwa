import { labels } from '../data/trip'
import type { InfoBlock, InfoCard, InfoSection } from '../data/types'
import { md, placeGroups, pointsLabel, tripPlaces } from '../lib/content'
import {
  Btns,
  Bullets,
  DriveButton,
  ExternalLinks,
  Mini,
  Note,
  OfflineMapButton,
  Paragraphs,
  PlaceLink,
} from './Text'

export interface InstallState {
  canInstall: boolean
  installed: boolean
  install: () => void
}

export function InfoView({
  blocks,
  install,
}: {
  blocks: readonly InfoBlock[]
  install: InstallState
}) {
  return (
    <section className="info-view" aria-labelledby="info-heading">
      <header className="info-view__header">
        <h2 id="info-heading">{labels.info.heading}</h2>
        <p>{labels.info.intro}</p>
      </header>
      {blocks.map((block) => (
        <article className="block" key={block.id} aria-labelledby={`info-${block.id}`}>
          <h2 id={`info-${block.id}`}>{block.title}</h2>
          <Note text={block.intro} />
          {block.sections.map((section) => (
            <SectionBody key={section.id} section={section} install={install} />
          ))}
        </article>
      ))}
    </section>
  )
}

function SectionBody({ section, install }: { section: InfoSection; install: InstallState }) {
  const hasRow = Boolean(section.links?.length || section.places?.length || section.widget === 'puntos')

  return (
    <div className="info-section">
      {section.heading && <h3>{md(section.heading)}</h3>}
      <Paragraphs items={section.body} />
      <Bullets items={section.list} />
      {hasRow && (
        <Btns>
          <ExternalLinks links={section.links} />
          {section.places?.map((place) => (
            <DriveButton key={place.name} place={place} ghost small />
          ))}
          {section.places?.length ? <OfflineMapButton places={section.places} /> : null}
          {section.widget === 'puntos' && (
            <OfflineMapButton places={tripPlaces} label={pointsLabel} />
          )}
        </Btns>
      )}
      {section.widget === 'instalar' && <Install state={install} />}
      {section.cards?.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <Note text={section.note} />
    </div>
  )
}

function Install({ state }: { state: InstallState }) {
  if (state.canInstall) {
    return (
      <Btns>
        <button type="button" className="btn" onClick={state.install}>
          {labels.install.button}
        </button>
      </Btns>
    )
  }
  return <Note text={state.installed ? labels.install.done : labels.install.ios} />
}

/** Los grupos evitan una lista de botones sin contexto. */
function PlacesByGroup() {
  return (
    <>
      {placeGroups.map((group) => (
        <div className="place-group" key={group.key}>
          <h5>{group.heading}</h5>
          <Btns>
            {group.items.map(({ place, label }) => (
              <OfflineMapButton key={place.name} places={[place]} label={label} />
            ))}
          </Btns>
        </div>
      ))}
    </>
  )
}

function Card({ card }: { card: InfoCard }) {
  return (
    <div className="alt">
      <span className="pill">{card.label}</span>
      <h4>{card.title}</h4>
      <Mini items={card.mini ?? []} />
      <Paragraphs items={card.body} />
      {card.widget === 'puntos-uno-a-uno' && <PlacesByGroup />}
      {(card.place || card.links?.length) && (
        <Btns>
          {card.place && <PlaceLink place={card.place} />}
          <ExternalLinks links={card.links} small />
          {card.place && <OfflineMapButton places={[card.place]} />}
        </Btns>
      )}
      <Note text={card.note} />
    </div>
  )
}
