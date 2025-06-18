// app/layout.tsx
import './globals.css'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'
import { Session, SupabaseClient } from '@supabase/supabase-js'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  )
}
