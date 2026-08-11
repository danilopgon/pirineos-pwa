import { labels } from '../data/trip'
import type { TripDay, TripDayId } from '../data/types'

interface DaySelectorProps {
  days: readonly TripDay[]
  currentDayId: TripDayId
  onSelectDay: (dayId: TripDayId, day: number) => void
}

export function DaySelector({ days, currentDayId, onSelectDay }: DaySelectorProps) {
  return (
    <fieldset className="day-selector">
      <legend>{labels.today.daySelector}</legend>
      <div className="chips">
        {days.map((tripDay) => (
          <button
            type="button"
            className="chip-pin"
            aria-pressed={tripDay.id === currentDayId}
            aria-label={labels.today.dayButton(tripDay.index)}
            key={tripDay.id}
            onClick={() => onSelectDay(tripDay.id, tripDay.index)}
          >
            {tripDay.index}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
