import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Quote, Client } from '@/types'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
})

export default function QuotePDF({
  quote,
  client,
}: {
  quote: Quote
  client: Client | undefined
}) {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Quote Summary</Text>
        </View>
        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Client: </Text>
            {client?.name}
          </Text>
          <Text>
            <Text style={styles.label}>Title: </Text>
            {quote.title}
          </Text>
          <Text>
            <Text style={styles.label}>Total: </Text>${quote.total.toFixed(2)}
          </Text>
          <Text>
            <Text style={styles.label}>Created: </Text>
            {new Date(quote.created_at).toLocaleDateString()}
          </Text>
        </View>
      </Page>
    </Document>
  )
}
