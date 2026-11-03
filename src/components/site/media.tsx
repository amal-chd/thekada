import { MediaPanel, BrowserFrame, PhoneFrame } from './kit'
import { SHOTS } from '../../data/agency'

type Shade = 'ocean' | 'dusk' | 'sky' | 'night'

/** A browser screenshot in a shade panel. */
export function WebShot({ src, url, alt, shade = 'ocean', className = 'aspect-[16/11]' }: { src: string; url: string; alt: string; shade?: Shade; className?: string }) {
  return (
    <MediaPanel shade={shade} className={className}>
      <div className="absolute inset-x-[6%] top-[9%]">
        <BrowserFrame src={src} alt={alt} url={url} />
      </div>
    </MediaPanel>
  )
}

/** Up to three staggered phone screenshots in a shade panel. */
export function PhoneShots({ shots, shade = 'dusk', className = 'aspect-[16/11]' }: { shots: { src: string; alt: string }[]; shade?: Shade; className?: string }) {
  const offsets = ['', 'mt-[7%]', 'mt-[14%]']
  return (
    <MediaPanel shade={shade} className={className}>
      <div className="absolute inset-0 flex items-start justify-center gap-[4%] pt-[8%]">
        {shots.slice(0, 3).map((s, i) => (
          <PhoneFrame key={s.src} src={s.src} alt={s.alt} className={`w-[27%] max-w-[200px] ${offsets[i]}`} />
        ))}
      </div>
    </MediaPanel>
  )
}

/**
 * For products without public screenshots yet: logo, name and the product's own
 * feature list as stacked cards — real capabilities, no invented UI data.
 */
export function LogoShot({ logo, name, points = [], shade = 'ocean', className = 'aspect-[16/11]' }: { logo?: string; name: string; points?: string[]; shade?: Shade; className?: string }) {
  const items = points.slice(0, 3)
  return (
    <MediaPanel shade={shade} className={className}>
      <div className="flex h-full items-center justify-center gap-[6%] p-[6%]">
        <div className="flex shrink-0 flex-col items-center gap-3">
          {logo
            ? <img src={logo} alt="" className="h-16 w-16 rounded-2xl bg-white object-contain p-1.5 shadow-2xl sm:h-24 sm:w-24 sm:rounded-3xl" />
            : <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-bold text-blue-700 shadow-2xl sm:h-24 sm:w-24 sm:rounded-3xl sm:text-3xl">{name.split(' ').map((w) => w[0]).join('')}</span>}
          <span className="text-sm font-semibold text-white sm:text-lg">{name}</span>
        </div>
        {items.length > 0 && (
          <div className="flex min-w-0 max-w-[260px] flex-1 flex-col items-stretch gap-2 rounded-[8px] border border-dashed border-white/60 p-3 sm:gap-3 sm:p-5">
            {items.map((pt, i) => (
              <div key={pt} className="flex flex-col items-center gap-2 sm:gap-3">
                <span className="w-full truncate rounded-[4px] border border-white bg-white/85 px-3 py-2 text-center text-[11px] font-medium text-[#0B1B33] shadow-sm sm:text-sm">{pt}</span>
                {i < items.length - 1 && <span className="text-xs leading-none text-white/90">↓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </MediaPanel>
  )
}

/** Real screenshots for each product / case study slug. */
export function ProductShot({ slug, name, logo, points, className }: { slug: string; name: string; logo?: string; points?: string[]; className?: string }) {
  switch (slug) {
    case 'the-kada':
      return <WebShot src={SHOTS.webOrder} url="order.thekada.in" alt="The Kada ordering website" className={className} />
    case 'kada-stay':
      return <PhoneShots shots={[{ src: SHOTS.hostToday, alt: 'Kada Stay Host — today' }, { src: SHOTS.hostRooms, alt: 'Kada Stay Host — rooms' }, { src: SHOTS.hostRent, alt: 'Kada Stay Host — rent' }]} shade="sky" className={className} />
    case 'kada-delivery':
      return <PhoneShots shots={[{ src: SHOTS.riderLogin, alt: 'Kada Rider app' }, { src: SHOTS.customerHome, alt: 'The Kada customer app' }]} shade="dusk" className={className} />
    default:
      return <LogoShot logo={logo} name={name} points={points} className={className} />
  }
}
