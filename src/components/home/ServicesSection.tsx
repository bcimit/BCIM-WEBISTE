'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, Building2, Home } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Building2,
  Home,
}

const SERVICE_ACCENT: Record<string, string> = {
  commercial: 'from-primary to-blue-700',
  residential: 'from-emerald-600 to-teal-700',
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-white">
      <div className="container-xl">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            What We Build
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="mt-3 text-4xl lg:text-[2.75rem] font-bold text-dark"
          >
            Two Specialisations,{' '}
            <span className="text-gradient">One Standard of Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.13 }}
            className="mt-4 text-navy-500 text-[1.0625rem] max-w-xl mx-auto"
          >
            We focus exclusively on Commercial and Residential construction — delivering
            unmatched quality in both.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Building2
            const accentClass = SERVICE_ACCENT[service.id] ?? SERVICE_ACCENT.commercial

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="group relative bg-white rounded-2xl border border-navy-100 overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow duration-400"
              >
                {/* Top image */}
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImage(service.image, 900)}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                  {/* Icon badge */}
                  <span
                    className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${accentClass} flex items-center justify-center shadow-lg`}
                  >
                    <Icon size={18} className="text-white" />
                  </span>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-dark">{service.title}</h3>
                  <p className="mt-3 text-navy-600 leading-relaxed text-[0.9375rem]">
                    {service.description}
                  </p>

                  <ul className="mt-6 grid grid-cols-1 gap-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        <span className="text-sm text-navy-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-primary hover:gap-3 transition-all group/link"
                  >
                    Learn More
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className={`absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r ${accentClass} scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left`}
                />
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/services" className="btn-outline-dark">
            View All Services <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
