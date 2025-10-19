'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
})

const navItems = [
  { name: 'Events', href: '#events' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Join Us', href: '#join' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-lg shadow-lg shadow-purple-500/10'
            : 'bg-black/40 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Bottom gradient border with glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent blur-sm" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-8 sm:w-16 sm:h-10 group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo/AGI_Villa.png"
                  alt="AGI Villa Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 48px, 64px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 rounded-lg group hover:scale-105"
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Gradient underline animation */}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open menu</span>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100 my-1'
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-gray-800 z-40 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-6 space-y-4">
                {/* Mobile Nav Items */}
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="relative block px-4 py-3 text-base text-gray-300 hover:text-white rounded-lg transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* Gradient underline animation for mobile */}
                    <span className="absolute bottom-2 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
