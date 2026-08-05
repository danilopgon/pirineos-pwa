import { useCallback, useEffect, useState } from 'react'

const KEY = 'pirineos:estado:v1'

export interface TripState {
  /** dia -> hecho */
  done: Record<string, boolean>
  /** dia -> alternativa elegida (indice), o null para el plan principal */
  choice: Record<string, number>
}

const empty: TripState = { done: {}, choice: {} }

function read(): TripState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return empty
    const { done, choice } = parsed as Partial<TripState>
    return {
      done: typeof done === 'object' && done ? done : {},
      choice: typeof choice === 'object' && choice ? choice : {},
    }
  } catch {
    // Modo privado de Safari, cuota llena o JSON corrupto: se sigue sin estado.
    return empty
  }
}

/**
 * Dos personas y un solo movil: lo que se marca aqui tiene que seguir ahi
 * despues de cerrar la app.
 */
export function useTripState() {
  const [state, setState] = useState<TripState>(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* sin persistencia, pero la sesion sigue funcionando */
    }
  }, [state])

  const toggleDone = useCallback((dayId: string) => {
    setState((prev) => ({ ...prev, done: { ...prev.done, [dayId]: !prev.done[dayId] } }))
  }, [])

  const chooseAlternative = useCallback((dayId: string, index: number) => {
    setState((prev) => {
      const choice = { ...prev.choice }
      if (choice[dayId] === index) delete choice[dayId]
      else choice[dayId] = index
      return { ...prev, choice }
    })
  }, [])

  return { state, toggleDone, chooseAlternative }
}
