import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/supabaseClient'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text() // raw body as required by Stripe
  const sig = (await req.headers).get('stripe-signature')

  if (!sig) {
    console.error('❌ Missing Stripe signature')
    return new Response('Missing Stripe signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const subscription = event.data.object as Stripe.Subscription
  const userId = subscription.metadata?.userId

  if (!userId) {
    console.warn('No user ID found in metadata')
    return new Response('OK', { status: 200 })
  }

  if (
    event.type === 'invoice.paid' ||
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated'
  ) {
    const { error } = await supabase
      .from('users')
      .update({ is_subscribed: true })
      .eq('id', userId)

    if (error) {
      console.error('❌ Failed to update user as subscribed:', error.message)
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const { error } = await supabase
      .from('users')
      .update({ is_subscribed: false })
      .eq('id', userId)

    if (error) {
      console.error('❌ Failed to update user as unsubscribed:', error.message)
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
}
