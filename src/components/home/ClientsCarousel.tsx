'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CLIENTS = [
  'Prestige Group',
  'Brigade Enterprises',
  'Salarpuria Sattva',
  'Embassy Group',
  'Godrej Properties',
  'Puravankara',
  'Sobha Limited',
  'Total Environment',
  'Shriram Properties',
  'Mantri Developers',
  'Assetz Property',
  'Tata Projects',
]

function ClientLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 lg:px-12 shrink-0">
      <span className="text-navy-400 text-sm lg:text-base font-semibold whitespace-nowrap tracking-wide uppercase opacity-50 hover:opacity-100 transition-opacity duration-300">
        {name}
      </span>
    </div>
  )
}

export function ClientsCarousel() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white border-y border-navy-100 overflow-hidden">
      <div className="container-xl mb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-navy-400 text-sm font-semibold uppercase tracking-[0.15em]"
        >
          Trusted by Leading Developers & Corporates
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <ClientLogo key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
