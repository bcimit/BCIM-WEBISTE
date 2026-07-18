import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceDetail } from '@/components/services/ServiceDetail'

export const metadata: Metadata = {
  title: 'Interior Fit-Out',
  description: 'Turnkey interior fit-out services for commercial offices — from bare shell to fully operational work environments.',
}

const DATA = {
  color: 'from-violet-600 to-purple-700',
  eyebrow: 'Interior Fit-Out',
  title: 'From Bare Shell to Beautiful Work Environment',
  intro: 'Our interior fit-out division delivers Category A and Category B commercial interiors — creating workspaces that inspire performance and reflect your brand, on schedule and within budget.',
  capabilities: [
    { title: 'Category A Fit-Out', desc: 'Base-build interior works — raised flooring, suspended ceiling grids, M&E distribution, and perimeter blinds.' },
    { title: 'Category B Fit-Out', desc: 'Full occupier fit-out with partitions, joinery, branding elements, AV, furniture, and full MEP integration.' },
    { title: 'Office Interior Design', desc: 'In-house design team providing space planning, 3D visualisation, material selection and FF&E procurement.' },
    { title: 'False Ceiling & Flooring', desc: 'Grid, plasterboard, and feature ceiling systems; carpet tile, LVT, polished concrete, and raised access flooring.' },
    { title: 'Joinery & Furniture', desc: 'Custom-manufactured joinery, collaborative furniture specification, and supply-and-install services.' },
    { title: 'MEP & AV Integration', desc: 'Electrical, data, HVAC, fire detection, and AV/VC system installation with commissioning.' },
  ],
  differentiators: [
    'Single point of responsibility for design and build',
    'In-house coordination across MEP, joinery and finishes',
    'Sustainable material selection and waste management',
    'Finishing works delivered alongside our shell-and-core teams',
    'ISO 9001:2015-certified quality management',
  ],
  stats: [
    { value: '3', label: 'States Active' },
    { value: '3', label: 'ISO Certifications' },
    { value: '2018', label: 'Delivering Since' },
  ],
  image: '1497366216548-37526070297c',
  projects: [],
}

export default function InteriorPage() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Interior Fit-Out" image={DATA.image} dark
        description="Category A & B commercial fit-out — from bare shell to fully operational workspace." />
      <ServiceDetail data={DATA} />
    </>
  )
}
