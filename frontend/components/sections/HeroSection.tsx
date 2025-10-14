'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import InteractiveParticleText from '@/components/ui/InteractiveParticleText'
import StaticParticleText from '@/components/ui/StaticParticleText'

// 动态导入Three.js组件，禁用SSR以避免服务端渲染问题
const FloatingCubes = dynamic(() => import('@/components/ui/FloatingCubes'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
})

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* 星空背景 - 优化版本 */}
      <div className="absolute inset-0">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* 使用CSS动画的静态星星（更高性能） */}
        <div className="absolute inset-0 opacity-60">
          <div className="stars-small" />
          <div className="stars-medium" />
          <div className="stars-large" />
        </div>
        
        {/* 仅保留少量交互星星用于视觉效果 */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px rgba(255,255,255,0.8)',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      {/* Floating Cubes Background - Full Screen */}
      <div className="absolute inset-0">
        <FloatingCubes />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      
      {/* Content container - Centered */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <a
              href="#events"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors group"
            >
              <span className="text-sm text-gray-400">
                AGI Villa Global Innovation Summit 2026
              </span>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 flex flex-col items-center -space-y-6"
          >
            <StaticParticleText
              text="Empowering founders to achieve success,"
              fontSize={56}
              particleSize={2}
              particleGap={3}
              particleColor="#ffffff"
            />
            <InteractiveParticleText
              text="through community"
              fontSize={56}
              particleSize={2}
              particleGap={3}
              particleColor="#a855f7"
              repelDistance={100}
              repelForce={0.6}
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-6 max-w-3xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            AGI Villa is a{' '}
            <span className="text-white">
              Community-Driven, AI-Native Venture Studio
            </span>{' '}
            that helps founders validate, build and scale startups faster and
            cheaper than ever.
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="text-sm text-gray-500 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            &ldquo;The world&rsquo;s first community-driven venture studio.&rdquo;
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button variant="primary" size="lg" href="#community">
              Join Community
            </Button>
            <Button variant="outline" size="lg" href="#partner">
              Partner with Us
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}

