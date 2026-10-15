import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { CLIENTS, PMCS, CONSULTANTS } from '@/lib/company'
import { SiteImage } from '@/components/shared/SiteImage'

export const metadata: Metadata = {
  title: 'Clients & Consultants',
  description: 'The clients, project management consultants and design consultants BCIM Engineering works with across commercial and residential projects in South India.',
}

function LogoGrid({ items }: { items: { name: string; image: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {items.map(({ name, image }) => (
        <div key={name} className="rounded-2xl border border-navy-100 bg-white p-5 flex flex-col items-center gap-3">
          <div className="relative h-20 w-full">
            <SiteImage src={image} alt={name} sizes="(min-width: 1024px) 20vw, 40vw" className="object-contain" />
          </div>
          <span className="text-xs font-semibold text-navy-600 text-center">{name}</span>
        </div>
      ))}
    </div>
  )
}

export default function ClientsPage() {
  return (
    <>
      <PageHero eyebrow="About BCIM" title="Clients & Consultants"
        description="The organisations we build with and for." />
      <section className="section-py bg-bg">
        <div className="container-xl space-y-14">
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">Our Clients</h2>
            <LogoGrid items={CLIENTS} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">Project Management Consultants</h2>
            <LogoGrid items={PMCS} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark mb-6">Our Consultants</h2>
            <LogoGrid items={CONSULTANTS} />
          </div>
        </div>
      </section>
    </>
  )
}
