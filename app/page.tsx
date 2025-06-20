'use client'

import { FaHome, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa'
import QuotePreview from '@/components/QuotePreview' // Adjust if path differs

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white px-6 animate-fadeInUp">
      <h1
        className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.1s' }}
      >
        Welcome to <span className="text-yellow-400">QuotePilot</span>
      </h1>
      <p
        className="text-xl md:text-2xl max-w-xl text-center mb-12 drop-shadow-md opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.2s' }}
      >
        Your all-in-one quote and proposal management SaaS tool.
      </p>

      <nav
        className="flex flex-wrap justify-center gap-6 mb-12 opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.3s' }}
      >
        <a
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 transition transform hover:-translate-y-1"
        >
          <FaHome size={20} /> Home
        </a>
        <a
          href="/auth"
          className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg font-semibold transition transform hover:-translate-y-1"
        >
          <FaSignInAlt size={20} /> Login / Signup
        </a>
        <a
          href="/dashboard"
          className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg font-semibold transition transform hover:-translate-y-1"
        >
          <FaTachometerAlt size={20} /> Dashboard
        </a>
      </nav>

      <QuotePreview />
    </main>
  )
}





