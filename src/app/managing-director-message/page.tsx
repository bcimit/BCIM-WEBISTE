import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { MD_MESSAGE } from '@/lib/company'

export const metadata: Metadata = {
  title: "Managing Director's Message",
  description: 'A message from the Managing Director of BCIM Engineering Private Limited on the company’s vision, its people and its commitment to timely, on-budget delivery.',
}

export default function MDMessagePage() {
  return (
    <>
      <PageHero eyebrow="About BCIM" title="Managing Director’s Message" />
      <section className="section-py bg-white">
        <div className="container-xl max-w-3xl space-y-5 text-navy-700 text-[1.0625rem] leading-relaxed">
          {MD_MESSAGE.paragraphs.map(p => <p key={p}>{p}</p>)}
          <ul className="grid sm:grid-cols-2 gap-3 py-2">
            {MD_MESSAGE.sectors.map(s => (
              <li key={s} className="px-4 py-3 rounded-xl border border-navy-100 bg-bg text-sm font-semibold text-dark">{s}</li>
            ))}
          </ul>
          {MD_MESSAGE.closing.map(p => <p key={p}>{p}</p>)}
          <div className="pt-4 border-t border-navy-100">
            <p className="font-bold text-dark">{MD_MESSAGE.name}</p>
            <p className="text-primary text-sm font-semibold">{MD_MESSAGE.role}</p>
          </div>
        </div>
      </section>
    </>
  )
}
