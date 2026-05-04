-- =====================================================
-- EDH - Système de Gestion des Pannes et Interventions
-- Schéma de base de données pour Supabase
-- =====================================================

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Table des utilisateurs (profils)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  telephone TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'agent', 'chef-technicien', 'technicien', 'client')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des pannes
CREATE TABLE IF NOT EXISTS pannes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  numero_panne TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  description TEXT,
  type_panne TEXT NOT NULL CHECK (type_panne IN ('electrique', 'mecanique', 'reseau', 'autre')),
  urgence TEXT NOT NULL CHECK (urgence IN ('basse', 'moyenne', 'haute', 'critique')),
  statut TEXT NOT NULL DEFAULT 'nouveau' CHECK (statut IN ('nouveau', 'en_attente', 'en_cours', 'resolu', 'cloture')),
  client_id UUID REFERENCES profiles(id),
  agent_id UUID REFERENCES profiles(id),
  technicien_id UUID REFERENCES profiles(id),
  localisation TEXT,
  coordonnees_gps POINT,
  date_signalement TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  date_intervention TIMESTAMP WITH TIME ZONE,
  date_resolution TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des interventions
CREATE TABLE IF NOT EXISTS interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  panne_id UUID NOT NULL REFERENCES pannes(id) ON DELETE CASCADE,
  technicien_id UUID REFERENCES profiles(id),
  chef_technicien_id UUID REFERENCES profiles(id),
  date_debut TIMESTAMP WITH TIME ZONE,
  date_fin TIMESTAMP WITH TIME ZONE,
  description TEXT,
  actions_realisees TEXT,
  materiel_utilise TEXT,
  statut TEXT NOT NULL DEFAULT 'planifiee' CHECK (statut IN ('planifiee', 'en_cours', 'terminee', 'annulee')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('panne_nouvelle', 'panne_assignee', 'intervention_planifiee', 'intervention_terminee', 'systeme')),
  titre TEXT NOT NULL,
  message TEXT NOT NULL,
  lien TEXT,
  lu BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commentaires sur les pannes
CREATE TABLE IF NOT EXISTS commentaires (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  panne_id UUID NOT NULL REFERENCES pannes(id) ON DELETE CASCADE,
  auteur_id UUID NOT NULL REFERENCES profiles(id),
  contenu TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des pièces jointes
CREATE TABLE IF NOT EXISTS pieces_jointes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  panne_id UUID REFERENCES pannes(id) ON DELETE CASCADE,
  intervention_id UUID REFERENCES interventions(id) ON DELETE CASCADE,
  nom_fichier TEXT NOT NULL,
  url_fichier TEXT NOT NULL,
  type_fichier TEXT,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (
    (panne_id IS NOT NULL AND intervention_id IS NULL) OR
    (panne_id IS NULL AND intervention_id IS NOT NULL)
  )
);

-- =====================================================
-- INDEX
-- =====================================================

CREATE INDEX idx_pannes_statut ON pannes(statut);
CREATE INDEX idx_pannes_urgence ON pannes(urgence);
CREATE INDEX idx_pannes_client_id ON pannes(client_id);
CREATE INDEX idx_pannes_technicien_id ON pannes(technicien_id);
CREATE INDEX idx_interventions_panne_id ON interventions(panne_id);
CREATE INDEX idx_interventions_technicien_id ON interventions(technicien_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_lu ON notifications(lu);

-- =====================================================
-- FONCTIONS ET TRIGGERS
-- =====================================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pannes_updated_at
  BEFORE UPDATE ON pannes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interventions_updated_at
  BEFORE UPDATE ON interventions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer une notification lors d'une nouvelle panne
CREATE OR REPLACE FUNCTION notify_nouvelle_panne()
RETURNS TRIGGER AS $$
BEGIN
  -- Notifier tous les agents
  INSERT INTO notifications (user_id, type, titre, message, lien)
  SELECT 
    id,
    'panne_nouvelle',
    'Nouvelle panne signalée',
    'Une nouvelle panne #' || NEW.numero_panne || ' a été signalée',
    '/pannes/' || NEW.id
  FROM profiles
  WHERE role = 'agent';
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_nouvelle_panne
  AFTER INSERT ON pannes
  FOR EACH ROW
  EXECUTE FUNCTION notify_nouvelle_panne();

-- =====================================================
-- POLITIQUES RLS (Row Level Security)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pannes ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE commentaires ENABLE ROW LEVEL SECURITY;
ALTER TABLE pieces_jointes ENABLE ROW LEVEL SECURITY;

-- Politiques pour profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Politiques pour pannes
CREATE POLICY "Users can view pannes based on role" ON pannes
  FOR SELECT USING (
    auth.uid() = client_id OR
    auth.uid() = agent_id OR
    auth.uid() = technicien_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'chef-technicien'))
  );

CREATE POLICY "Clients can create pannes" ON pannes
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'client')
  );

CREATE POLICY "Agents and admins can update pannes" ON pannes
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'agent', 'chef-technicien'))
  );

-- Politiques pour notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- DONNÉES DE TEST (Optionnel)
-- =====================================================

-- Insérer des données de test après la création des utilisateurs
-- via l'authentification Supabase Auth
