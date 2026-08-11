import { labels } from '../data/trip'

type View = 'today' | 'explore' | 'info'

interface Props {
  currentView: View
  online: boolean
  onChange: (view: View) => void
}

const destinations: readonly View[] = ['today', 'explore', 'info']

export function Nav({ currentView, online, onChange }: Props) {
  return (
    <nav className="bottom-nav" aria-label={labels.nav.label}>
      {!online && (
        <p className="offline-bar" role="status">
          <b>{labels.offline.title}</b>
          <span>{labels.offline.short}</span>
        </p>
      )}
      <ul className="bottom-nav__list">
        {destinations.map((destination) => (
          <li key={destination}>
            <button
              type="button"
              aria-current={currentView === destination ? 'page' : undefined}
              onClick={() => onChange(destination)}
            >
              {labels.nav.destinations[destination]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
