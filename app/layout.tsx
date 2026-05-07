import type { Metadata } from 'next'
import { Charmonman, Open_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

const charmonman = Charmonman({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-charmonman',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Dos Outdoors | Two on the Go Travel Blog',
    template: '%s | Dos Outdoors',
  },
  description: 'Two on the Go! Travel stories, outdoor adventures, and gear recommendations from a couple who loves to explore.',
  openGraph: {
    siteName: 'Dos Outdoors',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${charmonman.variable}`}>
      <body className="font-sans bg-white text-stone-900 antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  )
}
