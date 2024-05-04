// Import the 'rewrites' function from 'next/dist/next-server/server/config'
import { rewrites } from 'next/dist/next-server/server/config'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },

  // Define custom rewrites
  // Ensure to use 'rewrites' from 'next/dist/next-server/server/config'
  rewrites() {
    return {
      beforeFiles: [
        // Rewrite rule for booking.hyello.co.uk
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'booking.hyello.co.uk',
            },
          ],
          destination: '/booking/:path*', // Point to the 'pages/booking' directory
        },
      ],
    }
  },
}

export default nextConfig
