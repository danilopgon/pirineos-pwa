import { trip } from './trip'
import type { Activity, ActivitySection, Place } from './types'

const sources = {
  tresBarrancos: 'https://visor.montanasegura.com/ruta/ficha/37',
  circular1: 'https://turismoribagorza.org/ruta/ruta-circular-1-benasque-cerler-anciles/',
  circular2: 'https://turismoribagorza.org/ruta/ruta-circular-2-selva-de-conques/',
  circular3: 'https://turismoribagorza.org/ruta/ruta-circular-3-embalse-de-linsoles/',
  pr32: 'https://turismoribagorza.org/ruta/pr-hu-32-benasque-eriste/',
  gorgas: 'https://www.benasque.com/es/todo-valle-de-benasque/ruta-gorgas-alba',
} as const

function googleMapsPin(place: Place): string {
  const params = new URLSearchParams({ api: '1', query: `${place.lat},${place.lng}` })
  return `https://www.google.com/maps/search/?${params}`
}

function organicMapsPin(place: Place): string {
  return `om://map?v=1&ll=${place.lat},${place.lng}&n=${encodeURIComponent(place.name)}`
}

function startSection(
  place: Place,
  body: string,
  source?: string,
  sourceLabel = 'Ficha oficial / track',
): ActivitySection {
  return {
    heading: 'Inicio de ruta',
    body: [body],
    links: [
      { label: 'Inicio en Google Maps', href: googleMapsPin(place) },
      { label: 'Inicio en Organic Maps', href: organicMapsPin(place), needsSignal: false, ghost: true },
      ...(source ? [{ label: sourceLabel, href: source, ghost: true }] : []),
    ],
  }
}

function updateActivity(id: string, patch: Partial<Activity>): void {
  const activity = trip.activities.find((candidate) => candidate.id === id)
  if (!activity) throw new Error(`No se encuentra la actividad ${id}`)
  Object.assign(activity, patch)
}

function addActivity(activity: Activity): void {
  if (trip.activities.some((candidate) => candidate.id === activity.id)) return
  const before = trip.activities.findIndex((candidate) => candidate.id === 'benasque-eriste')
  if (before === -1) trip.activities.push(activity)
  else trip.activities.splice(before, 0, activity)
}

const escuelaMontana: Place = {
  name: 'Escuela de Montaña de Benasque',
  lat: 42.6027778,
  lng: 0.5171111,
}

const plazaMayor: Place = {
  name: 'Plaza Mayor · acceso al puente del Ésera',
  lat: 42.60431,
  lng: 0.52186,
}

// Punto de Eriste que ya usaba la guía. La ficha oficial sitúa el arranque en
// el puente sobre el Ésera, en la cola del embalse, a pocos metros del núcleo.
const eristeStart: Place = {
  name: 'Eriste · acceso al puente sobre el Ésera',
  lat: 42.5871815,
  lng: 0.4897126,
}

const hotelAneto: Place = {
  name: 'SOMMOS Hotel Aneto · referencia de salida',
  lat: 42.602878,
  lng: 0.521928,
}

const hotelTurpi: Place = {
  name: 'Hotel Turpi',
  lat: 42.667685,
  lng: 0.582452,
}

addActivity({
  id: 'tres-barrancos',
  title: 'Ruta de los Tres Barrancos',
  short: 'Tres Barrancos',
  area: 'benasque',
  areaLabel: 'Benasque',
  category: 'paseo',
  effort: 'bajo',
  duration: 'corta',
  combinability: 'facil',
  tags: ['Circular', 'Sale de Benasque', 'Cruces de barranco'],
  stats: {
    distanceKm: 4.3,
    ascentM: 320,
    hours: '1 h 50',
    extra: [{ label: 'Recorrido', value: 'Circular' }],
  },
  lede: 'Un circular corto que gana altura sobre Benasque sin convertirse en una jornada de montaña: bosque, tres barrancos y vistas abiertas hacia Cerler y el valle.',
  route: [
    'Salir de Benasque hacia el camino que gana altura por el sector de la **Escuela de Montaña** y Puyegarbe.',
    'Pasar por la **Fuen de Esquirisueles** y cruzar sucesivamente los barrancos d’els Molineses, Sobarriba y Tuca d’el Mon.',
    'Bajar por el camino de Rayá hacia la ribera del Ésera y volver a Benasque por el entorno de **Les Someres**.',
  ],
  routeNote: 'Los barrancos se cruzan por pasos sin puente. Después de tormentas o con caudal alto, no forcéis el cruce: la ruta deja de ser el paseo fácil que promete la ficha.',
  sections: [
    startSection(
      escuelaMontana,
      'Montaña Segura sitúa el arranque en el sector de la calle que sube hacia la **Escuela de Montaña**. El panel turístico antiguo usa las piscinas municipales como referencia cercana; ambas quedan dentro del mismo extremo del circuito.',
      sources.tresBarrancos,
      'Montaña Segura + track',
    ),
  ],
  affinities: [
    { activityId: 'benasque-anciles', weight: 2, reason: 'Los dos salen andando desde Benasque y funcionan como plan corto.' },
    { activityId: 'senderos-norte', weight: 2, reason: 'Son las dos circulares suaves que salen directamente del pueblo.' },
  ],
})

