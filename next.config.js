/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.weatherapi\.com/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'weather-api-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '/weather/**',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);

