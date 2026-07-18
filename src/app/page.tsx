import { Hero } from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesSection } from '@/components/home/ServicesSection'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { WhyChoose } from '@/components/home/WhyChoose'
import { Process } from '@/components/home/Process'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <ServicesSection />
      <FeaturedProjects />
      <WhyChoose />
      <Process />
      <ContactCTA />
    </>
  )
}