addActivity({
  id: 'senderos-norte',
  title: 'Senderos del Norte',
  area: 'benasque',
  areaLabel: 'Benasque',
  category: 'paseo',
  effort: 'bajo',
  duration: 'corta',
  combinability: 'facil',
  tags: ['Circular', 'Sin coche', 'Panel Turismo Ribagorza'],
  stats: {
    distanceKm: 7.4,
    ascentM: 215,
    hours: '2',
    extra: [{ label: 'Recorrido', value: 'Circular' }],
  },
  lede: 'Dos horas enlazando viejos caminos al norte de Benasque: se sube por una margen del Ésera, se gana algo de altura hacia Cerler y se vuelve por la otra sin meterse en alta montaña.',
  route: [
    'Desde el puente del Ésera junto a Plaza Mayor, tomar el **camino del Rigau** y avanzar por la parte norte de Benasque.',
    'A la altura de la potabilizadora, girar hacia Benasque hasta la **ermita de San Antón**; cruzar la carretera y tomar el antiguo camino de Cerler.',
    'Subir hacia **Les Colladetes** y regresar por el camino de la Rodiella, cerrando el círculo en Benasque.',
  ],
  routeNote: 'Esta ficha procede del panel oficial de Turismo Ribagorza fotografiado en Benasque. No añadimos un GPX de terceros como si fuera oficial: conviene seguir la señalización local y comprobar el trazado en el mapa antes de salir.',
  sections: [
    startSection(
      plazaMayor,
      'El panel marca el inicio como **“Benasque, puente del Ésera en la Plaza Mayor”**. El pin abre Plaza Mayor, pegada al acceso al puente, para que el arranque quede localizable sin inventar una coordenada de sendero.',
    ),
  ],
  affinities: [
    { activityId: 'tres-barrancos', weight: 2, reason: 'Son las dos circulares suaves que salen directamente del pueblo.' },
  ],
})

addActivity({
  id: 'benasque-cerler-anciles',
  title: 'Benasque – Cerler – Anciles',
  short: 'Benasque–Cerler–Anciles',
  area: 'cerler',
  areaLabel: 'Benasque · Cerler · Anciles',
  category: 'montana',
  effort: 'medio',
  duration: 'media-jornada',
  combinability: 'normal',
  tags: ['Circular', 'Media montaña', 'Sale de Benasque'],
  stats: {
    distanceKm: 10.1,
    ascentM: 510,
    hours: '3 h 35',
    extra: [{ label: 'Recorrido', value: 'Circular' }],
  },
  lede: 'La circular local cuando sí apetece andar en serio: subida fuerte a Cerler, descenso más amable hacia Anciles y regreso a Benasque por la ribera. Sale del pueblo, pero +510 m ya son media montaña.',
  route: [
    'Salir desde el entorno del **SOMMOS Hotel Aneto** y tomar el camino que gana altura hacia Cerler. La primera parte concentra buena parte del esfuerzo.',
    'Atravesar **Cerler** y continuar hacia el entorno del aparcamiento de la estación, siguiendo la señalización de la circular.',
    'Descender hacia **Anciles** por terreno progresivamente más amable y cruzar el pueblo.',
    'Cerrar el círculo regresando a Benasque por el **Camino de la Ribera**, junto al Ésera.',
  ],
  routeNote: 'No está en el mismo saco que Tres Barrancos o Senderos del Norte: Turismo Ribagorza la plantea para senderistas habituados a recorridos de media montaña. Calzado, agua y previsión de tormentas aunque empiece en el casco urbano.',
  sections: [
    startSection(
      hotelAneto,
      'La ficha actual de Turismo Ribagorza toma el **SOMMOS Hotel Aneto** como referencia de salida en Benasque. El panel antiguo hablaba de la zona tras el Gran Hotel; usamos la referencia actual.',
      sources.circular1,
    ),
  ],
  affinities: [
    { activityId: 'cerler-ampriu', weight: 2, reason: 'Comparte Cerler, aunque esta es una ruta a pie y no un paseo en coche.' },
    { activityId: 'benasque-anciles', weight: 1, reason: 'Comparte Anciles, pero con una carga física muy distinta.' },
  ],
})

