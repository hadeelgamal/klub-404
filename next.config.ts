import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  /*
   * turbopack.root silences the "multiple lockfiles detected" workspace-root
   * warning that appears when running `next dev --turbopack` from a monorepo.
   * This is a top-level config key in Next.js 15+, not inside `experimental`.
   */
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
