'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, ShieldCheck, HardHat, Clock } from 'lucide-react'
import { AWARDS, SAFETY_RECORD, COMPANY } from '@/lib/constants'

const CERTS = [
  { name: 'ISO 9001:2015', scope: 'Quality Management', body: 'Bureau Veritas' },
  { name: 'ISO 14001:2015', scope: 'Environmental Management', body: 'Bureau Veritas' },
  { name: 'ISO 45001:2018', scope: 'Occupational Health & Safety', body: 'Bureau Veritas' },
]

const p3 = SAFETY_RECORD.techridgeP3

const SAFETY_STATS = [
  { icon: HardHat, value: p3.safeManHoursSinceInception.toLocaleString('en-IN'), label: 'Safe Man-Hours (Techridge P3)' },
  { icon: Clock, value: String(p3.toolboxTalksSinceInception), label: 'Toolbox Talks' },
  { icon: ShieldCheck, value: String(p3.lostTimeAccidents), label: 'Lost Time Accidents' },
]

export function AwardsCertifications() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="section-py bg-dark overflow-hidden">
      <div className="container-xl">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-accent mb-3"
          >
            Recognition & Safety
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.07 }}
            className="text-4xl lg:text-[2.75rem] font-bold text-white"
          >
            Awards & Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.14 }}
            className="mt-4 text-navy-400 text-[1.0625rem] max-w-xl mx-auto"
          >
            Recognized for excellence in safety, quality, and environmental management.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 rounded-2xl border border-white/8 bg-white/4 p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
              <Award size={22} className="text-accent" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Awards</h3>
            <div className="space-y-4">
              {AWARDS.map((award) => (
                <div key={award.title} className="border-l-2 border-accent/40 pl-4">
                  <p className="text-white font-semibold text-sm">{award.title}</p>
                  <p className="text-navy-400 text-xs mt-1">{award.year} · {award.project}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 rounded-2xl border border-white/8 bg-white/4 p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
              <ShieldCheck size={22} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">ISO Certifications</h3>
            <div className="space-y-4">
              {CERTS.map((cert) => (
                <div key={cert.name} className="border-l-2 border-primary/40 pl-4">
                  <p className="text-white font-semibold text-sm">{cert.name}</p>
                  <p className="text-navy-400 text-xs mt-0.5">{cert.scope}</p>
                  <p className="text-navy-500 text-xs mt-0.5">Certified by {cert.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Safety Record */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1 rounded-2xl border border-white/8 bg-white/4 p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6">
              <HardHat size={22} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4">Safety Record</h3>
            <div className="space-y-5">
              {SAFETY_STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-emerald-400" />
                  </span>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">{value}</p>
                    <p className="text-navy-400 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-navy-500 text-xs mt-6 pt-4 border-t border-white/5">
              Certified by {SAFETY_RECORD.certifyingBody}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
