import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/PageHero'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore BCIM Engineering\'s project gallery — commercial offices, residential communities, and construction in progress across South India.',
}

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Project Gallery"
        title="Our Work in Pictures"
        description="A visual showcase of BCIM Engineering's commercial and residential construction projects across Karnataka, Telangana and Maharashtra."
      />
      <GalleryGrid />
    </>
  )
}
