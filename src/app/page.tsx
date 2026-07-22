import { Hero } from '@/components/home/Hero'
import { ServicesSection } from '@/components/home/ServicesSection'
import { AboutPreview } from '@/components/home/AboutPreview'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { WhyChoose } from '@/components/home/WhyChoose'
import { AwardsCertifications } from '@/components/home/AwardsCertifications'
import { Process } from '@/components/home/Process'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutPreview />
      <FeaturedProjects />
      <WhyChoose />
      <AwardsCertifications />
      <Process />
      <ContactCTA />
    </>
  )
}
