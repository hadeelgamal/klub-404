import React from 'react'

type HubCity = 'cairo' | 'amsterdam'

interface HubPlaceholderProps {
  city: HubCity
  className?: string
}

const hubConfig: Record<HubCity, { gradient: string; label: string }> = {
  cairo: {
    gradient: 'linear-gradient(135deg, #C4522A 0%, #E8A87C 50%, #FFB830 100%)',
    label: 'Cairo',
  },
  amsterdam: {
    gradient: 'linear-gradient(135deg, #1A2B4A 0%, #4A6B8A 50%, #8BA3C7 100%)',
    label: 'Amsterdam',
  },
}

/**
 * CSS-only photography placeholder for Hubs section.
 * Simulates a cinematic still via gradient + SVG grain texture overlay.
 * Replace the inner content with <img> or <video> when real assets are ready.
 */
export function HubPlaceholder({ city, className = '' }: HubPlaceholderProps) {
  const config = hubConfig[city]
  const filterId = `grain-${city}`

  return (
    <div
      className={className}
      role="img"
      aria-label={`${config.label} hub photography placeholder`}
      style={{
        position: 'relative',
        aspectRatio: '4 / 3',
        borderRadius: '2px',
        overflow: 'hidden',
        width: '100%',
        background: config.gradient,
      }}
    >
      {/* SVG grain texture overlay using feTurbulence */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: city === 'cairo' ? 0.18 : 0.12,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grayNoise"
            />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended"/>
            <feComposite in="blended" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} fill="white"/>
      </svg>

      {/* City label — remove when replaced with real photography */}
      <span
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {config.label}
      </span>
    </div>
  )
}

export default HubPlaceholder
