import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ExternalLink, AtSign, ArrowRight, ShieldCheck } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

const FOOTER_LINKS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Projects', href: '/projects' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Commercial Construction', href: '/services/commercial' },
      { label: 'Residential Construction', href: '/services/residential' },
      { label: 'Interior Fit-Out', href: '/services/interior' },
      { label: 'Pre-Construction', href: '/services/pre-construction' },
      { label: 'Request a Quote', href: '/request-quote' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Sitemap', href: '/sitemap-page' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="container-xl py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        {/* Brand column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <span className="inline-flex items-center w-fit rounded-xl bg-white px-3 py-2">
            <Image src="/bcim-logo.png" alt="BCIM Engineering" width={130} height={44} style={{ width: 130, height: 'auto' }} />
          </span>
          <p className="text-navy-400 text-sm leading-relaxed max-w-sm">
            ISO 9001:2015 certified construction company delivering premium commercial and residential
            projects across South India since 2018.
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2.5 text-navy-300 hover:text-white transition-colors"
            >
              <Phone size={14} className="text-primary shrink-0" />
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2.5 text-navy-300 hover:text-white transition-colors"
            >
              <Mail size={14} className="text-primary shrink-0" />
              {COMPANY.email}
            </a>
            <a
              href={COMPANY.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-2.5 text-navy-300 hover:text-white transition-colors"
            >
              <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
              {COMPANY.address}
            </a>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={COMPANY.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <ExternalLink size={15} />
            </a>
            <a
              href={COMPANY.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <AtSign size={15} />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map((col) => (
          <div key={col.title} className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-navy-400">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div className="border-t border-white/8">
        <div className="container-xl py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm text-center sm:text-left">
            Have a project in mind?{' '}
            <span className="text-white font-medium">Let's talk about it.</span>
          </p>
          <Link href="/contact" className="btn-primary text-sm shrink-0">
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.75rem] text-navy-500">
          <span>© {new Date().getFullYear()} BCIM Engineering Private Limited. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-primary" />
            {COMPANY.iso}
          </span>
        </div>
      </div>
    </footer>
  )
}
