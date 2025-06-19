// components/CreateClientModal.tsx
'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { supabase } from '../supabaseClient'


type Props = {
  isOpen: boolean
  onClose: () => void
  onClientCreated: () => void
  userId: string | null
}

export default function CreateClientModal({ isOpen, onClose, onClientCreated, userId }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')

  const handleSubmit = async () => {
    const { error } = await supabase.from('clients').insert({ user_id: userId, name, email, company })
    if (!error) onClientCreated()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-lg">
          <Dialog.Title className="text-lg font-bold mb-4">Add Client</Dialog.Title>
          <input className="w-full p-2 mb-3 border rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full p-2 mb-3 border rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full p-2 mb-3 border rounded" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}