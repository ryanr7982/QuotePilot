// components/ui/toaster.tsx
'use client'

import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return <Toaster position="top-right" reverseOrder={false} />
}
