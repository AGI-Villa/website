'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
}: ButtonProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
  }>>([])
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const particleIdRef = useRef(0)

  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden'
  
  const variants = {
    primary: 'bg-white text-black hover:bg-gray-200 focus:ring-white',
    secondary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500',
    outline: 'bg-transparent border border-gray-700 text-white hover:border-gray-500 hover:bg-gray-800/50 focus:ring-gray-500',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base',
  }

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // 随机生成粒子
    if (Math.random() > 0.85) {
      const newParticles: Array<{
        id: number
        x: number
        y: number
        vx: number
        vy: number
      }> = []
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 1.5 + 0.5
        newParticles.push({
          id: particleIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
        })
      }
      setParticles((prev) => [...prev.slice(-20), ...newParticles])
      
      // 清理粒子
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
      }, 800)
    }
  }

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      
      {/* 粒子效果 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: variant === 'primary' ? '#000' : '#fff',
              animation: 'particle-fade 0.8s ease-out forwards',
            }}
          />
        ))}
      </div>

      {/* 悬停光晕 */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />
      </div>
    </>
  )

  if (href) {
    return (
      <a 
        ref={buttonRef as any}
        href={href} 
        className={classes}
        onMouseMove={handleMouseMove}
      >
        {content}
      </a>
    )
  }

  return (
    <button 
      ref={buttonRef as any}
      onClick={onClick} 
      className={classes}
      onMouseMove={handleMouseMove}
    >
      {content}
    </button>
  )
}

