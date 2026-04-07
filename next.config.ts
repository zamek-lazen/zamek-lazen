import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/index-sitemap.xml',
        permanent: true
      }
    ]
  }
}

export default withNextIntl(nextConfig)
