import type { Stats as StatsData } from '../data/types'
import { md } from '../lib/content'
import { statCells } from '../lib/format'

export function StatsGrid({ stats }: { stats: StatsData }) {
  const cells = statCells(stats)
  if (!cells.length) return null

  return (
    <ul className="stats">
      {cells.map((cell, i) => (
        <li key={i}>
          {cell.label && <b>{cell.label}</b>}
          <span>{md(cell.value)}</span>
        </li>
      ))}
    </ul>
  )
}
