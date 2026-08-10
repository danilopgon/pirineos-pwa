import { useEffect } from 'react'

/**
 * Apunta que seccion se esta leyendo. La guia mide diecinueve pantallas y la
 * PWA se muere con la bateria: sin esto, cada arranque en frio devuelve al
 * principio del documento.
 *
 * La franja de deteccion es la mitad superior de la pantalla, para que la
 * seccion que se registra sea la que se esta mirando y no la siguiente.
 */
export function useSectionTracker(onSection: (id: string) => void) {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main section[id]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible?.target.id) onSection(visible.target.id)
      },
      { rootMargin: '0px 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onSection])
}
