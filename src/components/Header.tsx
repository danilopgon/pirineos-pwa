import { labels, trip } from '../data/trip'
import type { ThemeMode } from '../hooks/useTheme'

/** Curvas de nivel de la cabecera. Decoracion, no dato. */
const CONTOURS = [
  'M-10 150 C 60 120, 110 165, 180 130 S 300 100, 410 138',
  'M-10 130 C 60 98, 115 145, 185 108 S 300 78, 410 118',
  'M-10 110 C 65 76, 120 124, 190 86 S 300 56, 410 98',
  'M-10 90 C 70 54, 125 102, 195 64 S 300 34, 410 78',
  'M-10 70 C 75 32, 130 80, 200 42 S 300 12, 410 58',
  'M-10 50 C 80 10, 135 58, 205 20 S 300 -8, 410 38',
]

interface HeaderProps {
  title?: string
  themeMode: ThemeMode
  themeAnnouncement: string
  onCycleTheme: () => void
}

function ThemeControl({
  mode,
  announcement,
  onCycle,
}: {
  mode: ThemeMode
  announcement: string
  onCycle: () => void
}) {
  const next = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto'
  return (
    <>
      <button
        type="button"
        className="btn ghost theme-toggle"
        aria-label={labels.theme.controlName(labels.theme.modes[mode], labels.theme.modes[next])}
        onClick={onCycle}
      >
        {labels.theme.modes[mode]}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">{announcement}</span>
    </>
  )
}

export function Header({ title, themeMode, themeAnnouncement, onCycleTheme }: HeaderProps) {
  const themeControl = (
    <ThemeControl mode={themeMode} announcement={themeAnnouncement} onCycle={onCycleTheme} />
  )
  if (title) {
    return (
      <header className="top top--compact">
        <div className="top-in top-in--row">
          <h1>{title}</h1>
          {themeControl}
        </div>
      </header>
    )
  }

  return (
    <header className="top">
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="#6fc3ce" strokeWidth="1">
          {CONTOURS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </svg>
      <div className="top-in top-in--home">
        <div>
          <span className="eyebrow">{trip.eyebrow}</span>
          <h1>
            {trip.title}
            <em>{trip.titleAccent}</em>
          </h1>
          <p>{trip.intro}</p>
        </div>
        {themeControl}
      </div>
    </header>
  )
}
