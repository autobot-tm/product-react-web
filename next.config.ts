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
  },
  images: {
    domains: ['avatar.iran.liara.run', 'fakestoreapi.com']
  }
}

export default nextConfig
