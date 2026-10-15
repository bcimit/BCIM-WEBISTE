import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { JsonLd } from '@/components/shared/JsonLd'
import { breadcrumbLd } from '@/lib/site'
import { ProjectsGrid } from '@/components/projects/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse BCIM Engineering\'s portfolio of completed and ongoing commercial and residential construction projects across South India.',
}

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Projects', path: '/projects' }])} />
      <PageHero
        eyebrow="Our Portfolio"
        title="Projects We're Proud Of"
        description="A growing portfolio of premium commercial offices, corporate campuses, and residential communities delivered across Karnataka, Telangana and Andhra Pradesh."
      />
      <ProjectsGrid />
    </>
  )
}
