import { useState } from 'react'
import { labels, trip } from './data/trip'
import { ExploreView } from './components/ExploreView'
import { Header } from './components/Header'
import { InfoView } from './components/Blocks'
import { Nav } from './components/Nav'
import { TodayView } from './components/TodayView'
import { Note, Paragraphs } from './components/Text'
import { OnlineContext } from './hooks/onlineContext'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useOnline } from './hooks/useOnline'
import { useTripState } from './hooks/useTripState'

type View = 'today' | 'explore' | 'info'

const CONTENT_ID = 'contenido'

export function App() {
  const [view, setView] = useState<View>('today')
  const {
    state,
    storageOk,
    selectCurrentDay,
    addActivity,
    removeActivity,
    toggleActivityDone,
    selectActivityVariant,
  } = useTripState()
  const online = useOnline()
  const { canInstall, installed, install } = useInstallPrompt()
  const currentDay = state.days[state.currentDayId]

  return (
    <OnlineContext.Provider value={online}>
      <a className="skip" href={`#${CONTENT_ID}`}>
        {labels.skipToContent}
      </a>
      <Header />

      <main id={CONTENT_ID} tabIndex={-1}>
        {!storageOk && <Note text={labels.storage.unavailable} />}

        {view === 'today' ? (
          <TodayView
            activities={trip.activities}
            days={trip.days}
            state={state}
            onSelectDay={selectCurrentDay}
            onAdd={addActivity}
            onRemove={removeActivity}
            onToggleDone={toggleActivityDone}
            onSelectVariant={selectActivityVariant}
            onExplore={() => setView('explore')}
          />
        ) : view === 'explore' ? (
          <ExploreView
            activities={trip.activities}
            addedActivityIds={currentDay.activityIds}
            selectedVariantIds={currentDay.selectedVariantIds}
            onAdd={(activityId) => addActivity(state.currentDayId, activityId)}
            onRemove={(activityId) => removeActivity(state.currentDayId, activityId)}
            onSelectVariant={(activityId, variantId) => (
              selectActivityVariant(state.currentDayId, activityId, variantId)
            )}
          />
        ) : (
          <InfoView
            blocks={trip.infoBlocks}
            install={{ canInstall, installed, install: () => void install() }}
          />
        )}
      </main>

      <footer>
        <Paragraphs items={trip.footer} />
      </footer>

      <Nav currentView={view} online={online} onChange={setView} />
    </OnlineContext.Provider>
  )
}
