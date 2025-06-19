'use client'

import type { Quote, Client } from '@/types'
import { PDFDownloadLink } from '@react-pdf/renderer'
import QuotePDF from './QuotePDF'

interface QuoteCardProps {
  quote: Quote
  onEdit: () => void
  onDelete: () => void
  clients: Client[]
}

export default function QuoteCard({ quote, onEdit, onDelete, clients }: QuoteCardProps) {
  const client = clients.find(c => c.id === quote.client_id)

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold">{quote.title}</h2>
      <p className="text-sm text-gray-500 mb-1">Client: {client?.name || 'Unknown'}</p>
      <p className="text-sm text-gray-500">Total: ${quote.total.toFixed(2)}</p>

      <div className="mt-2">
        {client && (
          <PDFDownloadLink
            document={<QuotePDF quote={quote} client={client} />}
            fileName={`Quote-${quote.title}.pdf`}
            className="text-sm text-blue-600 underline"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onEdit} className="text-blue-600">Edit</button>
        <button onClick={onDelete} className="text-red-600">Delete</button>
      </div>
    </div>
  )
}
