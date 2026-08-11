import { useEffect, useState } from 'react'
import { labels, trip } from './data/trip'
import { ExploreView } from './components/ExploreView'
import { Header } from './components/Header'
import { InfoView } from './components/Blocks'
import { Nav } from './components/Nav'
import { TodayView } from './components/TodayView'
import { Note } from './components/Text'
import { OnlineContext } from './hooks/onlineContext'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useOnline } from './hooks/useOnline'
import { useTheme, type ThemeMode } from './hooks/useTheme'
import { useTripState } from './hooks/useTripState'
import { checkForPwaUpdate, consumeUpdatedFlag } from './lib/pwaUpdate'

type View = 'today' | 'explore' | 'info'

const CONTENT_ID = 'contenido'
const VIEW_KEY = 'pirineos:vista:v1'

function savedView(): View {
  try {
    const value = sessionStorage.getItem(VIEW_KEY)
    return value === 'explore' || value === 'info' ? value : 'today'
  } catch {
    return 'today'
  }
}

function nextTheme(mode: ThemeMode): ThemeMode {
  return mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto'
}

export function App() {
  const [updated] = useState(consumeUpdatedFlag)
  const [showUpdateNotice, setShowUpdateNotice] = useState(updated)
  const [view, setView] = useState<View>(() => updated ? savedView() : 'today')
  const [themeAnnouncement, setThemeAnnouncement] = useState('')
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
  const { mode: themeMode, cycleTheme } = useTheme()
  const { canInstall, installed, install } = useInstallPrompt()
  const currentDay = state.days[state.currentDayId]

  useEffect(() => {
    if (!showUpdateNotice) return
    const timer = window.setTimeout(() => setShowUpdateNotice(false), 6000)
    return () => window.clearTimeout(timer)
  }, [showUpdateNotice])

  useEffect(() => {
    try {
      sessionStorage.setItem(VIEW_KEY, view)
    } catch {
      // La vista vuelve a Hoy si sessionStorage no esta disponible.
    }
  }, [view])

  useEffect(() => {
    if (!online) return
    checkForPwaUpdate()
    const checkWhenVisible = () => {
      if (document.visibilityState === 'visible') checkForPwaUpdate()
    }
    document.addEventListener('visibilitychange', checkWhenVisible)
    return () => document.removeEventListener('visibilitychange', checkWhenVisible)
  }, [online])

  const changeTheme = () => {
    const selected = nextTheme(themeMode)
    cycleTheme()
    setThemeAnnouncement(labels.theme.changed(labels.theme.modes[selected]))
  }

  return (
    <OnlineContext.Provider value={online}>
      <a className="skip" href={`#${CONTENT_ID}`}>
        {labels.skipToContent}
      </a>
      <Header
        title={view === 'today' ? undefined : labels.nav.destinations[view]}
        themeMode={themeMode}
        themeAnnouncement={themeAnnouncement}
        onCycleTheme={changeTheme}
      />

      <main id={CONTENT_ID} tabIndex={-1}>
        {showUpdateNotice && <p className="update-notice" role="status">{labels.update.applied}</p>}
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
            days={trip.days}
            currentDayId={state.currentDayId}
            addedActivityIds={currentDay.activityIds}
            selectedVariantIds={currentDay.selectedVariantIds}
            onSelectDay={selectCurrentDay}
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

      <Nav currentView={view} online={online} onChange={setView} />
    </OnlineContext.Provider>
  )
}
