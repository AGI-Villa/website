'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Button from '../ui/Button'

interface Commitment {
  id: string
  icon: string
  title: string
  subtitle: string
  description: string
  position: number // 角度位置 (0-360)
}

const commitments: Commitment[] = [
  {
    id: 'profit',
    icon: '💚',
    title: '1% Profit for Good',
    subtitle: 'Giving Back',
    description: '1% of our annual profits are donated to charitable organizations',
    position: 90, // 顶部
  },
  {
    id: 'tech',
    icon: '🌱',
    title: 'Tech for Good',
    subtitle: 'Responsible Innovation',
    description: 'Ensuring our incubated projects create positive social value and avoiding the misuse of technology',
    position: 210, // 左下（120°间隔）
  },
  {
    id: 'talent',
    icon: '🎓',
    title: 'Talent for Future',
    subtitle: 'Next Generation',
    description: 'Nurturing the next generation of talent in the AI entrepreneurship field',
    position: 330, // 右下（120°间隔）
  },
]

export default function VisionResponsibilitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredCommitment, setHoveredCommitment] = useState<string | null>(null)

  // 固定星星位置
  const stars = useRef(
    Array.from({ length: 40 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.2 + Math.random() * 0.3,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    }))
  ).current

  // 计算卡片位置（CSS坐标系：Y轴向下为正）
  // 使用较小的半径使整体布局更紧凑
  const getCardPosition = (angle: number, radius: number = 320) => {
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: -Math.sin(radian) * radius, // 注意：CSS中Y轴向下为正，所以取负值
    }
  }

  return (
    <section ref={ref} className="relative py-16 md:py-20 lg:py-24 bg-black overflow-x-clip">
      {/* 背景星星 */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity + 0.3, star.opacity],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* 标题 */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Beyond Business:{' '}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Our Commitment to Society
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AGI Villa is committed to being a socially responsible organization
          </p>
        </motion.div>

        {/* 中心辐射区域 */}
        <div className="relative flex items-center justify-center min-h-[550px] md:min-h-[650px] lg:min-h-[750px] w-full max-w-[1400px] mx-auto">
          {/* 波纹效果 - 多层 */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((index) => (
              <motion.div
                key={index}
                className="absolute rounded-full border border-white/20"
                style={{
                  width: `${index * 200}px`,
                  height: `${index * 200}px`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? {
                        opacity: [0, 0.5, 0],
                        scale: [0.8, 1.2, 1.5],
                      }
                    : {}
                }
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.4,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* 中心发光核心 */}
          <motion.div
            className="absolute z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* 外层光晕 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)',
                filter: 'blur(15px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* 核心光球 */}
            <div
              className="relative rounded-full flex items-center justify-center"
              style={{
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0.4), transparent)',
                boxShadow: '0 0 40px rgba(255,255,255,0.5), inset 0 0 20px rgba(255,255,255,0.3)',
              }}
            >
              {/* 内部脉冲 */}
              <motion.div
                className="absolute inset-4 rounded-full bg-white/40"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* 中心文字 */}
              <div className="relative z-10 text-center">
                <div className="text-xs font-bold text-black uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}>AGI</div>
                <div className="text-xs font-bold text-black uppercase tracking-wider" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}>Villa</div>
              </div>
            </div>
          </motion.div>

          {/* 辐射线 */}
          {commitments.map((commitment, index) => {
            const isHovered = hoveredCommitment === commitment.id

            return (
              <motion.div
                key={`line-${commitment.id}`}
                className="absolute z-10"
                style={{
                  width: '2px',
                  height: '270px', // 调整辐射线长度以匹配新半径(320px)
                  background: isHovered
                    ? 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.2))'
                    : 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  transformOrigin: 'top center',
                  transform: `rotate(${commitment.position}deg)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-1px',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={isInView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
              >
                {/* 能量流动粒子 */}
                <motion.div
                  className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full"
                  style={{ marginLeft: '-2px' }}
                  animate={{
                    top: ['0%', '100%'],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.6,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            )
          })}

          {/* 承诺卡片 */}
          {commitments.map((commitment, index) => {
            const pos = getCardPosition(commitment.position)
            const isHovered = hoveredCommitment === commitment.id

            return (
              <motion.div
                key={commitment.id}
                className="absolute z-30"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  x: pos.x - 128,  // 128 = 卡片平均宽度256px的一半，实现居中
                  y: pos.y
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  x: pos.x - 128,
                  y: pos.y
                } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                onMouseEnter={() => setHoveredCommitment(commitment.id)}
                onMouseLeave={() => setHoveredCommitment(null)}
              >
                <motion.div
                  className="relative w-56 md:w-64 lg:w-72 p-4 md:p-5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm cursor-pointer"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                  }}
                  animate={
                    isHovered
                      ? {
                          y: -10,
                          scale: 1.05,
                        }
                      : {
                          y: 0,
                          scale: 1,
                        }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {/* 悬停光效 */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent)',
                        boxShadow: '0 0 30px rgba(255,255,255,0.2)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* 图标 */}
                    <div className="text-3xl md:text-4xl mb-3">{commitment.icon}</div>

                    {/* 副标题 */}
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1.5 md:mb-2">
                      {commitment.subtitle}
                    </div>

                    {/* 标题 */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{commitment.title}</h3>

                    {/* 描述 */}
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{commitment.description}</p>
                  </div>

                  {/* 装饰角标 */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-white/30 rounded-full" />
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Charity Box 合作介绍 */}
        <motion.div
          className="text-center mt-12 md:mt-16 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-4">
            {/* Charity Box Logo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                <Image
                  src="/images/logo/yihe.png"
                  alt="Charity Box Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                />
              </div>
            </motion.div>

            {/* 分隔线 */}
            <motion.div
              className="hidden sm:block w-px h-16 md:h-20 lg:h-24 bg-white/30"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.9 }}
            />

            {/* 合作文字 */}
            <motion.div
              className="text-center sm:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              <p className="text-base sm:text-lg md:text-xl text-white font-medium leading-relaxed">
                We work with{' '}
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-semibold">
                  Charity Box
                </span>{' '}
                to build effective philanthropy
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* 引言文字 */}
        <motion.div
          className="text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <blockquote className="relative inline-block">
            <div className="absolute -left-4 md:-left-6 -top-2 text-3xl md:text-4xl text-white/10">&ldquo;</div>
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light italic px-6 md:px-8 max-w-3xl md:max-w-4xl">
              We believe innovation should be accessible, replicable and beneficial to all.
            </p>
            <div className="absolute -right-4 md:-right-6 -bottom-4 md:-bottom-6 text-3xl md:text-4xl text-white/10">&rdquo;</div>
          </blockquote>
        </motion.div>

      </div>
    </section>
  )
}

