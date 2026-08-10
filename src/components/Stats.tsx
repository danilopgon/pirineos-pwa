import { labels } from '../data/trip'
import type { Stats as StatsData } from '../data/types'
import { md } from '../lib/content'
import { statCells } from '../lib/format'

/**
 * Lista de definiciones: cada celda es etiqueta + dato, y eso es exactamente
 * lo que un lector de pantalla tiene que emparejar.
 */
export function StatsGrid({ stats }: { stats: StatsData }) {
  const cells = statCells(stats)
  if (!cells.length) return null

  return (
    <dl className="stats">
      {cells.map((cell, i) => (
        <div key={i}>
          <dt>{cell.label ?? labels.stats.other}</dt>
          <dd>{md(cell.value)}</dd>
        </div>
      ))}
    </dl>
  )
}
