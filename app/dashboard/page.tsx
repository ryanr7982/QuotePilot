// app/dashboard/page.tsx
'use client'

import { supabase } from 'supabaseClient'
import CreateQuoteModal from '@/components/CreateQuoteModal'
import CreateClientModal from '@/components/CreateClientModal'
import EditQuoteModal from '@/components/EditQuoteModal'
import DeleteQuoteModal from '@/components/DeleteQuoteModal'
import QuoteCard from '@/components/QuoteCard'
import type { Quote, Client } from 'types'


export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const [createQuoteOpen, setCreateQuoteOpen] = useState(false)
  const [editQuote, setEditQuote] = useState<Quote | null>(null)
  const [deleteQuote, setDeleteQuote] = useState<Quote | null>(null)
  const [createClientOpen, setCreateClientOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const id = data?.user?.id || null
      if (!id) return router.push('/auth')
      setUserId(id)
      loadQuotes()
      loadClients()
    })
  }, [])

  const loadQuotes = async () => {
    const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false })
    if (!error) setQuotes(data || [])
    setLoading(false)
  }

  const loadClients = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setClients(data || [])
  }

  const onCreated = () => {
    setCreateQuoteOpen(false)
    loadQuotes()
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quotes</h1>
        <div className="flex gap-3">
          <button onClick={() => setCreateClientOpen(true)} className="px-4 py-2 rounded bg-gray-700 text-white">+ Client</button>
          <button onClick={() => setCreateQuoteOpen(true)} className="px-4 py-2 rounded bg-blue-600 text-white">+ Quote</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}

      <CreateQuoteModal isOpen={createQuoteOpen} onClose={() => setCreateQuoteOpen(false)} onCreated={onCreated} userId={userId} clients={clients} />
      <CreateClientModal isOpen={createClientOpen} onClose={() => setCreateClientOpen(false)} onClientCreated={loadClients} userId={userId} />
      {editQuote && <EditQuoteModal quote={editQuote} onClose={() => setEditQuote(null)} onUpdated={loadQuotes} clients={clients} />}
      {deleteQuote && <DeleteQuoteModal quote={deleteQuote} onClose={() => setDeleteQuote(null)} onDeleted={loadQuotes} />}
    </div>
  )
}

