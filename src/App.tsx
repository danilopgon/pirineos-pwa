import { useMemo } from 'react'
import { labels, trip } from './data/trip'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { DayCard } from './components/DayCard'
import { BlockCard } from './components/Blocks'
import { Summary } from './components/Summary'
import { Note, Paragraphs } from './components/Text'
import { OnlineContext } from './hooks/onlineContext'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useOnline } from './hooks/useOnline'
import { useSectionTracker } from './hooks/useSectionTracker'
import { useTripState } from './hooks/useTripState'

const CONTENT_ID = 'contenido'

/** Nombre legible de una seccion, para el chip de "volver a donde estabas". */
function sectionLabel(id: string): string | undefined {
  const day = trip.days.find((d) => d.id === id)
  if (day) return `D${day.index} ${day.short}`
  return trip.blocks.find((block) => block.id === id)?.short
}

export function App() {
  const {
    state,
    storageOk,
    initialLast,
    toggleDone,
    chooseAlternative,
    clearChoice,
    rememberSection,
  } = useTripState()
  const online = useOnline()
  const { canInstall, installed, install } = useInstallPrompt()

  useSectionTracker(rememberSection)

  /**
   * Se ofrece volver, no se salta solo: un salto automatico pelea con los
   * enlaces con ancla y se equivoca de sitio cuando cargan las fuentes.
   */
  const resume = useMemo(() => {
    if (!initialLast || initialLast === trip.days[0]?.id) return undefined
    const label = sectionLabel(initialLast)
    return label ? { id: initialLast, label: `${labels.nav.resume}: ${label}` } : undefined
  }, [initialLast])

  return (
    <OnlineContext.Provider value={online}>
      <a className="skip" href={`#${CONTENT_ID}`}>
        {labels.skipToContent}
      </a>
      <Header />
      <Nav
        done={state.done}
        online={online}
        resumeId={resume?.id}
        resumeLabel={resume?.label}
      />

      <main id={CONTENT_ID} tabIndex={-1}>
        {!storageOk && <Note text={labels.storage.unavailable} />}

        {trip.days.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            done={Boolean(state.done[day.id])}
            chosen={state.choice[day.id]}
            onToggleDone={() => toggleDone(day.id)}
            onChoose={(index) => chooseAlternative(day.id, index)}
            onClearChoice={() => clearChoice(day.id)}
          />
        ))}

        {trip.blocks.map((block) => (
          <BlockCard
            key={block.id}
            block={block}
            install={{ canInstall, installed, install: () => void install() }}
          />
        ))}

        <Summary done={state.done} />
      </main>

      <footer>
        <Paragraphs items={trip.footer} />
      </footer>
    </OnlineContext.Provider>
  )
}
