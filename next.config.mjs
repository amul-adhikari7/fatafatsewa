/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fatafatsewa.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    turbo: {
      rules: {
        // Enable PostCSS processing
        '*.css': ['postcss-loader'],
      },
    },
  },
}

export default nextConfig
