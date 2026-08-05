import type { ReactNode } from 'react'

const TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g

/**
 * Marcado en linea minimo para los textos de trip.ts: `**negrita**`,
 * `*cursiva*` y `` `codigo` ``. No interpreta HTML ni enlaces.
 */
export function inline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let last = 0
  let key = 0

  for (const match of text.matchAll(TOKEN)) {
    const at = match.index
    if (at > last) nodes.push(text.slice(last, at))
    const [, strong, em, code] = match
    if (strong !== undefined) nodes.push(<strong key={key++}>{strong}</strong>)
    else if (em !== undefined) nodes.push(<em key={key++}>{em}</em>)
    else nodes.push(<code key={key++}>{code}</code>)
    last = at + match[0].length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

/** Sustituye el token `{n}` de las plantillas de trip.ts. */
export function fill(text: string, n: number): string {
  return text.replace('{n}', String(n))
}
