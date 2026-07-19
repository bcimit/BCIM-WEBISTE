'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, MapPin } from 'lucide-react'
import { resolveImage } from '@/lib/utils'

interface GalleryImage {
  src: string
  caption: string
}

interface ProjectGroup {
  id: string
  name: string
  location: string
  department: string
  status: 'Completed' | 'Ongoing' | 'EHS & Safety' | 'Site Operations'
  images: GalleryImage[]
}

const PROJECT_GROUPS: ProjectGroup[] = [
  {
    id: 'techridge-p2',
    name: 'Techridge P2',
    location: 'Manikonda, Hyderabad, Telangana',
    department: 'Commercial Construction',
    status: 'Completed',
    images: [
      { src: '/images/gallery/completed-tower-01.jpg',  caption: 'Completed IT office tower — Techridge P2' },
      { src: '/images/gallery/site-aerial-01.jpg',      caption: 'Techridge campus — aerial site view' },
      { src: '/images/gallery/site-aerial-02.jpg',      caption: 'Elevated site progress — Techridge campus' },
      { src: '/images/gallery/process-control-01.jpg',  caption: 'Quality process control at Techridge P2' },
    ],
  },
  {
    id: 'techridge-p3',
    name: 'Techridge P3',
    location: 'Manikonda, Hyderabad, Telangana',
    department: 'Commercial Construction',
    status: 'Ongoing',
    images: [
      { src: '/images/gallery/techridge-p3-wide.jpg',   caption: 'Techridge P3 — IT campus under construction' },
      { src: '/images/gallery/safety-award-01.jpg',     caption: 'International Safety Award — Merit 2024 (British Safety Council)' },
      { src: '/images/gallery/safety-award-02.jpg',     caption: 'BSC Safety Award ceremony — BCIM Techridge P3 team' },
    ],
  },
  {
    id: 'godrej-ascend',
    name: 'Godrej Ascend',
    location: 'Kolshet Road, Thane, Maharashtra',
    department: 'Residential Construction',
    status: 'Ongoing',
    images: [
      { src: '/images/gallery/godrej-ascend-01.jpg',          caption: 'Godrej Ascend — residential tower elevation' },
      { src: '/images/gallery/godrej-ascend-02.jpg',          caption: 'Godrej Ascend — tower façade, Thane' },
      { src: '/images/gallery/godrej-ascend-progress-01.jpg', caption: 'Tower 4 — structural works in progress' },
      { src: '/images/gallery/godrej-ascend-progress-02.jpg', caption: 'Tower 4 — upper-floor progress' },
      { src: '/images/gallery/godrej-ascend-progress-03.jpg', caption: 'Tower 5 and MLCP — slab works' },
    ],
  },
  {
    id: 'clspl-hostel',
    name: 'CLSPL Hostel (Ivy League House)',
    location: 'AMTZ Campus, Visakhapatnam, Andhra Pradesh',
    department: 'Residential Construction',
    status: 'Ongoing',
    images: [
      { src: '/images/gallery/clspl-ivy-league-house-01.jpg', caption: 'Ivy League House — completed exterior' },
      { src: '/images/gallery/clspl-ivy-league-house-02.jpg', caption: 'Ivy League House — street view' },
      { src: '/images/gallery/clspl-progress-01.jpg',         caption: 'Structural progress — column works' },
      { src: '/images/gallery/clspl-progress-02.jpg',         caption: 'Slab reinforcement works' },
      { src: '/images/gallery/clspl-progress-03.jpg',         caption: 'Column and formwork stage' },
      { src: '/images/gallery/clspl-progress-04.jpg',         caption: 'Floor-by-floor construction progress' },
      { src: '/images/gallery/clspl-progress-05.jpg',         caption: 'Reinforcement and shuttering works' },
      { src: '/images/gallery/clspl-progress-06.jpg',         caption: 'Site overview during construction' },
    ],
  },
  {
    id: 'site-operations',
    name: 'Site Operations & Plant',
    location: 'All Project Sites',
    department: 'Plant & Machinery',
    status: 'Site Operations',
    images: [
      { src: '/images/gallery/formwork-01.jpg',        caption: 'MEVA aluminium formwork system' },
      { src: '/images/gallery/rebar-column-01.jpg',    caption: 'Column reinforcement works' },
      { src: '/images/gallery/site-crane-01.jpg',      caption: 'Tower crane on an active project site' },
      { src: '/images/gallery/workmen-camp-01.jpg',    caption: 'On-site workmen accommodation — 800+ residents' },
      { src: '/images/gallery/batching-plant-01.jpg',  caption: 'BCIM-owned batching plant' },
    ],
  },
  {
    id: 'ehs-safety',
    name: 'EHS & Safety',
    location: 'All Project Sites',
    department: 'Health, Safety & Environment',
    status: 'EHS & Safety',
    images: [
      { src: '/images/gallery/site-safety-briefing-01.jpg', caption: 'Daily toolbox talk with workmen' },
      { src: '/images/gallery/site-safety-briefing-02.jpg', caption: 'Site safety briefing — supervisor-led' },
      { src: '/images/gallery/toolbox-talk-01.jpg',         caption: 'Toolbox talk — subcontractor coordination' },
      { src: '/images/gallery/toolbox-talk-02.jpg',         caption: 'Safety induction with new workmen' },
      { src: '/images/gallery/fire-fighting-01.jpg',        caption: 'Fire-fighting demonstration drill' },
      { src: '/images/gallery/fire-fighting-02.jpg',        caption: 'Fire suppression training — workmen team' },
      { src: '/images/gallery/fire-fighting-03.jpg',        caption: 'Live fire-fighting exercise at Techridge' },
      { src: '/images/gallery/emergency-drill-01.jpg',      caption: 'Emergency mock drill — evacuation exercise' },
      { src: '/images/gallery/emergency-drill-02.jpg',      caption: 'First responder team in action' },
    ],
  },
]

