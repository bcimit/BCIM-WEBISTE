'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { COMPANY } from '@/lib/constants'

const WORDS = ['Commercial Spaces', 'Residential Homes', 'Corporate Campuses', 'Gated Communities']

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const wordIdx = useRef(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from('[data-hero-item]', {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, containerRef)

    // Word cycling
    let tl: gsap.core.Timeline
    const cycleWord = () => {
      const el = wordRef.current
      if (!el) return
      wordIdx.current = (wordIdx.current + 1) % WORDS.length
      tl = gsap.timeline()
      tl.to(el, { opacity: 0, y: -14, duration: 0.35, ease: 'power2.in' })
        .call(() => {
          if (el) el.textContent = WORDS[wordIdx.current]
        })
        .fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
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
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col shadow-float">
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
        className="relative min-h-screen flex items-center overflow-hidden pt-[68px]"
        aria-label="Hero"
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/hero-main.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ willChange: 'transform' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,1) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,1) 80px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-xl py-24 w-full">
          <div className="max-w-3xl">
            <p data-hero-item className="eyebrow text-emerald-400 mb-5">
              {COMPANY.iso} · Est. {COMPANY.founded}
            </p>

            <h1
              data-hero-item
              className="text-white font-bold text-[2.25rem] sm:text-5xl lg:text-[4.5rem] leading-[1.06] tracking-tight"
            >
              {"Building Tomorrow’s"}
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
              className="mt-7 text-white/70 text-[1.0625rem] leading-relaxed max-w-xl"
            >
              ISO-certified construction contractor delivering premium commercial and residential
              projects across Karnataka, Telangana and Maharashtra since {COMPANY.founded}.
            </p>

            <div data-hero-item className="flex flex-wrap gap-3 mt-10">
              <Link href="/projects" className="btn-primary">
                Explore Projects <ArrowRight size={16} />
              </Link>
              <Link href="/request-quote" className="btn-outline">
                Request a Quote
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-5 py-3 text-[0.9375rem] font-semibold text-white/80 hover:text-white transition-colors"
              >
                About Us <ArrowRight size={14} />
              </Link>
            </div>

            {/* Trust badges */}
            <div data-hero-item className="flex flex-wrap items-center gap-5 mt-12">
              {[
                { label: '7+ Projects', sub: 'Completed' },
                { label: `${new Date().getFullYear() - COMPANY.founded}+ Years`, sub: 'Experience' },
                { label: '3', sub: 'ISO Certifications' },
              ].map(({ label, sub }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-white font-bold text-xl leading-none">{label}</span>
                  <span className="text-white/50 text-xs mt-0.5">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() =>
            document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })
          }
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
        >
          <span className="text-[0.625rem] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>
    </>
  )
}
