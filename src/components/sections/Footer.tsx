'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FOOTER_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms',   href: '/terms' },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/klub-404',
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M4.477 2.25A2.227 2.227 0 002.25 4.477c0 1.23.997 2.227 2.227 2.227 1.23 0 2.227-.997 2.227-2.227A2.227 2.227 0 004.477 2.25zM2.5 7.5h3.75v9.75H2.5V7.5zm6.25 0h3.6v1.334h.05c.5-.95 1.723-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75v6.616h-3.75v-5.866c0-1.4-.025-3.2-1.95-3.2-1.95 0-2.25 1.524-2.25 3.1v5.966H8.75V7.5z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/klub404',
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M14.994 2h2.598l-5.677 6.49L18.75 18h-5.23l-4.096-5.357L4.71 18H2.11l6.072-6.941L1.25 2h5.36l3.703 4.896L14.994 2zm-.912 14.374h1.44L5.984 3.478H4.436l9.646 12.896z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(footerRef.current, { opacity: 1 })
        return
      }

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.02em',
    color: 'var(--color-ink)',
    opacity: 0.5,
    textDecoration: 'none',
    transition: 'opacity 200ms ease',
  }

  return (
    <footer
      ref={footerRef}
      style={{
        opacity: 0,
        padding: 'clamp(48px, 6vw, 80px) 48px',
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Tagline + hub */}
        <div style={{ marginBottom: '48px' }}>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 500,
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
              marginBottom: '12px',
            }}
          >
            Found where others stop looking.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: 'var(--color-ink)',
              opacity: 0.45,
            }}
          >
            Cairo · Amsterdam
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {/* Copyright */}
          <span
            style={{
              fontFamily: 'var(--font-neue-montreal), system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--color-ink)',
              opacity: 0.4,
            }}
          >
            &copy; {new Date().getFullYear()} klub-404
          </span>

          {/* Legal links */}
          <nav aria-label="Legal links">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                listStyle: 'none',
              }}
            >
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={linkStyle}
                    data-cursor-state="hover-link"
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.8')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.5')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <nav aria-label="Social links">
            <ul
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                listStyle: 'none',
              }}
            >
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-cursor-state="hover-link"
                    style={{
                      display: 'inline-flex',
                      color: 'var(--color-ink)',
                      opacity: 0.45,
                      transition: 'opacity 200ms ease',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.45')}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
