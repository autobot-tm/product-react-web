import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'FashionHub',
  description: 'FashionHub is a website that sells fashion products'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
