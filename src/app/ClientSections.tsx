'use client'

import dynamic from 'next/dynamic'

const Cursor   = dynamic(() => import('@/components/cursor/Cursor'),        { ssr: false })
const About    = dynamic(() => import('@/components/sections/About'),       { ssr: false })
const Work     = dynamic(() => import('@/components/sections/Work'),        { ssr: false })
const Services = dynamic(() => import('@/components/sections/Services'),    { ssr: false })

export default function ClientSections() {
  return (
    <>
      <Cursor />
      <About />
      <Work />
      <Services />
    </>
  )
}
