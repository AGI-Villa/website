'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '../ui/Button'
import InteractiveParticleText from '../ui/InteractiveParticleText'
import StaticParticleText from '../ui/StaticParticleText'

// 动态导入Three.js组件，禁用SSR以避免服务端渲染问题
const FloatingCubes = dynamic(() => import('../ui/FloatingCubes'), {
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
            className="mb-8 relative"
          >
            {/* Pulse animation background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 blur-xl animate-pulse" />
            
            {/* Coming Soon Badge - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-2 -right-6 z-20"
            >
              <div className="relative">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-15 blur-xs rounded-full" />
                
                {/* Badge */}
                <div className="relative px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-medium rounded-full border border-orange-400/30 shadow-sm">
                  <span className="relative z-10">Coming Soon</span>
                  
                  {/* Small sparkle */}
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 text-yellow-300 text-[7px]"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <a
              href="#events"
              className="relative inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-purple-500/10 via-purple-400/10 to-blue-500/10 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group shadow-lg shadow-purple-500/20"
            >
              {/* Icon */}
              <span className="text-lg">✨</span>
              
              {/* Badge label */}
              <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full">
                2026
              </span>
              
              {/* Event name */}
              <span className="text-sm font-medium text-white">
                AGI Villa Global Innovation Summit
              </span>
              
              {/* Arrow */}
              <svg
                className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform"
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
            <span className="font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
              Community-Driven, AI-Native Venture Studio
            </span>{' '}
            that helps founders validate, build and scale startups faster and
            cheaper than ever.
          </motion.p>

          {/* Tagline */}
          <motion.div
            className="mb-12 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
            <p className="text-sm text-gray-400 italic tracking-wide">
              &ldquo;The world&rsquo;s first community-driven venture studio.&rdquo;
            </p>
          </motion.div>

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

