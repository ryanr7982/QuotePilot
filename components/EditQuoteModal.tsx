// components/EditQuoteModal.tsx
'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { supabase } from '../supabaseClient'

import type { Quote, Client } from 'types'

type Props = {
  quote: Quote
  onClose: () => void
  onUpdated: () => void
  clients: Client[]
}

export default function EditQuoteModal({ quote, onClose, onUpdated, clients }: Props) {
  const [title, setTitle] = useState(quote.title)
  const [clientId, setClientId] = useState(quote.client_id)
  const [lineItems, setLineItems] = useState(quote.line_items || [])

  const handleSubmit = async () => {
    const total = lineItems.reduce((sum, item) => sum + Number(item.amount || 0), 0)
    const { error } = await supabase.from('quotes').update({
      title,
      client_id: clientId,
      line_items: lineItems,
      total
    }).eq('id', quote.id)
    if (!error) onUpdated()
  }

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg">
          <Dialog.Title className="text-lg font-bold mb-4">Edit Quote</Dialog.Title>
          <input className="w-full p-2 mb-3 border rounded" value={title} onChange={e => setTitle(e.target.value)} />
          <select className="w-full p-2 mb-3 border rounded" value={clientId} onChange={e => setClientId(e.target.value)}>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {lineItems.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input className="flex-1 p-2 border rounded" placeholder="Description" value={item.description} onChange={e => {
                const newItems = [...lineItems]
                newItems[i].description = e.target.value
                setLineItems(newItems)
              }} />
              <input type="number" className="w-24 p-2 border rounded" placeholder="Amount" value={item.amount} onChange={e => {
                const newItems = [...lineItems]
                newItems[i].amount = parseFloat(e.target.value)
                setLineItems(newItems)
              }} />
            </div>
          ))}
          <button className="text-sm text-blue-600 mb-3" onClick={() => setLineItems([...lineItems, { description: '', amount: 0 }])}>+ Add Line</button>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}