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
        // Rewrite rule for the root path of booking.hyello.co.uk
        source: '/',
        has: [
          {
            type: 'host',
            value: 'booking.hyello.co.uk',
          },
        ],
        destination: '/booking', // Point to the 'pages/booking/index.js' file
      },
      {
        // Rewrite rule for all paths beyond the root
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'booking.hyello.co.uk',
          },
        ],
        destination: '/booking/:path*', // Point to the 'pages/booking' directory
      },
    ];
  },
};

export default nextConfig;
