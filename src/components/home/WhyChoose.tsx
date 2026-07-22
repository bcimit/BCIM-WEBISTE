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

const ACCENT_COLORS = [
  { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
  { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-500/20' },
  { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-500/20' },
  { bg: 'bg-teal-500/10', text: 'text-teal-600', border: 'border-teal-500/20' },
  { bg: 'bg-sky-500/10', text: 'text-sky-600', border: 'border-sky-500/20' },
  { bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-500/20' },
]

export function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-bg">
      <div className="container-xl">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: heading and intro */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-3 mb-3"
            >
              <span className="h-px w-8 bg-primary" />
              <p className="eyebrow">Why BCIM Engineering</p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.07 }}
              className="text-4xl lg:text-[2.75rem] font-bold text-dark"
            >
              The BCIM{' '}
              <span className="text-gradient">Advantage</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.14 }}
              className="mt-4 text-navy-500 text-[1.0625rem] leading-relaxed"
            >
              Six reasons clients across South India trust us with their most important construction investments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="mt-8 p-5 rounded-2xl bg-white border border-navy-100 shadow-[var(--shadow-card)]"
            >
              <p className="text-3xl font-bold text-dark leading-none">23+</p>
              <p className="text-navy-500 text-sm mt-1">Average years of staff experience</p>
            </motion.div>
          </div>

          {/* Right: cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {WHY_CHOOSE.map(({ icon, title, description }, i) => {
              const Icon = ICON_MAP[icon] ?? ShieldCheck
              const colors = ACCENT_COLORS[i % ACCENT_COLORS.length]

              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                  className={`group p-6 rounded-2xl border bg-white hover:shadow-[var(--shadow-card)] transition-all duration-300 ${colors.border}`}
                >
                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={20} className={colors.text} />
                  </span>
                  <h3 className="font-bold text-dark text-[0.9375rem]">{title}</h3>
                  <p className="mt-2 text-navy-500 text-sm leading-relaxed">{description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
