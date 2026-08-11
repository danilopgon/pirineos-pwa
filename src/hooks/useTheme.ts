import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'auto' | 'light' | 'dark'

const KEY = 'pirineos:tema:v1'
const MODES: readonly ThemeMode[] = ['auto', 'light', 'dark']
const LIGHT_THEME_COLOR = '#101d1a'
const DARK_THEME_COLOR = '#09100e'

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'auto' || value === 'light' || value === 'dark'
}

function storedMode(): ThemeMode {
  try {
    const value = localStorage.getItem(KEY)
    return isThemeMode(value) ? value : 'auto'
  } catch {
    return 'auto'
  }
}

function effectiveDark(mode: ThemeMode): boolean {
  return mode === 'dark'
    || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
}

function applyTheme(mode: ThemeMode) {
  if (mode === 'auto') document.documentElement.removeAttribute('data-theme')
  else document.documentElement.dataset.theme = mode

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (meta) meta.content = effectiveDark(mode) ? DARK_THEME_COLOR : LIGHT_THEME_COLOR
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(storedMode)

  useEffect(() => {
    applyTheme(mode)
    try {
      if (mode === 'auto') localStorage.removeItem(KEY)
      else localStorage.setItem(KEY, mode)
    } catch {
      // El tema sigue funcionando durante esta sesion.
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystem = () => {
      if (mode === 'auto') applyTheme(mode)
    }
    media.addEventListener('change', followSystem)
    return () => media.removeEventListener('change', followSystem)
  }, [mode])

  const cycleTheme = useCallback(() => {
    setMode((current) => MODES[(MODES.indexOf(current) + 1) % MODES.length] ?? 'auto')
  }, [])

  return { mode, cycleTheme }
}
