import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ContactContent } from '@/components/contact/ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with BCIM Engineering — speak to our team about your commercial or residential construction project.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in Touch" title="Let's Start a Conversation"
        description="Tell us about your project and we'll respond promptly with a personalised consultation." />
      <ContactContent />
    </>
  )
}
