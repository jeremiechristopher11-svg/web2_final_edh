import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL manquant dans Vercel > Settings > Environment Variables')
}
if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY manquant dans Vercel > Settings > Environment Variables')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)
