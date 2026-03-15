'use client'

/*
 * ClientSections.tsx — Client Component shell for all below-fold sections.
 *
 * Why this exists:
 * - next/dynamic with ssr:false is only allowed inside Client Components.
 * - page.tsx is a Server Component and cannot call dynamic() with ssr:false.
 * - By isolating dynamic imports here we keep page.tsx as a Server Component
 *   (better streaming, smaller server payload) while still deferring heavy
 *   GSAP/Framer Motion bundles until after the LCP paint.
 *
 * Loading strategy:
 * - Hero and Navigation are statically imported in page.tsx — they are
 *   above-the-fold and must be in the initial JS bundle.
 * - Everything below Hero is dynamically imported with ssr:false so the
 *   server never attempts to run window/document code, and the browser
 *   can parse+execute each chunk lazily as the user scrolls.
 */
import dynamic from 'next/dynamic'

const Cursor = dynamic(() => import('@/components/cursor/Cursor'), { ssr: false })
const Manifesto = dynamic(() => import('@/components/sections/Manifesto'), { ssr: false })
const Pillars = dynamic(() => import('@/components/sections/Pillars'), { ssr: false })
const Stats = dynamic(() => import('@/components/sections/Stats'), { ssr: false })
const Hubs = dynamic(() => import('@/components/sections/Hubs'), { ssr: false })
const Industries = dynamic(() => import('@/components/sections/Industries'), { ssr: false })
const Ventures = dynamic(() => import('@/components/sections/Ventures'), { ssr: false })
const Approach = dynamic(() => import('@/components/sections/Approach'), { ssr: false })
const CTABand = dynamic(() => import('@/components/sections/CTABand'), { ssr: false })
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false })
const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false })

export default function ClientSections() {
  return (
    <>
      <Cursor />
      <Manifesto />
      <Pillars />
      <Stats />
      <Hubs />
      <Industries />
      <Ventures />
      <Approach />
      <CTABand />
      <Contact />
      <Footer />
    </>
  )
}
