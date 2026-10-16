import Seo from '../components/Seo'
import { UnifiedContactHub } from '../components/UnifiedContactHub'
import { db } from '../lib/firebase'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Tell us what you want to build. Reach out to our solutions team in Kannur, Kerala or book a live enterprise technology walkthrough."
        path="/contact"
      />
      <main className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-clip">
        <UnifiedContactHub
          brand="corp"
          initialMode="contact"
          dbInstance={db}
          topOffset={72}
          headerOffset={() => 72}
        />
      </main>
    </>
  )
}
