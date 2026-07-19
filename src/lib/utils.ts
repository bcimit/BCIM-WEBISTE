import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ALLOWED_IMAGE_HOSTS = new Set(['images.unsplash.com'])

/**
 * Resolves an `image` field to a usable <img> src. Local project photos are
 * stored as absolute paths (`/images/...`); anything else is treated as a
 * legacy Unsplash photo id and built into a CDN URL.
 */
export function resolveImage(image: string, width = 1200): string {
  if (image.startsWith('/')) return image
  if (image.startsWith('http')) {
    try {
      const { hostname } = new URL(image)
      if (ALLOWED_IMAGE_HOSTS.has(hostname)) return image
    } catch {}
    return '/images/placeholder.jpg'
  }
  return `https://images.unsplash.com/photo-${image}?q=80&w=${width}&auto=format&fit=crop`
}
