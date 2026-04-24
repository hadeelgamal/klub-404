'use client'

import { useEffect, useRef } from 'react'

const T = (size = '14px', color = '#ffffff', extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
  fontSize: size,
  fontWeight: 400,
  lineHeight: 1.55,
  color,
  ...extra,
})

const LINK: React.CSSProperties = {
  ...T('14px', '#747474'),
  textDecoration: 'none',
  display: 'block',
  marginBottom: '6px',
  transition: 'color 300ms ease',
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  // Footer is always visible — no scroll-trigger fade needed
  useEffect(() => {}, [])

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: '#000000',
        borderTop: '1px solid #2D2D2D',
        padding: '60px 24px',
      }}
    >
      {/* 4-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          marginBottom: '60px',
        }}
        className="footer-grid"
      >

        {/* Col 1 — Contact */}
        <div>
          <p style={T('14px', '#ffffff', { marginBottom: '20px' })}>Contact ↓</p>

          <p style={T('12px', '#747474', { marginBottom: '4px' })}>Cairo</p>
          <p style={T('12px', '#747474', { marginBottom: '4px' })}>Egypt</p>
          <a href="mailto:hello@klub-404.com" style={{ ...LINK, fontSize: '12px', marginBottom: '16px' }}>
            hello@klub-404.com
          </a>

          <p style={T('12px', '#747474', { marginBottom: '4px' })}>Amsterdam</p>
          <p style={T('12px', '#747474', { marginBottom: '4px' })}>The Netherlands</p>
          <a href="mailto:hello@klub-404.com" style={{ ...LINK, fontSize: '12px' }}>
            hello@klub-404.com
          </a>
        </div>

        {/* Col 2 — Follow */}
        <div>
          <p style={T('14px', '#ffffff', { marginBottom: '20px' })}>Follow us</p>
          {[
            { label: 'Instagram', href: 'https://instagram.com/klub404' },
            { label: 'LinkedIn',  href: 'https://linkedin.com/company/klub-404' },
            { label: 'X (Twitter)', href: 'https://x.com/klub404' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={LINK}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#747474')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Col 3 — More */}
        <div>
          <p style={T('14px', '#ffffff', { marginBottom: '20px' })}>More</p>
          {[
            { label: 'Work',    href: '#work' },
            { label: 'Studio',  href: '#studio' },
            { label: 'Hubs',    href: '#hubs' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={LINK}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#ffffff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#747474')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Col 4 — Legal */}
        <div>
          <p style={T('12px', '#747474', { marginBottom: '8px' })}>
            All rights reserved. Copyright &copy;{new Date().getFullYear()}
          </p>
          <p style={T('12px', '#2D2D2D')}>
            KLUB404 is a venture studio registered in Egypt & the Netherlands.
          </p>
        </div>
      </div>

      {/* Bottom bar — wordmark */}
      <div style={{ borderTop: '1px solid #2D2D2D', paddingTop: '24px' }}>
        <p
          style={{
            fontFamily: 'var(--font-display), system-ui, sans-serif',
            fontSize: 'clamp(32px, 6vw, 80px)',
            fontWeight: 900,
            color: '#2D2D2D',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}
        >
          KLUB404
        </p>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
