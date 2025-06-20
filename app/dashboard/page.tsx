'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/supabaseClient'
import CreateQuoteModal from '@/components/CreateQuoteModal'
import CreateClientModal from '@/components/CreateClientModal'
import EditQuoteModal from '@/components/EditQuoteModal'
import DeleteQuoteModal from '@/components/DeleteQuoteModal'
import QuoteCard from '@/components/QuoteCard'
import { exportQuotesToCSV } from '@/lib/exportCSV'
import type { Quote, Client } from '@/types'
import { toast } from 'react-hot-toast'
import LayoutWrapper from '@/components/LayoutWrapper'

const PAGE_SIZE = 10

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const [createQuoteOpen, setCreateQuoteOpen] = useState(false)
  const [editQuote, setEditQuote] = useState<Quote | null>(null)
  const [deleteQuote, setDeleteQuote] = useState<Quote | null>(null)
  const [createClientOpen, setCreateClientOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('session_id')) {
      toast.success('Subscription activated!')
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      const id = data?.user?.id || null
      if (!id) {
        router.push('/auth')
        return
      }
      setUserId(id)
      await loadClients()
    }
    init()
  }, [])

  useEffect(() => {
    if (!userId) return
    loadQuotes(page, searchTerm, selectedClient)
  }, [page, searchTerm, selectedClient, userId])

  useEffect(() => {
    setPage(1)
  }, [searchTerm, selectedClient])

  const handleUpgrade = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData?.user

      if (!user) {
        toast.error('You must be logged in')
        router.push('/auth')
        return
      }

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
        }),
      })

      const data = await res.json()

      if (data?.url) {
        window.location.href = data.url
      } else {
        toast.error('Failed to create checkout session')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    }
  }

  const loadQuotes = async (page: number, search: string, clientId: string) => {
    setLoading(true)

    let query = supabase
      .from('quotes')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (clientId) {
      query = query.eq('client_id', clientId)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      query = query.ilike('title', `%${searchLower}%`)
    }

    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, error, count } = await query.range(from, to)

    if (!error) {
      setQuotes(data || [])
      setTotalCount(count || 0)
    } else {
      console.error('Error loading quotes:', error)
    }

    setLoading(false)
  }

  const loadClients = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setClients(data || [])
  }

  const onCreated = () => {
    setCreateQuoteOpen(false)
    setPage(1)
    loadQuotes(1, searchTerm, selectedClient)
  }

  return (
    <LayoutWrapper>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quotes</h1>
          <div className="flex gap-3">
            <button
              onClick={handleUpgrade}
              className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition"
            >
              Upgrade to Pro
            </button>
            <button
              onClick={() => setCreateClientOpen(true)}
              className="px-4 py-2 rounded bg-gray-700 text-white"
            >
              + Client
            </button>
            <button
              onClick={() => setCreateQuoteOpen(true)}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              + Quote
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search quotes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="">Filter by client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedClient('')
            }}
            className="p-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => exportQuotesToCSV(quotes, clients)}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Export CSV
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onEdit={() => setEditQuote(quote)}
                  onDelete={() => setDeleteQuote(quote)}
                  clients={clients}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center">
                Page {page} of {Math.ceil(totalCount / PAGE_SIZE) || 1}
              </span>
              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, Math.ceil(totalCount / PAGE_SIZE)))
                }
                disabled={page >= Math.ceil(totalCount / PAGE_SIZE)}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

        <CreateQuoteModal
          isOpen={createQuoteOpen}
          onClose={() => setCreateQuoteOpen(false)}
          onCreated={onCreated}
          userId={userId}
          clients={clients}
        />
        <CreateClientModal
          isOpen={createClientOpen}
          onClose={() => setCreateClientOpen(false)}
          onClientCreated={loadClients}
          userId={userId}
        />
        {editQuote && (
          <EditQuoteModal
            quote={editQuote}
            onClose={() => setEditQuote(null)}
            onUpdated={() => loadQuotes(page, searchTerm, selectedClient)}
            clients={clients}
          />
        )}
        {deleteQuote && (
          <DeleteQuoteModal
            quote={deleteQuote}
            onClose={() => setDeleteQuote(null)}
            onDeleted={() => loadQuotes(page, searchTerm, selectedClient)}
          />
        )}
      </div>
    </LayoutWrapper>
  )
}
