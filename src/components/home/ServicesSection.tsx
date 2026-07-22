'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Building2, Home } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

const SERVICE_ICONS: Record<string, React.ElementType> = { Building2, Home }

const ACCENTS = [
  { icon: 'bg-primary', check: 'text-primary', glow: 'rgba(37,99,235,0.25)', border: '#2563EB' },
  { icon: 'bg-emerald-600', check: 'text-emerald-600', glow: 'rgba(5,150,105,0.25)', border: '#059669' },
]

function Card3D({
  service,
  index,
  inView,
}: {
  service: (typeof SERVICES)[number]
  index: number
  inView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig)
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig)
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig)
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig)
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springConfig)

  const accent = ACCENTS[index]
  const Icon = SERVICE_ICONS[service.icon] ?? Building2

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotateY: index === 0 ? -20 : 20, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.1 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
        className="relative bg-white rounded-3xl overflow-hidden border border-navy-100 cursor-pointer select-none"
        animate={{
          boxShadow: hovered
            ? `0 30px 80px rgba(15,23,42,0.2), 0 0 0 1px ${accent.border}30`
            : '0 2px 16px rgba(15,23,42,0.08)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Cursor glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(200px circle at ${glowX.get()}% ${glowY.get()}%, ${accent.glow}, transparent 70%)`,
              }}
              className="absolute inset-0 z-10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Image with 3D parallax */}
        <div className="relative h-64 lg:h-72 overflow-hidden rounded-t-3xl">
          <motion.img
            src={resolveImage(service.image, 900)}
            alt={service.title}
            style={{ x: imgX, y: imgY, scale: 1.08 }}
            className="w-full h-full object-cover"
          />
          {/* Dark base overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent" />

          {/* Floating icon badge */}
          <motion.span
            className={`absolute top-5 left-5 w-12 h-12 rounded-2xl ${accent.icon} flex items-center justify-center shadow-xl`}
            style={{ translateZ: 20 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
          >
            <Icon size={21} className="text-white" />
          </motion.span>

          {/* Title */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6"
            style={{ transform: 'translateZ(10px)' }}
          >
            <h3 className="text-xl font-bold text-white drop-shadow-md">{service.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 lg:p-8" style={{ transform: 'translateZ(5px)' }}>
          <p className="text-navy-600 leading-relaxed text-[0.9375rem]">{service.description}</p>

          <ul className="mt-6 grid grid-cols-1 gap-2.5">
            {service.items.map((item, j) => (
              <motion.li
                key={item}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.5 + index * 0.15 + j * 0.045 }}
              >
                <CheckCircle2 size={14} className={`shrink-0 ${accent.check}`} />
                <span className="text-sm text-navy-700">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="mt-7"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7 + index * 0.15 }}
          >
            <Link
              href={service.href}
              className={`inline-flex items-center gap-2 text-sm font-bold ${accent.check} group/link`}
            >
              Learn More
              <span className={`w-7 h-7 rounded-full ${accent.icon} flex items-center justify-center shadow group-hover/link:scale-110 transition-transform duration-200`}>
                <ArrowUpRight size={13} className="text-white" />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="services-section" className="section-py bg-white overflow-hidden">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-3"
            >
              <motion.span
                className="h-px bg-primary block"
                initial={{ width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <p className="eyebrow">What We Build</p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl lg:text-[2.75rem] font-bold text-dark"
            >
              Two Specialisations,{' '}
              <span className="text-gradient">One Standard</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dark text-dark text-sm font-semibold hover:bg-dark hover:text-white transition-all duration-300"
            >
              All Services
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* 3D Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, i) => (
            <Card3D key={service.id} service={service} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
