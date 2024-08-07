import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Footer } from '@/shared/components/footer/Footer'
import { Toaster } from '@/shared/components/ui/sonner'

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
      <body className={`flex flex-col justify-between ${nunito.className}`}>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}
