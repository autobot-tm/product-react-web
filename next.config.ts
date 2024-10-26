import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/product-management',
        permanent: true,
        locale: false
      }
    ]
  }
}

export default nextConfig
