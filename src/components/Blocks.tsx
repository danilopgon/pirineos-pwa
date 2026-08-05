import { labels } from '../data/trip'
import type { Block, BlockSection, InfoCard } from '../data/types'
import { md, pointsLabel, pointsUrl, tripPlaces } from '../lib/content'
import { organicMapsUrl } from '../lib/links'
import {
  Btns,
  Bullets,
  DriveButton,
  ExternalLinks,
  LinkButton,
  Mini,
  Note,
  Paragraphs,
  PlaceButton,
} from './Text'

export interface InstallState {
  canInstall: boolean
  installed: boolean
  install: () => void
}

export function BlockCard({ block, install }: { block: Block; install: InstallState }) {
  return (
    <section id={block.id}>
      <div className="block">
        <h2>{block.title}</h2>
        <Note text={block.intro} />
        {block.sections.map((section, i) => (
          <SectionBody key={section.heading ?? i} section={section} install={install} />
        ))}
      </div>
    </section>
  )
}

function SectionBody({ section, install }: { section: BlockSection; install: InstallState }) {
  const hasRow = Boolean(section.links?.length || section.places?.length || section.widget === 'puntos')

  return (
    <>
      {section.heading && <h3>{md(section.heading)}</h3>}
      <Paragraphs items={section.body} />
      <Bullets items={section.list} />
      {hasRow && (
        <Btns>
          <ExternalLinks links={section.links} />
          {section.places?.map((place) => (
            <DriveButton key={place.name} place={place} ghost small />
          ))}
          {section.widget === 'puntos' && (
            <LinkButton label={pointsLabel} href={pointsUrl} ghost />
          )}
        </Btns>
      )}
      {section.widget === 'instalar' && <Install state={install} />}
      {section.cards?.map((card) => (
        <Card key={card.title} card={card} />
      ))}
      <Note text={section.note} />
    </>
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

function Card({ card }: { card: InfoCard }) {
  return (
    <div className="alt" data-kind={card.kind}>
      <span className="pill">{card.label}</span>
      <h4>{card.title}</h4>
      <Mini items={card.mini ?? []} />
      <Paragraphs items={card.body} />
      {card.widget === 'puntos-uno-a-uno' && (
        <Btns>
          {tripPlaces.map((place) => (
            <LinkButton
              key={place.name}
              label={place.name}
              href={organicMapsUrl([place])}
              ghost
              small
            />
          ))}
        </Btns>
      )}
      {(card.place || card.links?.length) && (
        <Btns>
          {card.place &&
            (card.place.googlePlaceId ? (
              <PlaceButton place={card.place} />
            ) : (
              <DriveButton place={card.place} ghost small />
            ))}
          <ExternalLinks links={card.links} small />
        </Btns>
      )}
      <Note text={card.note} />
    </div>
  )
}
