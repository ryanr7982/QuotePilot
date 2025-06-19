import { Quote, Client } from '@/types'
import { unparse } from 'papaparse'

export function exportQuotesToCSV(quotes: Quote[], clients: Client[]) {
  const data = quotes.map((quote) => {
    const client = clients.find((c) => c.id === quote.client_id)
    return {
      Title: quote.title,
      Total: quote.total,
      Client: client?.name || 'Unknown',
      Created: new Date(quote.created_at).toLocaleDateString(),
    }
  })

  const csv = unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'quotes.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
