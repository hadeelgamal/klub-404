import type { Metadata } from 'next'
import { Noto_Sans, Noto_Sans_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/lib/lenis'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-neue-montreal',
  display: 'swap',
})

const notoDisplay = Noto_Sans_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KLUB404 — venture studio',
  description:
    'Neither agency nor incubator. A venture studio operating from Cairo and Amsterdam, building products, companies, and experiences that solve problems worth solving.',
  metadataBase: new URL('https://klub-404.com'),
  openGraph: {
    title: 'KLUB404 — venture studio',
    description:
      'Neither agency nor incubator. A venture studio operating from Cairo and Amsterdam.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KLUB404 — venture studio',
    description:
      'Neither agency nor incubator. A venture studio operating from Cairo and Amsterdam.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${cormorant.variable} ${notoDisplay.variable}`}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
