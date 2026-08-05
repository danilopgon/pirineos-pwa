import type { ElevationProfile } from '../data/types'
import { VIEW, profileCaption, profilePoints } from '../lib/elevation'

/** Sin puntos no se pinta nada: no hay curva que valga la pena inventarse. */
export function Profile({ profile }: { profile?: ElevationProfile }) {
  if (!profile) return null
  const points = profilePoints(profile)
  if (!points) return null

  const floor = VIEW.height
  const area = `0,${floor} ${points} ${VIEW.width},${floor}`

  return (
    <>
      <svg
        className="profile"
        viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon fill="var(--accent)" fillOpacity="0.22" points={area} />
        <polyline fill="none" stroke="var(--accent)" strokeWidth="2" points={points} />
      </svg>
      <p className="profile-cap">{profileCaption(profile)}</p>
    </>
  )
}
