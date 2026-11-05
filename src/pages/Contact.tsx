import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import Seo from '../components/Seo'
import { PageIntro, Band, CardGrid, FaqList, Eyebrow, SerifTitle } from '../components/site/kit'
import ProjectForm from '../components/site/ProjectForm'
import { AGENCY_FAQ, CONTACT } from '../data/agency'

export default function Contact() {
  return (
    <main className="bg-[var(--kv-canvas)]">
      <Seo
        title="Contact"
        description="Tell us what you want to build. KadaVerse welcomes remote project enquiries worldwide. Contact our team in Kannur, India by email or project form."
        path="/contact"
      />
      <PageIntro
        eyebrow="Contact"
        title={<>Talk to the people who’ll <span className="text-blue-600">build it</span></>}
        subtitle="WhatsApp, call, email or send the form — a real person on the team replies."
      />
      <Band tone="canvas" className="!pb-8 sm:!pb-12">
        <CardGrid
          cols={4}
          cards={[
            { title: 'WhatsApp', desc: 'Chat with the team', icon: <MessageCircle />, cta: 'Open WhatsApp', to: `https://wa.me/${CONTACT.whatsapp}` },
            { title: 'Call', desc: CONTACT.phone, icon: <Phone />, cta: 'Call now', to: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
            { title: 'Email', desc: CONTACT.email, icon: <Mail />, cta: 'Send an email', to: `mailto:${CONTACT.email}` },
            { title: 'Office', desc: 'Kannur, Kerala 670001, India', icon: <MapPin /> },
          ]}
        />
      </Band>
      <Band tone="band">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow block>Send a message</Eyebrow>
            <SerifTitle className="mt-4">Tell us what you’re working on</SerifTitle>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              A new app, a website, a system to replace spreadsheets, or help with something already built — share whatever you know and we’ll take it from there.
            </p>
          </div>
          <div className="min-w-0">
            <ProjectForm page="contact" />
          </div>
        </div>
      </Band>
      <Band tone="white">
        <FaqList items={AGENCY_FAQ} />
      </Band>
    </main>
  )
}
