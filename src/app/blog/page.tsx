import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Construction insights, industry trends, and expert guides from the BCIM Engineering team.',
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS

  return (
    <>
      <PageHero eyebrow="Insights & Guides" title="Construction Knowledge Hub"
        description="Expert perspectives on commercial and residential construction, industry trends, and project management best practices." />

      <section className="section-py bg-white">
        <div className="container-xl">
          {/* Featured post */}
          <div className="group grid lg:grid-cols-2 gap-8 mb-16 rounded-2xl overflow-hidden border border-navy-100 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow bg-bg">
            <div className="relative h-64 lg:h-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://images.unsplash.com/photo-${featured.image}?q=80&w=900&auto=format&fit=crop`}
                alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">Featured</span>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-xs text-navy-500"><Tag size={11} />{featured.category}</span>
                <span className="flex items-center gap-1 text-xs text-navy-500"><Clock size={11} />{featured.readTime} min read</span>
              </div>
              <h2 className="text-2xl font-bold text-dark leading-snug">{featured.title}</h2>
              <p className="text-navy-500 text-sm leading-relaxed mt-3">{featured.excerpt}</p>
              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-sm font-semibold text-dark">{featured.author}</p>
                  <p className="text-xs text-navy-400">{new Date(featured.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <Link href={`/blog/${featured.slug}`} className="flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map(post => (
              <article key={post.slug} className="group flex flex-col rounded-2xl overflow-hidden border border-navy-100 bg-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-float)] transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://images.unsplash.com/photo-${post.image}?q=80&w=600&auto=format&fit=crop`}
                    alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary/90 text-white text-[0.625rem] font-bold">{post.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={11} className="text-navy-400" />
                    <span className="text-xs text-navy-400">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-bold text-dark leading-snug flex-1">{post.title}</h3>
                  <p className="text-navy-500 text-sm mt-2 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-navy-100">
                    <p className="text-xs text-navy-400">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all">
                      Read <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
