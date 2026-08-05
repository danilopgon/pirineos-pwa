# Pirineos sin bus

Guía de senderismo offline-first para cinco días con base en Benasque. Una sola
vista, navegación por anclas, sin backend y sin cuentas.

## Desarrollo

```sh
npm install
npm run dev      # servidor de desarrollo
npm run build    # tsc --noEmit + vite build → dist/
npm run preview  # sirve dist/ en local
```

El service worker solo se genera en `build`; para probar el modo avión hay que
usar `preview` (o el Nginx real), no `dev`.

## Cómo está montado

- **Vite + React + TypeScript.** En producción solo entran React y React-DOM: no
  hay router, ni framework de UI, ni utilidades de CSS.
- **`vite-plugin-pwa`** genera el manifest y el service worker con Workbox
  (`generateSW`, `registerType: 'autoUpdate'`). No hay service worker a mano.
- **Las tipografías van en el bundle** vía `@fontsource` (subconjunto latino, solo
  woff2 en la precarga). Desde el CDN de Google caerían a las del sistema en
  cuanto no hubiera cobertura.
- **CSS plano** en `src/styles.css`, con la paleta como variables.

## El contenido

Todo sale de `src/data/trip.ts`, tipado en `src/data/types.ts`. Los componentes
no llevan texto propio: hasta las etiquetas de interfaz salen del objeto
`labels` del mismo fichero.

Los párrafos admiten un marcado en línea mínimo — `**negrita**`, `*cursiva*` y
`` `código` `` — que resuelve `src/lib/markup.tsx`. No se interpreta HTML.

Se derivan de los datos, no se escriben a mano:

| Qué | Dónde |
| --- | --- |
| Enlaces de Google Maps (ruta y ficha del punto) | `src/lib/links.ts` |
| Deep link `om://` con todos los puntos del viaje | `src/lib/links.ts` |
| SVG de los perfiles de altitud y su leyenda | `src/lib/elevation.ts` |
| Distancias, desniveles, tiempos y minutos de coche | `src/lib/format.ts` |
| Chips de navegación y número de puntos | `src/components/Nav.tsx`, `src/lib/content.ts` |

Un día sin `elevationProfile` simplemente no pinta perfil; no se inventa una
curva. Un punto nuevo en `trip.ts` entra solo en el deep link, en la lista de
"punto por punto" y en el recuento que aparece en el texto.

## Estado que se guarda

En `localStorage`, bajo `pirineos:estado:v1`: qué días están hechos y qué
alternativa se ha elegido en cada uno. Son dos personas con un móvil, así que no
hay sincronización ni identidades.

## Despliegue en Nginx

Es un sitio estático: basta con volcar `dist/` en el root. Dos cuidados:

```nginx
location = /sw.js {
    add_header Cache-Control "no-cache";
}
location = /index.html {
    add_header Cache-Control "no-cache";
}
location /assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Los ficheros de `assets/` llevan hash en el nombre; `sw.js` e `index.html` no
pueden cachearse o la app se queda anclada a una versión vieja.

Tiene que servirse por **HTTPS** (o `localhost`): sin eso no hay service worker
ni instalación.

## Criterio de aceptación

Abrir la guía en el móvil con cobertura, instalarla, activar el modo avión y
reiniciarla: se ve entera, con sus tipografías, y el botón de Organic Maps sigue
abriendo la app con todos los puntos.
