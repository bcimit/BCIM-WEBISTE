import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { CareersContent } from '@/components/careers/CareersContent'
import { fetchERPJobs } from '@/lib/erp'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the BCIM Engineering team — open positions in site engineering, project management, MEP, quantity surveying and more.',
}

export default async function CareersPage() {
  const jobs = await fetchERPJobs()

  return (
    <>
      <PageHero eyebrow="Careers at BCIM" title="Build Your Career With Us"
        description="We are always looking for talented, driven construction professionals to join our growing team across Bengaluru, Hyderabad and beyond."
        image="1504307651254-35680f356dfd" dark />
      <CareersContent jobs={jobs} />
    </>
  )
}
