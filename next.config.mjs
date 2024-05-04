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
  async rewrites() {
    return [
      {
        // Rewrite rule for booking.hyello.co.uk and all paths beyond it
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'booking.hyello.co.uk',
          },
        ],
        destination: '/booking/:path*', // Point to the 'pages/booking' directory
      },
      {
        // Additional rewrite rule to handle the root path
        source: '/',
        has: [
          {
            type: 'host',
            value: 'booking.hyello.co.uk',
          },
        ],
        destination: '/booking', // Point to the 'pages/booking/index.js' file
      },
    ];
  },
};

export default nextConfig;
