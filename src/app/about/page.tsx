import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { AboutContent } from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about BCIM Engineering — our story, leadership team, values and ISO-certified approach to commercial and residential construction since 2018.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About BCIM Engineering"
        title="Building South India's Future, One Project at a Time"
        description="Founded in 2018, BCIM Engineering has grown into a trusted construction partner for developers, corporations, and homeowners across Karnataka, Telangana and Maharashtra."
        image="1497366216548-37526070297c"
        dark
      />
      <AboutContent />
    </>
  )
}
