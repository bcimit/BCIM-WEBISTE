'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { COMPANY } from '@/lib/constants'

const WORDS = ['Commercial Spaces', 'Residential Homes', 'Corporate Campuses', 'Gated Communities']

const KPI_DATA = [
  { value: '7+', label: 'Years Active', sub: `Since ${COMPANY.founded}` },
  { value: '7', label: 'Projects Completed', sub: 'Across 3 States' },
  { value: '750+', label: 'Workforce', sub: 'Engineers & Workers' },
  { value: '0', label: 'Lost Time Accidents', sub: 'Safety First' },
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const wordIdx = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-item]', {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('[data-kpi-card]', {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })
    }, el)

    let tl: gsap.core.Timeline
    const cycleWord = () => {
      const wordEl = wordRef.current
      if (!wordEl) return
      wordIdx.current = (wordIdx.current + 1) % WORDS.length
      tl = gsap.timeline()
      tl.to(wordEl, { opacity: 0, y: -14, duration: 0.35, ease: 'power2.in' })
        .call(() => {
          if (wordEl) wordEl.textContent = WORDS[wordIdx.current]
        })
        .fromTo(wordEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
    }
    const interval = setInterval(cycleWord, 2800)

    return () => {
      ctx.revert()
      clearInterval(interval)
      tl?.kill()
    }
  }, [])

  return (
    <>
      {/* Floating sidebar — contact quick-links */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col rounded-l-xl overflow-hidden shadow-float">
        <a
          href={COMPANY.phoneHref}
          aria-label="Call us"
          className="w-11 h-12 bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
        >
          <Phone size={16} className="text-white" />
        </a>
        <a
          href={`mailto:${COMPANY.email}`}
          aria-label="Email us"
          className="w-11 h-12 bg-accent flex items-center justify-center hover:bg-accent-dark transition-colors"
        >
          <Mail size={16} className="text-white" />
        </a>
        <a
          href={COMPANY.mapUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Find us"
          className="w-11 h-12 bg-emerald-600 flex items-center justify-center hover:bg-emerald-700 transition-colors"
        >
          <MapPin size={16} className="text-white" />
        </a>
      </div>

      <section
        ref={containerRef}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        aria-label="Hero"
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/techridge-p3-20f.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ willChange: 'transform' }}
        />

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 hero-overlay-premium" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,1) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,1) 80px)',
          }}
        />

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 container-xl w-full pt-32 pb-40 lg:pb-48">
          <div className="max-w-3xl">
            <div data-hero-item className="flex items-center gap-3 mb-7">
              <span className="h-px w-10 bg-accent" />
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-accent">
                {COMPANY.iso} · Est. {COMPANY.founded}
              </p>
            </div>

            <h1
              data-hero-item
              className="text-white font-bold text-[2.5rem] sm:text-[3.25rem] lg:text-[4.75rem] leading-[1.04] tracking-[-0.025em]"
            >
              {"Building Tomorrow's"}
              <br />
              <span
                ref={wordRef}
                className="text-gradient-warm"
                style={{ display: 'inline-block', minWidth: '1px' }}
              >
                {WORDS[0]}
              </span>
            </h1>

            <p
              data-hero-item
              className="mt-7 text-white/60 text-lg leading-relaxed max-w-xl"
            >
              ISO-certified construction contractor delivering premium commercial and residential
              projects across Karnataka, Telangana and Maharashtra since {COMPANY.founded}.
            </p>

            <div data-hero-item className="flex flex-wrap gap-3 mt-10">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-7 py-3.5 bg-white text-dark font-semibold text-[0.9375rem] rounded-lg hover:bg-white/90 transition-all shadow-lg"
              >
                Explore Projects <ArrowRight size={16} />
              </Link>
              <Link href="/request-quote" className="btn-outline">
                Request a Quote
              </Link>
            </div>
          </div>

          {/* Glass KPI Cards */}
          <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {KPI_DATA.map(({ value, label, sub }) => (
              <div
                key={label}
                data-kpi-card
                className="rounded-2xl px-5 py-5 lg:px-6 lg:py-6 group hover:bg-white/12 transition-colors duration-300 bg-white/8 backdrop-blur-xl border border-white/12"
              >
                <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight leading-none">
                  {value}
                </p>
                <p className="text-white/90 text-sm font-semibold mt-2">{label}</p>
                <p className="text-white/40 text-xs mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() =>
            document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        >
          <span className="text-[0.625rem] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>
    </>
  )
}
