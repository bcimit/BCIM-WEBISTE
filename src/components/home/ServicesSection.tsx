'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CheckCircle2, Building2, Home, ArrowUpRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Building2,
  Home,
}

const CARD_GRADIENTS = [
  'from-primary/80 via-primary/40 to-transparent',
  'from-emerald-700/80 via-emerald-700/40 to-transparent',
]

const ICON_BG = [
  'bg-primary',
  'bg-emerald-600',
]

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof SERVICES)[number]
  index: number
  inView: boolean
}) {
  const Icon = SERVICE_ICONS[service.icon] ?? Building2
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-shadow duration-500"
    >
      {/* Image */}
      <div className="relative h-64 lg:h-72 overflow-hidden">
        <motion.img
          src={resolveImage(service.image, 900)}
          alt={service.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${CARD_GRADIENTS[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />

        {/* Icon badge */}
        <motion.span
          className={`absolute top-5 left-5 w-11 h-11 rounded-2xl ${ICON_BG[index]} flex items-center justify-center shadow-lg`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Icon size={20} className="text-white" />
        </motion.span>

        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3
            className="text-xl font-bold text-white"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
          >
            {service.title}
          </motion.h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 lg:p-8">
        <motion.p
          className="text-navy-600 leading-relaxed text-[0.9375rem]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 + index * 0.15 }}
        >
          {service.description}
        </motion.p>

        <ul className="mt-6 grid grid-cols-1 gap-2.5">
          {service.items.map((item, j) => (
            <motion.li
              key={item}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: 0.45 + index * 0.15 + j * 0.05,
                ease: 'easeOut',
              }}
            >
              <CheckCircle2 size={14} className={`shrink-0 ${index === 0 ? 'text-primary' : 'text-emerald-600'}`} />
              <span className="text-sm text-navy-700">{item}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-7"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
        >
          <Link
            href={service.href}
            className={`inline-flex items-center gap-2 text-sm font-semibold group/link ${index === 0 ? 'text-primary' : 'text-emerald-600'}`}
          >
            Learn More
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-current/10 group-hover/link:bg-current/20 transition-colors duration-200">
              <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom accent on hover */}
      <motion.div
        className={`absolute bottom-0 inset-x-0 h-0.5 ${index === 0 ? 'bg-primary' : 'bg-emerald-600'} origin-left`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="services-section" className="section-py bg-white overflow-hidden">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-3"
            >
              <motion.span
                className="h-px bg-primary"
                initial={{ width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <p className="eyebrow">What We Build</p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl lg:text-[2.75rem] font-bold text-dark"
            >
              Two Specialisations,{' '}
              <span className="text-gradient">One Standard</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dark text-dark text-sm font-semibold hover:bg-dark hover:text-white transition-all duration-300"
            >
              All Services
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
