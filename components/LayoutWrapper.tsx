'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Dark mode state & toggle
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Initialize dark mode from user preference or system
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      setDarkMode(saved === 'true')
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const linkClass = (href: string) =>
    `hover:underline px-2 py-1 rounded ${
      pathname === href ? 'font-semibold underline bg-yellow-200/40 dark:bg-yellow-400/30' : ''
    }`

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-yellow-400">
            QuotePilot
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link href="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
            <Link href="/auth" className={linkClass('/auth')}>
              Login
            </Link>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 px-2 py-1 rounded border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10">{children}</main>

      <footer className="w-full text-center text-sm text-gray-500 py-6 border-t border-gray-300 dark:border-gray-800">
        © {new Date().getFullYear()} QuotePilot. All rights reserved.
      </footer>
    </div>
  )
}
