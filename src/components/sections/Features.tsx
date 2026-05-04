'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Sparkles, Settings2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const FEATURE_ICONS = [
  { icon: <Zap size={22} aria-hidden />,      hue: '280, 58, 237' },
  { icon: <Sparkles size={22} aria-hidden />, hue: '0, 200, 255'  },
  { icon: <Settings2 size={22} aria-hidden />, hue: '255, 60, 140' },
]

function HoloCard({ icon, title, body, hue }: {
  icon: ReactNode
  title: string
  body: string
  hue: string
}) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const shine = shineRef.current
    if (!card || !shine) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rx = (y - 0.5) * -14
    const ry = (x - 0.5) * 14

    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`
    shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 65%)`
    shine.style.opacity = '1'
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    const shine = shineRef.current
    if (!card || !shine) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)'
    shine.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className="holo-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        borderRadius: '16px',
        padding: 'clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 32px)',
        textAlign: 'center',
        background: `
          linear-gradient(135deg, rgba(8,8,18,0.92) 0%, rgba(14,8,28,0.92) 100%) padding-box,
          linear-gradient(135deg,
            rgba(${hue},0.7) 0%,
            rgba(255,255,255,0.15) 40%,
            rgba(${hue},0.4) 70%,
            rgba(0,200,255,0.5) 100%
          ) border-box
        `,
        border: '1px solid transparent',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        transition: 'transform 0.12s ease, box-shadow 0.3s ease',
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {/* Shine overlay */}
      <div
        ref={shineRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '16px',
          opacity: 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <div
        className="holo-icon"
        style={{
          width: '52px',
          height: '52px',
          margin: '0 auto clamp(20px, 2.5vw, 28px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '13px',
          background: `linear-gradient(135deg, rgba(${hue},0.2), rgba(${hue},0.05))`,
          border: `1px solid rgba(${hue},0.35)`,
          color: '#ffffff',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
          fontSize: 'clamp(15px, 1.4vw, 18px)',
          fontWeight: 600,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
          marginBottom: 'clamp(10px, 1.2vw, 14px)',
          position: 'relative',
        }}
      >
        {title}
      </h3>

      {/* Body */}
      <p
        style={{
          fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
          fontSize: 'clamp(13px, 1.1vw, 15px)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.65,
          letterSpacing: '-0.005em',
          position: 'relative',
        }}
      >
        {body}
      </p>
    </div>
  )
}

export default function Features() {
  const t       = useTranslations('features')
  const items   = t.raw('items') as { title: string; body: string }[]
  const FEATURES = items.map((item, i) => ({ ...FEATURE_ICONS[i], ...item }))

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 60, opacity: 0, duration: 1, ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      style={{
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        padding: `clamp(80px, 12vw, 160px) ${PAD}`,
      }}
    >
      {/* Heading */}
      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 80px)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          {t('heading')}
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            color: '#ffffff',
            letterSpacing: '-0.01em',
            maxWidth: '560px',
            margin: 'clamp(12px, 1.5vw, 18px) auto 0',
          }}
        >
          {t('subheading')}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(13px, 1.2vw, 16px)',
            color: '#747474',
            letterSpacing: '-0.01em',
            maxWidth: '520px',
            margin: 'clamp(8px, 1vw, 12px) auto 0',
            lineHeight: 1.6,
          }}
        >
          {t('body')}
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 2vw, 24px)',
          maxWidth: '1080px',
          margin: '0 auto',
        }}
      >
        {FEATURES.map((f, i) => (
          <div key={f.title} ref={el => { cardRefs.current[i] = el }}>
            <HoloCard {...f} />
          </div>
        ))}
      </div>

      <style>{`
        .holo-card:hover .holo-icon {
          transform: scale(1.12) translateY(-2px);
          box-shadow: 0 0 18px rgba(255,255,255,0.15), 0 0 36px rgba(124,58,237,0.25);
        }
        .holo-card:hover {
          box-shadow:
            0 0 40px rgba(124,58,237,0.2),
            0 0 80px rgba(0,200,255,0.08),
            0 28px 56px rgba(0,0,0,0.5);
        }
      `}</style>
    </section>
  )
}
