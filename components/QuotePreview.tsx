// app/components/QuotePreview.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const quotes = [
  {
    client: 'Acme Plumbing Co.',
    service: 'Full Bathroom Renovation',
    total: '$12,500',
    timeline: '2 weeks'
  },
  {
    client: 'Bright Homes Realty',
    service: 'Interior Painting & Prep',
    total: '$4,200',
    timeline: '4 days'
  },
  {
    client: 'Zen Landscaping',
    service: 'Backyard Design Package',
    total: '$9,800',
    timeline: '1.5 weeks'
  }
]

export default function QuotePreview() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const quote = quotes[index]

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="mt-16 max-w-lg w-full bg-white bg-opacity-10 border border-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg text-left text-white"
    >
      <h3 className="text-lg font-semibold mb-1">Client: {quote.client}</h3>
      <p className="mb-1">Service: <span className="font-medium">{quote.service}</span></p>
      <p className="mb-1">Timeline: <span className="font-medium">{quote.timeline}</span></p>
      <p>Total: <span className="text-yellow-400 font-bold">{quote.total}</span></p>
    </motion.div>
  )
}
