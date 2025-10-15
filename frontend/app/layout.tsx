import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://agivilla.com'), // 替换为实际域名
  title: {
    default: 'AGI Villa - Community-Driven, AI-Native Venture Studio',
    template: '%s | AGI Villa'
  },
  description: 'Empowering founders to achieve success through community. Validate, build and scale startups faster and cheaper than ever with our AI-native venture studio.',
  keywords: [
    'venture studio',
    'startup incubator',
    'AI venture studio',
    'community-driven',
    'startup ecosystem',
    'founders community',
    'AI innovation',
    'startup accelerator',
    'tech innovation',
    'AGI',
    'artificial intelligence'
  ],
  authors: [{ name: 'AGI Villa Team', url: 'https://agivilla.com' }],
  creator: 'AGI Villa',
  publisher: 'AGI Villa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agivilla.com',
    title: 'AGI Villa - Community-Driven, AI-Native Venture Studio',
    description: 'Empowering founders to achieve success through community. Validate, build and scale startups faster and cheaper than ever.',
    siteName: 'AGI Villa',
    images: [
      {
        url: '/favicon.ico',
        width: 1200,
        height: 630,
        alt: 'AGI Villa - Community-Driven Venture Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGI Villa - Community-Driven, AI-Native Venture Studio',
    description: 'Empowering founders to achieve success through community.',
    images: ['/images/logo/agi-villa.png'],
    creator: '@agivilla', // 替换为实际Twitter账号
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://agivilla.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 结构化数据 (JSON-LD) 用于SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AGI Villa',
    description: 'Community-Driven, AI-Native Venture Studio empowering founders to achieve success through community',
    url: 'https://agivilla.com',
    logo: 'https://agivilla.com/favicon.ico',
    sameAs: [
      // 添加实际的社交媒体链接
      // 'https://twitter.com/agivilla',
      // 'https://linkedin.com/company/agivilla',
      // 'https://github.com/agivilla',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'General Inquiry',
      // email: 'contact@agivilla.com',
    },
    founder: {
      '@type': 'Organization',
      name: 'AGI Villa Team',
    },
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

