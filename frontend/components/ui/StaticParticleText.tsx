'use client'

import { useEffect, useRef, useState } from 'react'

interface StaticParticleTextProps {
  text: string
  className?: string
  fontSize?: number
  particleSize?: number
  particleGap?: number
  particleColor?: string
}

export default function StaticParticleText({
  text,
  className = '',
  fontSize = 80,
  particleSize = 2,
  particleGap = 4,
  particleColor = '#ffffff',
}: StaticParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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
    const padding = 10
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

    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // 绘制静态粒子
    for (let y = 0; y < canvasHeight; y += particleGap) {
      for (let x = 0; x < canvasWidth; x += particleGap) {
        const index = (y * canvasWidth + x) * 4
        const alpha = imageData.data[index + 3]

        // 如果这个像素是文字的一部分（不透明）
        if (alpha > 128) {
          ctx.fillStyle = particleColor
          ctx.beginPath()
          ctx.arc(x, y, particleSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }, [text, fontSize, particleSize, particleGap, particleColor])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="mx-auto"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}

