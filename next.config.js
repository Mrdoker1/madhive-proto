/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  outputFileTracingRoot: __dirname,
  output: "standalone",
}

module.exports = nextConfig
