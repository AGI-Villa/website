'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function SectionTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const galaxyRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const galaxyScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5])
  const galaxyOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <div ref={ref} className="relative h-64 bg-black overflow-hidden">
      {/* 深空背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
      
      {/* 银河光带 - 横向穿过天际 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: galaxyOpacity }}
      >
        {/* 主银河光带 */}
        <motion.div
          className="relative w-full h-48"
          style={{ scale: galaxyScale }}
        >
          {/* 银河主体渐变 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-xl" />
          
          {/* 银河中的星云和星团 */}
          {[...Array(150)].map((_, i) => {
            const x = (i / 150) * 100
            const y = 50 + (Math.sin((i / 150) * Math.PI * 4) * 20) + (Math.random() - 0.5) * 30
            const size = Math.random() * 3 + 1
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: size,
                  height: size,
                  background: i % 4 === 0 
                    ? 'radial-gradient(circle, rgba(147, 197, 253, 0.9), transparent)'
                    : i % 4 === 1
                    ? 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)'
                    : i % 4 === 2
                    ? 'radial-gradient(circle, rgba(199, 210, 254, 0.7), transparent)'
                    : 'radial-gradient(circle, rgba(191, 219, 254, 0.6), transparent)',
                  boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, 0.5)`,
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
          
          {/* 银河核心亮区 */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`core-${i}`}
              className="absolute top-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{
                left: `${20 + i * 15}%`,
                width: 100 + Math.random() * 100,
                height: 60 + Math.random() * 40,
                background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.15), rgba(147, 197, 253, 0.1), transparent)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      {/* 流星划过 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`meteor-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${20 + Math.random() * 20}%`,
          }}
          animate={{
            x: [0, 300],
            y: [0, 150],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 3 + Math.random() * 2,
            ease: 'easeOut',
          }}
        >
          <div className="absolute top-0 left-0 w-16 h-0.5 bg-gradient-to-r from-white to-transparent blur-sm -rotate-45" />
        </motion.div>
      ))}
      
      {/* 环境星星 */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-px h-px bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
      
      {/* 顶部和底部渐变 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  )
}

