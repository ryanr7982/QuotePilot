'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const linkClasses = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
    }`

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          QuotePilot
        </Link>
        <div className="flex space-x-2">
          <Link href="/" className={linkClasses('/')}>
            Home
          </Link>
          <Link href="/auth" className={linkClasses('/auth')}>
            Login / Signup
          </Link>
          <Link href="/dashboard" className={linkClasses('/dashboard')}>
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  )
}

