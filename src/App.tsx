import { trip } from './data/trip'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { DayCard } from './components/DayCard'
import { BlockCard } from './components/Blocks'
import { Paragraphs } from './components/Text'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import { useOnline } from './hooks/useOnline'
import { useTripState } from './hooks/useTripState'

export function App() {
  const { state, toggleDone, chooseAlternative } = useTripState()
  const online = useOnline()
  const { canInstall, installed, install } = useInstallPrompt()

  return (
    <>
      <Header />
      <Nav done={state.done} online={online} />

      <main>
        <section id={trip.alert.id}>
          <div className="alert">
            <h2>{trip.alert.title}</h2>
            <Paragraphs items={trip.alert.body} />
          </div>
        </section>

        {trip.days.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            done={Boolean(state.done[day.id])}
            chosen={state.choice[day.id]}
            onToggleDone={() => toggleDone(day.id)}
            onChoose={(index) => chooseAlternative(day.id, index)}
          />
        ))}

        {trip.blocks.map((block) => (
          <BlockCard
            key={block.id}
            block={block}
            install={{ canInstall, installed, install: () => void install() }}
          />
        ))}
      </main>

      <footer>
        <Paragraphs items={trip.footer} />
      </footer>
    </>
  )
}
