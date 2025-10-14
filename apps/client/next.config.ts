import type { NextConfig } from 'next';

const isProd =
  process.env.NEXT_PUBLIC_VERCEL_BRANCH === 'production' || process.env.NODE_ENV === 'production';

const enableProdSourceMaps = process.env.NEXT_ENABLE_SOURCEMAPS === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  productionBrowserSourceMaps: enableProdSourceMaps,
  transpilePackages: ['@cartop/validation', '@cartop/api-client', '@cartop/ui-utils'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
    // reactCompiler: true, // Disabled - requires babel-plugin-react-compiler
  },
  compiler: {
    removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    domains: ['localhost', '127.0.0.1', 'cartop.cz', 'unsplash.com', 'images.unsplash.com'],
  },
};

export default nextConfig;
