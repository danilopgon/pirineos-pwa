import type { Activity, InfoBlock, Trip } from './types'

/**
 * Fuente unica de contenido. Los componentes no llevan texto propio.
 *
 * En los parrafos, `**negrita**` y `` `codigo` `` se renderizan como marcado
 * en linea (ver src/lib/markup.tsx). No se interpreta HTML.
 */
const legacyTrip: Omit<Trip, 'activities' | 'infoBlocks'> = {
  eyebrow: 'Benasque · 5 días completos · agosto 2026',
  title: 'Pirineos',
  titleAccent: 'sin bus',
  intro:
    'Cinco días de senderismo con base en Benasque, todo llegando en coche propio. Un día cultural, un día con baño en ibón y una escapada al Parque Nacional. Cada día lleva su versión corta y su alternativa, con los mismos datos que el plan principal.',
  origin: 'Benasque',

  days: [
    // ─────────────────────────────────────────── DÍA 1
    {
      id: 'd1',
      index: 1,
      short: 'Aigualluts',
      area: 'Valle de Benasque',
      title: 'Forau de Aigualluts',
      lede: 'El sumidero donde el Ésera desaparece bajo tierra y reaparece en el valle de Arán, ya como Garona. Cascada, praderas y el glaciar del Aneto de fondo. Casi todo llano: día ideal para empezar.',
      tags: ['Sin bus, a pie desde el parking'],
      accent: 'agua',
      difficulty: 'moderado',
      stats: { distanceKm: 13, ascentM: 400, hours: '5-6', driveMin: 25 },
      elevationProfile: {
        start: 1760,
        end: 2050,
        startLabel: 'parking',
        endLabel: "Plan d'Aigualluts",
        points: [
          [0, 1760],
          [1.2, 1790],
          [2.2, 1825],
          [3, 1855],
          [3.9, 1955],
          [4.7, 2050],
          [5.3, 2080],
          [6.1, 2065],
          [6.5, 2050],
        ],
      },
      access: [
        'Desde Benasque, A-139 hacia el Hospital de Benasque (13 km). El coche se queda en el **parking público del Vado / Llanos del Hospital**, último punto al que se puede subir en verano. Gratis y grande, pero en agosto se llena entre las 10:00 y las 10:30: hay que estar allí sobre las 8:30.',
      ],
      route: [
        "Parking → hotel de Llanos del Hospital y Plan d'Están: unos 4,5 km casi horizontales por el fondo del valle. La senda por la pradera es más bonita que la pista, así que se puede subir por una y bajar por la otra.",
        'La Besurta: aquí llega el autobús, así que a partir de este punto hay gente. Bar y merendero, bien para la vuelta.',
        'Cruzar la palanca de madera, desvío a la izquierda (a la derecha se va al refugio de la Renclusa y al Aneto) y subida corta y pedregosa.',
        'Forau de Aigualluts, vallado y visible desde el borde. Merece seguir 15 minutos más hasta la cascada y el Plan de Aigualluts: la vista del Aneto está ahí, no en el agujero.',
      ],
      sections: [
        {
          heading: 'Si sobra cuerpo',
          body: [],
          list: [
            '**Ibones de Villamuerta** desde La Besurta: unos 3 km ida y vuelta y 200 m de desnivel.',
            '**Ibón del Toro**, subiendo desde el Plan de Aigualluts. Alarga el día hora y media.',
          ],
        },
      ],
      places: [
        {
          name: 'Parking del Vado',
          lat: 42.6814742,
          lng: 0.6040248,
          googlePlaceId: 'ChIJ5YBFfomHqBIR6oKfwzNY1oA',
        },
      ],
      alternatives: [
        {
          kind: 'corta',
          title: 'Solo hasta La Besurta',
          stats: {
            distanceKm: 9,
            distanceNote: 'i/v',
            ascentM: 180,
            hours: '3',
            extra: [{ value: 'Mismo parking' }],
          },
          body: [
            "El tramo del Plan d'Están es el más bonito del día y es casi llano: praderas, ibones pequeños y el macizo de la Maladeta enfrente. Se llega al bar de La Besurta, se come algo y se vuelve. Recorta el 40% del día y no te pierdes el paisaje, solo el agujero.",
          ],
        },
        {
          kind: 'alternativa',
          title: 'Ibón de Gorgutes y Puerto de la Glera',
          stats: {
            distanceKm: [6, 7],
            distanceNote: 'i/v',
            ascentM: 570,
            hours: '3-4',
            extra: [{ value: 'Fácil, senda rota' }],
          },
          body: [
            'Más corta pero mucho más vertical: sube desde el minuto uno por un pinar con escalones de roca irregulares de una morrena glaciar. El ibón está a 2.290 m y, veinte minutos más arriba, el **Puerto de la Glera** (2.368 m) asoma a la vertiente francesa. Fue durante siglos el paso comercial principal de la zona.',
            'Empieza **1 km más allá del parking del Vado**, donde se acaba el asfalto de la A-139 (el coche se deja en la propia carretera, que está en desuso). Se hace en 4 h, así que es la carta buena para un día con tormenta anunciada por la tarde.',
          ],
          note: 'En este ibón el baño está mal visto y hay gente que lo denuncia: el chapuzón se lo dejamos al día 2. Si sobra energía, desde aquí sale el **Pico Sacroux** (9 km, 948 m, 4 h) que es uno de los grandes miradores del valle.',
          place: {
            name: 'Fin del asfalto de la A-139',
            lat: 42.6814742,
            lng: 0.6040248,
            note: 'Es el parking del Vado: desde ahí, 1 km más por la carretera vieja.',
          },
        },
        {
          kind: 'vago',
          title: 'Gorgas de Alba, sendero botánico',
          stats: {
            distanceKm: 3,
            distanceNote: 'circular',
            ascentM: 150,
            hours: '1',
            driveMin: 15,
          },
          body: [
            'Saltos de agua del Ésera vistos desde dos miradores, pasarela metálica sobre el río y un hayedo pequeño pero muy bonito, con carteles identificando especies. Se sale del aparcamiento del **Hotel Turpi**, en el desvío de los Baños de Benasque (A-139, km 9, a la derecha). Cabe poco coche, unos quince o veinte.',
            'Se combina de fábula con las **pozas termales de los Baños de Benasque**, que están a un kilómetro (ver la sección de días vagos).',
          ],
          place: { name: 'Hotel Turpi', lat: 42.667685, lng: 0.582452 },
        },
      ],
    },

    // ─────────────────────────────────────────── DÍA 2
    {
      id: 'd2',
      index: 2,
      short: 'Batisielles',
      area: 'Valle de Estós',
      title: 'Ibones de Batisielles',
      lede: 'Hayedos, abetos y una cadena de ibones colgados bajo las agujas de Perramó. En Benasque dicen que si el paraíso existiera estaría en Batisielles, y no exageran mucho. Este es el día de baño.',
      tags: ['Día de baño'],
      accent: 'bano',
      difficulty: 'exigente',
      stats: { distanceKm: 13, ascentM: 770, hours: '6', driveMin: 10 },
      elevationProfile: {
        start: 1350,
        end: 2047,
        startLabel: 'parking',
        endLabel: 'Escarpinosa',
        points: [
          [0, 1350],
          [1, 1410],
          [2, 1495],
          [2.8, 1555],
          [3.6, 1815],
          [4.4, 1990],
          [5.1, 2020],
          [5.8, 2047],
          [6.5, 2047],
        ],
      },
      access: [
        'Salir de Benasque por la A-139 hacia los Llanos del Hospital y, a 3–4 km, coger el desvío a la izquierda al valle de Estós. Un kilómetro de pista hasta el aparcamiento. Es amplio, pero en agosto se llena pronto porque de aquí sale también todo el que va al refugio de Estós: mejor antes de las 9:00.',
      ],
      route: [
        "GR-11 valle arriba: embalse de Estós con su cascada, palanca de l'Aiguacari y cabaña de Santa Ana (unos 40 min).",
        'Fuen de Coronas y, a algo más de una hora del coche, el desvío señalizado a la izquierda hacia los ibones. Aquí se abandona el fondo del valle.',
        'Subida fuerte y sostenida por el hayedo y el abetal, con un puente de troncos sobre el torrente, hasta el **Ibonet de Batisielles** (1.920 m).',
        "Continuar media hora junto a la aigüeta hasta el **Ibón d'Escarpinosa** (2.047 m), la cubeta más abierta y con más sitio para tumbarse.",
      ],
      sections: [
        {
          heading: 'El baño',
          body: [
            'Los dos ibones se pueden bañar y el de Escarpinosa es el más agradecido. Ojo con la expectativa: el agua está entre 10 y 14 °C en pleno agosto. Es entrar, tres brazadas, salir y sentirse invencible. No hay nadie vigilando, así que nada de saltos ni de meterse solo mientras el otro duerme la siesta.',
          ],
        },
      ],
      places: [
        {
          name: 'Parking de Estós',
          lat: 42.6289596,
          lng: 0.5404105,
          googlePlaceId: 'ChIJjRqPFMd9qBIRj-8HNlcL-GI',
        },
      ],
      alternatives: [
        {
          kind: 'corta',
          title: 'Solo el Ibonet de Batisielles',
          stats: {
            distanceKm: 10,
            distanceNote: 'i/v',
            ascentM: 600,
            hours: '4',
            extra: [{ value: 'Mismo parking' }],
          },
          body: [
            'Dar la vuelta en el primer ibón, que además es el más fotogénico de los tres y tiene una cabaña de pastor al lado. Ahorra la última media hora de subida y unos 170 m de desnivel. Se puede bañar igual.',
          ],
        },
        {
          kind: 'corta',
          label: 'Versión más corta todavía',
          title: 'Vereda de Estós hasta el refugio',
          stats: {
            extra: [
              { value: '**2 h 30** ida' },
              { value: 'Casi llano' },
              { value: 'Comida en refugio' },
              { value: 'Mismo parking' },
            ],
          },
          body: [
            'Pista cómoda por el fondo del valle sin desnivel serio, entre hayedos y con el Perdiguero de fondo. Se come caliente en el refugio de Estós y se vuelve en 2 h. El día de baño se resuelve en las **pozas del río Estós** cerca del propio aparcamiento, que son de agua igual de fría pero sin los 770 m de subida.',
          ],
        },
        {
          kind: 'alternativa',
          label: 'Si sobra cuerpo',
          title: 'Ibón Gran de Batisielles',
          stats: {
            extra: [
              { value: '**+2 km**' },
              { value: '**+400 m**' },
              { value: '**+1 h** subida' },
              { value: 'Bloques' },
            ],
          },
          body: [
            'El grande de verdad, a 2.208 m y de un azul bastante más oscuro. La subida cruza un tramo largo de bloques de roca, incómodo pero no técnico. Con esto el día se va a 7 h. También se puede cerrar circular volviendo por el refugio de Estós en lugar de deshacer camino.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────── DÍA 3
    {
      id: 'd3',
      index: 3,
      short: 'Cultura',
      area: 'Ribagorza',
      title: 'Románico y descanso',
      lede: 'Día de piernas al ralentí en medio del viaje. Roda de Isábena tiene la catedral más antigua de Aragón y la más pequeña de España, en el pueblo más pequeño del país con sede catedralicia. Se come en el refectorio.',
      tags: ['Día cultural'],
      accent: 'cultura',
      difficulty: 'facil',
      stats: {
        extra: [
          { label: 'Andar', value: '2–3 km' },
          { label: 'Coche', value: '1 h ida' },
          { label: 'Visita', value: '1 h' },
          { label: 'Cerrado', value: 'Martes' },
        ],
      },
      accessHeading: 'Reservar antes',
      access: [
        'La catedral de San Vicente se ve solo con visita guiada, en pases de aproximadamente una hora y con aforo limitado. De junio a septiembre: 11:15, 12:30 y 13:30, y por la tarde 16:30, 17:30 y 18:30. **Lunes solo mañana y martes cerrado todo el día.** Entradas en el Museo Diocesano Barbastro-Monzón (974 315 581). El claustro se recorre libremente.',
      ],
      accessLinks: [
        { label: 'Comprar entrada', href: 'https://museodiocesano.es/entradas/', ghost: true },
      ],
      routeHeading: 'El día, ordenado',
      route: [
        'Salir de Benasque sin prisa y parar en el **Congosto de Ventamillo**: tres kilómetros de carretera encajonada entre paredes calizas verticales. Hay dónde dejar el coche y asomarse.',
        '**Villanova**, de paso: dos iglesias de románico lombardo de los siglos XI y XII a pie de carretera.',
        '**Roda de Isábena**: visita guiada, cripta abierta bajo el altar, pinturas murales de la sala capitular y las inscripciones necrológicas de los capiteles del claustro. El coche se deja fuera del pueblo y se entra por unas escaleras empedradas bajo los soportales.',
        'Comer en la **Hospedería de Roda**, cuyo comedor es el antiguo refectorio de la catedral. El sitio es medio motivo del viaje, pero la carta es cocina tradicional ribagorzana: hay que reservar y preguntar por teléfono si pueden montar algo vegano (974 544 545). Si no, mejor comer antes de salir y dejar aquí solo un café.',
        'De vuelta, **Anciles** (a dos kilómetros de Benasque, casas solariegas de piedra, se ve en 40 minutos) y el casco antiguo de **Benasque** con el palacio de los condes de Ribagorza.',
      ],
      places: [
        { name: 'Roda de Isábena', lat: 42.291371, lng: 0.5282342 },
        {
          name: 'Congosto de Ventamillo',
          lat: 42.481981,
          lng: 0.4461104,
          googlePlaceId: 'ChIJF6zWNfrZpxIRxtR9UInrBI8',
        },
        {
          name: 'Anciles',
          lat: 42.5907204,
          lng: 0.5099826,
          googlePlaceId: 'ChIJhWXE-iB5qBIRf4ELCx-Cj_s',
        },
      ],
      altSummary: 'Alternativas de este día',
      alternatives: [
        {
          kind: 'alternativa',
          label: 'Si cae en martes',
          title: 'Aínsa',
          stats: {
            driveMin: 75,
            extra: [
              { value: 'Andar **2 km**' },
              { value: 'Todo el día' },
              { value: 'Sin reserva' },
            ],
          },
          body: [
            'Casco medieval amurallado sobre un promontorio, con la plaza mayor porticada y el castillo del antiguo reino de Sobrarbe. La subida por las calles empedradas hasta la fortificación tiene vistas a todo el Sobrarbe y a Peña Montañesa. Es la alternativa obvia si Roda está cerrada, y también el plan de lluvia porque hay dónde meterse.',
            'Aínsa y Roda están a una hora entre sí: juntarlas en un día es posible, pero sale un día de tres horas y media de coche.',
          ],
          place: { name: 'Aínsa', lat: 42.4172743, lng: 0.1386853 },
        },
        {
          kind: 'alternativa',
          label: 'Versión ambiciosa',
          title: 'Románico de la Vall de Boí',
          stats: {
            driveMin: 105,
            extra: [
              { value: '9 iglesias' },
              { value: 'UNESCO' },
              { value: '10–14 / 16–19 h' },
            ],
          },
          body: [
            'La mejor concentración de románico del Pirineo, Patrimonio de la Humanidad. **Sant Climent de Taüll** es la parada obligatoria: se entra con entrada y hay una proyección sobre el ábside que reconstruye cómo estaban pintadas las paredes originalmente (los frescos están en el MNAC de Barcelona). Santa Maria de Taüll y Sant Joan de Boí completan la visita.',
            'Abren de 10:00 a 14:00 y de 16:00 a 19:00, así que la comida parte el día en dos. Se va de iglesia en iglesia en coche, lo que lo hace buen plan de día tirando a nublado.',
          ],
          place: { name: 'Sant Climent de Taüll', lat: 42.5174264, lng: 0.8486653 },
        },
        {
          kind: 'vago',
          label: 'Cultura de proximidad',
          title: 'Benasque, Anciles y Cerler a pie',
          stats: {
            distanceKm: 5,
            hours: '2-3',
            extra: [{ value: 'Casi llano' }, { value: 'Sin coche' }],
          },
          body: [
            'Si el día pinta a no moverse: casco antiguo de Benasque (iglesia de San Marcial, palacio de los condes de Ribagorza, casas blasonadas), paseo llano de dos kilómetros hasta **Anciles** y vuelta. Cerler, a 6 km y 1.500 m, es el pueblo habitado más alto del Pirineo aragonés y se ve en una hora.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────── DÍA 4
    {
      id: 'd4',
      index: 4,
      short: 'Añisclo',
      area: 'Parque Nacional de Ordesa y Monte Perdido',
      title: 'Cañón de Añisclo',
      lede: 'El Ordesa al que sí se llega en coche. Una garganta de 25 km excavada por el Bellós y una senda que se mete en ella entre hayedos y pozas de agua turquesa hasta la pradera de La Ripareta. Madrugón obligatorio.',
      tags: ['Día largo · 2 h de coche'],
      accent: 'lejos',
      difficulty: 'moderado',
      stats: { distanceKm: 16, ascentM: 500, hours: '6', driveMin: 120 },
      elevationProfile: {
        start: 950,
        end: 1360,
        startLabel: 'San Úrbez',
        endLabel: 'La Ripareta',
        points: [
          [0, 950],
          [1.25, 975],
          [2.5, 1025],
          [3.75, 1105],
          [5, 1180],
          [6.25, 1255],
          [7.25, 1335],
          [8, 1360],
        ],
      },
      accessHeading: 'Cómo llegar (esto tiene truco)',
      access: [
        'Benasque → Aínsa → Escalona, y desde allí la **HU-631** por el desfiladero de las Cambras hasta el parking de San Úrbez. Unas 2 h de coche, la última media hora de curvas continuas. La carretera es de **sentido único ascendente** (sur a norte, de Puyarruego hacia La Tella) en temporada alta, así que hay que entrar por el sur o no se llega al parking. El aparcamiento es pequeño y se llena a media mañana: salir de Benasque a las 7:00.',
      ],
      accessLinks: [{ label: 'Avisos del parque', href: 'https://pnomp.es/es/avisos', ghost: true }],
      accessNote:
        'Comprobar los avisos del parque nacional el día antes: esta carretera se corta con cierta frecuencia por obras o desprendimientos.',
      route: [
        'Del parking al puente medieval y la **ermita de San Úrbez**, encajada en la roca.',
        'Senda del cañón río arriba: **Cumaz** (1 h), **Selva Plana** (2 h) y **La Ripareta** (3 h). Camino cómodo, umbrío y con poco desnivel; la altura se gana casi sin notarlo.',
        'Comer en la pradera de La Ripareta con las paredes del cañón cerrando el cielo, y volver por el mismo sitio.',
      ],
      sections: [
        {
          heading: 'Sobre el baño aquí',
          body: [
            'El Bellós forma pozas espectaculares y la gente se remoja. Estamos en parque nacional: chapuzón discreto, sin jabón, sin cremas recién puestas y sin dejar rastro. El baño oficial del viaje sigue siendo el día 2.',
          ],
        },
      ],
      places: [{ name: 'Parking de San Úrbez', lat: 42.5588298, lng: 0.050276 }],
      alternatives: [
        {
          kind: 'corta',
          title: 'Hasta Cumaz o Selva Plana',
          stats: {
            distanceKm: [5, 8],
            distanceNote: 'i/v',
            ascentM: [150, 300],
            hours: '2-4',
            extra: [{ value: 'Mismo parking' }],
          },
          body: [
            'Las tres etapas son continuación una de otra, así que se puede dar la vuelta donde el cuerpo diga. Cumaz (1 h de ida) va pegado al río y es el tramo con más pozas; en Selva Plana (2 h) ya empieza a asomar el macizo de Monte Perdido. Con la vuelta desde Selva Plana el día se queda en 4 h de marcha, que con 4 h de coche total sigue siendo un día completo pero llevadero.',
          ],
        },
        {
          kind: 'corta',
          label: 'Versión mínima',
          title: 'Ermita de San Úrbez y molino de Aso',
          stats: {
            distanceKm: 1.5,
            distanceNote: 'circular',
            extra: [
              { value: 'Casi llano' },
              { value: '**45 min**' },
              { value: 'Balizada "ruta del agua"' },
            ],
          },
          body: [
            'Puente medieval altísimo, ermita metida en la roca y molino. Con 45 minutos de caminata no compensan 4 h de coche por sí solos, así que este es el plan cuando se convierte el día en **ruta panorámica**: la propia HU-631 por el fondo del cañón es el espectáculo, y de vuelta se baja por la carretera que lo bordea parando en **Vió, Buerba y Fanlo**, pueblos de piedra medio despoblados del valle de Vió. Se puede cerrar comiendo en Aínsa.',
          ],
        },
        {
          kind: 'alternativa',
          title: 'Valle de Pineta: Llanos de la Larri',
          stats: {
            distanceKm: 5.6,
            distanceNote: 'circular',
            ascentM: 300,
            hours: '2 h 30',
            driveMin: 105,
          },
          body: [
            'Mismo parque nacional, otro sector, y bastante menos coche si se va por Campo y Salinas de Sin sin pasar por Aínsa. Desde el parking de la Pradera de Pineta (junto al Parador, 1,5–3 € al día, en efectivo) se sube por un hayedo cerrado hasta una pradera colgada 300 m sobre el valle, con Monte Perdido enfrente. La bajada se hace por el **camino de las cascadas**, con escalones y miradores sobre los saltos de la Larri.',
            'Es la mejor relación paisaje/esfuerzo de todo el viaje: media jornada de marcha en el sitio más espectacular. En el mismo valle están las cascadas del Cinca, a un paseo del parking.',
          ],
          place: { name: 'Pineta', lat: 42.6752938, lng: 0.0885038 },
        },
        {
          kind: 'alternativa',
          label: 'Si vais sobrados',
          title: 'Balcón de Pineta o Fuenblanca',
          stats: {
            hours: '7-8',
            extra: [
              { value: '**1.300 m** desnivel' },
              { value: 'Duro' },
              { value: 'Sale de noche' },
            ],
          },
          body: [
            'El **Balcón de Pineta** (desde el mismo parking de Pineta) es uno de los desniveles más brutos del Pirineo aragonés, con el lago de Marboré arriba. La **cascada de Fuenblanca**, siguiendo Añisclo más allá de La Ripareta, son 5 h de ida. Cualquiera de las dos exige salir de Benasque de noche y aceptar que el día se va entero.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────── DÍA 5
    {
      id: 'd5',
      index: 5,
      short: 'Llauset',
      area: 'Valle de Barrabés',
      title: 'Llauset y Angliós',
      lede: 'Circular de alta montaña que empieza ya a 2.200 m, así que el coche hace medio trabajo. Paisaje mineral, dos collados y una ristra de ibones. La cara sureste del Aneto sin la multitud de la cara norte.',
      tags: ['Ruta apartada'],
      accent: 'lejos',
      difficulty: 'exigente',
      stats: { distanceKm: 10, ascentM: 730, hours: '5', driveMin: 95 },
      elevationProfile: {
        start: 2197,
        end: 2197,
        startLabel: 'presa',
        highLabel: 'Collada dels Estanyets',
        endLabel: 'presa',
        points: [
          [0, 2197],
          [1.4, 2309],
          [2.65, 2384],
          [3.75, 2496],
          [4.85, 2422],
          [6.1, 2534],
          [7.35, 2384],
          [8.6, 2496],
          [10, 2197],
        ],
      },
      access: [
        'Benasque → Castejón de Sos → N-260 → N-230 hacia el norte hasta el pueblo de **Aneto**. Desde allí, 10 km de carretera asfaltada que sube al embalse de Llauset. Está bacheada pero pasa cualquier turismo despacio. Al final hay un **túnel que se bifurca: hay que coger la izquierda**, y el parking aparece justo al salir, al pie de la presa.',
      ],
      routeHeading: 'El recorrido (circular)',
      route: [
        'Cruzar a pie un segundo túnel corto y bordear el embalse por la derecha siguiendo las marcas blancas y rojas del GR-11.',
        'Puente metálico sobre el río del Cap de Llauset y subida de unos 300 m hasta el **Ibón de Botornás** y el refugio del Cap de Llauset (1 h 20 desde el coche).',
        'Ibón de Cap de Llauset y **Collada dels Estanyets** (2.534 m, el punto alto del día).',
        "Bajada a los **Estanys d'Angliós** y su cabaña. El mejor sitio para comer y, si el sol acompaña, los ibones pequeños se templan lo justo para un chapuzón.",
        "Última subida corta y empinada a la **Collada d'Angliós** (2.438 m) y descenso al parking con el embalse a la vista.",
      ],
      routeNote:
        'Hay tramos largos sobre bloques de roca y algún punto donde las marcas del GR están desgastadas. No es técnico, pero conviene llevar el track descargado y no dejarlo para un día de niebla.',
      places: [
        {
          name: 'Presa de Llauset',
          lat: 42.58172,
          lng: 0.6962,
          googlePlaceId: 'ChIJT5idxWmDqBIRQQF5TqDcU_8',
        },
      ],
      alternatives: [
        {
          kind: 'corta',
          title: 'Ida y vuelta al refugio Cap de Llauset',
          stats: {
            distanceKm: 7,
            distanceNote: 'i/v',
            ascentM: 300,
            hours: '3',
            extra: [{ value: 'Mismo parking' }],
          },
          body: [
            '3,5 km y 1 h 20 por trayecto, todo por sendero homologado GR y sin complicaciones en verano. Se ve el Ibón de Botornás, se come en el refugio (mejor avisar por teléfono si queréis plato caliente) y se vuelve por el mismo camino. Se quita los dos collados, que son la parte dura, y deja el día en media jornada.',
          ],
        },
        {
          kind: 'corta',
          label: 'Media circular',
          title: "Solo los Estanys d'Angliós",
          stats: {
            distanceKm: [7, 8],
            distanceNote: 'i/v',
            ascentM: 450,
            hours: '4',
            extra: [{ value: '1 collado' }],
          },
          body: [
            "Del parking directo a la **Collada d'Angliós** (la senda 2, la que sale a la derecha en el cruce del panel), bajar a los ibones de Angliós, comer allí y volver por el mismo collado. Es la mitad bonita del circuito con un solo collado en lugar de dos.",
          ],
        },
        {
          kind: 'vago',
          title: 'Cascada de Ardonés, ruta de las tres cascadas',
          stats: {
            distanceKm: [2, 7],
            ascentM: [130, 256],
            hours: '1-3',
            driveMin: 20,
          },
          body: [
            'Circular con tres saltos de agua, y la de Ardonés es de las más espectaculares del valle. Dos versiones: la corta desde el aparcamiento pequeño de la carretera de Cerler al Ampriu (bucle de hora y media) o la larga saliendo del propio pueblo de **Cerler** (7 km y 256 m). Junto a la cascada el sendero se estrecha y hay un cable de acero fijado a la roca para agarrarse.',
          ],
          place: {
            name: 'Cascada de Ardonés',
            lat: 42.589002,
            lng: 0.56939,
            googlePlaceId: 'ChIJcRY0SlN-qBIRCbt7CqdsoLA',
          },
        },
        {
          kind: 'vago',
          label: 'Cima con trampa',
          title: 'Pico Cerler o Gallinero desde el Ampriu',
          stats: {
            driveMin: 25,
            extra: [
              { value: 'Cerler: **6,4 km · 523 m**' },
              { value: 'Gallinero: **7 km · 860 m**' },
              { value: '**3 h 30 / 3 h 45**' },
            ],
          },
          body: [
            'El coche sube hasta el aparcamiento del Ampriu, a 1.900 m, y desde ahí las dos cimas son asequibles: el **Pico Cerler** (2.407 m, la pirámide que se ve desde el pueblo) y el **Gallinero** (2.728 m), con una de las mejores panorámicas del valle. La trampa: en agosto suele funcionar el **telesilla del Amor**, y con él al Pico Cerler solo le quedan unos 95 m de desnivel. Conviene confirmar horarios en la estación antes de subir, porque cambian por semanas.',
          ],
          place: { name: 'Ampriu', lat: 42.5611815, lng: 0.5695076 },
        },
      ],
    },
  ],

  blocks: [
    // ─────────────────────────────────────────── DÍAS VAGOS
    {
      id: 'vagos',
      short: 'Días vagos',
      title: 'Si un día no hay piernas',
      intro:
        'Cinco días seguidos de montaña en agosto es raro que salgan como el plan. Estos cuatro no requieren casi nada y se pueden encajar en cualquier hueco.',
      sections: [
        {
          heading: 'Pozas termales de los Baños de Benasque',
          body: [
            'El balneario, que era el más alto de España a 1.720 m, **cerró en 2019** y el edificio está en ruinas: no se puede reservar nada ni hay spa que valga. Lo que sí funciona es la **piscina termal al aire libre y unas bañeras** junto al edificio, de agua sulfurada a unos 30–37 °C, de uso libre y gratuito. Hay que ir temprano porque se llena y pierde toda la gracia, el último tramo de acceso no está asfaltado y el sitio está bastante dejado. Como corresponde, no hay servicios: toalla, chanclas y agua de casa.',
            'Se combina con las Gorgas de Alba, que salen del aparcamiento de al lado.',
          ],
          places: [{ name: 'Pozas termales', lat: 42.66132, lng: 0.5853928 }],
          note: 'Es un sitio que cambia de estado a menudo y se ha hablado de rehabilitarlo. Confirmar en la oficina de turismo de Benasque antes de ir con la toalla en la mano.',
        },
        {
          heading: 'Spa de pago, sin salir del pueblo',
          body: [
            'Si lo que se busca es tumbona térmica y no piedra caliente, el **SOMMOS Hotel Benasque Spa** (Paseo Anciles, 5) abre el circuito a clientes externos con reserva previa: piscina de hidromasaje, baño de vapor, sala de relax y masajes. Piden gorro de baño, que venden allí. Llamar antes, porque en agosto va lleno.',
          ],
        },
        {
          heading: 'Bielsa y el valle de Chistau',
          body: [
            'Ruta de coche y pueblos: Plan, San Juan de Plan y Saravillo, arquitectura de piedra y pizarra, con Bielsa al final. 1 h 20 de coche por Campo y Salinas de Sin, casi todo a la sombra del Cotiella. Cero desnivel y muchas terrazas.',
          ],
        },
        {
          heading: 'Pura vagancia',
          list: [
            'Paseo llano Benasque–Anciles y vuelta: 4 km, media mañana con foto.',
            'Embalse de Paso Nuevo y presa de Benasque, a 10 minutos en coche: paseo corto junto al Ésera.',
            'Congosto de Ventamillo: se ve prácticamente desde el coche.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────── VEGANO
    {
      id: 'vegano',
      short: 'Comer vegano',
      title: 'Comer vegano por la zona',
      intro:
        'Aviso de expectativas: el valle de Benasque es territorio de cecina, ternasco y chiretas, y no hay ni un restaurante vegano en el pueblo. Lo que sí hay son un par de sitios que lo resuelven bien y una joya cerca de Aínsa. Llamar antes en todos los casos: en agosto van llenos y algunos cierran días sueltos.',
      sections: [
        {
          heading: 'En Benasque',
          cards: [
            {
              label: 'Lo más fiable del pueblo',
              title: 'Restaurante Avenida',
              mini: ['Av. los Tilos, 14', '13:00–22:30', '**Cierra miércoles**', '974 55 11 26'],
              body: [
                'No es vegano ni lo pretende, pero es lo que más recomiendan los comensales veganos que pasan por Benasque: hamburguesa vegetal y ensalada de mandarina y aguacate. Terraza en la calle. Pedir confirmación de que la hamburguesa va sin salsas con huevo o lácteos.',
              ],
              place: {
                name: 'Restaurante Avenida',
                lat: 42.6033333,
                lng: 0.5219444,
                googlePlaceId: 'ChIJv4xUnVt5qBIRD9L81sKguwU',
              },
            },
            {
              label: 'Para la mochila',
              kind: 'vago',
              title: 'Casa Ramonet, productos ecológicos',
              mini: ['C. Horno, 12', '10–14 h / 17–20:30', '**Cierra domingo**', '636 96 52 28'],
              body: [
                'Tienda pequeña de producto ecológico y bastante granel: frutos secos, legumbres, miel, infusiones. Es el sitio para montar los almuerzos de ruta sin depender del supermercado. Está en una antigua carnicería del pueblo, con la nevera original todavía puesta.',
              ],
              place: {
                name: 'Casa Ramonet',
                lat: 42.6055876,
                lng: 0.5229561,
                googlePlaceId: 'ChIJPZyziq15qBIRiZqmMz3eS5I',
              },
            },
            {
              label: 'Compra grande',
              kind: 'vago',
              title: 'Supermercados',
              mini: [
                'AVI, Av. Francia 49',
                '9–20:30, cierra domingo',
                'Carrefour Express, S. Marcial 21',
                '9–21 h',
              ],
              body: [
                'Para el resto: legumbre de bote, pan, fruta y bebidas vegetales. Los dos son caros para lo que son y a veces tienen estanterías a medias en hora punta, así que la compra fuerte mejor hacerla el primer día. Hay además un mini-market en Av. de Francia 16 abierto de 7:00 a 00:00 todos los días, útil para el pan del madrugón.',
              ],
            },
          ],
        },
        {
          heading: 'Cerca de Aínsa, el día de Añisclo',
          cards: [
            {
              label: 'La joya',
              kind: 'alternativa',
              title: 'La Tarara de Guaso',
              mini: [
                'Plaza mayor, Guaso',
                '100% vegano y vegetariano',
                '**Reserva obligatoria**',
                'Menú degustación',
              ],
              body: [
                'En Guaso, un pueblo minúsculo a cinco minutos de Aínsa. Menú degustación con producto local y de temporada, la dueña explica cada plato y el tofu ahumado sale en casi todas las reseñas. Es de esos sitios por los que la gente alarga el viaje un día, y encaja perfecto con el día 4 (Añisclo o Pineta) porque está justo en la ruta de vuelta.',
                'No tiene teléfono público fijo en los directorios: hay que reservar por sus redes o preguntando en la oficina de turismo de Aínsa, y con antelación de verdad, no el mismo día.',
              ],
              place: {
                name: 'La Tarara (Guaso)',
                lat: 42.4159226,
                lng: 0.0943538,
                googlePlaceId: 'ChIJj76hJpT7pxIRrZq9eoX7fys',
              },
            },
            {
              label: 'En el casco de Aínsa',
              title: 'Mora Nuei',
              mini: ['C. Portal de Abajo, 2', '12:00–23:00', 'Terraza con vistas', '676 41 54 04'],
              body: [
                'Cocina de mercado con bastantes platos veganos y cocina dispuesta a adaptar y combinar. Varias reseñas cuentan que casi todos los entrantes del menú del día eran veganos y que acabaron pidiendo dos entrantes cada uno. Aviso práctico: a la hora de comer suelen exigir menú del día para toda la mesa.',
              ],
              place: {
                name: 'Mora Nuei',
                lat: 42.4157516,
                lng: 0.1398182,
                googlePlaceId: 'ChIJxb9Bmlr7pxIRhTeMmn0c0CQ',
              },
            },
          ],
        },
        {
          heading: 'La regla de oro',
          body: [
            'En los refugios (Estós, Cap de Llauset) y en los bares de ruta (La Besurta, Llanos del Hospital, Pineta) el plato vegano no está garantizado: avisar al reservar el refugio y, para los bares, contar con que lo seguro es patatas, pan con tomate y poco más. Los cinco días de ruta se resuelven mejor con bocadillo de casa, hummus, fruta y frutos secos que confiando en encontrar algo arriba.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────── OFFLINE
    {
      id: 'offline',
      short: 'Offline',
      title: 'Offline y tracks',
      intro:
        'Esta guía funciona sin cobertura en cuanto la abras una vez con datos: se queda guardada en el móvil. Lo que *no* funciona sin cobertura son los botones de Google Maps de cada día. Esta sección lo arregla.',
      sections: [
        {
          heading: '1. Instálala como app',
          body: [
            'En Android, menú de Chrome → **Instalar aplicación**. En iPhone, botón de compartir en Safari → **Añadir a pantalla de inicio**. Queda con icono propio, se abre a pantalla completa sin barra del navegador y ya no necesita señal. Hay que abrirla una vez con wifi para que se guarde todo, incluidas las tipografías.',
          ],
          widget: 'instalar',
        },
        {
          heading: '2. Los {n} puntos, de golpe, en Organic Maps',
          body: [
            '**Organic Maps** es gratis, sin cuenta y sin anuncios, y sus mapas son offline de serie: curvas de nivel, sendas señalizadas, refugios y fuentes. Es lo que hay que llevar en el monte, no Google Maps.',
          ],
          links: [{ label: 'Instalar Organic Maps', href: 'https://omaps.app/get' }],
          widget: 'puntos',
        },
        {
          body: [
            'Ese botón abre Organic Maps con todos los parkings, pueblos y sitios de comer de la guía marcados a la vez. Es un enlace `om://`, o sea que funciona **sin conexión**. Si al pulsarlo no pasa nada, es que la app no está instalada todavía.',
          ],
          cards: [
            {
              label: 'Punto por punto',
              title: 'Por si quieres solo uno',
              body: [],
              widget: 'puntos-uno-a-uno',
              note: 'Si preferís OsmAnd, Locus o cualquier otra, cambiad `om://map?v=1&ll=` por `geo:`: por ejemplo `geo:42.58172,0.6962` abre el punto en la app de mapas que elijas. También funciona offline.',
            },
          ],
        },
        {
          heading: '3. Mapas descargados, la noche antes',
          list: [
            '**Organic Maps:** al abrirlo, buscar Huesca y Lleida y descargar las dos regiones. Son unos pocos cientos de MB y traen las sendas del GR-11, los refugios y las curvas de nivel. Lleida hace falta para el día 5 (Llauset está justo en el límite) y para la Vall de Boí.',
            '**Google Maps:** perfil → Mapas sin conexión → Selecciona tu propio mapa, y encuadrar el rectángulo Benasque–Aínsa–Bielsa–Pont de Suert. No se puede automatizar con un enlace, hay que hacerlo a mano. Sirve para la carretera, no para el monte: sin cobertura no dibuja senderos.',
            'Los mapas offline de Google **caducan** a los 30 días o menos si no se refrescan, así que hay que bajarlos la semana del viaje, no un mes antes.',
          ],
        },
        {
          heading: '4. Los tracks GPX',
          body: [
            'Nada de fiarse de la memoria en Llauset, donde las marcas del GR están desgastadas. Tres fuentes, en orden de fiabilidad:',
          ],
          list: [
            '**Red Natural de Aragón** (rednaturaldearagon.com): tracks oficiales en .gpx de los senderos balizados, gratis y sin cuenta. Es la fuente buena para los Llanos de la Larri y los senderos señalizados del parque natural.',
            '**Wikiloc**: cobertura total de la zona, pero con truco. Desde el móvil te pide Premium; **desde el navegador del ordenador, con cuenta gratuita, sí se descarga** el .gpx (botón Descargar → Archivo → Track original). Las rutas subidas por cuentas ORG (organismos y clubes) sí se pueden descargar y navegar gratis también desde la app.',
            '**Tu propia cuenta**: las rutas que subes tú se pueden seguir gratis desde la app. Truco conocido: bajar el gpx en el ordenador, resubirlo a tu perfil como privado, y ya lo navegas gratis en el móvil.',
          ],
        },
        {
          body: [
            'Para meterlos en Organic Maps: mandarte el .gpx por WhatsApp o Telegram a ti mismo, o tenerlo en Archivos, y pulsar sobre él → **Abrir con Organic Maps**. Importa GPX directamente desde 2023, no hace falta convertirlo a KML. Aparecen en la pantalla de Marcadores y rutas y se dibujan sobre el mapa offline.',
          ],
        },
        {
          heading: 'Checklist de la noche antes',
          list: [
            'Abrir esta guía con wifi (para que se refresque) y comprobar que se abre en modo avión.',
            'Cargar los {n} puntos en Organic Maps con el botón de arriba.',
            'Huesca y Lleida descargadas en Organic Maps.',
            'Rectángulo Benasque–Aínsa descargado en Google Maps.',
            'GPX del día importado y visible en el mapa.',
            'Batería externa cargada. Con el GPS activo y sin cobertura el móvil se vacía en cuatro horas.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────── INFO
    {
      id: 'info',
      short: 'Info',
      title: 'Info práctica',
      sections: [
        {
          heading: 'Horarios',
          body: [
            'La regla del verano pirenaico: en marcha antes de las 8:00, punto alto antes de las 14:00, de vuelta al coche a media tarde. Las tormentas de agosto son de tarde y bastante puntuales. Los parkings buenos (Estós, Llanos del Hospital, San Úrbez) se llenan entre las 9:00 y las 10:30.',
          ],
        },
        {
          heading: 'Fechas que importan en 2026',
          list: [
            'Besurta, Vallibierna y Espigantosa cerrados al coche: 20 de junio a 13 de septiembre.',
            'Pradera de Ordesa cerrada al coche particular, en lanzadera desde Torla o a pie por el Turieto: 19 de junio a 20 de septiembre.',
            'Catedral de Roda de Isábena: cerrada los martes y las tardes de lunes.',
            'Iglesias de la Vall de Boí: 10:00–14:00 y 16:00–19:00.',
            'Si el viaje se mueve a finales de septiembre se abren en coche La Besurta, Vallibierna y la Pradera de Ordesa, y el plan cambia entero. Merece la pena recalcularlo.',
          ],
        },
        {
          heading: 'Mochila',
          list: [
            'Dos litros de agua por persona. En Batisielles y Llauset no hay fuentes fiables arriba.',
            'Capas: a 2.500 m hace frío aunque en Benasque haya 30 °C. Cortavientos siempre.',
            'Botas con suela agarrada. Llauset y el Ibón Gran son terreno de bloques.',
            'Crema solar y gorra: por encima de 2.000 m el sol pega el doble.',
            'Toalla fina y chanclas para el día de baño y para las pozas termales.',
            'Efectivo suelto: el parking de Pineta y algunos accesos se pagan en metálico.',
            'Tracks descargados en el móvil y batería externa. Cobertura irregular en todos los valles.',
          ],
        },
        {
          heading: 'Seguridad',
          body: [
            'Emergencias **112**. Consultar la predicción de montaña de AEMET para el Pirineo aragonés la noche antes, no la del pueblo. En los ibones no hay socorristas: el agua a 12 °C corta la respiración los primeros segundos, así que nada de entrar de golpe ni bañarse por separado.',
          ],
        },
        {
          heading: 'Por si acaso',
          body: [
            'Horarios, precios y accesos son los publicados para la temporada 2026 y pueden cambiar. Los tres que conviene reconfirmar la semana antes: los avisos del parque nacional (carretera de Añisclo), el pase reservado de Roda y el estado de las pozas de los Baños de Benasque.',
          ],
        },
      ],
    },
  ],

  footer: [
    'Guía para 5 días completos con base en Benasque, sin autobuses y con coche propio. Distancias, desniveles y tiempos son de ida y vuelta e incluyen paradas razonables, no ritmo de carrera.',
    'Los perfiles de altitud son esquemas orientativos, no datos GPS.',
  ],
}

// Duplicado a proposito: La tarea 7 puede borrar el modelo antiguo sin tocar el catalogo.
const activities: Activity[] = [
  {
    id: 'aigualluts', area: 'llanos-hospital', areaLabel: 'Llanos del Hospital',
    category: 'montana', effort: 'medio', duration: 'dia-completo', combinability: 'standalone',
    title: 'Forau de Aigualluts', short: 'Aigualluts',
    tags: ['Sin bus, a pie desde el parking'],
    stats: { distanceKm: 13, ascentM: 400, hours: '5-6', driveMin: 25 },
    lede: 'El sumidero donde el Ésera desaparece bajo tierra y reaparece en el valle de Arán, ya como Garona. Cascada, praderas y el glaciar del Aneto de fondo. Casi todo llano: día ideal para empezar.',
    access: [
      'Desde Benasque, A-139 hacia el Hospital de Benasque (13 km). El coche se queda en el **parking público del Vado / Llanos del Hospital**, último punto al que se puede subir en verano. Gratis y grande, pero en agosto se llena entre las 10:00 y las 10:30: hay que estar allí sobre las 8:30.',
    ],
    route: [
      "Parking → hotel de Llanos del Hospital y Plan d'Están: unos 4,5 km casi horizontales por el fondo del valle. La senda por la pradera es más bonita que la pista, así que se puede subir por una y bajar por la otra.",
      'La Besurta: aquí llega el autobús, así que a partir de este punto hay gente. Bar y merendero, bien para la vuelta.',
      'Cruzar la palanca de madera, desvío a la izquierda (a la derecha se va al refugio de la Renclusa y al Aneto) y subida corta y pedregosa.',
      'Forau de Aigualluts, vallado y visible desde el borde. Merece seguir 15 minutos más hasta la cascada y el Plan de Aigualluts: la vista del Aneto está ahí, no en el agujero.',
    ],
    sections: [
      {
        heading: 'Si sobra cuerpo', body: [],
        list: [
          '**Ibones de Villamuerta** desde La Besurta: unos 3 km ida y vuelta y 200 m de desnivel.',
          '**Ibón del Toro**, subiendo desde el Plan de Aigualluts. Alarga el día hora y media.',
        ],
      },
    ],
    places: [{ name: 'Parking del Vado', lat: 42.6814742, lng: 0.6040248, googlePlaceId: 'ChIJ5YBFfomHqBIR6oKfwzNY1oA' }],
    elevationProfile: {
      start: 1760, end: 2050, startLabel: 'parking', endLabel: "Plan d'Aigualluts",
      points: [
        [0, 1760],
        [1.2, 1790],
        [2.2, 1825],
        [3, 1855],
        [3.9, 1955],
        [4.7, 2050],
        [5.3, 2080],
        [6.1, 2065],
        [6.5, 2050],
      ],
    },
    variants: [
      {
        id: 'la-besurta', title: 'Solo hasta La Besurta',
        stats: { distanceKm: 9, distanceNote: 'i/v', ascentM: 180, hours: '3', extra: [{ value: 'Mismo parking' }] },
        summary: [
          "El tramo del Plan d'Están es el más bonito del día y es casi llano: praderas, ibones pequeños y el macizo de la Maladeta enfrente. Se llega al bar de La Besurta, se come algo y se vuelve. Recorta el 40% del día y no te pierdes el paisaje, solo el agujero.",
        ],
      },
    ],
  },
  {
    id: 'gorgutes-glera', title: 'Ibón de Gorgutes y Puerto de la Glera', area: 'llanos-hospital',
    areaLabel: 'Llanos del Hospital',
    category: 'montana', effort: 'medio', duration: 'media-jornada', combinability: 'normal',
    tags: ['Ibón', 'Tormenta por la tarde'],
    stats: { distanceKm: [6, 7], distanceNote: 'i/v', ascentM: 570, hours: '3-4', extra: [{ value: 'Fácil, senda rota' }] },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Más corta pero mucho más vertical: sube desde el minuto uno por un pinar con escalones de roca irregulares de una morrena glaciar. El ibón está a 2.290 m y, veinte minutos más arriba, el **Puerto de la Glera** (2.368 m) asoma a la vertiente francesa. Fue durante siglos el paso comercial principal de la zona.',
          'Empieza **1 km más allá del parking del Vado**, donde se acaba el asfalto de la A-139 (el coche se deja en la propia carretera, que está en desuso). Se hace en 4 h, así que es la carta buena para un día con tormenta anunciada por la tarde.',
        ],
        note: 'En este ibón el baño está mal visto y hay gente que lo denuncia: el chapuzón se lo dejamos al día 2. Si sobra energía, desde aquí sale el **Pico Sacroux** (9 km, 948 m, 4 h) que es uno de los grandes miradores del valle.',
      },
    ],
    places: [
      {
        name: 'Fin del asfalto de la A-139', lat: 42.6814742, lng: 0.6040248,
        note: 'Es el parking del Vado: desde ahí, 1 km más por la carretera vieja.',
      },
    ],
  },
  {
    id: 'gorgas-alba', title: 'Gorgas de Alba, sendero botánico', area: 'benasque',
    areaLabel: 'Valle de Benasque',
    category: 'agua', effort: 'bajo', duration: 'corta', combinability: 'facil',
    tags: ['Cascadas', 'Sendero botánico'],
    stats: { distanceKm: 3, distanceNote: 'circular', ascentM: 150, hours: '1', driveMin: 15 },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Saltos de agua del Ésera vistos desde dos miradores, pasarela metálica sobre el río y un hayedo pequeño pero muy bonito, con carteles identificando especies. Se sale del aparcamiento del **Hotel Turpi**, en el desvío de los Baños de Benasque (A-139, km 9, a la derecha). Cabe poco coche, unos quince o veinte.',
          'Se combina de fábula con las **pozas termales de los Baños de Benasque**, que están a un kilómetro (ver la sección de días vagos).',
        ],
      },
    ],
    places: [{ name: 'Hotel Turpi', lat: 42.667685, lng: 0.582452 }],
    affinities: [{ activityId: 'banos-benasque', weight: 3, reason: 'Están a un kilómetro.' }],
  },
  {
    id: 'batisielles', area: 'estos', areaLabel: 'Valle de Estós',
    category: 'agua', effort: 'alto', duration: 'dia-completo', combinability: 'standalone',
    title: 'Ibones de Batisielles', short: 'Batisielles',
    tags: ['Día de baño'],
    stats: { distanceKm: 13, ascentM: 770, hours: '6', driveMin: 10 },
    lede: 'Hayedos, abetos y una cadena de ibones colgados bajo las agujas de Perramó. En Benasque dicen que si el paraíso existiera estaría en Batisielles, y no exageran mucho. Este es el día de baño.',
    access: [
      'Salir de Benasque por la A-139 hacia los Llanos del Hospital y, a 3–4 km, coger el desvío a la izquierda al valle de Estós. Un kilómetro de pista hasta el aparcamiento. Es amplio, pero en agosto se llena pronto porque de aquí sale también todo el que va al refugio de Estós: mejor antes de las 9:00.',
    ],
    route: [
      "GR-11 valle arriba: embalse de Estós con su cascada, palanca de l'Aiguacari y cabaña de Santa Ana (unos 40 min).",
      'Fuen de Coronas y, a algo más de una hora del coche, el desvío señalizado a la izquierda hacia los ibones. Aquí se abandona el fondo del valle.',
      'Subida fuerte y sostenida por el hayedo y el abetal, con un puente de troncos sobre el torrente, hasta el **Ibonet de Batisielles** (1.920 m).',
      "Continuar media hora junto a la aigüeta hasta el **Ibón d'Escarpinosa** (2.047 m), la cubeta más abierta y con más sitio para tumbarse.",
    ],
    sections: [
      {
        heading: 'El baño',
        body: [
          'Los dos ibones se pueden bañar y el de Escarpinosa es el más agradecido. Ojo con la expectativa: el agua está entre 10 y 14 °C en pleno agosto. Es entrar, tres brazadas, salir y sentirse invencible. No hay nadie vigilando, así que nada de saltos ni de meterse solo mientras el otro duerme la siesta.',
        ],
      },
    ],
    places: [{ name: 'Parking de Estós', lat: 42.6289596, lng: 0.5404105, googlePlaceId: 'ChIJjRqPFMd9qBIRj-8HNlcL-GI' }],
    elevationProfile: {
      start: 1350, end: 2047, startLabel: 'parking', endLabel: 'Escarpinosa',
      points: [[0, 1350], [1, 1410], [2, 1495], [2.8, 1555], [3.6, 1815], [4.4, 1990], [5.1, 2020], [5.8, 2047], [6.5, 2047]],
    },
    variants: [
      {
        id: 'ibonet', title: 'Solo el Ibonet de Batisielles',
        stats: { distanceKm: 10, distanceNote: 'i/v', ascentM: 600, hours: '4', extra: [{ value: 'Mismo parking' }] },
        summary: [
          'Dar la vuelta en el primer ibón, que además es el más fotogénico de los tres y tiene una cabaña de pastor al lado. Ahorra la última media hora de subida y unos 170 m de desnivel. Se puede bañar igual.',
        ],
      },
      {
        id: 'ibon-gran', title: 'Ibón Gran de Batisielles', label: 'Si sobra cuerpo',
        stats: { extra: [{ value: '**+2 km**' }, { value: '**+400 m**' }, { value: '**+1 h** subida' }, { value: 'Bloques' }] },
        summary: [
          'El grande de verdad, a 2.208 m y de un azul bastante más oscuro. La subida cruza un tramo largo de bloques de roca, incómodo pero no técnico. Con esto el día se va a 7 h. También se puede cerrar circular volviendo por el refugio de Estós en lugar de deshacer camino.',
        ],
      },
    ],
  },
  {
    id: 'valle-estos', title: 'Vereda de Estós hasta el refugio', area: 'estos', areaLabel: 'Valle de Estós',
    category: 'paseo', effort: 'bajo', duration: 'dia-completo', combinability: 'normal',
    tags: ['Hayedo', 'Refugio'],
    stats: {
      extra: [
        { value: '**2 h 30** ida' },
        { value: 'Casi llano' },
        { value: 'Comida en refugio' },
        { value: 'Mismo parking' },
      ],
    },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Pista cómoda por el fondo del valle sin desnivel serio, entre hayedos y con el Perdiguero de fondo. Se come caliente en el refugio de Estós y se vuelve en 2 h. El día de baño se resuelve en las **pozas del río Estós** cerca del propio aparcamiento, que son de agua igual de fría pero sin los 770 m de subida.',
        ],
      },
    ],
  },
  {
    id: 'roda-isabena', area: 'ribagorza', areaLabel: 'Ribagorza',
    category: 'cultura', effort: 'muy-bajo', duration: 'dia-completo', combinability: 'normal',
    title: 'Románico y descanso', short: 'Cultura',
    tags: ['Día cultural'],
    stats: {
      extra: [
        { label: 'Andar', value: '2–3 km' },
        { label: 'Coche', value: '1 h ida' },
        { label: 'Visita', value: '1 h' },
        { label: 'Cerrado', value: 'Martes' },
      ],
    },
    lede: 'Día de piernas al ralentí en medio del viaje. Roda de Isábena tiene la catedral más antigua de Aragón y la más pequeña de España, en el pueblo más pequeño del país con sede catedralicia. Se come en el refectorio.',
    accessHeading: 'Reservar antes',
    access: [
      'La catedral de San Vicente se ve solo con visita guiada, en pases de aproximadamente una hora y con aforo limitado. De junio a septiembre: 11:15, 12:30 y 13:30, y por la tarde 16:30, 17:30 y 18:30. **Lunes solo mañana y martes cerrado todo el día.** Entradas en el Museo Diocesano Barbastro-Monzón (974 315 581). El claustro se recorre libremente.',
    ],
    accessLinks: [{ label: 'Comprar entrada', href: 'https://museodiocesano.es/entradas/', ghost: true }],
    routeHeading: 'El día, ordenado',
    route: [
      'Salir de Benasque sin prisa y parar en el **Congosto de Ventamillo**: tres kilómetros de carretera encajonada entre paredes calizas verticales. Hay dónde dejar el coche y asomarse.',
      '**Villanova**, de paso: dos iglesias de románico lombardo de los siglos XI y XII a pie de carretera.',
      '**Roda de Isábena**: visita guiada, cripta abierta bajo el altar, pinturas murales de la sala capitular y las inscripciones necrológicas de los capiteles del claustro. El coche se deja fuera del pueblo y se entra por unas escaleras empedradas bajo los soportales.',
      'Comer en la **Hospedería de Roda**, cuyo comedor es el antiguo refectorio de la catedral. El sitio es medio motivo del viaje, pero la carta es cocina tradicional ribagorzana: hay que reservar y preguntar por teléfono si pueden montar algo vegano (974 544 545). Si no, mejor comer antes de salir y dejar aquí solo un café.',
      'De vuelta, **Anciles** (a dos kilómetros de Benasque, casas solariegas de piedra, se ve en 40 minutos) y el casco antiguo de **Benasque** con el palacio de los condes de Ribagorza.',
    ],
    places: [
      { name: 'Roda de Isábena', lat: 42.291371, lng: 0.5282342 },
      { name: 'Congosto de Ventamillo', lat: 42.481981, lng: 0.4461104, googlePlaceId: 'ChIJF6zWNfrZpxIRxtR9UInrBI8' },
      { name: 'Anciles', lat: 42.5907204, lng: 0.5099826, googlePlaceId: 'ChIJhWXE-iB5qBIRf4ELCx-Cj_s' },
    ],
    variants: [],
    affinities: [{ activityId: 'ainsa', weight: 1, reason: 'Encaja si se acepta más coche.' }],
  },
  {
    id: 'ainsa', title: 'Aínsa', area: 'ainsa', areaLabel: 'Aínsa',
    category: 'cultura', effort: 'muy-bajo', duration: 'dia-completo', combinability: 'normal',
    tags: ['Casco medieval', 'Plan de lluvia'],
    stats: { driveMin: 75, extra: [{ value: 'Andar **2 km**' }, { value: 'Todo el día' }, { value: 'Sin reserva' }] },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Casco medieval amurallado sobre un promontorio, con la plaza mayor porticada y el castillo del antiguo reino de Sobrarbe. La subida por las calles empedradas hasta la fortificación tiene vistas a todo el Sobrarbe y a Peña Montañesa. Es la alternativa obvia si Roda está cerrada, y también el plan de lluvia porque hay dónde meterse.',
          'Aínsa y Roda están a una hora entre sí: juntarlas en un día es posible, pero sale un día de tres horas y media de coche.',
        ],
      },
    ],
    places: [{ name: 'Aínsa', lat: 42.4172743, lng: 0.1386853 }],
  },
  {
    id: 'vall-boi', title: 'Románico de la Vall de Boí', area: 'boi', areaLabel: 'Vall de Boí',
    category: 'cultura', effort: 'muy-bajo', duration: 'dia-completo', combinability: 'standalone',
    tags: ['Románico', 'UNESCO'],
    stats: { driveMin: 105, extra: [{ value: '9 iglesias' }, { value: 'UNESCO' }, { value: '10–14 / 16–19 h' }] },
    sections: [
      {
        heading: 'El plan',
        body: [
          'La mejor concentración de románico del Pirineo, Patrimonio de la Humanidad. **Sant Climent de Taüll** es la parada obligatoria: se entra con entrada y hay una proyección sobre el ábside que reconstruye cómo estaban pintadas las paredes originalmente (los frescos están en el MNAC de Barcelona). Santa Maria de Taüll y Sant Joan de Boí completan la visita.',
          'Abren de 10:00 a 14:00 y de 16:00 a 19:00, así que la comida parte el día en dos. Se va de iglesia en iglesia en coche, lo que lo hace buen plan de día tirando a nublado.',
        ],
      },
    ],
    places: [{ name: 'Sant Climent de Taüll', lat: 42.5174264, lng: 0.8486653 }],
  },
  {
    id: 'benasque-anciles', title: 'Benasque, Anciles y Cerler a pie', area: 'benasque',
    areaLabel: 'Benasque y Anciles',
    category: 'pueblos', effort: 'muy-bajo', duration: 'corta', combinability: 'facil',
    tags: ['Sin coche', 'Casi llano'],
    stats: { distanceKm: 5, hours: '2-3', extra: [{ value: 'Casi llano' }, { value: 'Sin coche' }] },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Casco antiguo de Benasque (iglesia de San Marcial, palacio de los condes de Ribagorza, casas blasonadas), paseo llano de dos kilómetros hasta **Anciles** y vuelta.',
        ],
      },
    ],
    affinities: [{ activityId: 'cerler-ampriu', weight: 2, reason: 'Cerler queda como salida propia, no dentro del paseo.' }],
  },
  {
    id: 'anisclo', area: 'anisclo', areaLabel: 'Cañón de Añisclo',
    category: 'montana', effort: 'medio', duration: 'dia-completo', combinability: 'standalone',
    title: 'Cañón de Añisclo', short: 'Añisclo',
    tags: ['Día largo · 2 h de coche'],
    stats: { distanceKm: 16, ascentM: 500, hours: '6', driveMin: 120 },
    lede: 'El Ordesa al que sí se llega en coche. Una garganta de 25 km excavada por el Bellós y una senda que se mete en ella entre hayedos y pozas de agua turquesa hasta la pradera de La Ripareta. Madrugón obligatorio.',
    accessHeading: 'Cómo llegar (esto tiene truco)',
    access: [
      'Benasque → Aínsa → Escalona, y desde allí la **HU-631** por el desfiladero de las Cambras hasta el parking de San Úrbez. Unas 2 h de coche, la última media hora de curvas continuas. La carretera es de **sentido único ascendente** (sur a norte, de Puyarruego hacia La Tella) en temporada alta, así que hay que entrar por el sur o no se llega al parking. El aparcamiento es pequeño y se llena a media mañana: salir de Benasque a las 7:00.',
    ],
    accessLinks: [{ label: 'Avisos del parque', href: 'https://pnomp.es/es/avisos', ghost: true }],
    accessNote: 'Comprobar los avisos del parque nacional el día antes: esta carretera se corta con cierta frecuencia por obras o desprendimientos.',
    route: [
      'Del parking al puente medieval y la **ermita de San Úrbez**, encajada en la roca.',
      'Senda del cañón río arriba: **Cumaz** (1 h), **Selva Plana** (2 h) y **La Ripareta** (3 h). Camino cómodo, umbrío y con poco desnivel; la altura se gana casi sin notarlo.',
      'Comer en la pradera de La Ripareta con las paredes del cañón cerrando el cielo, y volver por el mismo sitio.',
    ],
    sections: [
      {
        heading: 'Sobre el baño aquí',
        body: [
          'El Bellós forma pozas espectaculares y la gente se remoja. Estamos en parque nacional: chapuzón discreto, sin jabón, sin cremas recién puestas y sin dejar rastro. El baño oficial del viaje sigue siendo el día 2.',
        ],
      },
    ],
    places: [{ name: 'Parking de San Úrbez', lat: 42.5588298, lng: 0.050276 }],
    elevationProfile: {
      start: 950, end: 1360, startLabel: 'San Úrbez', endLabel: 'La Ripareta',
      points: [[0, 950], [1.25, 975], [2.5, 1025], [3.75, 1105], [5, 1180], [6.25, 1255], [7.25, 1335], [8, 1360]],
    },
    variants: [
      {
        id: 'cumaz-selva-plana', title: 'Hasta Cumaz o Selva Plana',
        stats: {
          distanceKm: [5, 8], distanceNote: 'i/v', ascentM: [150, 300], hours: '2-4',
          extra: [{ value: 'Mismo parking' }],
        },
        summary: [
          'Las tres etapas son continuación una de otra, así que se puede dar la vuelta donde el cuerpo diga. Cumaz (1 h de ida) va pegado al río y es el tramo con más pozas; en Selva Plana (2 h) ya empieza a asomar el macizo de Monte Perdido. Con la vuelta desde Selva Plana el día se queda en 4 h de marcha, que con 4 h de coche total sigue siendo un día completo pero llevadero.',
        ],
      },
      {
        id: 'san-urbez', title: 'Ermita de San Úrbez y molino de Aso', label: 'Versión mínima',
        stats: {
          distanceKm: 1.5, distanceNote: 'circular',
          extra: [{ value: 'Casi llano' }, { value: '**45 min**' }, { value: 'Balizada "ruta del agua"' }],
        },
        summary: [
          'Puente medieval altísimo, ermita metida en la roca y molino. Con 45 minutos de caminata no compensa el viaje por sí solo: es la versión mínima para cuando el cañón se hace sobre todo en coche.',
        ],
      },
      {
        id: 'fuenblanca', title: 'Fuenblanca', label: 'Versión larga',
        stats: { hours: '5 de ida', extra: [{ value: 'Día entero' }, { value: 'Salida de noche' }] },
        summary: [
          'La **cascada de Fuenblanca**, siguiendo Añisclo más allá de La Ripareta, son 5 h de ida. Exige salir de Benasque de noche y aceptar que el día se va entero.',
        ],
        note: 'No confundirla con una prolongación pequeña de La Ripareta: son cinco horas solo para llegar.',
      },
    ],
  },
  {
    id: 'pueblos-vio', title: 'Ruta panorámica de Vió, Buerba y Fanlo', area: 'anisclo',
    areaLabel: 'Valle de Vió',
    category: 'pueblos', effort: 'muy-bajo', duration: 'media-jornada', combinability: 'facil',
    tags: ['En coche', 'Sin caminata fija'],
    sections: [
      {
        heading: 'El plan',
        body: [
          'La propia HU-631 por el fondo del cañón es el espectáculo. Se vuelve por la carretera que lo bordea, parando en **Vió, Buerba y Fanlo**, pueblos de piedra medio despoblados. Si apetece andar algo, se puede sumar la ruta del agua de San Úrbez; si no, se cierra comiendo en Aínsa.',
        ],
      },
    ],
    affinities: [{ activityId: 'ainsa', weight: 2, reason: 'Se puede cerrar comiendo allí.' }],
  },
  {
    id: 'llanos-larri', title: 'Valle de Pineta: Llanos de la Larri', area: 'pineta',
    areaLabel: 'Valle de Pineta',
    category: 'montana', effort: 'medio', duration: 'media-jornada', combinability: 'normal',
    tags: ['Hayedo', 'Cascadas'],
    stats: { distanceKm: 5.6, distanceNote: 'circular', ascentM: 300, hours: '2 h 30', driveMin: 105 },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Mismo parque nacional, otro sector, y bastante menos coche si se va por Campo y Salinas de Sin sin pasar por Aínsa. Desde el parking de la Pradera de Pineta (junto al Parador, 1,5–3 € al día, en efectivo) se sube por un hayedo cerrado hasta una pradera colgada 300 m sobre el valle, con Monte Perdido enfrente. La bajada se hace por el **camino de las cascadas**, con escalones y miradores sobre los saltos de la Larri.',
          'Es la mejor relación paisaje/esfuerzo de todo el viaje: media jornada de marcha en el sitio más espectacular. En el mismo valle están las cascadas del Cinca, a un paseo del parking.',
        ],
      },
    ],
    places: [{ name: 'Pineta', lat: 42.6752938, lng: 0.0885038 }],
    variants: [
      {
        id: 'balcon-pineta', title: 'Balcón de Pineta', label: 'Versión dura',
        stats: { hours: '7-8', ascentM: 1300, extra: [{ value: 'Duro' }, { value: 'Salida de noche' }] },
        summary: [
          'Desde el mismo parking de Pineta, es uno de los desniveles más brutos del Pirineo aragonés, con el lago de Marboré arriba. Exige salir de Benasque de noche y aceptar que el día se va entero.',
        ],
        note: 'No es la Larri con un poco más de subida: es una jornada dura de alta montaña.',
      },
    ],
    affinities: [{ activityId: 'bielsa-chistau', weight: 1, reason: 'Bielsa queda en el mismo lado del viaje.' }],
  },
  {
    id: 'llauset-anglios', area: 'llauset', areaLabel: 'Llauset',
    category: 'montana', effort: 'alto', duration: 'dia-completo', combinability: 'standalone',
    title: 'Llauset y Angliós', short: 'Llauset',
    tags: ['Ruta apartada'],
    stats: { distanceKm: 10, ascentM: 730, hours: '5', driveMin: 95 },
    lede: 'Circular de alta montaña que empieza ya a 2.200 m, así que el coche hace medio trabajo. Paisaje mineral, dos collados y una ristra de ibones. La cara sureste del Aneto sin la multitud de la cara norte.',
    access: [
      'Benasque → Castejón de Sos → N-260 → N-230 hacia el norte hasta el pueblo de **Aneto**. Desde allí, 10 km de carretera asfaltada que sube al embalse de Llauset. Está bacheada pero pasa cualquier turismo despacio. Al final hay un **túnel que se bifurca: hay que coger la izquierda**, y el parking aparece justo al salir, al pie de la presa.',
    ],
    routeHeading: 'El recorrido (circular)',
    route: [
      'Cruzar a pie un segundo túnel corto y bordear el embalse por la derecha siguiendo las marcas blancas y rojas del GR-11.',
      'Puente metálico sobre el río del Cap de Llauset y subida de unos 300 m hasta el **Ibón de Botornás** y el refugio del Cap de Llauset (1 h 20 desde el coche).',
      'Ibón de Cap de Llauset y **Collada dels Estanyets** (2.534 m, el punto alto del día).',
      "Bajada a los **Estanys d'Angliós** y su cabaña. El mejor sitio para comer y, si el sol acompaña, los ibones pequeños se templan lo justo para un chapuzón.",
      "Última subida corta y empinada a la **Collada d'Angliós** (2.438 m) y descenso al parking con el embalse a la vista.",
    ],
    routeNote: 'Hay tramos largos sobre bloques de roca y algún punto donde las marcas del GR están desgastadas. No es técnico, pero conviene llevar el track descargado y no dejarlo para un día de niebla.',
    places: [{ name: 'Presa de Llauset', lat: 42.58172, lng: 0.6962, googlePlaceId: 'ChIJT5idxWmDqBIRQQF5TqDcU_8' }],
    elevationProfile: {
      start: 2197, end: 2197, startLabel: 'presa', highLabel: 'Collada dels Estanyets', endLabel: 'presa',
      points: [
        [0, 2197],
        [1.4, 2309],
        [2.65, 2384],
        [3.75, 2496],
        [4.85, 2422],
        [6.1, 2534],
        [7.35, 2384],
        [8.6, 2496],
        [10, 2197],
      ],
    },
    variants: [
      {
        id: 'refugio', title: 'Ida y vuelta al refugio Cap de Llauset',
        stats: { distanceKm: 7, distanceNote: 'i/v', ascentM: 300, hours: '3', extra: [{ value: 'Mismo parking' }] },
        summary: [
          '3,5 km y 1 h 20 por trayecto, todo por sendero homologado GR y sin complicaciones en verano. Se ve el Ibón de Botornás, se come en el refugio (mejor avisar por teléfono si queréis plato caliente) y se vuelve por el mismo camino. Se quita los dos collados, que son la parte dura, y deja el día en media jornada.',
        ],
      },
      {
        id: 'estanys', title: "Solo los Estanys d'Angliós", label: 'Media circular',
        stats: { distanceKm: [7, 8], distanceNote: 'i/v', ascentM: 450, hours: '4', extra: [{ value: '1 collado' }] },
        summary: [
          "Del parking directo a la **Collada d'Angliós** (la senda 2, la que sale a la derecha en el cruce del panel), bajar a los ibones de Angliós, comer allí y volver por el mismo collado. Es la mitad bonita del circuito con un solo collado en lugar de dos.",
        ],
      },
    ],
  },
  {
    id: 'ardones', title: 'Cascada de Ardonés, ruta de las tres cascadas', area: 'cerler', areaLabel: 'Cerler',
    category: 'agua', effort: 'bajo', duration: 'media-jornada', combinability: 'facil',
    tags: ['Cascadas', 'Dos longitudes'],
    stats: { distanceKm: [2, 7], ascentM: [130, 256], hours: '1-3', driveMin: 20 },
    sections: [
      {
        heading: 'El plan',
        body: [
          'Circular con tres saltos de agua, y la de Ardonés es de las más espectaculares del valle. Dos versiones: la corta desde el aparcamiento pequeño de la carretera de Cerler al Ampriu (bucle de hora y media) o la larga saliendo del propio pueblo de **Cerler** (7 km y 256 m). Junto a la cascada el sendero se estrecha y hay un cable de acero fijado a la roca para agarrarse.',
        ],
      },
    ],
    places: [{ name: 'Cascada de Ardonés', lat: 42.589002, lng: 0.56939, googlePlaceId: 'ChIJcRY0SlN-qBIRCbt7CqdsoLA' }],
    affinities: [{ activityId: 'cerler-ampriu', weight: 2, reason: 'Comparten la subida a Cerler.' }],
  },
  {
    id: 'picos-cerler-gallinero', title: 'Pico Cerler o Gallinero desde el Ampriu', area: 'cerler',
    areaLabel: 'Ampriu',
    category: 'montana', effort: 'alto', duration: 'media-jornada', combinability: 'normal',
    tags: ['Cima', 'Confirmar telesilla'],
    stats: {
      driveMin: 25,
      extra: [
        { value: 'Cerler: **6,4 km · 523 m**' },
        { value: 'Gallinero: **7 km · 860 m**' },
        { value: '**3 h 30 / 3 h 45**' },
      ],
    },
    sections: [
      {
        heading: 'El plan',
        body: [
          'El coche sube hasta el aparcamiento del Ampriu, a 1.900 m, y desde ahí las dos cimas son asequibles: el **Pico Cerler** (2.407 m, la pirámide que se ve desde el pueblo) y el **Gallinero** (2.728 m), con una de las mejores panorámicas del valle. La trampa: en agosto suele funcionar el **telesilla del Amor**, y con él al Pico Cerler solo le quedan unos 95 m de desnivel. Conviene confirmar horarios en la estación antes de subir, porque cambian por semanas.',
        ],
      },
    ],
    places: [{ name: 'Ampriu', lat: 42.5611815, lng: 0.5695076 }],
    variants: [
      {
        id: 'pico-cerler', title: 'Pico Cerler', stats: { distanceKm: 6.4, ascentM: 523, hours: '3 h 30' },
        summary: [
          'La pirámide de 2.407 m que se ve desde el pueblo. Si funciona el telesilla del Amor, quedan unos 95 m de desnivel; confirmad horarios antes de contar con él.',
        ],
      },
      {
        id: 'gallinero', title: 'Gallinero', stats: { distanceKm: 7, ascentM: 860, hours: '3 h 45' },
        summary: ['Cima de 2.728 m con una de las mejores panorámicas del valle. Es la opción que conserva una subida seria.'],
      },
    ],
  },
  {
    id: 'banos-benasque', title: 'Pozas termales de los Baños de Benasque', area: 'benasque',
    areaLabel: 'Baños de Benasque',
    category: 'relax', effort: 'muy-bajo', duration: 'corta', combinability: 'facil',
    tags: ['Agua termal', 'Gratis'],
    sections: [
      {
        heading: 'Antes de ir',
        body: [
          'El balneario, que era el más alto de España a 1.720 m, **cerró en 2019** y el edificio está en ruinas: no se puede reservar nada ni hay spa que valga. Lo que sí funciona es la **piscina termal al aire libre y unas bañeras** junto al edificio, de agua sulfurada a unos 30–37 °C, de uso libre y gratuito. Hay que ir temprano porque se llena y pierde toda la gracia, el último tramo de acceso no está asfaltado y el sitio está bastante dejado. Como corresponde, no hay servicios: toalla, chanclas y agua de casa.',
          'Se combina con las Gorgas de Alba, que salen del aparcamiento de al lado.',
        ],
        places: [{ name: 'Pozas termales', lat: 42.66132, lng: 0.5853928 }],
        note: 'Es un sitio que cambia de estado a menudo y se ha hablado de rehabilitarlo. Confirmar en la oficina de turismo de Benasque antes de ir con la toalla en la mano.',
      },
    ],
    places: [{ name: 'Pozas termales', lat: 42.66132, lng: 0.5853928 }],
    affinities: [{ activityId: 'gorgas-alba', weight: 3, reason: 'Salen de aparcamientos contiguos.' }],
  },
  {
    id: 'spa-benasque', title: 'Spa de pago, sin salir del pueblo', area: 'benasque', areaLabel: 'Benasque',
    category: 'relax', effort: 'muy-bajo', duration: 'corta', combinability: 'facil',
    tags: ['Reserva previa'],
    sections: [
      {
        heading: 'Antes de reservar',
        body: [
          'Si lo que se busca es tumbona térmica y no piedra caliente, el **SOMMOS Hotel Benasque Spa** (Paseo Anciles, 5) abre el circuito a clientes externos con reserva previa: piscina de hidromasaje, baño de vapor, sala de relax y masajes. Piden gorro de baño, que venden allí. Llamar antes, porque en agosto va lleno.',
        ],
      },
    ],
  },
  {
    id: 'bielsa-chistau', title: 'Bielsa y el valle de Chistau', area: 'bielsa-chistau',
    areaLabel: 'Bielsa y Chistau',
    category: 'pueblos', effort: 'muy-bajo', duration: 'media-jornada', combinability: 'facil',
    tags: ['En coche', 'Pueblos'],
    sections: [
      {
        heading: 'El plan',
        body: [
          'Ruta de coche y pueblos: Plan, San Juan de Plan y Saravillo, arquitectura de piedra y pizarra, con Bielsa al final. 1 h 20 de coche por Campo y Salinas de Sin, casi todo a la sombra del Cotiella. Cero desnivel y muchas terrazas.',
        ],
      },
    ],
  },
  {
    id: 'paso-nuevo', title: 'Embalse de Paso Nuevo y presa de Benasque', area: 'benasque',
    areaLabel: 'Valle de Benasque',
    category: 'paseo', effort: 'muy-bajo', duration: 'corta', combinability: 'facil',
    tags: ['Paseo corto', 'Junto al Ésera'],
    sections: [
      {
        heading: 'El plan',
        body: [
          'A diez minutos en coche de Benasque, un paseo corto junto al Ésera para un rato sin piernas. No hace falta convertirlo en ruta: se anda lo que apetezca y se vuelve.',
        ],
      },
    ],
  },
  {
    id: 'congosto-ventamillo', title: 'Congosto de Ventamillo', area: 'ribagorza', areaLabel: 'Ribagorza',
    category: 'paseo', effort: 'muy-bajo', duration: 'corta', combinability: 'facil',
    tags: ['Casi desde el coche'],
    sections: [
      {
        heading: 'El plan',
        body: [
          'Tres kilómetros de carretera encajonada entre paredes calizas verticales. Hay dónde dejar el coche y asomarse; es una parada, no una excursión.',
        ],
      },
    ],
    places: [
      { name: 'Congosto de Ventamillo', lat: 42.481981, lng: 0.4461104, googlePlaceId: 'ChIJF6zWNfrZpxIRxtR9UInrBI8' },
    ],
  },
  {
    id: 'benasque-eriste', title: 'Benasque–Eriste', area: 'benasque', areaLabel: 'Benasque y Eriste',
    category: 'paseo', effort: 'bajo', duration: 'corta', combinability: 'facil',
    tags: ['Paseo de valle', 'Cifras aproximadas'],
    lede: 'Un paseo de fondo de valle para seguir moviéndose sin pedirle al día una cima.',
    route: [
      'Salir desde Benasque hacia Eriste por el corredor del valle y volver por el mismo trazado si no apetece alargar. Las distancias y el tiempo son aproximados: comprobad el trazado antes de salir.',
    ],
    stats: { distanceKm: 6.3, ascentM: 80, hours: '1 h 40' },
  },
  {
    id: 'eriste-anciles', title: 'Eriste–Anciles', area: 'benasque', areaLabel: 'Eriste y Anciles',
    category: 'paseo', effort: 'bajo', duration: 'corta', combinability: 'facil',
    tags: ['Paseo de valle', 'Cifras aproximadas'],
    lede: 'La carta tranquila entre dos pueblos, sin mezclarla con el paseo urbano de Benasque.',
    route: [
      'Unir Eriste y Anciles a ritmo de paseo y dejar margen para parar en los pueblos. El tiempo y la distancia son aproximados; llevad el recorrido comprobado.',
    ],
    stats: { distanceKm: 5, ascentM: 110, hours: '1 h 30' },
  },
  {
    id: 'linsoles-guayente-sahun', title: 'Linsoles, Guayente y Sahún', area: 'solano', areaLabel: 'Solano',
    category: 'pueblos', effort: 'bajo', duration: 'media-jornada', combinability: 'facil',
    tags: ['Pueblos', 'Cifras aproximadas'],
    lede: 'Tres paradas cercanas para un día de pueblos sin encadenar horas de coche.',
    route: [
      'Montar el recorrido con Linsoles, Guayente y Sahún como paradas flexibles. Los tiempos son aproximados: si hoy no están las piernas, se recorta sin perder el sentido del plan.',
    ],
    stats: { hours: '2-3' },
  },
  {
    id: 'pueblos-solano', title: 'Pueblos del Solano', area: 'solano', areaLabel: 'Solano',
    category: 'pueblos', effort: 'muy-bajo', duration: 'media-jornada', combinability: 'facil',
    tags: ['En coche', 'Cifras aproximadas'],
    lede: 'Una vuelta de pueblos para el día que pide carretera corta y paradas, no una ruta cerrada.',
    route: [
      'Elegir las paradas según el cuerpo y la hora. La duración es aproximada y depende de cuánto os entretengáis en cada pueblo.',
    ],
  },
  {
    id: 'cerler-ampriu', title: 'Cerler y Ampriu', area: 'cerler', areaLabel: 'Cerler',
    category: 'pueblos', effort: 'muy-bajo', duration: 'media-jornada', combinability: 'facil',
    tags: ['En coche', 'Cifras aproximadas'],
    lede: 'Cerler deja de fingir que cabe en el paseo Benasque–Anciles: es su propia subida, con Ampriu como continuación si apetece.',
    route: [
      'Subir a **Cerler**, a 6 km de Benasque y 1.500 m, el pueblo habitado más alto del Pirineo aragonés. Se ve en una hora; después se decide allí si se continúa al Ampriu. El tiempo total es aproximado y cambia con las paradas.',
    ],
    places: [{ name: 'Ampriu', lat: 42.5611815, lng: 0.5695076 }],
    affinities: [
      { activityId: 'ardones', weight: 2, reason: 'Comparten la carretera de Cerler.' },
      { activityId: 'benasque-anciles', weight: 2, reason: 'La subida completa el paseo de Benasque y Anciles.' },
    ],
  },
]

const infoBlocks: InfoBlock[] = [
  {
    id: 'eating', title: 'Comer vegano por la zona',
    intro: 'Aviso de expectativas: el valle de Benasque es territorio de cecina, ternasco y chiretas, y no hay ni un restaurante vegano en el pueblo. Lo que sí hay son un par de sitios que lo resuelven bien y una joya cerca de Aínsa. Llamar antes en todos los casos: en agosto van llenos y algunos cierran días sueltos.',
    sections: [
      {
        heading: 'En Benasque',
        cards: [
          {
            label: 'Lo más fiable del pueblo', title: 'Restaurante Avenida',
            mini: ['Av. los Tilos, 14', '13:00–22:30', '**Cierra miércoles**', '974 55 11 26'],
            body: [
              'No es vegano ni lo pretende, pero es lo que más recomiendan los comensales veganos que pasan por Benasque: hamburguesa vegetal y ensalada de mandarina y aguacate. Terraza en la calle. Pedir confirmación de que la hamburguesa va sin salsas con huevo o lácteos.',
            ],
            place: { name: 'Restaurante Avenida', lat: 42.6033333, lng: 0.5219444, googlePlaceId: 'ChIJv4xUnVt5qBIRD9L81sKguwU' },
            id: 'eating-0-0',
          },
          {
            label: 'Para la mochila', kind: 'vago', title: 'Casa Ramonet, productos ecológicos',
            mini: ['C. Horno, 12', '10–14 h / 17–20:30', '**Cierra domingo**', '636 96 52 28'],
            body: [
              'Tienda pequeña de producto ecológico y bastante granel: frutos secos, legumbres, miel, infusiones. Es el sitio para montar los almuerzos de ruta sin depender del supermercado. Está en una antigua carnicería del pueblo, con la nevera original todavía puesta.',
            ],
            place: { name: 'Casa Ramonet', lat: 42.6055876, lng: 0.5229561, googlePlaceId: 'ChIJPZyziq15qBIRiZqmMz3eS5I' },
            id: 'eating-0-1',
          },
          {
            label: 'Compra grande', kind: 'vago', title: 'Supermercados',
            mini: ['AVI, Av. Francia 49', '9–20:30, cierra domingo', 'Carrefour Express, S. Marcial 21', '9–21 h'],
            body: [
              'Para el resto: legumbre de bote, pan, fruta y bebidas vegetales. Los dos son caros para lo que son y a veces tienen estanterías a medias en hora punta, así que la compra fuerte mejor hacerla el primer día. Hay además un mini-market en Av. de Francia 16 abierto de 7:00 a 00:00 todos los días, útil para el pan del madrugón.',
            ],
            id: 'eating-0-2',
          },
        ],
        id: 'benasque',
      },
      {
        heading: 'Cerca de Aínsa',
        cards: [
          {
            label: 'La joya', kind: 'alternativa', title: 'La Tarara de Guaso',
            mini: ['Plaza mayor, Guaso', '100% vegano y vegetariano', '**Reserva obligatoria**', 'Menú degustación'],
            body: [
              'En Guaso, un pueblo minúsculo a cinco minutos de Aínsa. Menú degustación con producto local y de temporada, la dueña explica cada plato y el tofu ahumado sale en casi todas las reseñas. Es de esos sitios por los que la gente alarga el viaje un día, y encaja perfecto con el día 4 (Añisclo o Pineta) porque está justo en la ruta de vuelta.',
              'No tiene teléfono público fijo en los directorios: hay que reservar por sus redes o preguntando en la oficina de turismo de Aínsa, y con antelación de verdad, no el mismo día.',
            ],
            place: { name: 'La Tarara (Guaso)', lat: 42.4159226, lng: 0.0943538, googlePlaceId: 'ChIJj76hJpT7pxIRrZq9eoX7fys' },
            id: 'eating-1-0',
          },
          {
            label: 'En el casco de Aínsa', title: 'Mora Nuei',
            mini: ['C. Portal de Abajo, 2', '12:00–23:00', 'Terraza con vistas', '676 41 54 04'],
            body: [
              'Cocina de mercado con bastantes platos veganos y cocina dispuesta a adaptar y combinar. Varias reseñas cuentan que casi todos los entrantes del menú del día eran veganos y que acabaron pidiendo dos entrantes cada uno. Aviso práctico: a la hora de comer suelen exigir menú del día para toda la mesa.',
            ],
            place: { name: 'Mora Nuei', lat: 42.4157516, lng: 0.1398182, googlePlaceId: 'ChIJxb9Bmlr7pxIRhTeMmn0c0CQ' },
            id: 'eating-1-1',
          },
        ],
        id: 'ainsa',
      },
      {
        heading: 'La regla de oro',
        body: [
          'En los refugios (Estós, Cap de Llauset) y en los bares de ruta (La Besurta, Llanos del Hospital, Pineta) el plato vegano no está garantizado: avisar al reservar el refugio y, para los bares, contar con que lo seguro es patatas, pan con tomate y poco más. Los cinco días de ruta se resuelven mejor con bocadillo de casa, hummus, fruta y frutos secos que confiando en encontrar algo arriba.',
        ],
        id: 'refuges',
      },
    ],
  },
  {
    id: 'offline', title: 'Offline y tracks',
    intro: 'Esta guía funciona sin cobertura en cuanto la abras una vez con datos: se queda guardada en el móvil. Lo que *no* funciona sin cobertura son los botones de Google Maps de cada día. Esta sección lo arregla.',
    sections: [
      {
        heading: '1. Instálala como app',
        body: [
          'En Android, menú de Chrome → **Instalar aplicación**. En iPhone, botón de compartir en Safari → **Añadir a pantalla de inicio**. Queda con icono propio, se abre a pantalla completa sin barra del navegador y ya no necesita señal. Hay que abrirla una vez con wifi para que se guarde todo, incluidas las tipografías.',
        ],
        widget: 'instalar', id: 'install',
      },
      {
        heading: '2. Los {n} puntos, de golpe, en Organic Maps',
        body: [
          '**Organic Maps** es gratis, sin cuenta y sin anuncios, y sus mapas son offline de serie: curvas de nivel, sendas señalizadas, refugios y fuentes. Es lo que hay que llevar en el monte, no Google Maps.',
        ],
        links: [{ label: 'Instalar Organic Maps', href: 'https://omaps.app/get' }], widget: 'puntos',
        id: 'points-batch',
      },
      {
        body: [
          'Ese botón abre Organic Maps con todos los parkings, pueblos y sitios de comer de la guía marcados a la vez. Es un enlace `om://`, o sea que funciona **sin conexión**. Si al pulsarlo no pasa nada, es que la app no está instalada todavía.',
        ],
        cards: [
          {
            label: 'Punto por punto', title: 'Por si quieres solo uno', body: [], widget: 'puntos-uno-a-uno',
            note: 'Si preferís OsmAnd, Locus o cualquier otra, cambiad `om://map?v=1&ll=` por `geo:`: por ejemplo `geo:42.58172,0.6962` abre el punto en la app de mapas que elijas. También funciona offline.',
            id: 'offline-2-0',
          },
        ],
        id: 'points-detail',
      },
      {
        heading: '3. Mapas descargados, la noche antes',
        list: [
          '**Organic Maps:** al abrirlo, buscar Huesca y Lleida y descargar las dos regiones. Son unos pocos cientos de MB y traen las sendas del GR-11, los refugios y las curvas de nivel. Lleida hace falta para el día 5 (Llauset está justo en el límite) y para la Vall de Boí.',
          '**Google Maps:** perfil → Mapas sin conexión → Selecciona tu propio mapa, y encuadrar el rectángulo Benasque–Aínsa–Bielsa–Pont de Suert. No se puede automatizar con un enlace, hay que hacerlo a mano. Sirve para la carretera, no para el monte: sin cobertura no dibuja senderos.',
          'Los mapas offline de Google **caducan** a los 30 días o menos si no se refrescan, así que hay que bajarlos la semana del viaje, no un mes antes.',
        ],
        id: 'downloads',
      },
      {
        heading: '4. Los tracks GPX',
        body: [
          'Nada de fiarse de la memoria en Llauset, donde las marcas del GR están desgastadas. Tres fuentes, en orden de fiabilidad:',
        ],
        list: [
          '**Red Natural de Aragón** (rednaturaldearagon.com): tracks oficiales en .gpx de los senderos balizados, gratis y sin cuenta. Es la fuente buena para los Llanos de la Larri y los senderos señalizados del parque natural.',
          '**Wikiloc**: cobertura total de la zona, pero con truco. Desde el móvil te pide Premium; **desde el navegador del ordenador, con cuenta gratuita, sí se descarga** el .gpx (botón Descargar → Archivo → Track original). Las rutas subidas por cuentas ORG (organismos y clubes) sí se pueden descargar y navegar gratis también desde la app.',
          '**Tu propia cuenta**: las rutas que subes tú se pueden seguir gratis desde la app. Truco conocido: bajar el gpx en el ordenador, resubirlo a tu perfil como privado, y ya lo navegas gratis en el móvil.',
        ],
        id: 'gpx-sources',
      },
      {
        body: [
          'Para meterlos en Organic Maps: mandarte el .gpx por WhatsApp o Telegram a ti mismo, o tenerlo en Archivos, y pulsar sobre él → **Abrir con Organic Maps**. Importa GPX directamente desde 2023, no hace falta convertirlo a KML. Aparecen en la pantalla de Marcadores y rutas y se dibujan sobre el mapa offline.',
        ],
        id: 'gpx-import',
      },
      {
        heading: 'Checklist de la noche antes',
        list: [
          'Abrir esta guía con wifi (para que se refresque) y comprobar que se abre en modo avión.',
          'Cargar los {n} puntos en Organic Maps con el botón de arriba.',
          'Huesca y Lleida descargadas en Organic Maps.',
          'Rectángulo Benasque–Aínsa descargado en Google Maps.',
          'GPX del día importado y visible en el mapa.',
          'Batería externa cargada. Con el GPS activo y sin cobertura el móvil se vacía en cuatro horas.',
        ],
        id: 'checklist',
      },
    ],
  },
  {
    id: 'practical', title: 'Info práctica',
    sections: [
      {
        heading: 'Horarios',
        body: [
          'La regla del verano pirenaico: en marcha antes de las 8:00, punto alto antes de las 14:00, de vuelta al coche a media tarde. Las tormentas de agosto son de tarde y bastante puntuales. Los parkings buenos (Estós, Llanos del Hospital, San Úrbez) se llenan entre las 9:00 y las 10:30.',
        ],
        id: 'schedules',
      },
      {
        heading: 'Fechas que importan en 2026',
        list: [
          'Besurta, Vallibierna y Espigantosa cerrados al coche: 20 de junio a 13 de septiembre.',
          'Pradera de Ordesa cerrada al coche particular, en lanzadera desde Torla o a pie por el Turieto: 19 de junio a 20 de septiembre.',
          'Catedral de Roda de Isábena: cerrada los martes y las tardes de lunes.',
          'Iglesias de la Vall de Boí: 10:00–14:00 y 16:00–19:00.',
          'Si el viaje se mueve a finales de septiembre se abren en coche La Besurta, Vallibierna y la Pradera de Ordesa, y el plan cambia entero. Merece la pena recalcularlo.',
        ],
        id: 'dates',
      },
      {
        heading: 'Mochila',
        list: [
          'Dos litros de agua por persona. En Batisielles y Llauset no hay fuentes fiables arriba.',
          'Capas: a 2.500 m hace frío aunque en Benasque haya 30 °C. Cortavientos siempre.',
          'Botas con suela agarrada. Llauset y el Ibón Gran son terreno de bloques.',
          'Crema solar y gorra: por encima de 2.000 m el sol pega el doble.',
          'Toalla fina y chanclas para el día de baño y para las pozas termales.',
          'Efectivo suelto: el parking de Pineta y algunos accesos se pagan en metálico.',
          'Tracks descargados en el móvil y batería externa. Cobertura irregular en todos los valles.',
        ],
        id: 'packing',
      },
      {
        heading: 'Seguridad',
        body: [
          'Emergencias **112**. Consultar la predicción de montaña de AEMET para el Pirineo aragonés la noche antes, no la del pueblo. En los ibones no hay socorristas: el agua a 12 °C corta la respiración los primeros segundos, así que nada de entrar de golpe ni bañarse por separado.',
        ],
        id: 'safety',
      },
      {
        heading: 'Por si acaso',
        body: [
          'Horarios, precios y accesos son los publicados para la temporada 2026 y pueden cambiar. Los tres que conviene reconfirmar la semana antes: los avisos del parque nacional (carretera de Añisclo), el pase reservado de Roda y el estado de las pozas de los Baños de Benasque.',
        ],
        id: 'reconfirm',
      },
    ],
  },
]

export const trip: Trip = { ...legacyTrip, activities, infoBlocks }

/** Todo el texto de interfaz. Los componentes no escriben literales. */
export const labels = {
  stats: {
    distance: 'Distancia',
    ascent: 'Desnivel',
    hours: 'Tiempo',
    drive: 'Coche',
    /** Para los datos sueltos que llegan sin etiqueta propia. */
    other: 'Dato',
  },
  difficulty: {
    facil: 'Fácil',
    moderado: 'Moderado',
    exigente: 'Exigente',
  },
  altKind: {
    corta: 'Versión corta',
    alternativa: 'Alternativa',
    vago: 'Día vago',
  },
  day: {
    access: 'Cómo llegar',
    route: 'El recorrido',
    driveHere: 'Ruta en coche',
    routeTo: 'Ruta a',
    altSummary: 'Versión corta y alternativas de este día',
    profileCaption: 'perfil orientativo',
    steepest: 'el tramo más duro sube',
    dayPrefix: 'Día',
    difficultyLabel: 'Dificultad',
    done: 'Hecho',
    markDone: 'Marcar como hecho',
    chosen: 'Elegida',
    choose: 'Elegir esta',
    chosenPrefix: 'Elegido:',
    mainPlan: 'Plan principal',
    backToMainPlan: 'Volver al plan principal',
  },
  maps: {
    needsSignal: 'Necesita cobertura',
  },
  suggestionReasons: {
    'same-area': 'En la misma zona',
    nearby: 'Queda cerca',
    'explicit-affinity': 'Combinación recomendada',
    'low-effort': 'Pide pocas piernas',
    short: 'Plan corto',
    'easy-after': 'Fácil de combinar',
    'afternoon-fit': 'Cabe después',
  },
  offline: {
    title: 'Sin conexión',
    text: 'La guía está entera en el móvil. Solo los enlaces de Google Maps necesitan cobertura; los de Organic Maps no.',
  },
  install: {
    button: 'Instalar la guía',
    ios: 'En iPhone no hay botón: pulsa **Compartir** en Safari y luego **Añadir a pantalla de inicio**.',
    done: 'Ya está instalada. Ábrela desde el icono del móvil.',
  },
  points: {
    load: 'Cargar los {n} puntos',
    oneByOne: 'Abrir en Organic Maps',
    batch: 'Los {n} puntos en Organic Maps',
    /** Agrupacion de la lista larga de puntos sueltos. */
    dayGroup: 'Día {n}',
    otherGroup: 'Pueblos y servicios',
  },
  nav: {
    label: 'Secciones de la guía',
    resume: 'Volver a donde estabas',
  },
  storage: {
    unavailable:
      'Este navegador no deja guardar nada (modo privado o almacenamiento lleno). Lo que marques se perderá al cerrar la guía.',
  },
  summary: {
    heading: 'El viaje',
    progress: 'días marcados como hechos',
    none: 'Todavía no has marcado ningún día. Se marcan desde la cabecera de cada uno.',
    complete: 'Enteros los cinco. Se acabó, y lo hicisteis todo.',
  },
  skipToContent: 'Ir al contenido',
} as const
