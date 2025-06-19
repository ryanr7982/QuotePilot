import { FaHome, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white px-6 animate-fadeInUp">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg opacity-0 animate-fadeIn delay-100">
        Welcome to <span className="text-yellow-400">QuotePilot</span>
      </h1>
      <p className="text-xl md:text-2xl max-w-xl text-center mb-12 drop-shadow-md opacity-0 animate-fadeIn delay-200">
        Your all-in-one quote and proposal management SaaS tool.
      </p>

      <nav className="flex gap-6 opacity-0 animate-fadeIn delay-300">
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

      {/* Tailwind animations added below */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </main>
  )
}


