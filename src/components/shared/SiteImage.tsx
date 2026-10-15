import Image from 'next/image'
import { resolveImage } from '@/lib/utils'

interface SiteImageProps {
  /** Local path (`/images/...`) or legacy Unsplash photo id. */
  src: string
  alt: string
  /** Rendered width hint for responsive srcset, e.g. "(min-width:1024px) 33vw, 100vw". */
  sizes: string
  /** Only for the genuine above-the-fold / LCP image. */
  priority?: boolean
  className?: string
  /** Width requested from Unsplash for remote ids (ignored for local files). */
  remoteWidth?: number
}

/**
 * Fills its nearest positioned parent. Local photos go through the Next.js image
 * optimiser (AVIF/WebP, responsive sizes, lazy loading); legacy Unsplash ids keep
 * their already-optimised CDN URL but gain lazy loading and async decoding.
 * The parent must be `relative` (or absolute/fixed) and have a size.
 */
export function SiteImage({ src, alt, sizes, priority = false, className = '', remoteWidth = 800 }: SiteImageProps) {
  if (src.startsWith('/')) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolveImage(src, remoteWidth)}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
}
