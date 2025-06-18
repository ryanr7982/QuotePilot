// types.ts
export type Quote = {
  id: string
  title: string
  client_id: string
  user_id: string
  line_items: { description: string; amount: number }[]
  total: number
  summary?: string
  created_at: string
}

export type Client = {
  id: string
  name: string
  email?: string
  company?: string
  user_id: string
  created_at: string
}