import { useCallback, useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const standalone = (): boolean =>
  window.matchMedia('(display-mode: standalone)').matches ||
  // iOS marca las apps de pantalla de inicio aqui y no en display-mode.
  ('standalone' in navigator && navigator.standalone === true)

/**
 * En Android/Chrome se captura el evento y se ofrece un boton. En iOS el
 * evento no existe, asi que `canInstall` es false y toca contar el gesto
 * de "Anadir a pantalla de inicio".
 */
export function useInstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(standalone)

  useEffect(() => {
    const capture = (e: Event) => {
      e.preventDefault()
      setEvent(e as BeforeInstallPromptEvent)
    }
    const done = () => {
      setInstalled(true)
      setEvent(null)
    }
    window.addEventListener('beforeinstallprompt', capture)
    window.addEventListener('appinstalled', done)
    return () => {
      window.removeEventListener('beforeinstallprompt', capture)
      window.removeEventListener('appinstalled', done)
    }
  }, [])

  const install = useCallback(async () => {
    if (!event) return
    await event.prompt()
    await event.userChoice
    setEvent(null)
  }, [event])

  return { canInstall: event !== null, installed, install }
}
