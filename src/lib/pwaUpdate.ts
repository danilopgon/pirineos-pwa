import { registerSW } from 'virtual:pwa-register'

const UPDATED_KEY = 'pirineos:actualizada:v1'
let registration: ServiceWorkerRegistration | undefined

registerSW({
  immediate: true,
  onRegisteredSW: (_url, currentRegistration) => {
    registration = currentRegistration
  },
  onNeedReload: () => {
    try {
      sessionStorage.setItem(UPDATED_KEY, '1')
    } catch {
      // La recarga sigue siendo segura porque el plan vive en localStorage.
    }
    window.location.reload()
  },
})

export function checkForPwaUpdate() {
  if (registration) {
    void registration.update()
    return
  }
  void navigator.serviceWorker?.getRegistration().then((currentRegistration) => {
    registration = currentRegistration
    return currentRegistration?.update()
  })
}

export function consumeUpdatedFlag(): boolean {
  try {
    const updated = sessionStorage.getItem(UPDATED_KEY) === '1'
    sessionStorage.removeItem(UPDATED_KEY)
    return updated
  } catch {
    return false
  }
}
