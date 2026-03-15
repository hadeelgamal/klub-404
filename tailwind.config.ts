import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#FFFFFF',
        ink:     '#0D0D0D',
        orange:  '#FF4D00',
        surface: '#F5F4F2',
        border:  '#E8E6E2',
      },
      fontFamily: {
        sans: ['var(--font-neue-montreal)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-l':  ['72px', { lineHeight: '1.0',  letterSpacing: '-0.01em' }],
        'headline':   ['48px', { lineHeight: '1.1',  letterSpacing: '0' }],
        'subhead':    ['32px', { lineHeight: '1.2',  letterSpacing: '0.01em' }],
        'body':       ['18px', { lineHeight: '1.7',  letterSpacing: '0' }],
        'label':      ['13px', { lineHeight: '1.4',  letterSpacing: '0.08em' }],
        'mono-sm':    ['14px', { lineHeight: '1.5',  letterSpacing: '0.02em' }],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
        '34': '136px',
        '38': '152px',
        '42': '168px',
        '50': '200px',
        '60': '240px',
      },
      transitionTimingFunction: {
        'arrive':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'depart':   'cubic-bezier(0.55, 0.00, 1.00, 0.45)',
        'editorial':'cubic-bezier(0.16, 1, 0.3, 1)',
        'flip':     'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
