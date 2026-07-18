import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { QuoteForm } from '@/components/contact/QuoteForm'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a detailed construction quote from BCIM Engineering for your commercial or residential project.',
}

export default function RequestQuotePage() {
  return (
    <>
      <PageHero eyebrow="Free Consultation" title="Request a Project Quote"
        description="Complete the form below and our team will prepare a detailed proposal — no commitment required." />
      <QuoteForm />
    </>
  )
}
