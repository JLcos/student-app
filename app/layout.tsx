import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ToastProvider } from '@/components/ToastContainer'

export const metadata: Metadata = {
  title: 'Student App - Organize seu futuro!',
  description: 'Organize suas atividades, receba lembretes e compartilhe seu progresso',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF6B35',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}

