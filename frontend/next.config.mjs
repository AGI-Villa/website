/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 性能优化
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // 图片优化
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // 生产环境优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber', '@react-three/drei'],
  },
}

export default nextConfig

