import { useEffect, useRef } from 'react'
import { labels, trip } from '../data/trip'

interface Props {
  done: Record<string, boolean>
  online: boolean
  /** Seccion donde se quedo la sesion anterior, si no es la primera. */
  resumeId?: string
  resumeLabel?: string
}

/** Bloque al que apunta el chip fijo: es el que hay que tener a mano. */
const PINNED_ID = 'offline'

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

export function Nav({ done, online, resumeId, resumeLabel }: Props) {
  const ref = useStickyHeight()
  const pinned = trip.blocks.find((block) => block.id === PINNED_ID)

  const chips = [
    ...trip.days.map((day) => ({
      id: day.id,
      label: `D${day.index} ${day.short}`,
      done: Boolean(done[day.id]),
    })),
    ...trip.blocks
      .filter((block) => block.id !== pinned?.id)
      .map((block) => ({ id: block.id, label: block.short, done: false })),
  ]

  return (
    <nav ref={ref} aria-label={labels.nav.label}>
      {/* Los chips fijos van fuera del scroller: dentro se iban de pantalla
          justo cuando hacian falta. */}
      <div className="chips-wrap">
        {resumeId && (
          <a className="chip-pin" data-role="resume" href={`#${resumeId}`}>
            {resumeLabel ?? labels.nav.resume}
          </a>
        )}
        <div className="chips">
          {chips.map((chip) => (
            <a key={chip.id} href={`#${chip.id}`} data-done={chip.done}>
              {chip.label}
            </a>
          ))}
        </div>
        {pinned && (
          <a className="chip-pin" href={`#${pinned.id}`}>
            {pinned.short}
          </a>
        )}
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
