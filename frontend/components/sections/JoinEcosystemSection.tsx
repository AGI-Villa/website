'use client'

import { motion, useInView, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Button from '../ui/Button'
import Saturn3D from '../ui/Saturn3D'

interface EcosystemRole {
  id: string
  title: string
  description: string
  cta: string
  position: 'topRight' | 'bottomRight' | 'bottomLeft' | 'topLeft'
}

interface Partner {
  id: string
  name: string
  logo?: string
}

const roles: EcosystemRole[] = [
  {
    id: 'founder',
    title: 'Founder',
    description: 'Join the community and receive incubation support',
    cta: 'Apply for Incubation',
    position: 'topRight',
  },
  {
    id: 'investor',
    title: 'Investor',
    description: 'Access early-validated projects and participate in post-investment collaboration',
    cta: 'Join Investor Alliance',
    position: 'bottomRight',
  },
  {
    id: 'partner',
    title: 'Partner',
    description: 'Co-host impactful events with Villa, build brands and resources together collaboratively',
    cta: 'Partner with Us',
    position: 'bottomLeft',
  },
  {
    id: 'mentor',
    title: 'Mentor',
    description: 'Co-create and grow with the new generation of founders',
    cta: 'Become a Mentor',
    position: 'topLeft',
  },
]

// 合作伙伴数据
const partners: Partner[] = [
  { id: 'linkloud', name: 'LinkLoud', logo: '/images/logo/linkloud-v2.png' },
  { id: 'aigongfang', name: 'AI工坊', logo: '/images/logo/aigongfang.png' },
  { id: 'chuhaiqu', name: '出海区', logo: '/images/logo/chuhaiqu.PNG' },
  { id: 'chuhaitongxuehui', name: '出海同学会', logo: '/images/logo/chuhaitongxuehui.png' },
  { id: 'datawhale', name: 'DataWhale', logo: '/images/logo/datawhale.PNG' },
  { id: 'founderpark', name: 'Founder Park', logo: '/images/logo/founderpark.png' },
  { id: 'hackathonweekly', name: 'Hackathon Weekly', logo: '/images/logo/hackthonweekly.png' },
  { id: 'slush', name: 'Slush', logo: '/images/logo/slush.svg' },
  { id: 'way2agi', name: 'Way2AGI', logo: '/images/logo/way2agi.PNG' },
  { id: 'youxin', name: '有信', logo: '/images/logo/youxin.png' },
]

export default function JoinEcosystemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredRole, setHoveredRole] = useState<string | null>(null)
  
  // Logo滚动控制 - 使用 useMotionValue 和 useAnimationFrame 实现平滑滚动
  const [isScrolling, setIsScrolling] = useState(true)
  const x = useMotionValue(0)
  const scrollSpeed = 64 // 每秒滚动的像素数 (1920px / 30s = 64px/s)
  
  useAnimationFrame((time, delta) => {
    if (isScrolling) {
      // 持续向左滚动
      const currentX = x.get()
      const newX = currentX - (scrollSpeed * delta) / 1000
      
      // 当滚动到一组logo的宽度时，重置到0（无缝循环）
      if (newX <= -1920) {
        x.set(newX + 1920)
      } else {
        x.set(newX)
      }
    }
  })
  
  // 固定星星位置，避免重新渲染时位置变化
  const stars = useRef(
    Array.from({ length: 60 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.4,
    }))
  ).current

  // 计算卡片位置 (对角线 X 形布局) - 缩小尺寸
  const getCardPosition = (position: string) => {
    const distance = 240 // 距离中心的对角距离 (从340px缩小到240px)
    switch (position) {
      case 'topRight':
        return { top: `-${distance}px`, right: `-${distance}px` }
      case 'bottomRight':
        return { bottom: `-${distance}px`, right: `-${distance}px` }
      case 'bottomLeft':
        return { bottom: `-${distance}px`, left: `-${distance}px` }
      case 'topLeft':
        return { top: `-${distance}px`, left: `-${distance}px` }
      default:
        return {}
    }
  }

  // 计算连接线位置 (对角线)
  const getLineStyle = (position: string) => {
    const lineLength = 160 // 对角线连接线长度 (从240px缩小到160px)
    switch (position) {
      case 'topRight':
        return { 
          top: 0, 
          right: 0, 
          width: `${lineLength}px`, 
          height: '2px', 
          transform: 'rotate(-45deg)',
          transformOrigin: 'top right',
          translate: `${lineLength / 2}px -${lineLength / 2}px`
        }
      case 'bottomRight':
        return { 
          bottom: 0, 
          right: 0, 
          width: `${lineLength}px`, 
          height: '2px', 
          transform: 'rotate(45deg)',
          transformOrigin: 'bottom right',
          translate: `${lineLength / 2}px ${lineLength / 2}px`
        }
      case 'bottomLeft':
        return { 
          bottom: 0, 
          left: 0, 
          width: `${lineLength}px`, 
          height: '2px', 
          transform: 'rotate(-45deg)',
          transformOrigin: 'bottom left',
          translate: `-${lineLength / 2}px ${lineLength / 2}px`
        }
      case 'topLeft':
        return { 
          top: 0, 
          left: 0, 
          width: `${lineLength}px`, 
          height: '2px', 
          transform: 'rotate(45deg)',
          transformOrigin: 'top left',
          translate: `-${lineLength / 2}px -${lineLength / 2}px`
        }
      default:
        return {}
    }
  }

  return (
    <section ref={ref} className="relative bg-black pt-8 pb-32 overflow-hidden">
      {/* 背景星空 - 完全静态 */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join the AGI Villa Ecosystem
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Become part of a thriving community where innovation meets collaboration
          </p>
        </motion.div>

        {/* 中心辐射网络 */}
        <div className="relative flex items-center justify-center min-h-[700px] mb-32">
          {/* 中心土星 - 真实3D效果 */}
          <motion.div
            className="relative z-20 flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* 外层光晕 */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.06), transparent 70%)',
                filter: 'blur(40px)',
                opacity: 0.5,
                width: '300px',
                height: '300px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* 3D 土星 */}
            <Saturn3D />
            
            {/* 文字标签 */}
            <div className="text-center mt-4 relative z-10">
              <div className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">AGI Villa</div>
              <div className="text-xs text-gray-300 uppercase tracking-wider mt-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">Ecosystem</div>
            </div>

            {/* 连接线 */}
            {roles.map((role) => (
              <motion.div
                key={`line-${role.id}`}
                className="absolute"
                style={getLineStyle(role.position)}
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="relative w-full h-full bg-gradient-to-r from-white/20 to-white/5">
                  {/* 简单的脉动效果 - 不要闪光点 */}
                  {hoveredRole === role.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* 角色卡片 */}
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                className="absolute"
                style={getCardPosition(role.position)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <div className="relative w-64 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10">
                  {/* 简单的悬停光晕 */}
                  {hoveredRole === role.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05), transparent 70%)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative z-10">
                    {/* 标题 */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {role.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {role.description}
                    </p>

                    {/* CTA 按钮 */}
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      {role.cta}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Logo 墙 - 合作伙伴 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* 分隔线 */}
          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-6 text-sm text-gray-400 uppercase tracking-wider">
                Trusted by Leading Organizations
              </span>
            </div>
          </div>

          {/* Logo 无限滚动容器 */}
          <div className="relative overflow-hidden">
            {/* 左侧渐变遮罩 */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            {/* 右侧渐变遮罩 */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            
            {/* 滚动内容 - 复制3次实现无缝循环 */}
            <motion.div
              className="flex gap-8"
              style={{ x }}
            >
              {/* 复制partners 3次以实现无缝循环 */}
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 group"
                  style={{ width: '160px' }}
                  onMouseEnter={() => setIsScrolling(false)}
                  onMouseLeave={() => setIsScrolling(true)}
                >
                  <div className="aspect-[3/2] rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 cursor-pointer overflow-hidden p-4">
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        width={120}
                        height={80}
                        className="object-contain w-full h-full transition-all duration-300 group-hover:scale-110"
                        onError={(e) => {
                          // 如果图片加载失败，显示文字备用方案
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const fallback = document.createElement('div')
                            fallback.className = 'text-gray-500 text-sm font-mono transition-all duration-300 group-hover:text-gray-300 group-hover:scale-110'
                            fallback.textContent = partner.name
                            parent.appendChild(fallback)
                          }
                        }}
                      />
                    ) : (
                      <div className="text-gray-500 text-sm font-mono transition-all duration-300 group-hover:text-gray-300 group-hover:scale-110">
                        {partner.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 底部提示文字 */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <p className="text-gray-500 text-sm">
              Join 100+ leading companies and investors in the AGI Villa ecosystem
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

