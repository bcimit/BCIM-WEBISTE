import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { FACILITIES } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Facilities',
  description: 'Site facilities provided by BCIM Engineering Private Limited: labour camp, R.O. water plant, staff mess and canteen, and an on-site concrete batching plant.',
}

export default function FacilitiesPage() {
  return (
    <>
      <PageHero eyebrow="About BCIM" title="Our Facilities"
        description="Camp, water, mess and concrete batching support for our project sites." />
      <section className="section-py bg-white">
        <div className="container-xl grid sm:grid-cols-2 gap-6">
          {FACILITIES.map(({ name, image }) => (
            <figure key={name} className="rounded-2xl border border-navy-100 overflow-hidden bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={name} loading="lazy" className="w-full h-64 object-cover bg-white" />
              <figcaption className="px-5 py-4 font-bold text-dark">{name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
