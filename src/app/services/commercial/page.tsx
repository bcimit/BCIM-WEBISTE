import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceDetail } from '@/components/services/ServiceDetail'
import { JsonLd } from '@/components/shared/JsonLd'
import { SITE_URL, ORG_ID, breadcrumbLd } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Commercial Construction',
  description: 'BCIM Engineering builds world-class commercial spaces — corporate offices and IT parks across South India.',
}

const DATA = {
  color: 'from-primary to-blue-700',
  eyebrow: 'Commercial Construction',
  title: 'Grade-A Commercial Spaces Built to Last',
  intro: 'BCIM Engineering delivers commercial construction projects across Karnataka, Telangana and Andhra Pradesh — from corporate offices to large-scale IT campuses.',
  capabilities: [
    { title: 'Corporate Office Buildings', desc: 'G+4 to G+20 structures with open-plan floor plates, raised flooring, and smart building infrastructure.' },
    { title: 'IT Parks & Tech Campuses', desc: 'Multi-block campus developments with centralized amenities, redundant power, and 24×7 operational infrastructure.' },
  ],
  differentiators: [
    'Aluminium formwork for fast, precise structural construction',
    'In-house MEP coordination across every site',
    'External development and road works capability',
    'Dedicated safety officer on every commercial site',
    'ISO 9001:2015-certified quality management',
  ],
  image: '/images/projects/techridge-p3.jpg',
  projects: ['techridge-p3', 'trinity-food-court', 'omega-sportszone', 'locl-mission-road'],
}

export default function CommercialPage() {
  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Commercial Construction',
          description: metadata.description,
          serviceType: 'Commercial Construction',
          provider: { '@id': ORG_ID },
          areaServed: ['Karnataka', 'Telangana', 'Andhra Pradesh'],
          url: `${SITE_URL}/services/commercial`,
        },
        breadcrumbLd([{ name: 'Services', path: '/services' }, { name: 'Commercial Construction', path: '/services/commercial' }]),
      ]} />
      <PageHero eyebrow="Our Services" title="Commercial Construction" image={DATA.image} dark
        description="Grade-A offices and IT parks — built on time, within budget." />
      <ServiceDetail data={DATA} />
    </>
  )
}
