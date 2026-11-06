import { useSearchParams } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageIntro, Band, Eyebrow, SerifTitle } from '../components/site/kit'
import ProjectForm, { NEEDS } from '../components/site/ProjectForm'
import { PROCESS, CONTACT } from '../data/agency'

export default function StartProject() {
  // Links from a service or case-study page say where the visitor came from
  // (?from=work-task-pilot) and what they were looking at (?need=SaaS platform).
  const [params] = useSearchParams()
  const from = (params.get('from') ?? '').replace(/[^a-z0-9:-]/gi, '').slice(0, 50)
  const need = params.get('need') ?? ''
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Start a Project"
        description="Tell KadaVerse what you want to build, your timeline and budget in your currency. Remote project enquiries are welcome worldwide."
        path="/start-project"
      />
      <PageIntro
        eyebrow="Start a project"
        title={<>Let’s build your <span className="text-blue-600">software</span></>}
        subtitle="A sentence is enough to start. We reply within one working day."
      />
      <Band tone="band">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow block>What happens next</Eyebrow>
            <SerifTitle className="mt-4">No sales pitch. Just a clear plan.</SerifTitle>
            <ol className="mt-8 border-t border-[var(--kv-line)]">
              {PROCESS.map((p, i) => (
                <li key={p.title} className="flex gap-4 border-b border-[var(--kv-line)] py-4">
                  <span className="text-sm font-semibold text-blue-600">0{i + 1}</span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-[var(--kv-ink)]">{p.title}</span>
                    <span className="block text-sm text-slate-600">{p.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-slate-600">
              Prefer to talk? <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">WhatsApp us</a>, call <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="font-semibold text-[var(--kv-ink)]">{CONTACT.phone}</a> or email <a href={`mailto:${CONTACT.email}`} className="font-semibold text-[var(--kv-ink)]">{CONTACT.email}</a>.
            </p>
          </div>
          <div className="min-w-0">
            <ProjectForm page={from ? `start-project:${from}` : 'start-project'} defaultNeeds={NEEDS.includes(need) ? [need] : []} />
          </div>
        </div>
      </Band>
    </main>
  )
}
