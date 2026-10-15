import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimised variants are cached for 30 days; source photos keep their path.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Unfingerprinted public assets: cache for a day, serve stale while revalidating.
        // (Hashed /_next/static files already get immutable caching from Next.js.)
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/:file(bcim-logo.png|og-image.jpg|favicon.ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
}

export default nextConfig
