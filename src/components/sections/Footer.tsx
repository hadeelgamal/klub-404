'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations, useLocale } from 'next-intl'

const PAD = 'clamp(12px, 1.04vw, 15px)'

const label: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#747474',
  display: 'block',
  marginBottom: '10px',
}

const meta: React.CSSProperties = {
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: '13px',
  fontWeight: 400,
  color: '#747474',
  lineHeight: 1.6,
}

export default function Footer() {
  const t              = useTranslations('footer')
  const locale         = useLocale()
  const isAr           = locale === 'ar'
  const sectionRef     = useRef<HTMLElement>(null)
  const wordmarkRef    = useRef<HTMLDivElement>(null)
  const svgRef         = useRef<SVGSVGElement>(null)
  const strikeRef      = useRef<SVGRectElement>(null)
  const infoRef        = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Sequence: strikethrough draws → wordmark collapses to logo
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })

      tl
        .set(strikeRef.current, { attr: { width: 0 } })
        .to(strikeRef.current, {
          attr: { width: isAr ? 1460 : 960 },
          duration: 1.2,
          ease: 'power3.inOut',
        })
        .to(svgRef.current, {
          width: 200,
          duration: 0.85,
          ease: 'power3.inOut',
        }, '>')
        .to(wordmarkRef.current, {
          paddingTop: 24,
          paddingBottom: 24,
          duration: 0.85,
          ease: 'power3.inOut',
        }, '<')

      gsap.from(infoRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 88%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      id="footer"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #2D2D2D' }}
    >
      {/* Wordmark */}
      <div
        ref={wordmarkRef}
        style={{
          padding: `clamp(48px, 7vw, 80px) ${PAD} clamp(32px, 4vw, 48px)`,
        }}
      >
        <span className="sr-only">{t('srLabel')}</span>
        {isAr ? (
          <svg
            ref={svgRef}
            viewBox="0 540 1460 375"
            preserveAspectRatio="xMaxYMid meet"
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
            aria-hidden="true"
          >
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
            <rect ref={strikeRef} x="0" y="676" width="0" height="16" fill="#ffffff" />
          </svg>
        ) : (
          <svg
            ref={svgRef}
            viewBox="0 0 960 195"
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible', direction: 'ltr' }}
            aria-hidden="true"
          >
            <text
              x="0" y="175"
              fontFamily="var(--font-display), system-ui, sans-serif"
              fontWeight="800"
              fontSize="195"
              fill="#ffffff"
              textLength="549"
              lengthAdjust="spacingAndGlyphs"
            >
              KLUB
            </text>
            <rect ref={strikeRef} x="0" y="100" width="0" height="14" fill="#ffffff" />
            <text
              x="549" y="175"
              fontFamily="var(--font-display), system-ui, sans-serif"
              fontWeight="800"
              fontSize="195"
              fill="#ffffff"
              textLength="411"
              lengthAdjust="spacingAndGlyphs"
            >
              404
            </text>
          </svg>
        )}
      </div>

      {/* Info grid */}
      <div
        ref={infoRef}
        style={{
          borderTop: '1px solid #2D2D2D',
          padding: `clamp(32px, 4vw, 52px) ${PAD}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(32px, 5vw, 64px)',
        }}
        className="footer-grid"
      >
        {/* CTA */}
        <div>
          <span style={label}>{t('contactLabel')}</span>
          <p
            style={{
              fontFamily: 'var(--font-display), system-ui, sans-serif',
              fontSize: 'clamp(22px, 3vw, 40px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 'clamp(12px, 1.5vw, 18px)',
            }}
          >
            {t('ctaHeading')}
          </p>
          <p style={{ ...meta, marginBottom: '6px' }}>{t('ctaBody')}</p>
          <a
            href={`mailto:${t('email')}`}
            style={{ ...meta, color: '#ffffff', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {t('email')}
          </a>
        </div>

        {/* Amsterdam */}
        <div>
          <span style={label}>{t('amsterdamLabel')}</span>
          <p style={meta}>{t('registrationId')}</p>
          <p style={{ ...meta, color: '#ffffff', marginTop: '4px' }}>82074348</p>
        </div>

        {/* Cairo */}
        <div>
          <span style={label}>{t('cairoLabel')}</span>
          <p style={meta}>{t('registrationId')}</p>
          <p style={{ ...meta, color: '#ffffff', marginTop: '4px' }}>285117</p>
        </div>
      </div>

      {/* Copyright strip */}
      <div
        style={{
          borderTop: '1px solid #2D2D2D',
          padding: `22px ${PAD}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={meta}>{t('copyright')}</span>
        <span style={meta}>{t('location')}</span>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
