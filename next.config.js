import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ✅ Your app's public domain
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)
        return {
          protocol: url.protocol.replace(':', ''),
          hostname: url.hostname,
        }
      }),
  
      // ✅ UploadThing legacy domain
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
  
      // ✅ UploadThing new CDN subdomains (*.ufs.sh)
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
      },
  
      // ✅ Hetzner: sslip.io IP-based domain (important!)
      {
        protocol: 'http', // change to 'https' if using HTTPS
        hostname: '**.sslip.io',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withNextIntl(withPayload(nextConfig))
