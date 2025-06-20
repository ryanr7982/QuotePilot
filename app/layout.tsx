// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import ThemeToggle from '@/components/ThemeToggle'
import Navbar from '@/components/Navbar'
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
         <Navbar />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <ThemeToggle />
      </body>
    </html>
  )
}


