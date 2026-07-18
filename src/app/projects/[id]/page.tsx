import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Calendar, User, Ruler, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return PROJECTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.name,
    description: `${project.scope} — ${project.category} project by BCIM Engineering in ${project.location}.`,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params
  const project = PROJECTS.find(p => p.id === id)
  if (!project) notFound()

  const others = PROJECTS.filter(p => p.id !== id && p.category === project.category).slice(0, 3)
  const CAT_COLOR = project.category === 'Commercial' ? 'bg-primary' : 'bg-emerald-600'
  const STATUS_COLOR = project.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'

  const HIGHLIGHTS = [
    project.scope,
    project.area ? `${project.area} total built-up area` : null,
    `${project.category} construction`,
    `${project.status} project`,
  ].filter(Boolean) as string[]

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[68px] h-[480px] md:h-[560px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={resolveImage(project.image, 1800)}
          alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        <div className="relative z-10 container-xl pb-12 w-full">
          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${CAT_COLOR}`}>{project.category}</span>
            <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${STATUS_COLOR}`}>{project.status}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white max-w-3xl">{project.name}</h1>
          <p className="flex items-center gap-2 text-white/70 mt-3"><MapPin size={14} />{project.location}</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-py bg-white">
        <div className="container-xl grid lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-4">Project Overview</h2>
              <p className="text-navy-600 leading-relaxed">{project.scope}. This {project.category.toLowerCase()} project for {project.client} represents BCIM Engineering&apos;s commitment to delivering exceptional construction quality on schedule and within budget.</p>
              <p className="text-navy-600 leading-relaxed mt-4">Our team managed all aspects of delivery from pre-construction planning through to final handover, including structural works, MEP coordination, and finishing trades.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Project Highlights</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {HIGHLIGHTS.map(h => (
                  <li key={h} className="flex items-start gap-3 p-4 rounded-xl bg-bg border border-navy-100">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-navy-700 text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Gallery strip */}
            <div>
              <h3 className="text-lg font-bold text-dark mb-4">Project Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                {['1486325212136-afb4a73e7a9b','1497366216548-37526070297c','1541888946425-d81bb19240f5'].map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://images.unsplash.com/photo-${img}?q=80&w=400&auto=format&fit=crop`}
                      alt={`${project.name} view ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-navy-100 bg-bg p-6 flex flex-col gap-4">
              <h3 className="font-bold text-dark">Project Details</h3>
              {[
                { icon: User, label: 'Client', value: project.client },
                { icon: MapPin, label: 'Location', value: project.location },
                { icon: Calendar, label: 'Year', value: project.year ?? '2024' },
                { icon: Ruler, label: 'Built-up Area', value: project.area ?? 'On request' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={15} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-navy-400">{label}</p>
                    <p className="text-sm font-semibold text-dark">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/request-quote" className="btn-primary justify-center">Request Similar Quote <ArrowRight size={15} /></Link>
            <Link href="/projects" className="flex items-center justify-center gap-2 text-sm font-semibold text-navy-700 hover:text-primary transition-colors py-2">
              <ArrowLeft size={14} /> Back to Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {others.length > 0 && (
        <section className="section-py bg-bg">
          <div className="container-xl">
            <p className="eyebrow mb-3">More Projects</p>
            <h2 className="text-3xl font-bold text-dark mb-10">Related {project.category} Projects</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {others.map(p => (
                <Link key={p.id} href={`/projects/${p.id}`} className="group rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow">
                  <div className="h-40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resolveImage(p.image, 500)}
                      alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-dark text-sm leading-snug">{p.name}</h3>
                    <p className="flex items-center gap-1 text-navy-400 text-xs mt-1.5"><MapPin size={10} />{p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
