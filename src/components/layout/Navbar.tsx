'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Building2,
  Home,
  Wrench,
  Clipboard,
  ShieldCheck,
} from 'lucide-react'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import { cn } from '@/lib/utils'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'Commercial Construction': Building2,
  'Residential Construction': Home,
  'Interior Fit-Out': Wrench,
  'Pre-Construction Services': Clipboard,
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const servicesLink = NAV_LINKS.find((l) => l.label === 'Services')

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-white',
        scrolled ? 'shadow-[0_1px_0_rgba(15,23,42,.08),0_4px_16px_rgba(15,23,42,.06)]' : '',
      )}
    >
      <div className="container-xl h-[68px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="BCIM Engineering home">
          <Image src="/bcim-logo.png" alt="BCIM Engineering" width={120} height={40} priority style={{ width: 120, height: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            link.label === 'Services' ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-[0.875rem] font-medium rounded-md transition-colors',
                    pathname.startsWith('/services')
                      ? 'text-primary'
                      : 'text-navy-700 hover:text-primary',
                  )}
                >
                  Services
                  <ChevronDown
                    size={13}
                    className={cn('transition-transform duration-200', servicesOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' as const}}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[540px]"
                    >
                      <div className="bg-white rounded-2xl shadow-[var(--shadow-float)] border border-navy-100 overflow-hidden">
                        <div className="p-2 grid grid-cols-2 gap-1">
                          {servicesLink?.children?.map((child) => {
                            const Icon = SERVICE_ICONS[child.label] ?? Building2
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="flex items-start gap-3 p-4 rounded-xl hover:bg-bg transition-colors group"
                              >
                                <span className="mt-0.5 w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                  <Icon size={16} className="text-primary group-hover:text-white transition-colors" />
                                </span>
                                <span>
                                  <span className="block text-[0.875rem] font-semibold text-navy-900">
                                    {child.label}
                                  </span>
                                  <span className="block text-[0.75rem] text-navy-500 mt-0.5 leading-snug">
                                    {child.description}
                                  </span>
                                </span>
                              </Link>
                            )
                          })}
                        </div>
                        <div className="border-t border-navy-100 px-4 py-3 bg-bg flex items-center justify-between">
                          <span className="text-[0.75rem] text-navy-500">
                            Commercial &amp; Residential specialists since 2018
                          </span>
                          <Link
                            href="/services"
                            className="flex items-center gap-1 text-[0.8125rem] font-semibold text-primary hover:underline"
                          >
                            All Services <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-[0.875rem] font-medium rounded-md transition-colors',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-primary'
                    : 'text-navy-700 hover:text-primary',
                )}
              >
                {link.label}
                {(pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-light text-primary text-[0.6875rem] font-bold uppercase tracking-wide"
            title="Bureau Veritas-certified ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018"
          >
            <ShieldCheck size={13} />
            ISO 9001 · 14001 · 45001
          </span>
          <a
            href={COMPANY.phoneHref}
            className="flex items-center gap-2 text-[0.875rem] font-medium text-navy-700 hover:text-primary transition-colors"
          >
            <Phone size={14} />
            {COMPANY.phone}
          </a>
          <Link
            href="/request-quote"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Request Quote <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 text-navy-900 hover:text-primary transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-navy-100 overflow-hidden"
          >
            <div className="container-xl py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-3 px-2 text-[0.9375rem] font-medium border-b border-navy-100 last:border-0 transition-colors',
                    pathname === link.href ? 'text-primary' : 'text-navy-700',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-primary-light text-primary text-[0.6875rem] font-bold uppercase tracking-wide">
                  <ShieldCheck size={13} />
                  ISO 9001 · 14001 · 45001
                </span>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2 text-sm font-medium text-navy-700"
                >
                  <Phone size={14} /> {COMPANY.phone}
                </a>
                <Link href="/request-quote" className="btn-primary text-sm justify-center">
                  Request a Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
