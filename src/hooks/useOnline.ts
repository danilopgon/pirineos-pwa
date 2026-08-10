import { useEffect, useState } from 'react'

/** Recurso pequeno y propio. El parametro suelto evita la cache del service
 *  worker, asi que la peticion sale de verdad a la red. */
const PROBE = './icon-192.png'
const TIMEOUT_MS = 3000
/** Dos intentos seguidos fallidos antes de dar por perdida la cobertura: una
 *  barra de EDGE falla a rachas y no queremos apagar la interfaz por un bache. */
const ATTEMPTS = 2

async function reachable(): Promise<boolean> {
  const abort = new AbortController()
  const timer = setTimeout(() => abort.abort(), TIMEOUT_MS)
  try {
    await fetch(`${PROBE}?ping=${Date.now()}`, {
      method: 'GET',
      cache: 'no-store',
      signal: abort.signal,
    })
    return true
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

/**
 * `navigator.onLine` miente en el sitio donde importa: en un valle con una
 * barra de EDGE devuelve `true` mientras las peticiones se quedan colgadas.
 * Es fiable en la otra direccion, asi que su `false` se cree a la primera y
 * su `true` se comprueba contra la red.
 *
 * Solo se comprueba al arrancar y al volver a primer plano. Nada de sondeo
 * periodico: el movil se vacia en cuatro horas con el GPS puesto. Y ningun
 * enlace se desactiva por esto, solo se degrada: si la deteccion se equivoca,
 * el coste es el aspecto, nunca un boton muerto que funcionaba.
 */
export function useOnline(): boolean {
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    let alive = true

    const check = async () => {
      if (!navigator.onLine) {
        if (alive) setOnline(false)
        return
      }
      for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
        const ok = await reachable()
        if (!alive) return
        if (ok) {
          setOnline(true)
          return
        }
      }
      if (alive) setOnline(false)
    }

    const up = () => {
      setOnline(true)
      void check()
    }
    const down = () => setOnline(false)
    const onVisible = () => {
      if (document.visibilityState === 'visible') void check()
    }

    void check()
    window.addEventListener('online', up)
    window.addEventListener('offline', down)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      alive = false
      window.removeEventListener('online', up)
      window.removeEventListener('offline', down)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return online
}
