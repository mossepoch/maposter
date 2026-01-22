import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maposter - City Map Poster Generator',
  description: 'Generate beautiful, minimalist map posters for any city in the world',
  manifest: '/manifest.json',
  themeColor: '#111111',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111111" />
      </head>
      <body className="newsprint-bg font-sans">
        {children}
      </body>
    </html>
  )
}
