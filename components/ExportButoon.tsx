// components/ExportButtons.tsx
'use client'

import { Quote, Client } from 'types'
import { saveAs } from 'file-saver'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  line: { fontSize: 12 },
})

function QuotePDF({ quote, client }: { quote: Quote; client: Client | undefined }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{quote.title}</Text>
          <Text style={styles.line}>Client: {client?.name}</Text>
          <Text style={styles.line}>Total: ${quote.total.toFixed(2)}</Text>
        </View>
        <View>
          {quote.line_items.map((item, i) => (
            <Text key={i} style={styles.line}>
              • {item.description}: ${item.amount.toFixed(2)}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default function ExportButtons({ quotes, clients }: { quotes: Quote[]; clients: Client[] }) {
  const exportCSV = () => {
    const headers = ['Title', 'Client', 'Total']
    const rows = quotes.map(q => {
      const client = clients.find(c => c.id === q.client_id)
      return [q.title, client?.name || 'Unknown', q.total.toFixed(2)]
    })
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'quotes.csv')
  }

  return (
    <div className="flex gap-4 my-4">
      <button
        onClick={exportCSV}
        className="bg-white dark:bg-gray-700 border px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        Export CSV
      </button>

      {quotes.length > 0 && (
        <PDFDownloadLink
          document={<QuotePDF quote={quotes[0]} client={clients.find(c => c.id === quotes[0].client_id)} />}
          fileName={`${quotes[0].title.replace(/\s+/g, '_')}.pdf`}
        >
          {({ loading }) => (
            <button className="bg-white dark:bg-gray-700 border px-4 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-600">
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          )}
        </PDFDownloadLink>
      )}
    </div>
  )
}
