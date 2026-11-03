import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import { submitPublicForm } from '@/lib/publicForms'
import { CONTACT } from '../../data/agency'
import { Btn } from './kit'

const NEEDS = [
  'Web application', 'Mobile app (iOS/Android)', 'SaaS platform', 'Digital marketing & growth',
  'Business software / ERP', 'CRM / HRM system', 'AI & automation', 'API & payments integration', 'Fix or modernise an existing app',
]
const BUDGETS = ['₹2L – ₹5L', '₹5L – ₹15L', '₹15L – ₹30L', '₹30L – ₹50L', '₹50L+', 'Not sure yet']
const TIMELINES = ['As soon as possible', '1–2 months', '3–6 months', 'Flexible / not sure']

const INPUT = 'w-full rounded-[6px] border border-[var(--kv-line)] bg-white px-3.5 py-3 text-[15px] text-[var(--kv-ink)] placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15'

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-[var(--kv-ink)]">{label}</label>
      {children}
    </div>
  )
}

/**
 * The one client intake form (Start a project + Contact). Writes to the
 * `proposal_requests` intake collection that staff work from in the admin console.
 */
export default function ProjectForm({ page }: { page: string }) {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', needs: [] as string[], budget: '', timeline: '', description: '' })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const toggle = (n: string) => setForm((f) => ({ ...f, needs: f.needs.includes(n) ? f.needs.filter((x) => x !== n) : [...f.needs, n] }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name.trim()) return setError('Please enter your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (form.description.trim().length < 10) return setError('Tell us a little about the project (at least a sentence).')
    setBusy(true)
    try {
      await submitPublicForm('proposal_requests', { ...form, source: 'website', page, submittedAt: new Date().toISOString() }, 'LEAD')
      setDone(true)
    } catch (err) {
      console.error('Failed to submit proposal request', err)
      setError(`Something went wrong sending this. Please email ${CONTACT.email} directly.`)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="border border-[var(--kv-line)] bg-white p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <p className="font-serif-display mt-5 text-3xl text-[var(--kv-ink)]">Thanks — we’ve got it.</p>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
          We reply within one working day with questions, a call slot or a first estimate. If it’s urgent, WhatsApp us on {CONTACT.phone}.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Btn to="/work" variant="dark">See our work</Btn>
          <Btn to="/" variant="outline">Back to home</Btn>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border border-[var(--kv-line)] bg-white p-6 sm:p-9">
      {error && (
        <p role="alert" className="mb-6 flex items-start gap-2 rounded-[6px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name *" htmlFor="pf-name"><input id="pf-name" className={INPUT} value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your full name" /></Field>
        <Field label="Company" htmlFor="pf-company"><input id="pf-company" className={INPUT} value={form.company} onChange={set('company')} autoComplete="organization" placeholder="Optional" /></Field>
        <Field label="Email *" htmlFor="pf-email"><input id="pf-email" type="email" className={INPUT} value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" /></Field>
        <Field label="Phone / WhatsApp" htmlFor="pf-phone"><input id="pf-phone" type="tel" inputMode="tel" className={INPUT} value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+91" /></Field>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-semibold text-[var(--kv-ink)]">What do you need? <span className="font-normal text-slate-500">Pick any</span></legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map((n) => {
            const on = form.needs.includes(n)
            return (
              <button
                key={n}
                type="button"
                onClick={() => toggle(n)}
                aria-pressed={on}
                className={`rounded-[6px] border px-3 py-2 text-sm transition-colors ${on ? 'border-blue-600 bg-blue-600 text-white' : 'border-[var(--kv-line)] bg-white text-[var(--kv-ink)] hover:border-[var(--kv-ink)]'}`}
              >
                {n}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Budget" htmlFor="pf-budget">
          <select id="pf-budget" className={INPUT} value={form.budget} onChange={set('budget')}>
            <option value="">Select a range</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Timeline" htmlFor="pf-timeline">
          <select id="pf-timeline" className={INPUT} value={form.timeline} onChange={set('timeline')}>
            <option value="">Select a timeline</option>
            {TIMELINES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Tell us about it *" htmlFor="pf-desc">
          <textarea id="pf-desc" rows={5} className={INPUT} value={form.description} onChange={set('description')} placeholder="What should it do, who is it for, and is there anything already built?" />
        </Field>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
      >
        {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send project details <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">No obligation. We never share your details.</p>
    </form>
  )
}
