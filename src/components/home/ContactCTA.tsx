'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-dark">
      <div className="container-xl py-24 lg:py-32">
        {/* Ambient effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-accent mb-5">
            Let's Build Together
          </p>
          <h2 className="text-4xl lg:text-[3.25rem] font-bold text-white leading-tight tracking-tight">
            Ready to Start Your
            <br />
            Next Project?
          </h2>
          <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-xl mx-auto">
            Tell us about your vision. Our team will get back to you promptly with a detailed
            consultation and preliminary estimate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              href="/request-quote"
              className="flex items-center gap-2 px-8 py-4 bg-white text-dark font-bold text-[0.9375rem] rounded-lg hover:bg-white/90 transition-all shadow-lg"
            >
              Request a Free Quote <ArrowRight size={16} />
            </Link>
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold text-[0.9375rem] rounded-lg hover:bg-white/5 hover:border-white/40 transition-all"
            >
              <Phone size={16} /> Call Us Now
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/30 text-sm">
            <span className="flex items-center gap-2">
              <Mail size={14} /> {COMPANY.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} /> {COMPANY.phone}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
