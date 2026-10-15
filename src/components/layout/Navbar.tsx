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
  ShieldCheck,
  LogIn,
} from 'lucide-react'
import { NAV_LINKS, COMPANY } from '@/lib/constants'
import { cn } from '@/lib/utils'

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'Commercial Construction': Building2,
  'Residential Construction': Home,
}

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const servicesLink = NAV_LINKS.find((l) => l.label === 'Services')
  const DROPDOWNS = ['The Company', 'Others']
  const DROPDOWN_PATHS: Record<string, string[]> = {
    'The Company': ['/about', '/managing-director-message'],
    Others: ['/policies', '/facilities', '/clients', '/events', '/vendor-form'],
  }
  const transparent = isHome && !scrolled && !mobileOpen

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,.08),0_4px_16px_rgba(15,23,42,.06)]',
      )}
    >
      <div className="container-xl h-[72px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="BCIM Engineering home"
          className={`shrink-0 flex items-center transition-all duration-500 ${transparent ? 'bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5' : ''}`}
        >
          <Image
            src="/bcim-logo.png"
            alt="BCIM Engineering"
            width={130}
            height={44}
            priority
            style={{ width: 110, height: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            DROPDOWNS.includes(link.label) ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setOpenMenu(link.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={link.href}
                  aria-haspopup="true"
                  aria-expanded={openMenu === link.label}
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-[0.875rem] font-medium rounded-md transition-colors whitespace-nowrap',
                    DROPDOWN_PATHS[link.label]?.includes(pathname)
                      ? transparent ? 'text-white' : 'text-primary'
                      : transparent ? 'text-white/80 hover:text-white' : 'text-navy-700 hover:text-primary',
                  )}
                >
                  {link.label}
                  <ChevronDown size={13} className={cn('transition-transform duration-200', openMenu === link.label && 'rotate-180')} />
                </Link>
                <AnimatePresence>
                  {openMenu === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' as const }}
                      className="absolute top-full left-0 pt-2 w-64"
                    >
                      <ul className="bg-white rounded-2xl shadow-[var(--shadow-float)] border border-navy-100 p-2">
                        {link.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              className="block px-4 py-2 rounded-lg text-[0.875rem] text-navy-700 hover:bg-bg hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : link.label === 'Services' ? (
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
                    'flex items-center gap-1 px-3 py-2 text-[0.875rem] font-medium rounded-md transition-colors whitespace-nowrap',
                    pathname.startsWith('/services')
                      ? transparent ? 'text-white' : 'text-primary'
                      : transparent ? 'text-white/80 hover:text-white' : 'text-navy-700 hover:text-primary',
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
                  'relative px-3 py-2 text-[0.875rem] font-medium rounded-md transition-colors whitespace-nowrap',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? transparent ? 'text-white' : 'text-primary'
                    : transparent ? 'text-white/80 hover:text-white' : 'text-navy-700 hover:text-primary',
                )}
              >
                {link.label}
                {!transparent && (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            ),
          )}
        </nav>

        {/* Right actions */}
        <div className="hidden xl:flex items-center gap-3 shrink-0">
          <a
            href="https://erp.bcim.in"
            target="_blank"
            rel="noreferrer"
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-lg text-[0.8125rem] font-semibold transition-colors whitespace-nowrap',
              transparent
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-navy-700 hover:text-primary hover:bg-primary-light',
            )}
          >
            <LogIn size={14} />
            ERP Login
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className={cn(
            'xl:hidden p-2 transition-colors',
            transparent ? 'text-white hover:text-white/80' : 'text-navy-900 hover:text-primary',
          )}
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
            className="xl:hidden bg-white border-t border-navy-100 overflow-hidden"
          >
            <div className="container-xl py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href} className="border-b border-navy-100 last:border-0">
                  <Link
                    href={link.href}
                    className={cn(
                      'block py-3 px-2 text-[0.9375rem] font-medium transition-colors',
                      pathname === link.href ? 'text-primary' : 'text-navy-700',
                    )}
                  >
                    {link.label}
                  </Link>
                  {DROPDOWNS.includes(link.label) && (
                    <ul className="pb-2 pl-4 flex flex-col">
                      {link.children?.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="block py-1.5 px-2 text-sm text-navy-500 hover:text-primary">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  <a
                    href="https://erp.bcim.in"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-navy-700 bg-bg border border-navy-100"
                  >
                    <LogIn size={14} /> ERP Login
                  </a>
                </div>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2 text-sm font-medium text-navy-700"
                >
                  <Phone size={14} /> {COMPANY.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
