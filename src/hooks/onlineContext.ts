import { createContext, useContext } from 'react'

/**
 * El estado de cobertura lo necesitan los botones, que estan cinco niveles
 * por debajo de donde se calcula. Pasarlo por props obligaria a que cada
 * componente intermedio lo reenviara sin usarlo.
 *
 * Por defecto `true`: sin proveedor, la guia se comporta como siempre.
 */
export const OnlineContext = createContext(true)

export const useIsOnline = (): boolean => useContext(OnlineContext)
