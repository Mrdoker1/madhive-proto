/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  outputFileTracingRoot: __dirname,
  output: isStaticExport ? "export" : "standalone",
  ...(isStaticExport && {
    basePath: "/madhive-proto",
    assetPrefix: "/madhive-proto/",
    images: { unoptimized: true },
    trailingSlash: true,
  }),
}

module.exports = nextConfig
