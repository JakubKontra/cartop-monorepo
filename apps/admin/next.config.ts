import type { NextConfig } from "next";

const isProd =
  process.env.NEXT_PUBLIC_VERCEL_BRANCH === "production" ||
  process.env.NODE_ENV === "production";

const enableProdSourceMaps = process.env.NEXT_ENABLE_SOURCEMAPS === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: "standalone",
  productionBrowserSourceMaps: enableProdSourceMaps,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    reactCompiler: true,
  },
  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
