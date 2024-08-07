import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Footer } from '@/shared/components/header/Footer'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSW - Barbershop',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="dark">
      <body className={nunito.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
