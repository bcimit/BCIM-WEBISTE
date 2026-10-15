import type { Metadata } from 'next'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { EHS_POLICY } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Our Policies',
  description: 'BCIM Engineering’s Environment, Health & Safety policy, and the philosophies behind every project.',
}

export default function PoliciesPage() {
  return (
    <>
      <PageHero eyebrow="About BCIM" title="Our Policies"
        description="Environment, health and safety come first on every BCIM site." />
      <section className="section-py bg-white">
        <div className="container-xl max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-primary" />
            <h2 className="text-2xl font-bold text-dark">Environment, Health &amp; Safety Policy</h2>
          </div>
          <p className="text-navy-700 leading-relaxed mb-6">{EHS_POLICY.intro}</p>
          <ul className="space-y-3">
            {EHS_POLICY.points.map(point => (
              <li key={point} className="flex items-start gap-3 text-navy-700 text-[0.9375rem] leading-relaxed">
                <CheckCircle2 size={16} className="text-primary shrink-0 mt-1" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-py bg-bg">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-dark text-center mb-10">Our Philosophies</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EHS_POLICY.philosophies.map(({ title }) => (
              <div key={title} className="p-6 rounded-2xl border border-navy-100 bg-white text-center font-bold text-dark">{title}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
