// lib/authCheck.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function requireUser({ mustBeSubscribed = false }: { mustBeSubscribed?: boolean } = {}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { redirect: true, reason: 'not_logged_in' }

  if (mustBeSubscribed) {
    const { data, error } = await supabase
      .from('users')
      .select('is_subscribed')
      .eq('id', user.id)
      .single()

    if (error || !data?.is_subscribed) {
      return { redirect: true, reason: 'not_subscribed' }
    }
  }

  return { user, redirect: false }
}
