import { useCallback, useEffect, useState } from 'react'

const KEY = 'pirineos:estado:v1'

export interface TripState {
  /** dia -> hecho */
  done: Record<string, boolean>
  /** dia -> alternativa elegida (indice), o null para el plan principal */
  choice: Record<string, number>
  /** Ultima seccion que se estuvo leyendo, para poder volver a ella. */
  last?: string
}

const empty: TripState = { done: {}, choice: {} }

interface Loaded {
  state: TripState
  /** `false` cuando el navegador no nos deja guardar: modo privado, cuota
   *  llena o JSON corrupto. Hay que decirlo, no tragarselo. */
  storageOk: boolean
}

function read(): Loaded {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { state: empty, storageOk: true }
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return { state: empty, storageOk: true }
    const { done, choice, last } = parsed as Partial<TripState>
    return {
      state: {
        done: typeof done === 'object' && done ? done : {},
        choice: typeof choice === 'object' && choice ? choice : {},
        last: typeof last === 'string' ? last : undefined,
      },
      storageOk: true,
    }
  } catch {
    return { state: empty, storageOk: false }
  }
}

/**
 * Dos personas y un solo movil: lo que se marca aqui tiene que seguir ahi
 * despues de cerrar la app.
 */
export function useTripState() {
  const [loaded] = useState(read)
  const [state, setState] = useState<TripState>(loaded.state)
  const [storageOk, setStorageOk] = useState(loaded.storageOk)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      setStorageOk(false)
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

  const clearChoice = useCallback((dayId: string) => {
    setState((prev) => {
      if (prev.choice[dayId] === undefined) return prev
      const choice = { ...prev.choice }
      delete choice[dayId]
      return { ...prev, choice }
    })
  }, [])

  const rememberSection = useCallback((id: string) => {
    setState((prev) => (prev.last === id ? prev : { ...prev, last: id }))
  }, [])

  return {
    state,
    storageOk,
    /** Donde se quedo la ultima sesion. Se congela al arrancar: en cuanto se
     *  scrollea, `state.last` pasa a ser el sitio actual y ya no sirve para
     *  ofrecer "volver a donde estabas". */
    initialLast: loaded.state.last,
    toggleDone,
    chooseAlternative,
    clearChoice,
    rememberSection,
  }
}
