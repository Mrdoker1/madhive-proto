/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const basePath = isStaticExport ? '/madhive-proto' : '';

const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  outputFileTracingRoot: __dirname,
  output: isStaticExport ? "export" : "standalone",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isStaticExport && {
    basePath,
    assetPrefix: basePath,
    trailingSlash: true,
    images: {
      loader: 'custom',
      loaderFile: './src/lib/imageLoader.ts',
    },
  }),
}

module.exports = nextConfig
