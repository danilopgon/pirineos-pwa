import { labels, trip } from '../data/trip'

/**
 * Cierre del documento. La guia recogia cinco marcas de "hecho" y no las
 * usaba para nada: se terminaba en un descargo sobre los perfiles de altitud.
 */
export function Summary({ done }: { done: Record<string, boolean> }) {
  const total = trip.days.length
  const count = trip.days.filter((day) => done[day.id]).length
  const complete = count === total

  return (
    <section id="resumen">
      <div className="summary" data-complete={complete}>
        <span className="count">
          {count}/{total}
        </span>
        <h2>{labels.summary.heading}</h2>
        <p>
          {complete
            ? labels.summary.complete
            : count === 0
              ? labels.summary.none
              : labels.summary.progress}
        </p>
        <div className="track" aria-hidden="true">
          {trip.days.map((day) => (
            <i key={day.id} data-done={Boolean(done[day.id])} />
          ))}
        </div>
      </div>
    </section>
  )
}
