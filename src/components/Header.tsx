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

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === 'light') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
      </svg>
    )
  }
  if (mode === 'dark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.5 15.2A8 8 0 0 1 8.8 4.5 8 8 0 1 0 19.5 15.2Z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="1" />
      <path d="M8 21h8M12 17v4M12 4v13" />
    </svg>
  )
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
        <ThemeIcon mode={mode} />
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
        <g fill="none" stroke="currentColor" strokeWidth="1">
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
