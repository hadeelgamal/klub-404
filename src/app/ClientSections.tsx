'use client'

import dynamic from 'next/dynamic'

const Cursor               = dynamic(() => import('@/components/cursor/Cursor'),                        { ssr: false })
const About                = dynamic(() => import('@/components/sections/About'),                       { ssr: false })
const Process              = dynamic(() => import('@/components/sections/Process'),                     { ssr: false })
const FocusIndustriesIntro = dynamic(() => import('@/components/sections/FocusIndustriesIntro'),        { ssr: false })
const Industries           = dynamic(() => import('@/components/sections/Industries'),                  { ssr: false })
const Features             = dynamic(() => import('@/components/sections/Features'),                    { ssr: false })
const Work                 = dynamic(() => import('@/components/sections/Work'),                        { ssr: false })
const Services             = dynamic(() => import('@/components/sections/Services'),                    { ssr: false })
const Footer               = dynamic(() => import('@/components/sections/Footer'),                      { ssr: false })

export default function ClientSections() {
  return (
    <>
      <Cursor />
      <Features />
      <About />
      <Process />
      <FocusIndustriesIntro />
      {/* <Industries /> */}
      {/* <Work /> */}
      {/* <Services /> */}
      <Footer />
    </>
  )
}
