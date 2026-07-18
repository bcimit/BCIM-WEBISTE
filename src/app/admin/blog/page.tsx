import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus, Edit2, Eye, Clock } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = { title: 'Blog Posts' }

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Blog Posts</h1>
          <p className="text-navy-500 text-sm mt-1">{BLOG_POSTS.length} published articles</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="grid gap-4">
        {BLOG_POSTS.map(post => (
          <div key={post.slug} className="bg-white rounded-2xl border border-navy-100 shadow-[var(--shadow-card)] p-5 flex items-center gap-5">
            <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://images.unsplash.com/photo-${post.image}?q=60&w=160&auto=format&fit=crop`}
                alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-dark truncate">{post.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">Published</span>
                <span className="flex items-center gap-1 text-xs text-navy-400"><Clock size={10} />{post.readTime} min</span>
                <span className="text-xs text-navy-400">{post.category}</span>
                <span className="text-xs text-navy-400">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <p className="text-navy-500 text-xs mt-1 line-clamp-1">{post.excerpt}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/blog/${post.slug}`} target="_blank"
                className="w-8 h-8 rounded-lg bg-bg hover:bg-primary/10 flex items-center justify-center text-navy-500 hover:text-primary transition-colors">
                <Eye size={14} />
              </Link>
              <button className="w-8 h-8 rounded-lg bg-bg hover:bg-primary/10 flex items-center justify-center text-navy-500 hover:text-primary transition-colors">
                <Edit2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
