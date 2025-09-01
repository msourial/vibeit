/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Enable static export for better Vercel compatibility
  output: 'standalone',
  // Optimize for production
  experimental: {
    optimizePackageImports: ['@heroicons/react']
  }
};

export default nextConfig;
