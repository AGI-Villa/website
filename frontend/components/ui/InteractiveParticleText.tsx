'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
}

interface InteractiveParticleTextProps {
  text: string
  className?: string
  fontSize?: number
  particleSize?: number
  particleGap?: number
  particleColor?: string
  repelDistance?: number
  repelForce?: number
}

export default function InteractiveParticleText({
  text,
  className = '',
  fontSize = 80,
  particleSize = 2,
  particleGap = 4,
  particleColor = '#ffffff',
  repelDistance = 100,
  repelForce = 0.5,
}: InteractiveParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mousePos = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // 初始化粒子（从文字生成）
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // 设置临时画布来采样文字
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true })
    if (!tempCtx) return

    // 设置字体和测量文字
    tempCtx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`
    const metrics = tempCtx.measureText(text)
    const textWidth = metrics.width
    const textHeight = fontSize

    // 设置画布尺寸
    const padding = 40
    const canvasWidth = Math.ceil(textWidth + padding * 2)
    const canvasHeight = Math.ceil(textHeight * 1.2 + padding)

    tempCanvas.width = canvasWidth
    tempCanvas.height = canvasHeight
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    setDimensions({ width: canvasWidth, height: canvasHeight })

    // 绘制文字到临时画布
    tempCtx.fillStyle = '#ffffff'
    tempCtx.font = `bold ${fontSize}px Inter, system-ui, sans-serif`
    tempCtx.textBaseline = 'middle'
    tempCtx.fillText(text, padding, canvasHeight / 2)

    // 采样像素，创建粒子
    const imageData = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight)
    const newParticles: Particle[] = []

    for (let y = 0; y < canvasHeight; y += particleGap) {
      for (let x = 0; x < canvasWidth; x += particleGap) {
        const index = (y * canvasWidth + x) * 4
        const alpha = imageData.data[index + 3]

        // 如果这个像素是文字的一部分（不透明）
        if (alpha > 128) {
          newParticles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: particleSize,
          })
        }
      }
    }

    particles.current = newParticles
  }, [text, fontSize, particleSize, particleGap])

  // 动画循环
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle) => {
        // 计算与鼠标的距离
        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // 鼠标排斥力
        if (distance < repelDistance) {
          const force = (repelDistance - distance) / repelDistance
          particle.vx -= (dx / distance) * force * repelForce
          particle.vy -= (dy / distance) * force * repelForce
        }

        // 弹簧力：拉回原位
        const springForce = 0.05
        particle.vx += (particle.originX - particle.x) * springForce
        particle.vy += (particle.originY - particle.y) * springForce

        // 阻尼
        particle.vx *= 0.9
        particle.vy *= 0.9

        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy

        // 绘制粒子
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [particleColor, particleSize, repelDistance, repelForce])

  // 鼠标移动处理
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 }
  }

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="cursor-pointer mx-auto"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: '100%',
          display: 'block',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={(e) => {
          // 支持触摸设备
          const canvas = canvasRef.current
          if (!canvas) return
          const rect = canvas.getBoundingClientRect()
          const touch = e.touches[0]
          mousePos.current = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
          }
        }}
        onTouchEnd={handleMouseLeave}
      />
    </div>
  )
}

