import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceDetail } from '@/components/services/ServiceDetail'

export const metadata: Metadata = {
  title: 'Commercial Construction',
  description: 'BCIM Engineering builds world-class commercial spaces — corporate offices, IT parks, shopping complexes, hotels and hospitals across South India.',
}

const DATA = {
  color: 'from-primary to-blue-700',
  eyebrow: 'Commercial Construction',
  title: 'Grade-A Commercial Spaces Built to Last',
  intro: 'BCIM Engineering delivers commercial construction projects across Karnataka, Telangana and Maharashtra — from corporate offices to large-scale IT campuses.',
  capabilities: [
    { title: 'Corporate Office Buildings', desc: 'G+4 to G+20 structures with open-plan floor plates, raised flooring, and smart building infrastructure.' },
    { title: 'IT Parks & Tech Campuses', desc: 'Multi-block campus developments with centralized amenities, redundant power, and 24×7 operational infrastructure.' },
    { title: 'Shopping Complexes & Malls', desc: 'Large-span column-free retail spaces, food courts, multiplex fit-out, and high-traffic facade systems.' },
    { title: 'Hotels & Hospitality', desc: 'Full-service hotel construction from structural frame to MEP commissioning and interior fit-out.' },
    { title: 'Hospitals & Healthcare', desc: 'Specialist construction for clinical environments — clean rooms, OT suites, and medical-grade MEP systems.' },
    { title: 'Warehouses & Logistics', desc: 'Pre-engineered and RCC warehouse structures with dock levellers, fire suppression, and ERP-ready infrastructure.' },
  ],
  differentiators: [
    'Aluminium formwork for fast, precise structural construction',
    'In-house MEP coordination across every site',
    'External development and road works capability',
    'Dedicated safety officer on every commercial site',
    'ISO 9001:2015-certified quality management',
  ],
  stats: [
    { value: '9+', label: 'Commercial Projects' },
    { value: '3', label: 'States Active' },
    { value: '3', label: 'ISO Certifications' },
  ],
  image: '/images/projects/techridge-p3.jpg',
  projects: ['techridge-p3', 'trinity-food-court', 'omega-sportszone', 'locl-mission-road'],
}

export default function CommercialPage() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Commercial Construction" image={DATA.image} dark
        description="Grade-A offices, IT parks, retail, hospitality, healthcare — built on time, within budget." />
      <ServiceDetail data={DATA} />
    </>
  )
}
