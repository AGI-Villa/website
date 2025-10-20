'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Button from '../ui/Button'

interface Event {
  id: string
  title: string
  type: 'Workshop' | 'Hackathon' | 'Meetup' | 'Conference' | 'Demo Day'
  date: string
  time: string
  location: string
  isOnline: boolean
  description: string
  posterUrl?: string
  status: 'upcoming' | 'live' | 'completed'
  registrationUrl?: string
  attendees?: number
}

// 出海增长直播活动数据
const events: Event[] = [
  {
    id: '1',
    title: 'Overseas Growth Panorama: From Traffic Acquisition to Commercialization Closed-Loop',
    type: 'Conference',
    date: 'Oct 22, 2025',
    time: '8:30 PM - 9:30 PM',
    location: 'WeChat Video Live',
    isOnline: true,
    description: 'Deep dive into overseas growth strategies, from channel awareness to commercialization closed-loop',
    posterUrl: '/images/events/chuhaizhibo1022.png',
    status: 'upcoming',
    registrationUrl: 'https://example.com/register/overseas-growth',
  },
  {
    id: '2',
    title: 'Overseas Growth Panorama: From Traffic Acquisition to Commercialization Closed-Loop',
    type: 'Conference',
    date: 'Oct 15, 2025',
    time: '8:30 PM - 9:30 PM',
    location: 'WeChat Video Live',
    isOnline: true,
    description: 'In-depth conversation with Rockbase founder Qi Da, sharing global growth strategies and omnichannel cold-start experiences',
    posterUrl: '/images/events/chuhaizhibo1015.jpg',
    status: 'completed',
    registrationUrl: 'https://mp.weixin.qq.com/s/jxMQUx_fjjThyT3RkrD66g',
  },
  {
    id: '3',
    title: 'Overseas Growth Panorama: From Traffic Acquisition to Commercialization Closed-Loop',
    type: 'Conference',
    date: 'Oct 8, 2025',
    time: '8:30 PM - 9:30 PM',
    location: 'WeChat Video Live',
    isOnline: true,
    description: 'Deep analysis of SEO and influencer marketing strategies, exploring traffic acquisition secrets on YouTube and TikTok platforms',
    posterUrl: '/images/events/chuhaizhibo1008.jpg',
    status: 'completed',
    registrationUrl: 'https://mp.weixin.qq.com/s/PtnSnojEgIHVFUTxrnPGww',
  },
  {
    id: '4',
    title: 'Overseas Growth Panorama: From Traffic Acquisition to Commercialization Closed-Loop',
    type: 'Conference',
    date: 'Sep 28, 2025',
    time: '8:30 PM - 9:30 PM',
    location: 'WeChat Video Live',
    isOnline: true,
    description: 'Product and localization market matching strategy sharing, helping companies accurately target overseas user groups',
    posterUrl: '/images/events/chuhaizhibo0928.jpg',
    status: 'completed',
    registrationUrl: 'https://mp.weixin.qq.com/s/oHuhSgjbK6uGox4Ou82lNQ',
  },
]

