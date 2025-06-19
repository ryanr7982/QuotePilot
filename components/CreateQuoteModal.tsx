'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { supabase } from '../supabaseClient'
import toast from 'react-hot-toast'

import type { Client } from 'types'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
  userId: string | null
  clients: Client[]
}

export default function CreateQuoteModal({ isOpen, onClose, onCreated, userId, clients }: Props) {
  const [title, setTitle] = useState('')
  const [clientId, setClientId] = useState('')
  const [lineItems, setLineItems] = useState([{ description: '', amount: 0 }])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title || !clientId || !userId) {
      toast.error('Please fill out all required fields.')
      return
    }

    const total = lineItems.reduce((sum, item) => sum + Number(item.amount || 0), 0)
    setLoading(true)

    const { error } = await supabase.from('quotes').insert({
      user_id: userId,
      client_id: clientId,
      title,
      line_items: lineItems,
      total,
    })

    if (error) {
      toast.error('Failed to create quote.')
      console.error(error)
    } else {
      toast.success('Quote created!')
      onCreated()
      onClose()
      setTitle('')
      setClientId('')
      setLineItems([{ description: '', amount: 0 }])
    }

    setLoading(false)
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg">
          <Dialog.Title className="text-lg font-bold mb-4">Create Quote</Dialog.Title>
          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Quote title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <select
            className="w-full p-2 mb-3 border rounded"
            value={clientId}
            onChange={e => setClientId(e.target.value)}
          >
            <option value="">Select Client</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {lineItems.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="Description"
                value={item.description}
                onChange={e => {
                  const newItems = [...lineItems]
                  newItems[i].description = e.target.value
                  setLineItems(newItems)
                }}
              />
              <input
                type="number"
                className="w-24 p-2 border rounded"
                placeholder="Amount"
                value={item.amount}
                onChange={e => {
                  const newItems = [...lineItems]
                  newItems[i].amount = parseFloat(e.target.value)
                  setLineItems(newItems)
                }}
              />
            </div>
          ))}

          <button
            className="text-sm text-blue-600 mb-3"
            onClick={() => setLineItems([...lineItems, { description: '', amount: 0 }])}
          >
            + Add Line
          </button>

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

