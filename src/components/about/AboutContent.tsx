'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Target, Eye, Heart } from 'lucide-react'
import { BOARD_OF_DIRECTORS, SENIOR_MANAGEMENT } from '@/lib/team'

const TIMELINE = [
  { year: '2018', event: 'BCIM Engineering Private Limited established in Bengaluru for civil construction contract works across real estate and infrastructure.' },
  { year: 'Since', event: 'Delivered commercial projects for Divyasree Developers and LOCL across Hyderabad and Bengaluru.' },
  { year: 'Certified', event: 'ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 — integrated management systems across every site.' },
  { year: 'Now', event: 'Ongoing projects for Divyasree Developers, Godrej Properties and Curated Living Solutions across Hyderabad and Thane.' },
]

const VALUES = [
  { icon: Heart, label: 'Integrity', desc: 'Honest communication, transparent pricing, no surprises.' },
  { icon: CheckCircle2, label: 'Quality', desc: 'ISO-certified processes at every stage, every project.' },
  { icon: Target, label: 'Accountability', desc: 'We own outcomes — successes and challenges alike.' },
  { icon: Eye, label: 'Safety First', desc: 'Zero-compromise on site safety for every worker, every day.' },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const},
  }
}

export function AboutContent() {
  return (
    <>
      {/* Mission / Vision / Values */}
      <section className="section-py bg-white">
        <div className="container-xl grid lg:grid-cols-3 gap-8">
          {[
            { icon: Target, color: 'bg-primary-light text-primary', label: 'Our Mission', text: 'To deliver premium commercial and residential construction projects with uncompromising quality, on time and within budget — earning lifetime client trust.' },
            { icon: Eye, color: 'bg-amber-50 text-amber-600', label: 'Our Vision', text: 'To be the most trusted construction company in South India, known for technical excellence, ethical practices, and a culture of safety.' },
            { icon: Heart, color: 'bg-emerald-50 text-emerald-600', label: 'Our Promise', text: 'Every project we undertake gets the full attention of our senior leadership — from design review to final snag clearance.' },
          ].map(({ icon: Icon, color, label, text }, i) => (
            <motion.div key={label} {...fadeUp(i * 0.1)} className="p-8 rounded-2xl border border-navy-100 bg-bg">
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-5`}>
                <Icon size={22} />
              </span>
              <h3 className="font-bold text-dark text-lg mb-3">{label}</h3>
              <p className="text-navy-600 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="section-py bg-bg">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="eyebrow mb-3">Our Journey</p>
            <h2 className="text-4xl font-bold text-dark">ISO-Certified Civil Construction, Since 2018</h2>
          </motion.div>
          <div className="relative pl-8 border-l-2 border-navy-200 space-y-10">
            {TIMELINE.map(({ year, event }, i) => (
              <motion.div key={year} {...fadeUp(i * 0.06)} className="relative">
                <span className="absolute -left-[2.85rem] top-1 w-5 h-5 rounded-full bg-primary border-4 border-white shadow" />
                <span className="text-xs font-bold text-primary tracking-widest uppercase">{year}</span>
                <p className="mt-1 text-navy-700 text-[0.9375rem] leading-relaxed">{event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="eyebrow mb-3">Leadership</p>
            <h2 className="text-4xl font-bold text-dark">The Board &amp; Senior Management</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
            {BOARD_OF_DIRECTORS.map(({ name, role }, i) => (
              <motion.div key={name} {...fadeUp(i * 0.08)} className="p-6 rounded-2xl border border-navy-100 bg-bg text-center">
                <h3 className="font-bold text-dark">{name}</h3>
                <p className="text-primary text-xs font-bold uppercase tracking-wide mt-1">{role}</p>
              </motion.div>
            ))}
          </div>

          <p className="eyebrow text-center mb-6">Senior Management</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SENIOR_MANAGEMENT.map(({ name, role, experience, bio }, i) => (
              <motion.div key={name} {...fadeUp((i % 3) * 0.06)} className="p-5 rounded-xl border border-navy-100 bg-bg">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-dark text-sm">{name}</h3>
                  {experience && <span className="text-primary text-[0.6875rem] font-bold shrink-0">{experience}</span>}
                </div>
                <p className="text-primary text-xs font-semibold mt-1">{role}</p>
                {bio && <p className="text-navy-500 text-xs mt-2 leading-relaxed">{bio}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-py bg-dark">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-primary mb-3">Certifications & Accreditations</p>
            <h2 className="text-4xl font-bold text-white">Built on Verified Standards</h2>
            <p className="text-navy-400 mt-4 max-w-xl mx-auto">Bureau Veritas-certified integrated management system, and members of the National Safety Council.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { src: '/images/certifications/bureau-veritas-iso.jpg', caption: 'ISO 9001:2015, 14001:2015 & 45001:2018 — Bureau Veritas Certification' },
              { src: '/images/certifications/national-safety-council.jpg', caption: 'National Safety Council — Membership Certificate' },
            ].map(({ src, caption }, i) => (
              <motion.div key={src} {...fadeUp(i * 0.1)} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={caption} className="w-full h-64 object-contain bg-white p-4" />
                <p className="text-navy-400 text-xs text-center p-3 border-t border-white/10">{caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-py bg-white">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="eyebrow mb-3">Recognition</p>
            <h2 className="text-4xl font-bold text-dark">International Safety Award — Merit, 2024</h2>
            <p className="text-navy-500 mt-4 max-w-xl mx-auto">Awarded for Techridge P3, recognising BCIM&apos;s safety management system and site practices.</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { src: '/images/certifications/international-safety-award.jpg', caption: 'International Safety Award — Merit 2024' },
              { src: '/images/awards/safety-award-ceremony-1.jpg', caption: 'Award ceremony' },
              { src: '/images/awards/safety-award-ceremony-2.jpg', caption: 'BCIM Engineering — Techridge P3 team' },
            ].map(({ src, caption }, i) => (
              <motion.div key={src} {...fadeUp(i * 0.08)} className="rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={caption} className="w-full h-48 object-cover" />
                <p className="text-navy-500 text-xs text-center p-3">{caption}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-bg">
        <div className="container-xl text-center">
          <motion.h2 {...fadeUp()} className="text-4xl font-bold text-dark mb-4">
            Ready to work with us?
          </motion.h2>
          <motion.p {...fadeUp(0.08)} className="text-navy-500 text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s discuss your project and see how BCIM Engineering can deliver it.
          </motion.p>
          <motion.div {...fadeUp(0.14)} className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Get in Touch <ArrowRight size={16} /></Link>
            <Link href="/projects" className="btn-outline-dark">View Our Projects <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
