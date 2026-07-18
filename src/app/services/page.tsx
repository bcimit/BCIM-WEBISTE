import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServicesOverview } from '@/components/services/ServicesOverview'

export const metadata: Metadata = {
  title: 'Services',
  description: 'BCIM Engineering specialises in Commercial Construction and Residential Construction — delivering premium quality projects across South India.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Two Specialisations, One Standard of Excellence"
        description="We focus exclusively on Commercial and Residential construction — allowing us to develop deep expertise and deliver exceptional quality on every project."
      />
      <ServicesOverview />
    </>
  )
}
