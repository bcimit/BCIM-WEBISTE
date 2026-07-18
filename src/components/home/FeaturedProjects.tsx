'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  Commercial: 'bg-primary',
  Residential: 'bg-emerald-600',
}

const STATUS_COLORS: Record<string, string> = {
  Completed: 'bg-emerald-500',
  Ongoing: 'bg-amber-500',
}

const featured = PROJECTS.filter((p) => p.featured)

export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-bg">
      <div className="container-xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="eyebrow"
            >
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="mt-3 text-4xl lg:text-[2.75rem] font-bold text-dark"
            >
              Featured Projects
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View All Projects <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
              className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveImage(project.image, 600)}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category badge — always visible */}
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[0.6875rem] font-bold tracking-wide ${CATEGORY_COLORS[project.category] ?? 'bg-navy-700'}`}
                >
                  {project.category}
                </span>

                {/* Status badge */}
                <span
                  className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-white text-[0.625rem] font-bold ${STATUS_COLORS[project.status] ?? 'bg-navy-700'}`}
                >
                  {project.status}
                </span>

                {/* Arrow CTA — always visible */}
                <Link
                  href="/projects"
                  aria-label={`View ${project.name}`}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md text-navy-900 hover:bg-primary hover:text-white transition-colors"
                >
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-dark text-[0.9375rem] leading-snug">
                  {project.name}
                </h3>
                <p className="flex items-center gap-1.5 text-navy-400 text-xs mt-2">
                  <MapPin size={11} /> {project.location}
                </p>
                {project.area && (
                  <p className="text-navy-500 text-xs mt-1.5">
                    <span className="text-navy-700 font-medium">{project.area}</span> Built-up area
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
