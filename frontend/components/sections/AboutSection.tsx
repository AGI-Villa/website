'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ContentCardProps {
  title: string | React.ReactNode
  content: string | React.ReactNode
  side: 'left' | 'right'
  index: number
}

function ContentCard({ title, content, side, index }: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative ${side === 'left' ? 'pr-8 lg:pr-16' : 'pl-8 lg:pl-16'}`}
    >
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
        {title && (
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 text-left">
            {title}
          </h3>
        )}
        {typeof content === 'string' ? (
          <p className="text-gray-400 leading-relaxed text-left">
            {content}
          </p>
        ) : (
          <div className="text-gray-400 leading-relaxed text-left w-full">
            {content}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // 彗星位置跟随滚动
  const cometY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const contents = [
    {
      side: 'left' as const,
      title: 'Achieving success together with founders, through community',
      content: (
        <p>
          Founded in 2025, AGI Villa is a{' '}
          <span className="text-white font-semibold">community-driven venture studio</span>{' '}
          helping founders go from idea to impact faster than ever. By uniting{' '}
          <span className="text-white font-semibold">people</span>,{' '}
          <span className="text-white font-semibold">capital</span>, and{' '}
          <span className="text-white font-semibold">AI-native infrastructure</span>, we turn{' '}
          <span className="text-white font-semibold">collective intelligence</span>{' '}
          into real-world innovation.
        </p>
      ),
    },
    {
      side: 'right' as const,
      title: '',
      content: (
        <div className="space-y-6 w-full">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
            <Image
              src="/images/team/together.jpg"
              alt="AGI Villa Community"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <p className="text-gray-300 text-base sm:text-lg leading-loose text-center px-2 whitespace-normal break-words">
            More than a workspace — a community where founders, friends, and ideas grow together.
          </p>
        </div>
      ),
    },
    {
      side: 'left' as const,
      title: 'Values',
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-purple-400 text-xl flex-shrink-0 mt-0.5">✓</span>
            <div>
              <div className="text-white font-semibold mb-1">Co-creation & Sharing</div>
              <p className="text-gray-400 text-sm">Building together, growing together</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-purple-400 text-xl flex-shrink-0 mt-0.5">✓</span>
            <div>
              <div className="text-white font-semibold mb-1">Long-termism</div>
              <p className="text-gray-400 text-sm">Focused on sustainable impact, not quick wins</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-purple-400 text-xl flex-shrink-0 mt-0.5">✓</span>
            <div>
              <div className="text-white font-semibold mb-1">Technology-driven</div>
              <p className="text-gray-400 text-sm">Leveraging AI-native tools to accelerate innovation</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-purple-400 text-xl flex-shrink-0 mt-0.5">✓</span>
            <div>
              <div className="text-white font-semibold mb-1">Openness & Inclusiveness</div>
              <p className="text-gray-400 text-sm">Welcoming diverse perspectives and backgrounds</p>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section ref={containerRef} className="relative py-32 bg-black text-white overflow-hidden">
      {/* 星空背景 */}
      <div className="absolute inset-0">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black" />
        
        {/* 星星层 */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
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
        
        {/* 大星星 */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`big-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, white, transparent)',
              boxShadow: '0 0 4px rgba(255,255,255,0.8)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* 流星效果 */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`meteor-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 200],
              y: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 5 + 2,
              ease: 'easeOut',
            }}
          >
            {/* 流星尾巴 */}
            <div className="absolute top-0 left-0 w-20 h-0.5 bg-gradient-to-r from-white to-transparent blur-sm -rotate-45" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">AGI Villa</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transforming community energy into the infrastructure of innovation
          </p>
        </motion.div>

        {/* 起点：We are founders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-32"
        >
          {/* 发射起点标记 */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 w-6 h-6 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)] z-10">
            <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
          </div>
          
          <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              We are founders building with founders
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              AGI Villa was founded on a simple belief — that community energy can be transformed into the infrastructure of innovation.
            </p>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* 中心线 - 流星轨迹 */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden">
            {/* 基础线 */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
            
            {/* 流动光效 */}
            <motion.div
              className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white to-transparent"
              animate={{
                top: ['-20%', '120%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* 彗星 */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
            style={{ top: cometY }}
          >
            <div className="relative">
              {/* 彗星核心 */}
              <motion.div
                className="relative w-5 h-5 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,1),0_0_60px_rgba(255,255,255,0.5)]"
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.5)',
                    '0 0 40px rgba(255,255,255,1), 0 0 80px rgba(255,255,255,0.6)',
                    '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.5)',
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* 长尾拖尾效果（向下） */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-64 pointer-events-none">
                {/* 主尾迹 - 从核心向下渐变 */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/60 to-white blur-sm" />
                
                {/* 次级尾迹 - 更宽的模糊效果 */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-white/80 blur-md scale-150" />
                
                {/* 粒子碎片效果 */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    style={{ bottom: `${i * 15}%` }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeOut',
                    }}
                  />
                ))}
              </div>
              
              {/* 外层光晕 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-y-0 lg:gap-x-0 lg:auto-rows-[3rem]">
            {contents.map((item, index) => {
              // 计算每个卡片的起始行，创造错落效果
              const getRowStart = (idx: number) => {
                if (idx === 0) return 1   // Mission 从第1行开始
                if (idx === 1) return 9   // Vision 从第9行开始 (比 Mission 低8行 = 24rem)
                if (idx === 2) return 21  // Values 从第21行开始 (比 Vision 低12行 = 36rem)
                return idx * 10 + 1
              }
              
              const getRowSpan = (idx: number) => {
                if (idx === 0) return 8   // Mission 跨越8行
                if (idx === 1) return 10  // Vision (图片) 跨越10行
                if (idx === 2) return 12  // Values (列表) 跨越12行
                return 8
              }
              
              return (
                <div
                  key={index}
                  className={`relative ${
                    item.side === 'left'
                      ? 'lg:col-start-1 lg:col-end-2'
                      : 'lg:col-start-2 lg:col-end-3'
                  }`}
                  style={{
                    gridRowStart: getRowStart(index),
                    gridRowEnd: `span ${getRowSpan(index)}`
                  }}
                >
              
                {/* 连接点 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className={`absolute top-8 ${
                    item.side === 'left' ? 'right-0 lg:-right-8' : 'left-0 lg:-left-8'
                  } w-4 h-4 bg-white border-4 border-black rounded-full z-10`}
                />
                
                <ContentCard
                  title={item.title}
                  content={item.content}
                  side={item.side}
                  index={index}
                />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