updateActivity('benasque-eriste', {
  tags: ['Ribera del Ésera', 'Muy fácil', 'PR-HU 32'],
  stats: {
    distanceKm: 6.3,
    ascentM: 80,
    hours: '1 h 40',
    extra: [{ label: 'Recorrido', value: 'Ida y vuelta' }],
  },
  lede: 'La carta para el día sin piernas: el PR-HU 32 une Benasque y Eriste por la ribera del Ésera, casi llano, y vuelve por el mismo camino.',
  route: [
    'Salir del sur de Benasque, desde las inmediaciones del **puente sobre el Ésera que enlaza con la avenida de Francia**, y seguir el paseo peatonal hacia Eriste.',
    'Antes de que termine el andador, tomar el camino entre prados que pasa por la **ermita de San José** y continúa paralelo a la carretera.',
    'Llegar a Linsoles y Eriste y regresar a Benasque por el mismo itinerario.',
  ],
  routeNote: 'Turismo Ribagorza publica 6,36 km, +80 m y 1 h 40. La rejilla de la app redondea la distancia a una décima para mantener el formato común del resto de rutas.',
  sections: [
    startSection(
      hotelAneto,
      'El arranque oficial está en el puente sobre el Ésera al sur del casco, junto a avenida de Francia. El pin usa el **Hotel Aneto como referencia cercana y verificable**, no pretende marcar el metro exacto del sendero.',
      sources.pr32,
    ),
  ],
})

updateActivity('eriste-anciles', {
  title: 'Selva de Conques',
  short: 'Selva de Conques',
  areaLabel: 'Eriste · Anciles',
  category: 'paseo',
  effort: 'bajo',
  duration: 'corta',
  combinability: 'facil',
  tags: ['Circular', 'Bosque', 'Ruta familiar'],
  stats: {
    distanceKm: 4.585,
    ascentM: 140,
    hours: '1 h 25',
    extra: [{ label: 'Recorrido', value: 'Circular' }],
  },
  lede: 'La versión bien cerrada del paseo entre Eriste y Anciles: Casa Conques, fuente Gardeta, bosque y regreso por el valle en un circular corto y familiar.',
  route: [
    'Salir de **Eriste**, cruzar el puente sobre el Ésera en la cola del embalse de Linsoles y tomar el camino señalizado hacia Conques.',
    'Subir suavemente entre vegetación hasta **Casa Conques** y la fuente Gardeta.',
    'Bajar hacia Linsoles, enlazar con el camino de **Anciles** y atravesar el pueblo.',
    'Regresar a Eriste cerrando el circuito por los senderos señalizados del valle.',
  ],
  routeNote: 'Conservamos el id `eriste-anciles` para no romper días ya guardados en la PWA: cambia la ficha, no la referencia persistida.',
  sections: [
    startSection(
      eristeStart,
      'La circular oficial empieza en el **puente sobre el río Ésera de Eriste**, en la cola del embalse de Linsoles. El pin lleva al núcleo de Eriste, a pocos metros: desde allí la señalización conduce al puente.',
      sources.circular2,
    ),
  ],
  places: [{ name: 'Anciles', lat: 42.5907204, lng: 0.5099826, googlePlaceId: 'ChIJhWXE-iB5qBIRf4ELCx-Cj_s' }],
  affinities: [
    { activityId: 'linsoles-guayente-sahun', weight: 3, reason: 'Las dos circulares parten de Eriste y son las dos mitades del antiguo recorrido en forma de ocho.' },
    { activityId: 'benasque-anciles', weight: 2, reason: 'La circular pasa por Anciles; el otro plan es la versión informal desde Benasque.' },
  ],
})

