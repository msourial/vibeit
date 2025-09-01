/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Disable static optimization for pages with Web3 components
  experimental: {
    esmExternals: false,
    optimizePackageImports: ['@heroicons/react']
  },
  // Add environment variables for build
  env: {
    NEXT_PUBLIC_IGNORE_BUILD_ERROR: "true"
  }
};

export default nextConfig;
