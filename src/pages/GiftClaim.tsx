import { useState } from 'react'
import Seo from '../components/Seo'
import { PageIntro as PageHeader } from '../components/site/kit'

const APP_STORE = 'https://apps.apple.com/in/app/the-kada/id6754100479'
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.thekada.app'

/**
 * Landing page for a shared Kada Gift Card link (thekada.in/gift/CODE-PIN).
 * Gift cards are claimed in The Kada app, so this page explains how and lets
 * the recipient copy the link to paste there. It never reads or redeems the
 * card itself, and is noindex: the URL carries the card's PIN.
 */
export default function GiftClaim() {
  const [copied, setCopied] = useState(false)
  const link = typeof window === 'undefined' ? '' : window.location.href

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="bg-slate-50 min-h-[70vh] pb-16">
      <Seo title="Claim your Kada Gift Card" description="Open The Kada app to claim your gift card." noindex />
      <PageHeader
        topOffset={72}
        eyebrow="Kada Gift Card"
        title="You've received a gift card"
        subtitle="Claim it in The Kada app: open Profile → Gift Cards → Claim, then paste this link."
      />
      <div className="mx-auto flex max-w-md flex-col items-stretch gap-3 px-4">
        <button
          type="button"
          onClick={copy}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
        >
          {copied ? 'Link copied — paste it in the app' : 'Copy claim link'}
        </button>
        <div className="flex gap-3">
          <a
            href={APP_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 hover:border-blue-300"
          >
            App Store
          </a>
          <a
            href={PLAY_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-bold text-slate-700 hover:border-blue-300"
          >
            Google Play
          </a>
        </div>
      </div>
    </main>
  )
}
