import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

function renderBody(body: string) {
  return body.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return <h3 key={i} className="text-lg font-bold text-dark mt-8 mb-3">{para.slice(2, -2)}</h3>
    }
    if (para.startsWith('- ')) {
      return (
        <ul key={i} className="list-disc list-inside space-y-1 text-navy-600 text-[1.0625rem] leading-relaxed">
          {para.split('\n').map((l, j) => <li key={j}>{l.slice(2)}</li>)}
        </ul>
      )
    }
    return <p key={i} className="text-navy-600 text-[1.0625rem] leading-[1.8]">{para}</p>
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-[68px] h-[400px] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://images.unsplash.com/photo-${post.image}?q=80&w=1800&auto=format&fit=crop`}
          alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-dark/75" />
        <div className="relative z-10 container-xl pb-12 w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold"><Tag size={11} />{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-white/60"><Clock size={11} />{post.readTime} min read</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </section>

      {/* Article */}
      <section className="section-py bg-white">
        <div className="container-xl grid lg:grid-cols-[1fr_300px] gap-16">
          <article>
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-navy-100">
              <div>
                <p className="font-semibold text-dark text-sm">{post.author}</p>
                <p className="text-navy-400 text-xs mt-0.5">
                  {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="prose-custom space-y-5">{renderBody(post.body)}</div>
            <div className="mt-12 pt-8 border-t border-navy-100">
              <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-primary transition-colors">
                <ArrowLeft size={14} /> Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-navy-100 bg-bg p-6">
              <h3 className="font-bold text-dark mb-4">Ready to Build?</h3>
              <p className="text-navy-500 text-sm mb-5">Speak to our team about your commercial or residential project.</p>
              <Link href="/contact" className="btn-primary text-sm w-full justify-center">Get in Touch <ArrowRight size={14} /></Link>
            </div>
            <div className="rounded-2xl border border-navy-100 bg-bg p-6">
              <h3 className="font-bold text-dark mb-5">More Articles</h3>
              <div className="space-y-5">
                {related.map(r => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                    <p className="text-sm font-semibold text-dark group-hover:text-primary transition-colors leading-snug">{r.title}</p>
                    <p className="text-xs text-navy-400 mt-1">{r.readTime} min · {r.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
