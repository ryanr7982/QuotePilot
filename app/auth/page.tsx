'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleAuth = async () => {
    setLoading(true)
    if (isLogin) {
      // Login mode
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        alert(error.message)
      } else {
        alert('Login successful!')
        router.push('/dashboard') // Redirect to dashboard or desired page
      }
    } else {
      // Signup mode
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        alert(error.message)
      } else {
        alert('Signup successful! Please check your email to confirm your account.')
        setIsLogin(true) // Switch to login after signup
      }
    }
    setLoading(false)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login to QuotePilot' : 'Sign Up to QuotePilot'}</h2>
        <input
          type="email"
          placeholder="Your email"
          className="w-full p-2 rounded mb-4 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password"
          className="w-full p-2 rounded mb-4 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleAuth}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}


