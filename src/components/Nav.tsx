import { useEffect, useRef } from 'react'
import { labels, trip } from '../data/trip'

interface Props {
  done: Record<string, boolean>
  online: boolean
}

/**
 * Publica el alto de la barra en `--nav-h`. El aviso de falta de conexion la
 * hace crecer, y sin esto los saltos por ancla dejan la cabecera del dia
 * escondida debajo.
 */
function useStickyHeight() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = ref.current
    if (!nav) return
    const sync = () => {
      document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`)
    }
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  return ref
}

export function Nav({ done, online }: Props) {
  const ref = useStickyHeight()

  const chips = [
    { id: trip.alert.id, label: trip.alert.short, done: false },
    ...trip.days.map((day) => ({
      id: day.id,
      label: `D${day.index} ${day.short}`,
      done: Boolean(done[day.id]),
    })),
    ...trip.blocks.map((block) => ({ id: block.id, label: block.short, done: false })),
  ]

  return (
    <nav ref={ref}>
      <div className="chips">
        {chips.map((chip) => (
          <a key={chip.id} href={`#${chip.id}`} data-done={chip.done}>
            {chip.label}
          </a>
        ))}
      </div>
      {!online && (
        <p className="offline-bar" role="status">
          <b>{labels.offline.title}</b>
          <span>{labels.offline.text}</span>
        </p>
      )}
    </nav>
  )
}
