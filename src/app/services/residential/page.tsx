import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceDetail } from '@/components/services/ServiceDetail'

export const metadata: Metadata = {
  title: 'Residential Construction',
  description: 'BCIM Engineering builds luxury villas, premium apartments and gated communities across South India with meticulous craftsmanship.',
}

const DATA = {
  color: 'from-emerald-600 to-teal-700',
  eyebrow: 'Residential Construction',
  title: 'Homes Built with Care, Craft and Precision',
  intro: 'BCIM Engineering brings the same rigour and quality management to every residential project — from foundation works on premium apartment towers to hostel and community developments.',
  capabilities: [
    { title: 'Luxury Villas & Bungalows', desc: 'Custom-designed villas from 3,000 to 12,000 sq ft with high-end finishes, smart home integration, and landscaped gardens.' },
    { title: 'Premium Apartment Complexes', desc: 'Multi-storey residential towers with amenity decks, basement parking, and premium interior specifications.' },
    { title: 'Gated Communities', desc: 'End-to-end community development including roads, utilities, clubhouse, pool, and landscape — handed over ready to live.' },
    { title: 'Row Houses & Townhouses', desc: 'Compact, efficient attached housing for mid-market and affordable residential projects.' },
    { title: 'Independent Houses', desc: 'Single-family construction on client-owned plots with full architectural and structural design services.' },
    { title: 'Duplex & Penthouse Units', desc: 'Premium upper-level residential units with double-height volumes, private terraces, and bespoke finishes.' },
  ],
  differentiators: [
    'Dedicated residential project manager per site',
    'Careful waterproofing practice on all wet areas and terraces',
    'Structural steel and concrete quality certificates provided',
    'Snag-list management through to handover',
    'ISO 9001:2015-certified quality management',
  ],
  stats: [
    { value: '2+', label: 'Residential Projects' },
    { value: '3', label: 'States Active' },
    { value: '3', label: 'ISO Certifications' },
  ],
  image: '/images/projects/godrej-ascend.jpg',
  projects: ['godrej-ascend'],
}

export default function ResidentialPage() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Residential Construction" image={DATA.image} dark
        description="Luxury villas, premium apartments and gated communities — built with meticulous care." />
      <ServiceDetail data={DATA} />
    </>
  )
}
