'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-bg">
      <div className="container-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' as const}}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-blue-800 px-8 py-16 md:px-16 md:py-20 text-center"
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />
          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/60 mb-4"
            >
              Let's Build Together
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="text-4xl lg:text-[2.75rem] font-bold text-white leading-tight"
            >
              Ready to Start Your
              <br />
              Next Project?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.22 }}
              className="mt-5 text-white/70 text-[1.0625rem] leading-relaxed"
            >
              Tell us about your vision. Our team will get back to you promptly with a detailed
              consultation and preliminary estimate.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-10"
            >
              <Link
                href="/request-quote"
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-bold text-[0.9375rem] rounded-lg hover:bg-navy-50 transition-colors shadow-lg"
              >
                Request a Free Quote <ArrowRight size={16} />
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold text-[0.9375rem] rounded-lg hover:bg-white/10 hover:border-white transition-colors"
              >
                <Phone size={16} /> Call Us Now
              </a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="mt-6 text-white/40 text-sm"
            >
              No commitment required · Free initial consultation
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
