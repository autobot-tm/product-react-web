import type { Metadata } from 'next'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
      <body>
        <Header />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
