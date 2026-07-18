'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { resolveImage } from '@/lib/utils'

const CATEGORIES = ['All', 'Commercial', 'Residential', 'Construction']

const IMAGES = [
  { id: 1, src: '/images/gallery/completed-tower-01.jpg', cat: 'Commercial', caption: 'Techridge P2, Hyderabad – completed IT office tower', aspect: 'landscape' },
  { id: 2, src: '/images/gallery/godrej-ascend-01.jpg', cat: 'Residential', caption: 'Godrej Ascend, Thane – residential towers', aspect: 'landscape' },
  { id: 3, src: '/images/gallery/godrej-ascend-02.jpg', cat: 'Residential', caption: 'Godrej Ascend, Thane – tower elevation', aspect: 'portrait' },
  { id: 4, src: '/images/gallery/godrej-ascend-progress-01.jpg', cat: 'Construction', caption: 'Godrej Ascend – structural works in progress', aspect: 'portrait' },
  { id: 5, src: '/images/gallery/godrej-ascend-progress-02.jpg', cat: 'Construction', caption: 'Godrej Ascend – tower under construction', aspect: 'portrait' },
  { id: 6, src: '/images/gallery/godrej-ascend-progress-03.jpg', cat: 'Construction', caption: 'Godrej Ascend – site progress', aspect: 'portrait' },
  { id: 7, src: '/images/gallery/clspl-ivy-league-house-01.jpg', cat: 'Residential', caption: 'CLSPL Hostel (Ivy League House), Visakhapatnam', aspect: 'landscape' },
  { id: 8, src: '/images/gallery/clspl-ivy-league-house-02.jpg', cat: 'Residential', caption: 'Ivy League House – interior', aspect: 'landscape' },
  { id: 9, src: '/images/gallery/formwork-01.jpg', cat: 'Construction', caption: 'Aluminium formwork at a live site', aspect: 'landscape' },
  { id: 10, src: '/images/gallery/rebar-column-01.jpg', cat: 'Construction', caption: 'Column reinforcement works', aspect: 'landscape' },
  { id: 11, src: '/images/gallery/site-crane-01.jpg', cat: 'Construction', caption: 'Tower crane on an active project site', aspect: 'landscape' },
  { id: 12, src: '/images/gallery/site-safety-briefing-01.jpg', cat: 'Construction', caption: 'Daily safety briefing at site', aspect: 'landscape' },
  { id: 13, src: '/images/gallery/site-safety-briefing-02.jpg', cat: 'Construction', caption: 'Toolbox talk with the site team', aspect: 'landscape' },
]

export function GalleryGrid() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<typeof IMAGES[0] | null>(null)

  const filtered = active === 'All' ? IMAGES : IMAGES.filter(img => img.cat === active)

  const btn = (a: boolean) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${a ? 'bg-dark text-white' : 'bg-bg text-navy-700 hover:bg-navy-100 border border-navy-200'}`

  return (
    <section className="section-py bg-white">
      <div className="container-xl">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActive(c)} className={btn(active === c)}>{c}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map(img => (
              <motion.div key={img.id} layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow"
                onClick={() => setLightbox(img)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveImage(img.src, 600)}
                  alt={img.caption}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${img.aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-video'}`}
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium">{img.caption}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" onClick={() => setLightbox(null)}>
              <X size={18} />
            </button>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="max-w-4xl w-full" onClick={e => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resolveImage(lightbox.src, 1400)}
                alt={lightbox.caption} className="w-full rounded-2xl max-h-[80vh] object-contain" />
              <p className="text-white/70 text-sm mt-4 text-center">{lightbox.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
