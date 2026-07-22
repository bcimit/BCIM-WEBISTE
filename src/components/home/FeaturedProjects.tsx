'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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

const FILTERS = ['All', 'Commercial', 'Residential', 'Ongoing', 'Completed'] as const

export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const filtered = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return p.featured
    if (activeFilter === 'Ongoing' || activeFilter === 'Completed') return p.status === activeFilter
    return p.category === activeFilter
  }).slice(0, 8)

  return (
    <section ref={ref} className="section-py bg-bg">
      <div className="container-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="h-px w-8 bg-primary" />
              <p className="eyebrow">Our Work</p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="text-4xl lg:text-[2.75rem] font-bold text-dark"
            >
              Featured Projects
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-dark text-white shadow-md'
                    : 'bg-white text-navy-600 border border-navy-200 hover:border-primary hover:text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImage(project.image, 600)}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[0.6875rem] font-bold tracking-wide ${CATEGORY_COLORS[project.category] ?? 'bg-navy-700'}`}
                  >
                    {project.category}
                  </span>

                  <span
                    className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-white text-[0.625rem] font-bold ${STATUS_COLORS[project.status] ?? 'bg-navy-700'}`}
                  >
                    {project.status}
                  </span>

                  <Link
                    href="/projects"
                    aria-label={`View ${project.name}`}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md text-navy-900 hover:bg-primary hover:text-white transition-colors"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Info */}
                <div className="p-5">
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
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/projects" className="btn-outline-dark">
            View All Projects <ArrowUpRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
