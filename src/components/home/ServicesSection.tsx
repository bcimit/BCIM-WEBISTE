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

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="services-section" className="section-py bg-white">
      <div className="container-xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="h-px w-8 bg-primary" />
              <p className="eyebrow">What We Build</p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.07 }}
              className="text-4xl lg:text-[2.75rem] font-bold text-dark"
            >
              Two Specialisations,{' '}
              <span className="text-gradient">One Standard</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link href="/services" className="btn-outline-dark text-sm">
              All Services <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? Building2

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className="group relative bg-white rounded-2xl border border-navy-100 overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-all duration-500"
              >
                {/* Top image */}
                <div className="relative h-60 lg:h-64 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImage(service.image, 900)}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent" />
                  {/* Icon badge */}
                  <span className="absolute top-5 left-5 w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                    <Icon size={20} className="text-white" />
                  </span>
                  {/* Title over image */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 lg:p-8">
                  <p className="text-navy-600 leading-relaxed text-[0.9375rem]">
                    {service.description}
                  </p>

                  <ul className="mt-5 grid grid-cols-1 gap-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0" />
                        <span className="text-sm text-navy-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:gap-3 transition-all group/link"
                  >
                    Learn More
                    <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
