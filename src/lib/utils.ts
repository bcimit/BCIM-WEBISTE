import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolves an `image` field to a usable <img> src. Local project photos are
 * stored as absolute paths (`/images/...`); anything else is treated as a
 * legacy Unsplash photo id and built into a CDN URL.
 */
export function resolveImage(image: string, width = 1200): string {
  if (image.startsWith('/') || image.startsWith('http')) return image
  return `https://images.unsplash.com/photo-${image}?q=80&w=${width}&auto=format&fit=crop`
}
