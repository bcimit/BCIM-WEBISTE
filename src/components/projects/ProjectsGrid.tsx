'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { PROJECTS } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'
import { Tilt3D } from '@/components/shared/Tilt3D'

const STATUS_FILTERS = ['All', 'Ongoing', 'Completed'] as const
const CAT_FILTERS = ['All', 'Commercial', 'Residential'] as const

const CAT_COLORS: Record<string, string> = { Commercial: 'bg-primary', Residential: 'bg-emerald-600' }
const STATUS_COLORS: Record<string, string> = { Completed: 'bg-emerald-500', Ongoing: 'bg-amber-500' }

export function ProjectsGrid() {
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>('All')
  const [cat, setCat] = useState<(typeof CAT_FILTERS)[number]>('All')

  const filtered = PROJECTS.filter(p =>
    (status === 'All' || p.status === status) && (cat === 'All' || p.category === cat)
  )

  const btn = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-dark text-white' : 'bg-bg text-navy-700 hover:bg-navy-100 border border-navy-200'}`

  return (
    <section className="section-py bg-white">
      <div className="container-xl">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <div className="flex gap-2 flex-wrap">
            {STATUS_FILTERS.map(f => (
              <button key={f} onClick={() => setStatus(f)} className={btn(status === f)}>{f}</button>
            ))}
          </div>
          <div className="w-px bg-navy-200 hidden sm:block" />
          <div className="flex gap-2 flex-wrap">
            {CAT_FILTERS.map(c => (
              <button key={c} onClick={() => setCat(c)} className={btn(cat === c)}>{c}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article key={p.id} layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <Tilt3D intensity={7} glowColor="rgba(37,99,235,0.18)" className="group bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow duration-300">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveImage(p.image, 700)}
                    alt={p.name} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[0.6875rem] font-bold ${CAT_COLORS[p.category] ?? 'bg-navy-700'}`}>{p.category}</span>
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-white text-[0.625rem] font-bold ${STATUS_COLORS[p.status] ?? 'bg-navy-700'}`}>{p.status}</span>
                  <Link href={`/projects/${p.id}`} aria-label={`View ${p.name}`}
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md text-navy-900 hover:bg-primary hover:text-white transition-colors">
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-dark leading-snug">{p.name}</h3>
                  <p className="flex items-center gap-1.5 text-navy-400 text-xs mt-2"><MapPin size={11} />{p.location}</p>
                  <p className="text-navy-500 text-xs mt-2">Client: <span className="text-navy-700 font-medium">{p.client}</span></p>
                  {p.area && <p className="text-navy-500 text-xs mt-1"><span className="text-navy-700 font-medium">{p.area}</span> built-up area</p>}
                  <p className="text-navy-400 text-xs mt-1.5 leading-snug line-clamp-2">{p.scope}</p>
                </div>
                </Tilt3D>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-navy-400 py-20">No projects match the selected filters.</p>
        )}
      </div>
    </section>
  )
}
