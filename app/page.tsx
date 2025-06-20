'use client'

import { FaHome, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa'

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white px-6 py-12 animate-fadeInUp select-none">
      {/* Animated subtle pattern behind content */}
      <div className="animated-pattern"></div>

      <h1
        className="text-5xl md:text-6xl font-extrabold mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)] opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.15s' }}
      >
        Welcome to{' '}
        <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(252,211,77,0.7)]">
          QuotePilot
        </span>
      </h1>

      <p
        className="text-xl md:text-2xl max-w-xl text-center mb-14 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.3s' }}
      >
        Your all-in-one quote and proposal management SaaS tool.
      </p>

      <nav
        className="flex flex-wrap justify-center gap-6 mb-16 opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.45s' }}
      >
        <a
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300 transition transform hover:-translate-y-1 hover:scale-105"
        >
          <FaHome size={20} /> Home
        </a>
        <a
          href="/auth"
          className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 rounded-lg font-semibold transition transform hover:-translate-y-1 hover:scale-105 hover:bg-opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <FaSignInAlt size={20} /> Login / Signup
        </a>
        <a
          href="/dashboard"
          className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 rounded-lg font-semibold transition transform hover:-translate-y-1 hover:scale-105 hover:bg-opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <FaTachometerAlt size={20} /> Dashboard
        </a>
      </nav>
    </main>
  )
}

