'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FolderKanban, MessageSquare, FileText,
  Images, Briefcase, Settings, ExternalLink, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Quote Requests', href: '/admin/quotes', icon: Briefcase },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-dark min-h-screen shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/8 flex items-center gap-3">
        <Image src="/bcim-logo.png" alt="BCIM" width={80} height={28} style={{ width: 80, height: 'auto' }} className="brightness-0 invert" />
        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active ? 'bg-primary text-white' : 'text-white/60 hover:text-white hover:bg-white/8')}>
              <Icon size={16} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-5 space-y-0.5 border-t border-white/8 pt-4">
        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors">
          <Settings size={16} /> Settings
        </Link>
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors">
          <ExternalLink size={16} /> View Website
        </Link>
      </div>
    </aside>
  )
}
