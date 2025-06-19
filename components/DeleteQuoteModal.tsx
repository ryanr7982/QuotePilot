// components/DeleteQuoteModal.tsx
'use client'

import { Dialog } from '@headlessui/react'
import { supabase } from '../supabaseClient'

import type { Quote } from 'types'

type Props = {
  quote: Quote
  onClose: () => void
  onDeleted: () => void
}

export default function DeleteQuoteModal({ quote, onClose, onDeleted }: Props) {
  const handleDelete = async () => {
    const { error } = await supabase.from('quotes').delete().eq('id', quote.id)
    if (!error) onDeleted()
  }

  return (
    <Dialog open onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">Delete Quote</Dialog.Title>
          <p className="mb-4">Are you sure you want to delete the quote "{quote.title}"?</p>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
