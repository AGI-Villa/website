'use client'

import { motion } from 'framer-motion'

interface CubeProps {
  size: number
  position: { top?: string; left?: string; right?: string; bottom?: string }
  delay: number
  rotationSpeed: number
  texture: 'grid' | 'dots' | 'carbon' | 'solid'
}

function RotatingCube({ size, position, delay, rotationSpeed, texture }: CubeProps) {
  // 不同的材质纹理
  const getTexture = (type: string) => {
    switch (type) {
      case 'grid':
        return (
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${size}`} width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${size})`} />
            </svg>
          </div>
        )
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`dots-${size}`} width="12" height="12" patternUnits="userSpaceOnUse">
                  <circle cx="6" cy="6" r="1" fill="rgba(255,255,255,0.2)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#dots-${size})`} />
            </svg>
          </div>
        )
      case 'carbon':
        return (
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.08) 49%, rgba(255,255,255,0.08) 51%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.08) 49%, rgba(255,255,255,0.08) 51%, transparent 52%)
              `,
              backgroundSize: '8px 8px',
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="absolute"
      style={{
        ...position,
        width: size,
        height: size,
        perspective: 1200,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: rotationSpeed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* 立方体的 6 个面 - 深色高级质感 */}
        {/* 前面 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/30"
          style={{
            transform: `translateZ(${size / 2}px)`,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {getTexture(texture)}
          {/* 反光效果 */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* 后面 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/20"
          style={{
            transform: `translateZ(-${size / 2}px) rotateY(180deg)`,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {getTexture(texture)}
        </div>

        {/* 右面 */}
        <div
          className="absolute inset-0 border border-gray-700/25 opacity-90"
          style={{
            transform: `rotateY(90deg) translateZ(${size / 2}px)`,
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {getTexture(texture)}
        </div>

        {/* 左面 */}
        <div
          className="absolute inset-0 border border-gray-700/25 opacity-85"
          style={{
            transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
            background: 'linear-gradient(135deg, #111827 0%, #0a0a0a 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {getTexture(texture)}
        </div>

        {/* 上面 */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/30 opacity-95"
          style={{
            transform: `rotateX(90deg) translateZ(${size / 2}px)`,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
          }}
        >
          {getTexture(texture)}
          {/* 上面的高光 */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        </div>

        {/* 下面 */}
        <div
          className="absolute inset-0 border border-gray-700/20 opacity-80"
          style={{
            transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
            background: 'linear-gradient(135deg, #0a0a0a 0%, #000000 100%)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.7)',
          }}
        >
          {getTexture(texture)}
        </div>
      </motion.div>

      {/* 立方体微妙阴影 */}
      <motion.div
        className="absolute inset-0 blur-xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(100,100,100,0.3) 0%, transparent 70%)',
          transform: 'translateZ(-30px)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: rotationSpeed / 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

export default function FloatingCubes() {
  const cubes = [
    // 左上区域
    {
      size: 140,
      position: { top: '12%', left: '8%' },
      delay: 0,
      rotationSpeed: 25,
      texture: 'grid' as const,
    },
    {
      size: 90,
      position: { top: '28%', left: '20%' },
      delay: 0.6,
      rotationSpeed: 18,
      texture: 'dots' as const,
    },
    // 右上区域
    {
      size: 160,
      position: { top: '10%', right: '10%' },
      delay: 1.2,
      rotationSpeed: 30,
      texture: 'carbon' as const,
    },
    {
      size: 110,
      position: { top: '32%', right: '24%' },
      delay: 0.9,
      rotationSpeed: 22,
      texture: 'solid' as const,
    },
    // 左下区域
    {
      size: 120,
      position: { bottom: '20%', left: '14%' },
      delay: 1.5,
      rotationSpeed: 20,
      texture: 'dots' as const,
    },
    {
      size: 75,
      position: { bottom: '38%', left: '28%' },
      delay: 0.4,
      rotationSpeed: 16,
      texture: 'grid' as const,
    },
    // 右下区域
    {
      size: 170,
      position: { bottom: '12%', right: '8%' },
      delay: 1.8,
      rotationSpeed: 32,
      texture: 'grid' as const,
    },
    {
      size: 100,
      position: { bottom: '35%', right: '18%' },
      delay: 0.7,
      rotationSpeed: 19,
      texture: 'carbon' as const,
    },
    // 中心大立方体 - 最显眼
    {
      size: 200,
      position: { top: '50%', left: '50%' },
      delay: 0.3,
      rotationSpeed: 35,
      texture: 'grid' as const,
    },
  ]

  return (
    <div className="absolute inset-0" style={{ perspective: 1200 }}>
      {cubes.map((cube, index) => (
        <RotatingCube
          key={index}
          size={cube.size}
          position={
            cube.position.top === '50%' && cube.position.left === '50%'
              ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } as any
              : cube.position
          }
          delay={cube.delay}
          rotationSpeed={cube.rotationSpeed}
          texture={cube.texture}
        />
      ))}

      {/* 微妙的环境光 - 降低强度 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(100, 100, 100, 0.08) 0%, rgba(80, 80, 80, 0.04) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}



