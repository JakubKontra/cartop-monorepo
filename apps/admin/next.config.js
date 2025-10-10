/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@cartop/shared', '@cartop/formatting', '@cartop/types'],
  experimental: {
    // Enable this if you need Server Actions
    // serverActions: true,
  },
};

module.exports = nextConfig;
