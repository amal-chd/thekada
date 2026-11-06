import { useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'
import { submitJobApplication, submitPartnerApplication } from '@/lib/publicForms'
import { CONTACT } from '../../data/agency'
import { Field, INPUT } from './ProjectForm'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** Indian mobile: optional +91 / 0, then 10 digits starting 6–9 (same as Kada Verse). */
const isIndianMobile = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/\D/g, '').replace(/^(0091|091|91|0)(?=[6-9]\d{9}$)/, ''))

function Done({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-[var(--kv-line)] bg-white p-8 text-center sm:p-12">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
      <p className="font-serif-display mt-5 text-3xl text-[var(--kv-ink)]">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">{children}</p>
    </div>
  )
}

function ErrorBox({ text }: { text: string }) {
  return (
    <p role="alert" className="mb-6 flex items-start gap-2 rounded-[6px] border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {text}
    </p>
  )
}

function Submit({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-blue-600 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
    >
      {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>{label} <ArrowRight className="h-4 w-4" /></>}
    </button>
  )
}

function Chips({ options, picked, onToggle }: { options: Record<string, string>; picked: string[]; onToggle: (k: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(options).map(([k, label]) => {
        const on = picked.includes(k)
        return (
          <button
            key={k}
            type="button"
            onClick={() => onToggle(k)}
            aria-pressed={on}
            className={`min-h-[42px] rounded-[6px] border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors ${on ? 'border-blue-600 bg-blue-600 text-white' : 'border-[var(--kv-line)] bg-white text-[var(--kv-ink)] hover:border-[var(--kv-ink)]'}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

/** Product ids match the Kada Verse partner programme. */
export const PARTNER_PRODUCTS: Record<string, string> = {
  dine: 'Kada Dine (restaurant POS & QR ordering)',
  kada: 'The Kada (delivery & dining app)',
  stay: 'Kada Stay (hotels, homestays, hostels)',
  mess: 'Kada Mess (meal subscriptions)',
  rider: 'Kada Delivery (rider sign-ups)',
}

const ENTITY_TYPES: Record<string, string> = {
  individual: 'Individual',
  proprietorship: 'Proprietorship',
  partnership: 'Partnership',
  llp: 'LLP',
  company: 'Private limited company',
}

/** Become a partner → Kada Verse › Distributor applications. */
export function PartnerApplicationForm() {
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', city: '', territory: '', entityType: 'individual', products: [] as string[], message: '' })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }))
  const toggle = (k: string) => setF((x) => ({ ...x, products: x.products.includes(k) ? x.products.filter((p) => p !== k) : [...x.products, k] }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (f.name.trim().length < 2) return setError('Please enter your name.')
    if (!EMAIL_RE.test(f.email.trim())) return setError('Please enter a valid email address — your partner account is created on it.')
    if (!isIndianMobile(f.phone)) return setError('Please enter a 10-digit Indian mobile number.')
    if (f.city.trim().length < 2) return setError('Which town or city are you in?')
    if (f.products.length === 0) return setError('Pick at least one product you would like to sell.')
    if (f.message.trim().length < 10) return setError('Tell us a little about you or your business (a sentence or two).')
    setBusy(true)
    try {
      await submitPartnerApplication(f)
      setDone(true)
    } catch (err) {
      console.error('Partner application failed', err)
      setError(`Something went wrong sending this. Please email ${CONTACT.email} directly.`)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <Done title="Application received">
        Our partnerships team reviews it and calls you within a few working days. If it is a fit, you get an invite to the Kada Verse app to accept the partner agreement and start registering businesses.
      </Done>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border border-[var(--kv-line)] bg-white p-6 sm:p-9">
      {error && <ErrorBox text={error} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name *" htmlFor="pa-name"><input id="pa-name" className={INPUT} value={f.name} onChange={set('name')} autoComplete="name" /></Field>
        <Field label="Business name (if any)" htmlFor="pa-company"><input id="pa-company" className={INPUT} value={f.company} onChange={set('company')} autoComplete="organization" placeholder="Optional" /></Field>
        <Field label="Email *" htmlFor="pa-email"><input id="pa-email" type="email" className={INPUT} value={f.email} onChange={set('email')} autoComplete="email" /></Field>
        <Field label="Mobile / WhatsApp *" htmlFor="pa-phone"><input id="pa-phone" type="tel" inputMode="tel" className={INPUT} value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="10-digit mobile" /></Field>
        <Field label="Town / city *" htmlFor="pa-city"><input id="pa-city" className={INPUT} value={f.city} onChange={set('city')} autoComplete="address-level2" /></Field>
        <Field label="Area you would cover" htmlFor="pa-territory"><input id="pa-territory" className={INPUT} value={f.territory} onChange={set('territory')} placeholder="e.g. Thalassery & Mahe" /></Field>
      </div>
      <div className="mt-5">
        <Field label="You are applying as" htmlFor="pa-entity">
          <select id="pa-entity" className={INPUT} value={f.entityType} onChange={set('entityType')}>
            {Object.entries(ENTITY_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </Field>
      </div>
      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-semibold text-[var(--kv-ink)]">What would you like to sell? *</legend>
        <Chips options={PARTNER_PRODUCTS} picked={f.products} onToggle={toggle} />
      </fieldset>
      <div className="mt-6">
        <Field label="About you *" htmlFor="pa-msg">
          <textarea id="pa-msg" rows={4} className={INPUT} value={f.message} onChange={set('message')} placeholder="What you do today, and which businesses you already know — restaurants, hotels, kitchens…" />
        </Field>
      </div>
      <Submit busy={busy} label="Apply to partner" />
      <p className="mt-3 text-center text-xs text-slate-500">No fee to apply. We never share your details.</p>
    </form>
  )
}

/** Careers → Kada Verse › Job applications. Roles mirror the Careers page. */
export function JobApplicationForm({ roles, defaultRole = '' }: { roles: string[]; defaultRole?: string }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', role: defaultRole, experience: '', portfolio: '', availability: '', message: '' })
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (f.name.trim().length < 2) return setError('Please enter your name.')
    if (!EMAIL_RE.test(f.email.trim())) return setError('Please enter a valid email address.')
    if (f.phone && f.phone.replace(/\D/g, '').length < 7) return setError('Please enter a valid phone number, or leave it blank.')
    if (!f.role) return setError('Pick the role you are applying for.')
    if (f.portfolio && !/^https?:\/\/\S+\.\S+/.test(f.portfolio.trim())) return setError('The portfolio / CV link should start with https://')
    if (f.message.trim().length < 10) return setError('Tell us a little about yourself (a few sentences).')
    setBusy(true)
    try {
      await submitJobApplication(f)
      setDone(true)
    } catch (err) {
      console.error('Job application failed', err)
      setError(`Something went wrong sending this. Please email ${CONTACT.email} directly.`)
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <Done title="Thanks for applying">
        A person on the team reads every application. If it is a fit, we will email you about next steps.
      </Done>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="border border-[var(--kv-line)] bg-white p-6 sm:p-9">
      {error && <ErrorBox text={error} />}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name *" htmlFor="ja-name"><input id="ja-name" className={INPUT} value={f.name} onChange={set('name')} autoComplete="name" /></Field>
        <Field label="Role *" htmlFor="ja-role">
          <select id="ja-role" className={INPUT} value={f.role} onChange={set('role')}>
            <option value="">Select a role</option>
            {roles.map((r) => <option key={r}>{r}</option>)}
            <option>Something else</option>
          </select>
        </Field>
        <Field label="Email *" htmlFor="ja-email"><input id="ja-email" type="email" className={INPUT} value={f.email} onChange={set('email')} autoComplete="email" /></Field>
        <Field label="Phone (optional)" htmlFor="ja-phone"><input id="ja-phone" type="tel" inputMode="tel" className={INPUT} value={f.phone} onChange={set('phone')} autoComplete="tel" /></Field>
        <Field label="Experience" htmlFor="ja-exp"><input id="ja-exp" className={INPUT} value={f.experience} onChange={set('experience')} placeholder="e.g. 3 years · Flutter, Firebase" /></Field>
        <Field label="Can start" htmlFor="ja-avail"><input id="ja-avail" className={INPUT} value={f.availability} onChange={set('availability')} placeholder="e.g. Immediately · 30 days notice" /></Field>
      </div>
      <div className="mt-5">
        <Field label="Portfolio, GitHub, LinkedIn or CV link" htmlFor="ja-link"><input id="ja-link" type="url" className={INPUT} value={f.portfolio} onChange={set('portfolio')} placeholder="https://" /></Field>
      </div>
      <div className="mt-5">
        <Field label="About you *" htmlFor="ja-msg">
          <textarea id="ja-msg" rows={5} className={INPUT} value={f.message} onChange={set('message')} placeholder="What you have built or worked on, and why this role" />
        </Field>
      </div>
      <Submit busy={busy} label="Send application" />
      <p className="mt-3 text-center text-xs text-slate-500">Share a link to your CV rather than attaching it. We never share your details.</p>
    </form>
  )
}
