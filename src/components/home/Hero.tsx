'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { COMPANY } from '@/lib/constants'

const WORDS = ['Commercial Spaces', 'Residential Homes', 'Corporate Campuses', 'Gated Communities']

const KPI_DATA = [
  { value: '7+', label: 'Years Active',          sub: `Since ${COMPANY.founded}` },
  { value: '7',  label: 'Projects Completed',    sub: 'Across 3 States' },
  { value: '750+', label: 'Workforce',           sub: 'Engineers & Workers' },
  { value: '0',  label: 'Lost Time Accidents',   sub: 'Safety First' },
]

/* ─── animation variants ─────────────────────────────────────── */
const clipReveal = {
  hidden: { y: '110%', opacity: 0 },
  show:   { y: '0%',   opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

const fadeBlur = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  show:   { opacity: 1, filter: 'blur(0px)',  y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const staggerContainer = (delay = 0, stagger = 0.12) => ({
  hidden: {},
  show:   { transition: { delayChildren: delay, staggerChildren: stagger } },
})

export function Hero() {
  const wordRef   = useRef<HTMLSpanElement>(null)
  const wordIdx   = useRef(0)

  /* GSAP word cycling */
  useEffect(() => {
    let tl: gsap.core.Timeline
    const cycleWord = () => {
      const el = wordRef.current
      if (!el) return
      wordIdx.current = (wordIdx.current + 1) % WORDS.length
      tl = gsap.timeline()
      tl.to(el,   { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' })
        .call(() => { if (el) el.textContent = WORDS[wordIdx.current] })
        .fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    }
    const interval = setInterval(cycleWord, 2800)
    return () => { clearInterval(interval); tl?.kill() }
  }, [])

  return (
    <>
      {/* Floating sidebar */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col rounded-l-xl overflow-hidden shadow-float">
        <a href={COMPANY.phoneHref} aria-label="Call us"
          className="w-11 h-12 bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors">
          <Phone size={16} className="text-white" />
        </a>
        <a href={`mailto:${COMPANY.email}`} aria-label="Email us"
          className="w-11 h-12 bg-accent flex items-center justify-center hover:bg-accent-dark transition-colors">
          <Mail size={16} className="text-white" />
        </a>
        <a href={COMPANY.mapUrl} target="_blank" rel="noreferrer" aria-label="Find us"
          className="w-11 h-12 bg-emerald-600 flex items-center justify-center hover:bg-emerald-700 transition-colors">
          <MapPin size={16} className="text-white" />
        </a>
      </div>

      <section className="relative min-h-[100svh] flex items-center overflow-hidden" aria-label="Hero">

        {/* Background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero/techridge-p3-20f.jpg" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ willChange: 'transform' }} />

        {/* Overlays */}
        <div className="absolute inset-0 hero-overlay-premium" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(255,255,255,1) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,1) 80px)' }} />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 container-xl w-full pt-32 pb-40 lg:pb-48">
          <motion.div
            variants={staggerContainer(0.2, 0.13)}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-7 overflow-hidden">
              <motion.span
                className="h-px bg-accent block"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 40, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              />
              <motion.p
                variants={clipReveal}
                className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-accent"
              >
                {COMPANY.iso} · Est. {COMPANY.founded}
              </motion.p>
            </div>

            {/* H1 line 1 — clip reveal */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                variants={clipReveal}
                className="text-white font-bold text-[2.5rem] sm:text-[3.25rem] lg:text-[4.75rem] leading-[1.04] tracking-[-0.025em]"
              >
                {"Building Tomorrow's"}
              </motion.h1>
            </div>

            {/* H1 line 2 — cycling word, clip reveal */}
            <div className="overflow-hidden mb-8">
              <motion.div variants={clipReveal}>
                <span
                  ref={wordRef}
                  className="text-gradient-warm font-bold text-[2.5rem] sm:text-[3.25rem] lg:text-[4.75rem] leading-[1.04] tracking-[-0.025em]"
                  style={{ display: 'inline-block', minWidth: '1px' }}
                >
                  {WORDS[0]}
                </span>
              </motion.div>
            </div>

            {/* Subtitle — blur reveal */}
            <motion.p
              variants={fadeBlur}
              className="text-white/60 text-lg leading-relaxed max-w-xl mb-10"
            >
              ISO-certified construction contractor delivering premium commercial and residential
              projects across Karnataka, Telangana and Maharashtra since {COMPANY.founded}.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerContainer(0, 0.08)}
              className="flex flex-wrap gap-3"
            >
              <motion.div variants={clipReveal}>
                <Link
                  href="/projects"
                  className="flex items-center gap-2 px-7 py-3.5 bg-white text-dark font-semibold text-[0.9375rem] rounded-lg hover:bg-white/90 transition-all shadow-lg"
                >
                  Explore Projects <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div variants={clipReveal}>
                <Link href="/request-quote" className="btn-outline">
                  Request a Quote
                </Link>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* KPI Glass Cards */}
          <motion.div
            variants={staggerContainer(1.0, 0.1)}
            initial="hidden"
            animate="show"
            className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
          >
            {KPI_DATA.map(({ value, label, sub }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.92 },
                  show:   { opacity: 1, y: 0,  scale: 1,
                    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                className="rounded-2xl px-5 py-5 lg:px-6 lg:py-6 bg-white/8 backdrop-blur-xl border border-white/12"
              >
                <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">{value}</p>
                <p className="text-white/90 text-sm font-semibold mt-2">{label}</p>
                <p className="text-white/40 text-xs mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll down"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        >
          <span className="text-[0.625rem] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.button>
      </section>
    </>
  )
}
