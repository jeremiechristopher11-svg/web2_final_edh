import { createClient } from '@supabase/supabase-js'

// Configuration Supabase - Remplacer par tes vraies valeurs
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://votre-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'votre-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ===== AUTHENTIFICATION =====

export async function signUp(email, password, userData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// ===== PANNES (Tickets) =====

export async function getPannes() {
  const { data, error } = await supabase
    .from('pannes')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function createPanne(panne) {
  const { data, error } = await supabase
    .from('pannes')
    .insert([panne])
    .select()
  return { data, error }
}

export async function updatePanne(id, updates) {
  const { data, error } = await supabase
    .from('pannes')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

// ===== CLIENTS =====

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('nom')
  return { data, error }
}

export async function createClient(client) {
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select()
  return { data, error }
}

// ===== FACTURES =====

export async function getFactures() {
  const { data, error } = await supabase
    .from('factures')
    .select('*')
    .order('date_emission', { ascending: false })
  return { data, error }
}

export async function createFacture(facture) {
  const { data, error } = await supabase
    .from('factures')
    .insert([facture])
    .select()
  return { data, error }
}

// ===== INTERVENTIONS =====

export async function getInterventions() {
  const { data, error } = await supabase
    .from('interventions')
    .select('*')
    .order('date_planifiee')
  return { data, error }
}

export async function createIntervention(intervention) {
  const { data, error } = await supabase
    .from('interventions')
    .insert([intervention])
    .select()
  return { data, error }
}

export async function updateIntervention(id, updates) {
  const { data, error } = await supabase
    .from('interventions')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}
