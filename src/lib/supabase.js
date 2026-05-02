import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Protection contre les variables d'environnement manquantes
if (!supabaseUrl || supabaseUrl === 'your_supabase_project_url') {
  console.error('⚠️  VITE_SUPABASE_URL manquant ou invalide dans les variables d\'environnement Vercel')
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
  console.error('⚠️  VITE_SUPABASE_ANON_KEY manquant ou invalide dans les variables d\'environnement Vercel')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_key'
)