const STATUS_STYLES: Record<string, string> = {
  Completed:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  Ongoing:          'bg-amber-50  text-amber-700  border-amber-200',
  'EHS & Safety':   'bg-red-50    text-red-700    border-red-200',
  'Site Operations':'bg-violet-50 text-violet-700 border-violet-200',
}

const DEPT_FILTERS = ['All Projects', 'Commercial Construction', 'Residential Construction', 'Plant & Machinery', 'Health, Safety & Environment']

type LightboxItem = GalleryImage & { groupName: string }

export function GalleryGrid() {
  const [activeDept, setActiveDept] = useState('All Projects')
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null)

  const visibleGroups = activeDept === 'All Projects'
    ? PROJECT_GROUPS
    : PROJECT_GROUPS.filter(g => g.department === activeDept)

  const btnCls = (active: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
      active ? 'bg-dark text-white' : 'bg-bg text-navy-700 hover:bg-navy-100 border border-navy-200'
    }`

  return (
    <section className="section-py bg-white">
      <div className="container-xl">

        {/* Department filter */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-1">
          {DEPT_FILTERS.map(d => (
            <button key={d} onClick={() => setActiveDept(d)} className={btnCls(activeDept === d)}>
              {d}
            </button>
          ))}
        </div>

        {/* Project groups */}
        <div className="flex flex-col gap-16">
          {visibleGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: gi * 0.05 }}
            >
              {/* Group header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-navy-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.6875rem] font-bold border ${STATUS_STYLES[group.status]}`}>
                      {group.status}
                    </span>
                    <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-navy-400">
                      {group.department}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-dark">{group.name}</h2>
                  <p className="flex items-center gap-1.5 text-sm text-navy-500 mt-1">
                    <MapPin size={13} className="text-primary shrink-0" />
                    {group.location}
                  </p>
                </div>
                <span className="text-xs text-navy-400 shrink-0">
                  {group.images.length} photo{group.images.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Photo grid */}
              <div className={`grid gap-3 ${
                group.images.length === 1 ? 'grid-cols-1 max-w-lg' :
                group.images.length === 2 ? 'grid-cols-2' :
                group.images.length <= 4 ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4' :
                'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              }`}>
                {group.images.map((img, ii) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: ii * 0.05 }}
                    className="group relative rounded-xl overflow-hidden cursor-pointer shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow duration-300"
                    onClick={() => setLightbox({ ...img, groupName: group.name })}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImage(img.src, 700)}
                      alt={img.caption}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/45 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={22} />
                    </div>
                    {/* Caption */}
                    <div className="absolute bottom-0 inset-x-0 px-3 py-2.5 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-[0.6875rem] leading-snug">{img.caption}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex flex-col items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveImage(lightbox.src, 1600)}
                alt={lightbox.caption}
                className="w-full rounded-2xl max-h-[78vh] object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest">{lightbox.groupName}</p>
                <p className="text-white/80 text-sm mt-1">{lightbox.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