export default function CasesEventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [direction, setDirection] = useState(0)
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null)
  
  // 固定星星位置，避免重新渲染时位置变化
  const stars = useRef(
    Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: 0.3 + Math.random() * 0.3,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  ).current

  // 自动轮播
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000) // 5秒切换一次

    return () => clearInterval(interval)
  }, [isHovered])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const getVisibleEvents = () => {
    const prev = (currentIndex - 1 + events.length) % events.length
    const next = (currentIndex + 1) % events.length
    return [events[prev], events[currentIndex], events[next]]
  }

  const visibleEvents = getVisibleEvents()

  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-purple-400'
      case 'live':
        return 'text-green-400'
      case 'completed':
        return 'text-gray-500'
    }
  }

  const getStatusLabel = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'UPCOMING'
      case 'live':
        return 'LIVE NOW'
      case 'completed':
        return 'COMPLETED'
    }
  }

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* 背景星星 */}
      <div className="absolute inset-0">
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
              opacity: [star.opacity, star.opacity + 0.5, star.opacity],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 标题 */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Where Innovation Meets{' '}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join our regular live streams, workshops, hackathons, and founder meetups to connect, learn, and grow
          </p>
        </motion.div>

        {/* 走马灯容器 */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 卡片展示区域 */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* 左侧渐变遮罩 */}
            <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-black/50 to-transparent z-10 pointer-events-none" />
            {/* 右侧渐变遮罩 */}
            <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-black/50 to-transparent z-10 pointer-events-none" />

            {/* 三张卡片 */}
            <div className="relative w-full flex items-center justify-center">
              {visibleEvents.map((event, index) => {
                const position = index - 1 // -1, 0, 1
                const isCenter = position === 0

                return (
                  <motion.div
                    key={event.id}
                    className="absolute"
                    initial={false}
                    animate={{
                      x: `${position * 42}%`,
                      scale: isCenter ? 1 : 0.75,
                      opacity: isCenter ? 1 : 0.4,
                      z: isCenter ? 10 : 0,
                      rotateY: position * 15, // 3D 倾斜效果
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: '1000px',
                    }}
                  >
                    <div
                      className={`
                        relative w-[500px] rounded-2xl overflow-hidden
                        bg-white/5 backdrop-blur-sm border border-white/10
                        cursor-pointer
                        transition-all duration-300
                        ${!isCenter ? 'blur-sm opacity-40' : ''}
                      `}
                      onClick={(e) => {
                        // 只处理非中心卡片的点击，中心卡片不处理点击事件
                        if (!isCenter) {
                          if (position < 0) handlePrevious()
                          else handleNext()
                        }
                      }}
                    >
                      {/* 海报区域 */}
                      <div className="relative h-72 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                        {/* 活动海报或占位图 */}
                        {event.posterUrl ? (
                          <img
                            src={event.posterUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-gray-600 text-6xl">
                              {event.type === 'Workshop' && '🎓'}
                              {event.type === 'Hackathon' && '💻'}
                              {event.type === 'Meetup' && '🤝'}
                              {event.type === 'Conference' && '🎤'}
                              {event.type === 'Demo Day' && '🚀'}
                            </div>
                          </div>
                        )}

                        {/* 查看完整海报按钮 */}
                        {isCenter && event.posterUrl && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                            <button
                              className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (event.posterUrl) {
                                  setSelectedPoster(event.posterUrl)
                                }
                              }}
                            >
                              👁️ View Full Poster
                            </button>
                          </div>
                        )}

                        {/* 状态标签 - 右上角 */}
                        <div className="absolute top-4 right-4 pointer-events-none">
                          <div
                            className={`
                              px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                              ${event.status === 'upcoming' ? 'bg-purple-500/20 border border-purple-500/50' : ''}
                              ${event.status === 'live' ? 'bg-green-500/20 border border-green-500/50' : ''}
                              ${event.status === 'completed' ? 'bg-gray-500/20 border border-gray-500/50' : ''}
                              ${getStatusColor(event.status)}
                            `}
                          >
                            {getStatusLabel(event.status)}
                          </div>
                        </div>

                        {/* 类型标签 - 左上角 */}
                        <div className="absolute top-4 left-4 pointer-events-none">
                          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white">
                            {event.type}
                          </div>
                        </div>

                        {/* 线上/线下标识 */}
                        <div className="absolute bottom-4 right-4 pointer-events-none">
                          <div className={`
                            px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border
                            ${event.isOnline 
                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' 
                              : 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                            }
                          `}>
                            {event.isOnline ? '🌐 线上' : '📍 线下'}
                          </div>
                        </div>

                        {/* 中心聚光效果 */}
                        {isCenter && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>

                      {/* 内容区域 */}
                      <div className="p-6">
                        {/* 活动标题 */}
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {event.title}
                        </h3>

                        {/* 基本信息 */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-gray-300 text-sm">
                            <span className="mr-3 text-purple-400">📅</span>
                            <span className="font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <span className="mr-3 text-blue-400">⏰</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-300 text-sm">
                            <span className="mr-3 text-green-400">📍</span>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {/* 一句话介绍 */}
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        {/* CTA 按钮 */}
                        {isCenter && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {event.status === 'upcoming' && (
                              <Button 
                                variant="primary" 
                                className="w-full"
                                onClick={() => {
                                  // TODO: Add registration functionality
                                }}
                              >
                                Register Now
                              </Button>
                            )}
                            {event.status === 'live' && (
                              <Button 
                                variant="primary" 
                                className="w-full"
                                onClick={() => {
                                  if (event.registrationUrl) {
                                    window.open(event.registrationUrl, '_blank')
                                  }
                                }}
                              >
                                Join Now
                              </Button>
                            )}
                            {event.status === 'completed' && (
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => {
                                  if (event.registrationUrl) {
                                    window.open(event.registrationUrl, '_blank')
                                  }
                                }}
                              >
                                View Recap
                              </Button>
                            )}
                          </motion.div>
                        )}
                      </div>

                      {/* 中心卡片发光边框 */}
                      {isCenter && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
                            boxShadow: '0 0 40px rgba(255,255,255,0.1)',
                          }}
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <span className="text-xl">←</span>
            </button>

            {/* 指示器 */}
            <div className="flex gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'}
                  `}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* 底部 CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button variant="outline" size="lg">
              View All Events
            </Button>
          </motion.div>
        </div>
      </div>

      {/* 海报模态框 */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => {
            console.log('点击背景关闭模态框')
            setSelectedPoster(null)
          }}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
              onClick={() => {
                console.log('点击关闭按钮')
                setSelectedPoster(null)
              }}
            >
              <span className="text-xl">×</span>
            </button>
            
            {/* 海报图片 */}
            <img
              src={selectedPoster}
              alt="活动海报"
              className="w-full h-auto max-h-[90vh] object-contain"
              onLoad={() => console.log('海报图片加载完成')}
              onError={() => console.log('海报图片加载失败')}
            />
          </div>
        </div>
      )}
    </section>
  )
}

