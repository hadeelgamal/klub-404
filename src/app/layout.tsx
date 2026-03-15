import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { SmoothScrollProvider } from '@/lib/lenis'

// Using DM Sans as a stand-in until Neue Montreal .woff2 files are dropped into /public/fonts/
const neueMontreal = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-neue-montreal',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'klub-404 — venture studio',
  description:
    'Neither agency nor incubator. A venture studio operating from Cairo and Amsterdam, building products, companies, and experiences that solve problems worth solving.',
  metadataBase: new URL('https://klub-404.com'),
  openGraph: {
    title: 'klub-404 — venture studio',
    description:
      'Neither agency nor incubator. A venture studio operating from Cairo and Amsterdam.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'klub-404 — venture studio',
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
    <html lang="en" className={neueMontreal.variable}>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