updateActivity('linsoles-guayente-sahun', {
  title: 'Embalse de Linsoles, Guayente y Sahún',
  short: 'Circular de Linsoles',
  areaLabel: 'Eriste · Guayente · Sahún',
  category: 'paseo',
  effort: 'bajo',
  duration: 'corta',
  combinability: 'facil',
  tags: ['Circular', 'Embalse', 'Patrimonio'],
  stats: {
    distanceKm: 7.015,
    ascentM: 340,
    hours: '2 h 25',
    extra: [{ label: 'Recorrido', value: 'Circular' }],
  },
  lede: 'La circular que convierte el antiguo plan abierto de Linsoles en una ruta de verdad: agua, presa, santuario de Guayente, Sahún y regreso a Eriste en algo más de dos horas.',
  route: [
    'Salir de **Eriste** por el puente sobre el Ésera y avanzar junto al embalse de Linsoles.',
    'Continuar hacia la presa y ganar altura en dirección al **Santuario de Guayente**.',
    'Pasar por **Sahún** y tomar el camino de regreso hacia Eriste para cerrar la circular.',
  ],
  routeNote: 'Conservamos el id `linsoles-guayente-sahun` para que los planes guardados sigan resolviendo la actividad. El antiguo RC1 del panel no se duplica: esta ruta y Selva de Conques son sus dos circulares actuales.',
  sections: [
    startSection(
      eristeStart,
      'La ficha oficial actual comparte inicio con Selva de Conques: **puente sobre el Ésera en Eriste**, junto a la cola del embalse. El pin lleva al núcleo de Eriste para localizar el acceso sin fabricar una coordenada del tablero de señalización.',
      sources.circular3,
    ),
  ],
  places: [{ name: 'Embalse de Linsoles', lat: 42.5840867, lng: 0.4869628 }],
  affinities: [
    { activityId: 'eriste-anciles', weight: 3, reason: 'Las dos circulares salen del mismo punto y reproducen por separado el antiguo recorrido en forma de ocho.' },
    { activityId: 'benasque-eriste', weight: 2, reason: 'Benasque–Eriste deja justo en el punto de partida de esta circular.' },
    { activityId: 'santa-margarita-eresue', weight: 2, reason: 'Guayente y Sahún encajan bien con un día por el Solano.' },
  ],
})

updateActivity('gorgas-alba', {
  stats: {
    distanceKm: 3,
    distanceNote: 'circular',
    ascentM: 150,
    hours: '1',
    driveMin: 15,
    extra: [{ label: 'Recorrido', value: 'Circular' }],
  },
  sections: [
    {
      heading: 'El plan',
      body: [
        'Saltos de agua del Ésera vistos desde dos miradores, pasarela metálica sobre el río y un hayedo pequeño pero muy bonito, con carteles identificando especies. Se sale del aparcamiento del **Hotel Turpi**, en el desvío de los Baños de Benasque (A-139, km 9, a la derecha). Cabe poco coche, unos quince o veinte.',
        'Se combina de fábula con las **pozas termales de los Baños de Benasque**, que están a un kilómetro (ver la sección de días vagos).',
      ],
    },
    startSection(
      hotelTurpi,
      'El paseo empieza en la zona de aparcamiento del **Hotel Turpi**. Desde allí se sigue unos metros por la carretera, se cruza el Ésera y aparece el panel de inicio de la ruta.',
      sources.gorgas,
      'Ficha Valle de Benasque',
    ),
  ],
})

// La actividad informal Benasque–Anciles se mantiene intacta; solo actualizamos
// el texto de su afinidad porque `eriste-anciles` ahora representa la circular
// oficial de la Selva de Conques.
const benasqueAnciles = trip.activities.find((activity) => activity.id === 'benasque-anciles')
if (benasqueAnciles?.affinities) {
  benasqueAnciles.affinities = benasqueAnciles.affinities.map((affinity) =>
    affinity.activityId === 'eriste-anciles'
      ? { ...affinity, reason: 'Selva de Conques pasa por Anciles y completa un circular real desde Eriste.' }
      : affinity,
  )
}
