import { MediaPanel, BrowserFrame, PhoneFrame } from './kit'
import { SHOTS } from '../../data/agency'

type Shade = 'ocean' | 'dusk' | 'sky' | 'night'
const WORK_SHADES: Record<string, Shade> = {
  'task-pilot': 'dusk',
  'raman-caterings': 'sky',
  'nexstep-europe': 'ocean',
  'inspiro-26': 'dusk',
  whichott: 'night',
  sellrapp: 'sky',
  'detailx-car-care': 'night',
  'prana-roots': 'sky',
  'dandeli-adventure-resorts': 'ocean',
}

export const workShowcaseShade = (slug: string): Shade => WORK_SHADES[slug] ?? 'ocean'

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
  const offsets = ['', 'mt-[3%]', 'mt-[6%]']
  return (
    <MediaPanel shade={shade} className={className}>
      <div className="absolute inset-0 flex items-start justify-center gap-[4%] pt-[5%]">
        {shots.slice(0, 3).map((s, i) => (
          <PhoneFrame key={s.src} src={s.src} alt={s.alt} className={`w-[26%] max-w-[185px] ${offsets[i]}`} />
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
      return <SiteShot web={SHOTS.webOrder} mobile={SHOTS.mOrderRest} url="order.thekada.in" alt="The Kada ordering website" className={className} />
    case 'kada-stay':
      return <PhoneShots shots={[{ src: SHOTS.hostToday, alt: 'Kada Stay Host — today' }, { src: SHOTS.hostRooms, alt: 'Kada Stay Host — rooms' }, { src: SHOTS.hostRent, alt: 'Kada Stay Host — rent' }]} shade="sky" className={className} />
    case 'kada-dine':
      return <SiteShot web="/shots/work/kadadine-web.webp" mobile={SHOTS.mDine} url="kadadine.thekada.in" alt="Kada Dine website" className={className} />
    case 'sellrapp':
      return <SiteShot web="/shots/work/sellr-preview.webp" mobile={SHOTS.mSellr} url="sellrapp.vercel.app" alt="SellrApp storefront" shade="sky" className={className} />
    case 'kada-delivery':
      return <SiteShot web="/shots/work/partner-d.webp" mobile={SHOTS.riderLogin} url="partner.thekada.in" alt="Kada Rider sign-up site and app" shade="dusk" className={className} />
    default:
      return <LogoShot logo={logo} name={name} points={points} className={className} />
  }
}

/** A browser screenshot with an optional phone screenshot overlapping it. */
export function SiteShot({ web, mobile, url, alt, shade = 'ocean', className = 'aspect-[16/11]' }: { web: string; mobile?: string; url: string; alt: string; shade?: Shade; className?: string }) {
  return (
    <MediaPanel shade={shade} className={className}>
      <div className={`absolute top-[9%] ${mobile ? 'left-[5%] w-[74%]' : 'inset-x-[6%]'}`}>
        <BrowserFrame src={web} alt={alt} url={url} />
      </div>
      {mobile && (
        <PhoneFrame src={mobile} alt={`${alt} on a phone`} className="absolute bottom-[4%] right-[4%] w-[22%]" />
      )}
    </MediaPanel>
  )
}

/** The right visual for any work item: its real screenshot, or the Kada product shot. */
export function WorkShot({ item, className }: { item: { slug: string; name: string; image?: string; liveUrl?: string; displayUrl?: string; logo?: string; points?: string[] }; className?: string }) {
  if (item.image) {
    const url = item.displayUrl ?? (item.liveUrl ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '')
    return <WebShot src={item.image} url={url} alt={`${item.name} — screenshot`} shade={workShowcaseShade(item.slug)} className={className} />
  }
  return <ProductShot slug={item.slug} name={item.name} logo={item.logo} points={item.points} className={className} />
}

/** A grid of real screens: browser shots take two columns, phones one. */
export function ScreenGallery({ screens }: { screens: { src: string; label: string; kind: 'web' | 'phone'; url?: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {screens.map((s, i) => (
        <figure key={s.src} className={`min-w-0 ${s.kind === 'web' ? 'col-span-2' : 'col-span-1'}`}>
          {s.kind === 'web' ? (
            <WebShot src={s.src} url={s.url ?? ''} alt={s.label} shade={(['ocean', 'dusk', 'sky', 'night'] as const)[i % 4]} className="aspect-[16/11]" />
          ) : (
            <MediaPanel shade={(['sky', 'dusk', 'ocean', 'night'] as const)[i % 4]} className="aspect-[8/11]">
              <div className="flex h-full items-start justify-center pt-[5%]">
                <PhoneFrame src={s.src} alt={s.label} className="w-[56%]" />
              </div>
            </MediaPanel>
          )}
          <figcaption className="mt-2 text-sm font-medium text-slate-600">{s.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
