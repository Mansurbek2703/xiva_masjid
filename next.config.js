/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export ni o'chiramiz chunki localStorage ishlatamiz
  // output: "export", // Bu qatorni o'chiramiz
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
