import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'React Kalender',
  description: 'Aplicativo básico para regristro de eventos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body id='__next' className={inter.className}>{children}</body>
    </html>
  )
}
