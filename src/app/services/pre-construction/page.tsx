import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ServiceDetail } from '@/components/services/ServiceDetail'

export const metadata: Metadata = {
  title: 'Pre-Construction Services',
  description: 'Expert pre-construction advisory — feasibility, BOQ, value engineering, and procurement planning before a single brick is laid.',
}

const DATA = {
  color: 'from-amber-500 to-orange-600',
  eyebrow: 'Pre-Construction Services',
  title: 'Get Your Project Right Before It Starts',
  intro: 'Poor planning is the single biggest cause of construction cost overruns and delays. Our pre-construction services give you a clear, realistic picture of scope, cost, and schedule before commitment.',
  capabilities: [
    { title: 'Feasibility Studies', desc: 'Technical and commercial feasibility assessment including site evaluation, planning constraints, and indicative cost plans.' },
    { title: 'Detailed Bill of Quantities', desc: 'Comprehensive elemental BOQ prepared from architectural drawings to support accurate tendering and cost control.' },
    { title: 'Value Engineering', desc: 'Systematic review of design against cost targets — identifying savings without compromising quality or performance.' },
    { title: 'Schedule Development', desc: 'Detailed construction programme using MS Project with critical path analysis and milestone planning.' },
    { title: 'Contractor Procurement', desc: 'Tender document preparation, contractor shortlisting, bid evaluation, and contract award support.' },
    { title: 'Risk Assessment', desc: 'Structured risk register identifying project risks with mitigation strategies and contingency planning.' },
  ],
  differentiators: [
    'Detailed cost plans at concept stage',
    'In-house quantity surveying team',
    'Careful value engineering before commitment',
    'Full handover to construction phase team for continuity',
    'Independent of contractor — unbiased advisory only',
  ],
  stats: [
    { value: '3', label: 'States Active' },
    { value: '3', label: 'ISO Certifications' },
    { value: '2018', label: 'Delivering Since' },
  ],
  image: '1541888946425-d81bb19240f5',
  projects: [],
}

export default function PreConstructionPage() {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Pre-Construction Services" image={DATA.image} dark
        description="Feasibility, BOQ, value engineering, and procurement planning — get your project right before it starts." />
      <ServiceDetail data={DATA} />
    </>
  )
}
