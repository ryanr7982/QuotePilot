// app/layout.tsx
import './globals.css'
import { ReactNode, } from 'react'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ThemeToggle from '@/components/ThemeToggle'
import Navbar from '@/components/Navbar'



const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }: { children: ReactNode }) {
  

  return (
    <html lang="en">
      <head>
        <title>QuotePilot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white`}>
        
          <ThemeToggle />
          
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          {children}
        
      </body>
    </html>
  )
}




