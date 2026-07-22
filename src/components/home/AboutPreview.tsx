'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { COMPANY } from '@/lib/constants'
import { Tilt3D } from '@/components/shared/Tilt3D'

const HIGHLIGHTS = [
  'Bureau Veritas-certified ISO 9001, 14001 & 45001',
  '750-strong workforce across active sites',
  '23+ years average staff experience',
  'Projects across Karnataka, Telangana & Maharashtra',
]

export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-bg overflow-hidden">
      <div className="container-xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Image stack */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' as const}}
          className="relative pb-6 sm:pb-0"
        >
          <Tilt3D intensity={8} glowColor="rgba(37,99,235,0.15)" className="rounded-2xl shadow-[var(--shadow-float)]">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
                alt="BCIM Engineering construction team at work"
                className="w-full h-full object-cover"
              />
            </div>
          </Tilt3D>
          {/* Floating card */}
          <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white rounded-xl p-5 shadow-[var(--shadow-float)] border border-navy-100 max-w-[200px]">
            <p className="text-3xl font-bold text-dark leading-none">{new Date().getFullYear() - COMPANY.founded}+</p>
            <p className="text-xs text-navy-500 mt-1 leading-snug">Years of civil construction since {COMPANY.founded}</p>
          </div>
          {/* ISO badge */}
          <div className="hidden sm:block absolute -top-4 -left-4 bg-primary text-white rounded-xl px-4 py-2.5 shadow-lg">
            <p className="text-[0.625rem] font-bold uppercase tracking-widest leading-none">Certified</p>
            <p className="text-sm font-bold mt-0.5">ISO 9001:2015</p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' as const}}
          className="flex flex-col gap-6"
        >
          <p className="eyebrow">About BCIM Engineering</p>
          <h2 className="text-4xl lg:text-[2.75rem] font-bold text-dark">
            ISO-Certified
            <br />
            <span className="text-gradient">Construction Partner</span>
          </h2>
          <p className="text-navy-600 text-[1.0625rem] leading-relaxed">
            Established in {COMPANY.founded}, BCIM Engineering Private Limited provides total solutions
            for civil construction across Commercial, Residential, Industrial, Infra and Mechanical
            structures — monitored and executed by qualified, experienced engineers and supervisory staff.
          </p>
          <p className="text-navy-600 leading-relaxed">
            We focus exclusively on Commercial and Residential construction, allowing us to develop
            deep domain expertise and deliver exceptional quality on every project we undertake.
          </p>

          <ul className="grid grid-cols-1 gap-3 mt-2">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-navy-700 text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/about" className="btn-outline-dark">
              Our Story <ArrowRight size={15} />
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-2 px-5 py-3 text-[0.9375rem] font-semibold text-navy-700 hover:text-primary transition-colors"
            >
              View Projects <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
