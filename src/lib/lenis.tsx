'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
 * NOTE: gsap.registerPlugin and ScrollTrigger.config are intentionally NOT
 * called at module scope. Calling them here would execute during Next.js
 * server-side static prerendering (even in a 'use client' module, Turbopack
 * evaluates module-level code on the server for the /_not-found prerender).
 * GSAP internals read `window` at module evaluation and throw on the server.
 * Both calls are moved inside useEffect where they are guaranteed to run
 * only in the browser.
 */

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Register plugin and configure inside useEffect — client-only, safe.
    gsap.registerPlugin(ScrollTrigger)

    // Prevent ScrollTrigger from refreshing on every window resize event.
    // By default GSAP listens to 'resize' which is expensive (ScrollTrigger.refresh()
    // walks the entire DOM). Restricting to visibility/DOMContentLoaded means we
    // only recalculate when the page becomes visible or first loads.
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded',
    })

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Integrate Lenis with GSAP ticker for synchronized animation
    function onGsapTick(time: number) {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onGsapTick)
    gsap.ticker.lagSmoothing(0)

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(onGsapTick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
