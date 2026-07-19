'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { CalendarDays, CheckCircle2, HardHat, LayoutGrid, Users } from 'lucide-react'
import { STATS } from '@/lib/constants'

const ICON_MAP: Record<string, React.ElementType> = {
  CalendarDays,
  CheckCircle2,
  HardHat,
  LayoutGrid,
  Users,
}

const ICON_COLORS: Record<string, string> = {
  CalendarDays: 'bg-blue-50 text-primary',
  CheckCircle2: 'bg-emerald-50 text-emerald-600',
  HardHat: 'bg-amber-50 text-amber-600',
  LayoutGrid: 'bg-violet-50 text-violet-600',
  Users: 'bg-sky-50 text-sky-600',
}

function StatItem({
  label,
  value,
  suffix,
  prefix,
  icon,
  delay,
}: {
  label: string
  value: number
  suffix: string
  prefix?: string
  icon: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = ICON_MAP[icon] ?? CalendarDays
  const colorClass = ICON_COLORS[icon] ?? 'bg-blue-50 text-primary'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' as const}}
      className="flex items-center gap-4 px-4 sm:px-7 py-5 sm:py-6 flex-1 min-w-0"
    >
      <span
        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}
        aria-hidden="true"
      >
        <Icon size={21} />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-dark leading-none tabular-nums">
          {prefix}
          {inView ? (
            <CountUp end={value} duration={2.2} separator="," />
          ) : (
            0
          )}
          <span className="text-primary">{suffix}</span>
        </p>
        <p className="text-navy-500 text-xs mt-1.5 leading-snug">{label}</p>
      </div>
    </motion.div>
  )
}

export function Stats() {
  return (
    <section id="stats-section" className="relative z-20 -mt-10">
      <div className="container-xl">
        <div className="bg-white rounded-2xl shadow-[var(--shadow-float)] border border-navy-100 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-navy-100 overflow-hidden">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
