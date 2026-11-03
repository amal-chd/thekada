import { Link } from 'react-router-dom'
import { WORK } from '../../data/work'
import { caseStudies } from '../../data/caseStudies'

/** Auto-scrolling strip of real screenshots from shipped work. */
export default function LaunchStrip({ title = 'Recently shipped' }: { title?: string }) {
  const items = WORK.filter((w) => w.image)
  const row = [...items, ...items]
  return (
    <section className="overflow-hidden border-y border-[var(--kv-line)] bg-white py-12 sm:py-16">
      <div className="mx-auto mb-8 flex w-full max-w-[1200px] items-end justify-between gap-4 px-5 sm:px-8">
        <div>
          <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500"><span className="inline-block h-2.5 w-4 bg-blue-600" aria-hidden />{title}</p>
          <p className="font-serif-display mt-3 text-3xl text-[var(--kv-ink)] sm:text-[2.4rem]">Real sites and apps, live today</p>
        </div>
        <Link to="/work" className="hidden shrink-0 text-sm font-semibold text-[var(--kv-ink)] hover:text-blue-600 sm:inline">See all work →</Link>
      </div>
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
        <ul className="kv-marquee flex w-max gap-5" style={{ animationDuration: '70s' }}>
          {row.map((w, i) => {
            const to = w.slug in caseStudies ? `/work/${w.slug}` : w.productPage ?? '/work'
            return (
              <li key={`${w.slug}-${i}`} aria-hidden={i >= items.length} className="w-[300px] shrink-0 sm:w-[360px]">
                <Link to={to} tabIndex={i >= items.length ? -1 : undefined} className="group block">
                  <div className="overflow-hidden rounded-[8px] border border-[var(--kv-line)] bg-slate-50 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center gap-1.5 border-b border-[var(--kv-line)] px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" /><span className="h-2 w-2 rounded-full bg-slate-300" />
                    </div>
                    <img src={w.image} alt={`${w.name} — screenshot`} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
                  </div>
                  <p className="mt-3 text-[15px] font-semibold text-[var(--kv-ink)] group-hover:text-blue-600">{w.name}</p>
                  <p className="text-xs text-slate-500">{w.client ?? w.type}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
