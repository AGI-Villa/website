import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'

// 动态导入非首屏组件以提升初始加载速度
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="min-h-screen bg-black" />,
})

const WhatWeDoSection = dynamic(() => import('@/components/sections/WhatWeDoSection'), {
  loading: () => <div className="min-h-screen bg-black" />,
})

const JoinEcosystemSection = dynamic(() => import('@/components/sections/JoinEcosystemSection'), {
  loading: () => <div className="min-h-screen bg-black" />,
})

const CasesEventsSection = dynamic(() => import('@/components/sections/CasesEventsSection'), {
  loading: () => <div className="min-h-screen bg-black" />,
})

const VisionResponsibilitySection = dynamic(() => import('@/components/sections/VisionResponsibilitySection'), {
  loading: () => <div className="min-h-screen bg-black" />,
})

const SectionTransition = dynamic(() => import('@/components/ui/SectionTransition'), {
  loading: () => <div className="h-32 bg-black" />,
})

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <SectionTransition />
        <AboutSection />
        <WhatWeDoSection />
        <JoinEcosystemSection />
        <CasesEventsSection />
        <VisionResponsibilitySection />
      </main>
      <Footer />
    </>
  )
}

