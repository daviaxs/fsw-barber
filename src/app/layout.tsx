/* eslint-disable prettier/prettier */
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Footer } from '@/shared/components/footer/Footer'
import { Toaster } from '@/shared/components/ui/sonner'
import { AuthProvider } from './providers/Auth'
import { CircleAlert } from 'lucide-react'

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
        <AuthProvider>
          <div className="md:hidden">
            {children}
            <Toaster />
            <Footer />
          </div>

          <div className="max-md:hidden flex h-full flex-col items-center justify-center gap-2">
            <CircleAlert size={50} />
            <p>Desculpe, o site ainda não está disponível em telas grandes.</p>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
