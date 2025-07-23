/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper build output
  output: 'standalone',
  
  // Configure headers for CSP that allows Chart.js to work
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob: https://ui-avatars.com",
              "connect-src 'self' https://dummyjson.com https://vercel.live",
              "frame-src 'self' https://vercel.live",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ]
      }
    ]
  },

  // Webpack configuration for better builds
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'chart.js': 'chart.js/auto'
      }
    }
    return config
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'chart.js', 'react-chartjs-2']
  }
};

export default nextConfig;
