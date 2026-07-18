'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  ShieldCheck,
  Timer,
  BadgeDollarSign,
  Leaf,
  Headphones,
  Award,
} from 'lucide-react'
import { WHY_CHOOSE } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Timer,
  BadgeDollarSign,
  Leaf,
  Headphones,
  Award,
}

const ICON_COLORS = [
  'bg-primary-light text-primary',
  'bg-amber-50 text-amber-600',
  'bg-emerald-50 text-emerald-600',
  'bg-teal-50 text-teal-600',
  'bg-sky-50 text-sky-600',
  'bg-violet-50 text-violet-600',
]

export function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-white">
      <div className="container-xl">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="eyebrow"
          >
            Why BCIM Engineering
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.07 }}
            className="mt-3 text-4xl lg:text-[2.75rem] font-bold text-dark"
          >
            The BCIM Advantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.14 }}
            className="mt-4 text-navy-500 text-[1.0625rem] max-w-xl mx-auto"
          >
            Six reasons clients across South India trust us with their most important construction
            investments.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE.map(({ icon, title, description }, i) => {
            const Icon = ICON_MAP[icon] ?? ShieldCheck
            const colorClass = ICON_COLORS[i % ICON_COLORS.length]

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                className="group p-7 rounded-2xl border border-navy-100 bg-white hover:border-primary/20 hover:shadow-[var(--shadow-card)] transition-all duration-300"
              >
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass} mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} />
                </span>
                <h3 className="font-bold text-dark text-[1rem]">{title}</h3>
                <p className="mt-2.5 text-navy-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
