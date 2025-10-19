'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Footer() {
  const socialLinks = [
    { name: 'WeChat Official Account', href: '#', icon: '💬' },
    { name: 'Red Book', href: '#', icon: '📕' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
  ]

  const quickLinks = [
    { name: 'Events', href: '#events' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'Join Us', href: '#join' },
  ]

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 顶部渐变线 */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />
        
        {/* 背景网格 */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* 主要内容区 */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo 和简介 */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo/AGI_Villa.png"
                  alt="AGI Villa Logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
            </div>

            {/* Slogan */}
            <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-md">
              Achieving success together with founders, through community.
            </p>

            {/* 联系信息 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-lg">📍</span>
                <span>Shanghai • Global Nodes in progress</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-lg">📧</span>
                <a 
                  href="mailto:hello@agivilla.org" 
                  className="hover:text-white transition-colors duration-300"
                >
                  hello@agivilla.org
                </a>
              </div>
            </div>
          </motion.div>

          {/* 快速链接 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300 inline-flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 社交媒体 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Connect With Us
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform duration-300">
                      {link.icon}
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 分隔线 */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* 版权信息 */}
        <motion.div
          className="py-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2025 AGI Villa. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* 底部装饰光效 */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          boxShadow: '0 0 20px rgba(255,255,255,0.1)',
        }}
      />
    </footer>
  )
}

