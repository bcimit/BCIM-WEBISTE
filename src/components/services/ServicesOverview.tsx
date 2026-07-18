'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Building2, Home, Wrench, Clipboard } from 'lucide-react'
import { PROCESS_STEPS } from '@/lib/constants'
import { resolveImage } from '@/lib/utils'

const SERVICES_DETAIL = [
  {
    id: 'commercial',
    icon: Building2,
    color: 'from-primary to-blue-700',
    bg: 'bg-primary-light',
    text: 'text-primary',
    title: 'Commercial Construction',
    subtitle: 'Offices · Campuses · Retail · Hospitality',
    description: 'From corporate headquarters to Grade-A IT parks, we build commercial spaces that enhance productivity, reflect brand identity, and stand the test of time.',
    items: ['Corporate Office Buildings', 'IT Parks & Tech Campuses', 'Shopping Complexes & Malls', 'Hotels & Hospitality', 'Hospitals & Healthcare', 'Warehouses & Logistics'],
    href: '/services/commercial',
    image: '/images/projects/techridge-p3.jpg',
  },
  {
    id: 'residential',
    icon: Home,
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    title: 'Residential Construction',
    subtitle: 'Villas · Apartments · Gated Communities',
    description: 'Premium living spaces built with meticulous craftsmanship — from single luxury villas to large-scale gated residential communities.',
    items: ['Luxury Villas & Bungalows', 'Premium Apartment Complexes', 'Gated Communities', 'Row Houses & Townhouses', 'Independent Houses', 'Duplex & Penthouse Units'],
    href: '/services/residential',
    image: '/images/projects/godrej-ascend.jpg',
  },
  {
    id: 'interior',
    icon: Wrench,
    color: 'from-violet-600 to-purple-700',
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    title: 'Interior Fit-Out',
    subtitle: 'Turnkey interiors for commercial spaces',
    description: 'Complete interior fit-out services for commercial spaces — from bare shell to fully operational, beautifully finished work environments.',
    items: ['Category A & B Fit-Outs', 'Office Interior Design', 'False Ceiling & Flooring', 'Joinery & Furniture', 'MEP & AV Integration', 'Brand Environment Design'],
    href: '/services/interior',
    image: '1497366216548-37526070297c',
  },
  {
    id: 'pre-construction',
    icon: Clipboard,
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    title: 'Pre-Construction Services',
    subtitle: 'Planning · Estimation · Value Engineering',
    description: 'Expert pre-construction advisory to optimise your project scope, budget, and schedule before a single brick is laid.',
    items: ['Feasibility Studies', 'Detailed Bill of Quantities', 'Value Engineering', 'Schedule Development', 'Contractor Procurement', 'Risk Assessment'],
    href: '/services/pre-construction',
    image: '1541888946425-d81bb19240f5',
  },
]

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: 'easeOut' as const},
  }
}

export function ServicesOverview() {
  return (
    <>
      {/* Service cards */}
      <section className="section-py bg-white">
        <div className="container-xl grid md:grid-cols-2 gap-8">
          {SERVICES_DETAIL.map(({ id, icon: Icon, color, bg, text, title, subtitle, description, items, href, image }, i) => (
            <motion.div key={id} {...fadeUp(i * 0.08)}
              className="group rounded-2xl border border-navy-100 overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow duration-300 bg-white"
            >
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={resolveImage(image, 800)} alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <span className={`absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                  <Icon size={18} className="text-white" />
                </span>
              </div>
              <div className="p-7">
                <p className={`text-xs font-bold uppercase tracking-widest ${text} mb-1`}>{subtitle}</p>
                <h3 className="text-xl font-bold text-dark">{title}</h3>
                <p className="text-navy-600 text-sm leading-relaxed mt-3">{description}</p>
                <ul className="mt-5 grid grid-cols-2 gap-y-2 gap-x-4">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-navy-700">
                      <CheckCircle2 size={12} className={text} />{item}
                    </li>
                  ))}
                </ul>
                <Link href={href} className={`inline-flex items-center gap-2 mt-6 text-sm font-semibold ${text} hover:gap-3 transition-all`}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-py bg-bg">
        <div className="container-xl">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="eyebrow mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-dark">Our Six-Step Process</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map(({ step, title, description }, i) => (
              <motion.div key={step} {...fadeUp(i * 0.07)} className="p-6 rounded-2xl border border-navy-100 bg-white relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-black text-navy-100 select-none">{step}</span>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[0.6875rem] font-bold tracking-widest uppercase mb-4">Step {step}</span>
                <h3 className="font-bold text-dark">{title}</h3>
                <p className="mt-2 text-navy-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-white">
        <div className="container-xl text-center">
          <motion.h2 {...fadeUp()} className="text-4xl font-bold text-dark mb-4">Start Your Project Today</motion.h2>
          <motion.p {...fadeUp(0.08)} className="text-navy-500 text-lg mb-8 max-w-xl mx-auto">
            Tell us about your construction requirement and we&apos;ll prepare a detailed proposal promptly.
          </motion.p>
          <motion.div {...fadeUp(0.14)} className="flex flex-wrap justify-center gap-4">
            <Link href="/request-quote" className="btn-primary">Request a Free Quote <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn-outline-dark">Contact Us <ArrowRight size={16} /></Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
