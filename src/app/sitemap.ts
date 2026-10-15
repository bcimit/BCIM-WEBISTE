import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/lib/constants'
import { BLOG_POSTS } from '@/lib/blog'

const BASE = 'https://site.bcim.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services/commercial`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services/residential`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/projects`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/gallery`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/careers`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/managing-director-message`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/policies`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/facilities`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/clients`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/events`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/vendor-form`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map(p => ({
    url: `${BASE}/projects/${p.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}
