import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { ArrowRight } from 'lucide-react'
import { EVENTS, PROGRESS_VIDEO } from '@/lib/company'

export const metadata: Metadata = {
  title: 'Events',
  description: 'National Safety Week, first-aid training, health check-ups and worker welfare events at BCIM Engineering project sites, with photos from the Techridge project.',
}

export default function EventsPage() {
  return (
    <>
      <PageHero eyebrow="News & Events" title="Events"
        description="Safety, training and welfare on our project sites." />
      <section className="section-py bg-white">
        <div className="container-xl">
          <h2 className="text-2xl font-bold text-dark mb-2">{EVENTS.title}</h2>
          <p className="text-navy-600 max-w-3xl leading-relaxed mb-8">{EVENTS.summary}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {EVENTS.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt={`National Safety Week event photo ${i + 1}`} loading="lazy"
                className="w-full h-48 object-cover rounded-xl border border-navy-100" />
            ))}
          </div>
        </div>
      </section>
      <section className="section-py bg-bg">
        <div className="container-xl">
          <h2 className="text-2xl font-bold text-dark mb-2">Project Progress Video</h2>
          <p className="text-navy-600 mb-6">{PROGRESS_VIDEO.title}</p>
          <a href={PROGRESS_VIDEO.url} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            Watch the Time-lapse <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </>
  )
}
