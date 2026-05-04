'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from 'next-intl'

function useClock(clockLocale: string) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString(clockLocale, {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true, timeZone: 'Africa/Cairo',
      })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 1000)
    return () => clearInterval(id)
  }, [clockLocale])
  return time
}

const T: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '13px',
  fontWeight: 400,
  color: '#ffffff',
  textDecoration: 'none',
  lineHeight: '1.35',
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const t = useTranslations('nav')
  const time = useClock(t('clockLocale'))

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.set(navRef.current, { opacity: 0 })

    // Numeric start = fires when scrollY > 40px — avoids killing other section triggers
    const st = ScrollTrigger.create({
      start: 40,
      end: 99999,
      onEnter: () => gsap.to(navRef.current, { opacity: 1, duration: 0.4, ease: 'power1.out' }),
      onLeaveBack: () => gsap.to(navRef.current, { opacity: 0, duration: 0.3 }),
    })

    return () => st.kill()
  }, [])

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '14px clamp(12px, 1.04vw, 15px)',
        backgroundColor: '#000000',
        borderBottom: '1px solid #2D2D2D',
      }}
    >
      <a href="/" style={{ ...T, fontWeight: 500, letterSpacing: '0.01em' }}>
        {t('name')}
      </a>

      <a
        href="#contact"
        style={{ ...T, justifySelf: 'center' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        {t('contact')}
      </a>

      <span
        className="nav-clock"
        style={{ ...T, color: '#747474', textAlign: 'end', fontVariantNumeric: 'tabular-nums' }}
      >
        {time && `${t('localTime')} ${time}`}
      </span>

      <style>{`
        @media (max-width: 600px) { .nav-clock { display: none !important; } }
      `}</style>
    </nav>
  )
}
