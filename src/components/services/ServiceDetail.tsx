'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'
import { MapPin } from 'lucide-react'

interface ServiceDetailData {
  color: string
  eyebrow: string
  title: string
  intro: string
  capabilities: { title: string; desc: string }[]
  differentiators: string[]
  stats: { value: string; label: string }[]
  image: string
  projects: string[]
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const},
  }
}

export function ServiceDetail({ data }: { data: ServiceDetailData }) {
  const relatedProjects = PROJECTS.filter(p => data.projects.includes(p.id))

  return (
    <>
      {/* Intro + stats */}
      <section className="section-py bg-white">
        <div className="container-xl grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.p {...fadeUp()} className="text-navy-600 text-lg leading-relaxed mb-8">{data.intro}</motion.p>
            <motion.div {...fadeUp(0.08)}>
              <h3 className="font-bold text-dark text-lg mb-5">What We Deliver</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {data.capabilities.map(({ title, desc }, i) => (
                  <motion.div key={title} {...fadeUp(0.04 + i * 0.05)}
                    className="p-5 rounded-xl border border-navy-100 bg-bg hover:border-primary/30 transition-colors">
                    <h4 className="font-semibold text-dark text-sm mb-1.5">{title}</h4>
                    <p className="text-navy-500 text-xs leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Side panel */}
          <div className="flex flex-col gap-6">
            {/* Stats */}
            <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-navy-100 bg-bg p-6 flex flex-col gap-5">
              {data.stats.map(({ value, label }) => (
                <div key={label}>
                  <p className={`text-3xl font-black bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>{value}</p>
                  <p className="text-navy-500 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>

            {/* Why BCIM */}
            <motion.div {...fadeUp(0.15)} className="rounded-2xl border border-navy-100 bg-bg p-6">
              <h4 className="font-bold text-dark mb-4">The BCIM Difference</h4>
              <ul className="flex flex-col gap-3">
                {data.differentiators.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-navy-600 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.2)} className={`rounded-2xl bg-gradient-to-br ${data.color} p-6 text-white`}>
              <h4 className="font-bold text-lg mb-2">Ready to Start?</h4>
              <p className="text-white/80 text-sm mb-5">Get a detailed proposal for your project.</p>
              <Link href="/request-quote" className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 rounded-lg font-semibold text-sm transition-colors">
                Request a Quote <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="section-py bg-bg">
          <div className="container-xl">
            <motion.div {...fadeUp()} className="mb-10">
              <p className="eyebrow mb-3">Related Work</p>
              <h2 className="text-3xl font-bold text-dark">Projects in This Category</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((p, i) => (
                <motion.article key={p.id} {...fadeUp(i * 0.08)}
                  className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow">
                  <div className="relative h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={resolveImage(p.image, 600)}
                      alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-dark text-sm">{p.name}</h3>
                    <p className="flex items-center gap-1 text-navy-400 text-xs mt-1.5"><MapPin size={10} />{p.location}</p>
                    <Link href={`/projects/${p.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all">
                      View Project <ArrowRight size={11} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="container-xl text-center">
          <motion.h2 {...fadeUp()} className="text-3xl font-bold text-dark mb-4">Have a project in mind?</motion.h2>
          <motion.div {...fadeUp(0.08)} className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Talk to Our Team <ArrowRight size={15} /></Link>
            <Link href="/projects" className="btn-outline-dark">Browse All Projects <ArrowRight size={15} /></Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
