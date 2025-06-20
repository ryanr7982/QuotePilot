'use client'

import Link from 'next/link'
import LayoutWrapper from '@/components/LayoutWrapper'
export default function LandingPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 text-white px-6 py-20 flex flex-col items-center text-center animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Professional Quotes in Seconds.
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-10 drop-shadow">
          QuotePilot helps service businesses create beautiful, branded quotes and proposals with zero hassle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth">
            <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-yellow-300 transition">
              Get Started Free
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition">
              View Demo
            </button>
          </Link>
        </div>
      </main>

      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { title: 'Fast & Easy', desc: 'Generate quotes in under 60 seconds.' },
            { title: 'Branded Output', desc: 'Impress clients with professional PDFs.' },
            { title: 'Client Management', desc: 'Track, edit, and organize your customers.' },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl shadow-md border hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-100 text-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Simple Pricing</h2>
          <p className="text-lg text-gray-600">No surprises. Start free, upgrade when you grow.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="p-8 border rounded-xl w-80 bg-white shadow text-center">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="mb-4 text-gray-600">Up to 5 quotes per month</p>
            <p className="text-4xl font-extrabold mb-6">$0</p>
            <Link href="/auth">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Start Free
              </button>
            </Link>
          </div>
          <div className="p-8 border-2 border-blue-600 rounded-xl w-80 bg-white shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="mb-4 text-gray-600">Unlimited quotes, branding, and support</p>
            <p className="text-4xl font-extrabold mb-6">$19/mo</p>
            <Link href="/auth">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} QuotePilot. All rights reserved.</p>
      </footer>
    </>
  )
}

