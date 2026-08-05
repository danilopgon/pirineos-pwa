import { labels, trip } from '../data/trip'

interface Props {
  done: Record<string, boolean>
  online: boolean
}

export function Nav({ done, online }: Props) {
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
    <nav>
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
