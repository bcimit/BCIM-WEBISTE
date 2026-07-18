import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/shared/PageHero'
import { PROJECTS } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Full sitemap of the BCIM Engineering website — find all pages, services, projects, and blog articles.',
}

const SECTIONS = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Request a Quote', href: '/request-quote' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Services Overview', href: '/services' },
      { label: 'Commercial Construction', href: '/services/commercial' },
      { label: 'Residential Construction', href: '/services/residential' },
      { label: 'Interior Fit-Out', href: '/services/interior' },
      { label: 'Pre-Construction Services', href: '/services/pre-construction' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'XML Sitemap', href: '/sitemap.xml' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Navigation"
        title="Sitemap"
        description="A complete index of all pages on the BCIM Engineering website."
      />

      <section className="section-py bg-white">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Static sections */}
            {SECTIONS.map(section => (
              <div key={section.title} className="rounded-2xl border border-navy-100 bg-bg p-6">
                <h2 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-5">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="flex items-center gap-2 text-sm text-navy-700 hover:text-primary transition-colors group">
                        <ArrowRight size={12} className="text-navy-300 group-hover:text-primary transition-colors shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Projects */}
            <div className="rounded-2xl border border-navy-100 bg-bg p-6">
              <h2 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-5">Projects</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-primary transition-colors group">
                    <ArrowRight size={12} className="text-navy-300 group-hover:text-primary shrink-0" />
                    All Projects
                  </Link>
                </li>
                {PROJECTS.map(p => (
                  <li key={p.id}>
                    <Link href={`/projects/${p.id}`}
                      className="flex items-center gap-2 text-sm text-navy-700 hover:text-primary transition-colors group">
                      <ArrowRight size={12} className="text-navy-300 group-hover:text-primary shrink-0" />
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog */}
            <div className="rounded-2xl border border-navy-100 bg-bg p-6">
              <h2 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-5">Blog Articles</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-primary transition-colors group">
                    <ArrowRight size={12} className="text-navy-300 group-hover:text-primary shrink-0" />
                    All Articles
                  </Link>
                </li>
                {BLOG_POSTS.map(post => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-sm text-navy-700 hover:text-primary transition-colors group">
                      <ArrowRight size={12} className="text-navy-300 group-hover:text-primary shrink-0" />
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
