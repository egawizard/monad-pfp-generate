import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MONAD PFP GENERATE - AI Profile Picture Generator',
  description: 'Generate cool and funny profile pictures using AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {children}
        </div>
      </body>
    </html>
  )
}