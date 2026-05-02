import { createClient } from '@supabase/supabase-js'

// Vite exige le préfixe VITE_ pour exposer les variables au client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL manquant. Vérifiez Vercel > Settings > Environment Variables')
  console.error('   Nom correct : VITE_SUPABASE_URL (pas URL_SUPABASE_VITE)')
}

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY manquant. Vérifiez Vercel > Settings > Environment Variables')
} else if (!supabaseAnonKey.startsWith('eyJ')) {
  console.error('❌ VITE_SUPABASE_ANON_KEY invalide. La clé doit commencer par eyJhbGci...')
  console.error('   Trouvez la vraie clé dans : Supabase Dashboard > Project Settings > API > anon public')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'
)
