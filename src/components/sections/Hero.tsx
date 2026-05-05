'use client'

import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations, useLocale } from 'next-intl'

/* ─── Live clock (Cairo time) ─────────────────────────────────────────────── */
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

const body: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '1.35',
  color: '#ffffff',
}

const PAD = 'clamp(12px, 1.04vw, 15px)'

export default function Hero() {
  const t           = useTranslations('hero')
  const locale      = useLocale()
  const isAr        = locale === 'ar'
  const TICKER      = t.raw('ticker') as string[]
  const sectionRef  = useRef<HTMLElement>(null)
  // English wordmark refs
  const klubRef     = useRef<SVGGElement>(null)
  const for404Ref   = useRef<SVGGElement>(null)
  // Arabic wordmark refs
  const arabicPart1Ref = useRef<SVGGElement>(null)
  const arabicPart2Ref = useRef<SVGGElement>(null)
  // Shared refs
  const strikeRef   = useRef<SVGRectElement>(null)
  const navRowRef   = useRef<HTMLDivElement>(null)
  const taglineRef  = useRef<HTMLParagraphElement>(null)
  const marqueeRef  = useRef<HTMLDivElement>(null)
  const time        = useClock(useTranslations('nav')('clockLocale'))

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      if (isAr) {
        gsap.set([arabicPart1Ref.current, arabicPart2Ref.current], { yPercent: 0 })
      } else {
        gsap.set([klubRef.current, for404Ref.current], { yPercent: 0 })
      }
      gsap.set([navRowRef.current, taglineRef.current, marqueeRef.current], { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const part1 = isAr ? arabicPart1Ref.current : klubRef.current
      const part2 = isAr ? arabicPart2Ref.current : for404Ref.current
      const strikeWidth = isAr ? 1460 : 960

      gsap.set(part1,             { yPercent: -110 })
      gsap.set(part2,             { yPercent:  110 })
      gsap.set(taglineRef.current, { yPercent:  200 })
      gsap.set(strikeRef.current,  { attr: { width: 0 } })

      const loopTl = gsap.timeline({ repeat: -1 })
      loopTl
        .fromTo(part1, { yPercent: -110 }, { yPercent:  110, duration: 0.375, ease: 'none' }, 0)
        .fromTo(part2, { yPercent:  110 }, { yPercent: -110, duration: 0.375, ease: 'none' }, 0)

      gsap.delayedCall(1, () => {
        loopTl.kill()
        const tl = gsap.timeline()
        tl
          .to(part1, { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0)
          .to(part2, { yPercent: 0, duration: 0.9, ease: 'power3.out' }, 0)
          .to(strikeRef.current, { attr: { width: strikeWidth }, duration: 0.9, ease: 'power3.in' }, 0)
          .fromTo(taglineRef.current,
            { yPercent: 200 },
            { yPercent: 0, duration: 1.5, ease: 'cubic-bezier(0, 1, 0.2, 1)' },
            0
          )
          .to(navRowRef.current,  { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 0)
          .to(marqueeRef.current, { opacity: 1, duration: 0.6, ease: 'none' }, '-=0.9')
      })

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50vh top',
          scrub: 1.2,
        },
      })
      scrollTl.to(
        [navRowRef.current, taglineRef.current, marqueeRef.current],
        { opacity: 0, ease: 'none' },
        0
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isAr])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <span className="sr-only">{t('srLabel')}</span>

      {/* ── Wordmark ──────────────────────────────────────────────────────── */}
      <div
        style={{
          overflow: 'hidden',
          flexShrink: 0,
          paddingTop: 'clamp(12px, 1.5vw, 20px)',
          paddingLeft: PAD,
          paddingRight: PAD,
          boxSizing: 'border-box',
        }}
      >
        {isAr ? (
          /* Arabic: رابط ٤٠٤ */
          <svg
            viewBox="0 540 1460 375"
            preserveAspectRatio="xMaxYMid meet"
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            aria-hidden="true"
          >
            {/* Part 1 — رابط glyphs (like KLUB, sweep from top) */}
            <g ref={arabicPart1Ref} style={{ willChange: 'transform' }}>
              <g fill="#ffffff">
                <g transform="translate(650.074539, 806.99991)">
                  <path d="M 404.96875 -56.859375 L 404.96875 0 L 366.375 0 C 348.507812 0 332.941406 -4.46875 319.671875 -13.40625 C 307.484375 -4.46875 292.179688 0 273.765625 0 L 8.125 0 L 38.59375 -56.859375 L 94.234375 -56.859375 L 94.234375 -230.71875 L 153.125 -261.984375 L 153.125 -151.921875 C 180.476562 -177.367188 211.21875 -190.09375 245.34375 -190.09375 C 277.832031 -190.09375 303.960938 -178.71875 323.734375 -155.96875 C 340.253906 -136.75 348.515625 -113.328125 348.515625 -85.703125 L 348.515625 -77.984375 C 348.515625 -63.898438 356.363281 -56.859375 372.0625 -56.859375 Z M 271.734375 -56.859375 C 279.316406 -56.859375 284.191406 -58.210938 286.359375 -60.921875 C 288.523438 -63.628906 289.609375 -69.992188 289.609375 -80.015625 L 289.609375 -85.703125 C 289.609375 -100.328125 285.546875 -112.175781 277.421875 -121.25 C 269.296875 -130.320312 258.738281 -134.859375 245.75 -134.859375 C 227.332031 -134.859375 209.863281 -127.882812 193.34375 -113.9375 C 176.820312 -99.988281 163.414062 -80.960938 153.125 -56.859375 Z" />
                </g>
                <g transform="translate(1044.073258, 806.99991)">
                  <path d="M -10.96875 0 L -10.96875 -56.859375 L 28.84375 -56.859375 C 37.507812 -56.859375 43.597656 -58.617188 47.109375 -62.140625 C 50.628906 -65.660156 52.390625 -71.753906 52.390625 -80.421875 L 52.390625 -151.515625 L 111.296875 -182.78125 L 111.296875 -77.984375 C 111.296875 -52.804688 103.441406 -33.039062 87.734375 -18.6875 C 73.921875 -6.226562 56.1875 0 34.53125 0 Z M 64.578125 95.453125 C 55.378906 95.453125 48.003906 92.675781 42.453125 87.125 C 36.898438 81.570312 34.125 74.191406 34.125 64.984375 C 34.125 55.773438 36.898438 48.460938 42.453125 43.046875 C 48.003906 37.640625 55.378906 34.9375 64.578125 34.9375 C 73.515625 34.9375 80.691406 37.640625 86.109375 43.046875 C 91.523438 48.460938 94.234375 55.773438 94.234375 64.984375 C 94.234375 74.191406 91.523438 81.570312 86.109375 87.125 C 80.691406 92.675781 73.515625 95.453125 64.578125 95.453125 Z" />
                </g>
                <g transform="translate(1191.924368, 806.99991)">
                  <path d="M 36.5625 0 L 36.5625 -230.71875 L 95.453125 -261.984375 L 95.453125 0 Z" />
                </g>
                <g transform="translate(1323.934196, 806.99991)">
                  <path d="M 116.578125 -27.21875 C 116.578125 -3.925781 111.835938 16.3125 102.359375 33.5 C 92.878906 50.695312 79.472656 63.222656 62.140625 71.078125 C 50.773438 76.492188 38.457031 79.203125 25.1875 79.203125 C 7.3125 79.203125 -10.15625 74.460938 -27.21875 64.984375 L -27.21875 13.8125 C -13.132812 21.664062 0.539062 25.59375 13.8125 25.59375 C 20.582031 25.59375 26.8125 24.507812 32.5 22.34375 C 49.007812 16.65625 57.265625 1.488281 57.265625 -23.15625 L 57.265625 -151.109375 L 116.578125 -182.78125 Z" />
                </g>
              </g>
            </g>
            {/* Strikethrough */}
            <rect ref={strikeRef} x="0" y="676" width="0" height="16" fill="#ffffff" />
            {/* Part 2 — ٤٠٤ numeral glyphs (like 404, sweep from bottom) */}
            <g ref={arabicPart2Ref} style={{ willChange: 'transform' }}>
              <g fill="#ffffff">
                <g transform="translate(22.918977, 806.99991)">
                  <path d="M 91.390625 0 C 66.203125 0 46.707031 -7.988281 32.90625 -23.96875 C 21.800781 -36.695312 16.25 -52.128906 16.25 -70.265625 C 16.25 -88.410156 23.425781 -104.929688 37.78125 -119.828125 C 26.132812 -130.660156 20.3125 -144.46875 20.3125 -161.25 C 20.582031 -180.476562 28.164062 -196.863281 43.0625 -210.40625 C 57.40625 -223.132812 75.003906 -229.5 95.859375 -229.5 L 144.203125 -229.5 L 144.203125 -176.28125 L 103.171875 -176.28125 C 96.128906 -176.28125 90.441406 -174.453125 86.109375 -170.796875 C 81.773438 -167.140625 79.609375 -162.332031 79.609375 -156.375 C 79.609375 -150.425781 81.773438 -145.554688 86.109375 -141.765625 C 90.441406 -137.972656 96.128906 -136.078125 103.171875 -136.078125 L 134.046875 -136.078125 L 134.046875 -95.859375 L 99.921875 -95.859375 C 92.609375 -95.859375 86.648438 -93.894531 82.046875 -89.96875 C 77.441406 -86.039062 75.140625 -81.097656 75.140625 -75.140625 L 75.140625 -74.328125 C 75.679688 -60.515625 83.941406 -53.609375 99.921875 -53.609375 L 142.171875 -53.609375 L 176.6875 0 Z" />
                </g>
                <g transform="translate(209.763783, 806.99991)">
                  <path d="M 77.171875 -36.15625 L 16.25 -97.484375 L 77.171875 -157.1875 L 136.890625 -97.484375 Z" />
                </g>
                <g transform="translate(362.89526, 806.99991)">
                  <path d="M 91.390625 0 C 66.203125 0 46.707031 -7.988281 32.90625 -23.96875 C 21.800781 -36.695312 16.25 -52.128906 16.25 -70.265625 C 16.25 -88.410156 23.425781 -104.929688 37.78125 -119.828125 C 26.132812 -130.660156 20.3125 -144.46875 20.3125 -161.25 C 20.582031 -180.476562 28.164062 -196.863281 43.0625 -210.40625 C 57.40625 -223.132812 75.003906 -229.5 95.859375 -229.5 L 144.203125 -229.5 L 144.203125 -176.28125 L 103.171875 -176.28125 C 96.128906 -176.28125 90.441406 -174.453125 86.109375 -170.796875 C 81.773438 -167.140625 79.609375 -162.332031 79.609375 -156.375 C 79.609375 -150.425781 81.773438 -145.554688 86.109375 -141.765625 C 90.441406 -137.972656 96.128906 -136.078125 103.171875 -136.078125 L 134.046875 -136.078125 L 134.046875 -95.859375 L 99.921875 -95.859375 C 92.609375 -95.859375 86.648438 -93.894531 82.046875 -89.96875 C 77.441406 -86.039062 75.140625 -81.097656 75.140625 -75.140625 L 75.140625 -74.328125 C 75.679688 -60.515625 83.941406 -53.609375 99.921875 -53.609375 L 142.171875 -53.609375 L 176.6875 0 Z" />
                </g>
              </g>
            </g>
          </svg>
        ) : (
          /* English: KLUB404 */
          <svg
            viewBox="0 0 960 195"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible', direction: 'ltr' }}
            aria-hidden="true"
          >
            <g ref={klubRef} style={{ willChange: 'transform' }}>
              <text
                x="0" y="175"
                fontFamily="var(--font-display), var(--font-neue-montreal), system-ui, sans-serif"
                fontWeight="800"
                fontSize="195"
                fill="#ffffff"
                textLength="549"
                lengthAdjust="spacingAndGlyphs"
              >
                KLUB
              </text>
            </g>
            <rect ref={strikeRef} x="0" y="100" width="0" height="14" fill="#ffffff" />
            <g ref={for404Ref} style={{ willChange: 'transform' }}>
              <text
                x="549" y="175"
                fontFamily="var(--font-display), var(--font-neue-montreal), system-ui, sans-serif"
                fontWeight="800"
                fontSize="195"
                fill="#ffffff"
                textLength="411"
                lengthAdjust="spacingAndGlyphs"
              >
                404
              </text>
            </g>
          </svg>
        )}
      </div>

      {/* ── Nav row ─────────────────────────────────────────────────────────── */}
      <div
        ref={navRowRef}
        className="hero-nav-row"
        style={{
          opacity: 0,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          borderTop: '1px solid #2D2D2D',
          borderBottom: '1px solid #2D2D2D',
          padding: `13px ${PAD}`,
          flexShrink: 0,
        }}
      >
        <span style={{ ...body, color: '#747474', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {t('navRow')}
        </span>
        <a
          href="#contact"
          style={{ ...body, fontSize: '13px', textDecoration: 'none', justifySelf: 'center' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {t('contact')}
        </a>
        <span
          style={{
            ...body, fontSize: '13px', color: '#747474',
            textAlign: 'end', fontVariantNumeric: 'tabular-nums',
          }}
          className="hero-clock"
        >
          {t('localTime')} {time}
        </span>
      </div>

      {/* ── Spacer ────────────────────────────────────────────────────────── */}
      <div className="hero-spacer" style={{ flex: 1 }} />

      {/* ── Tagline ───────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: 'clamp(10px, 1.04vw, 15px)',
          padding: `0 ${PAD} clamp(32px, 4vw, 56px)`,
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
        className="hero-tagline-grid"
      >
        <div />
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2.2vw, 32px)',
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            color: '#ffffff',
          }}
        >
          {t('tagline')}
        </p>
      </div>

      {/* ── Ticker ────────────────────────────────────────────────────────── */}
      <div
        ref={marqueeRef}
        aria-hidden="true"
        style={{
          opacity: 0,
          borderTop: '1px solid #2D2D2D',
          padding: '12px 0',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: item === '·' ? '#2D2D2D' : '#747474',
                whiteSpace: 'nowrap',
                padding: '0 18px',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-tagline-grid { grid-template-columns: 1fr !important; }
          .hero-tagline-grid > div:first-child { display: none !important; }
          #hero { min-height: auto !important; }
          .hero-spacer { flex: none !important; height: clamp(32px, 5vh, 56px); }
        }
        @media (max-width: 600px) {
          .hero-nav-row  { grid-template-columns: 1fr auto !important; }
          .hero-clock    { display: none !important; }
        }
      `}</style>
    </section>
  )
}
