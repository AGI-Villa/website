'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface ServiceCard {
  title: string
  subtitle: string
  description: string
  icon: string
}

const services: ServiceCard[] = [
  {
    title: 'Community & Network',
    subtitle: 'Connect',
    description: "Connect with fellow founders, mentors, and investors who've been there before",
    icon: '01',
  },
  {
    title: 'Validation & Building',
    subtitle: 'Build',
    description: 'Access tools, frameworks, and expertise to validate ideas and build faster',
    icon: '02',
  },
  {
    title: 'Growth & Capital',
    subtitle: 'Scale',
    description: 'Tap into our community network and investor community to scale and raise funds',
    icon: '03',
  },
]

export default function WhatWeDoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative min-h-screen bg-black pt-32 pb-8 overflow-hidden">
      {/* 背景星空 */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black" />

      <div className="container mx-auto px-4 relative z-10">
        {/* 标题 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            What We Do
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We help founders go from <span className="text-white font-semibold">idea to product-market fit</span> through our integrated ecosystem
          </p>
        </motion.div>

        {/* 服务卡片 + 能量流 */}
        <div className="relative max-w-7xl mx-auto">
          {/* 桌面端：横向布局 */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-12 relative">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* 玻璃态卡片 */}
                <div className="relative h-full p-10 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5 overflow-hidden">
                  
                  {/* 增强的六边形网格背景 */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(40)].map((_, i) => {
                      const row = Math.floor(i / 5)
                      const col = i % 5
                      const offsetX = row % 2 === 0 ? 0 : 35
                      return (
                        <motion.div
                          key={i}
                          className="absolute border"
                          style={{
                            left: `${col * 70 + offsetX - 35}px`,
                            top: `${row * 60 - 30}px`,
                            width: '50px',
                            height: '50px',
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          }}
                          animate={{
                            opacity: hoveredIndex === index ? [0.3, 1, 0.3] : [0.2, 0.5, 0.2],
                            borderColor: hoveredIndex === index 
                              ? ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.1)']
                              : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.1)'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.05,
                            ease: 'easeInOut',
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* 矩阵代码雨效果 - 更柔和 */}
                  {hoveredIndex === index && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
                          style={{
                            left: `${15 + i * 14}%`,
                            height: '100%',
                          }}
                          initial={{ y: '-100%', opacity: 0 }}
                          animate={{ y: '100%', opacity: [0, 0.6, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'linear',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* 边缘微光效果 */}
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03), transparent 70%)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* 内容 */}
                  <div className="relative z-10">
                    {/* 数字编号 */}
                    <motion.div 
                      className="mb-6 relative"
                      animate={{
                        scale: hoveredIndex === index ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <div className="text-7xl font-bold text-white relative">
                        {service.icon}
                        {/* 数字光晕 */}
                        {hoveredIndex === index && (
                          <motion.div
                            className="absolute inset-0 text-7xl font-bold text-white blur-xl opacity-50"
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          >
                            {service.icon}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Subtitle */}
                    <div className="text-xs font-mono font-medium text-gray-400 mb-3 uppercase tracking-widest">
                      / {service.subtitle}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    {/* 底部装饰线 */}
                    <div className="mt-6 relative h-px bg-white/10">
                      <motion.div
                        className="absolute inset-0 bg-white/50"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                        transition={{ 
                          duration: 0.5,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 移动端：竖向布局 */}
          <div className="lg:hidden space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                {/* 玻璃态卡片（移动端版） */}
                <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 overflow-hidden">
                  {/* 六边形网格背景 */}
                  <div className="absolute inset-0 opacity-15">
                    {[...Array(24)].map((_, i) => {
                      const row = Math.floor(i / 4)
                      const col = i % 4
                      const offsetX = row % 2 === 0 ? 0 : 30
                      return (
                        <motion.div
                          key={i}
                          className="absolute border"
                          style={{
                            left: `${col * 60 + offsetX - 30}px`,
                            top: `${row * 50 - 25}px`,
                            width: '40px',
                            height: '40px',
                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          }}
                          animate={{
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.08,
                          }}
                        />
                      )
                    })}
                  </div>

                  {/* 内容 */}
                  <div className="relative z-10">
                    {/* 数字编号 */}
                    <div className="text-6xl font-bold text-white mb-4">
                      {service.icon}
                    </div>
                    
                    <div className="text-xs font-mono font-medium text-gray-400 mb-2 uppercase tracking-widest">
                      / {service.subtitle}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* 底部装饰线 */}
                    <div className="mt-4 h-px bg-white/10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

