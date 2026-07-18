'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-dark overflow-hidden">
      <div className="container-xl">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-primary mb-3"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.07 }}
            className="text-4xl lg:text-[2.75rem] font-bold text-white"
          >
            Our Proven Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.14 }}
            className="mt-4 text-navy-400 text-[1.0625rem] max-w-xl mx-auto"
          >
            A structured six-step approach that ensures every project is delivered on time, within
            budget, and to the highest standard.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map(({ step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.09 }}
              className="relative p-7 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/7 transition-colors duration-300"
            >
              {/* Step number */}
              <span className="text-[3.5rem] font-black text-white/6 leading-none absolute top-5 right-6 select-none">
                {step}
              </span>
              {/* Pill */}
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[0.6875rem] font-bold tracking-widest uppercase mb-4">
                Step {step}
              </span>
              <h3 className="font-bold text-white text-[1rem]">{title}</h3>
              <p className="mt-2.5 text-navy-400 text-sm leading-relaxed">{description}</p>

              {/* Connector line (not on last in row) */}
              {i < PROCESS_STEPS.length - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
