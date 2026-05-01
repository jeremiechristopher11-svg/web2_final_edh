# GUIDE DE TEST - EDH Zero Papier

## 📋 Plan de test complet

---

## ÉTAPE 1: Préparation

### 1.1 Créer les tables dans Supabase

1. Va dans Supabase → **SQL Editor** → **New query**
2. Copie le fichier `data/supabase_schema.sql` (version SANS données)
3. Clique **Run**
4. Vérifie dans **Table Editor** que toutes les tables sont vides :
   - `clients` ✅ 0 lignes
   - `pannes` ✅ 0 lignes  
   - `interventions` ✅ 0 lignes
   - `factures` ✅ 0 lignes
   - `profiles` ✅ 0 lignes

### 1.2 Configurer le fichier `.env`

Crée `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=https://TON-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...TA-CLE-ANON
```

Trouve tes clés dans Supabase : **Project Settings** → **API**

### 1.3 Installer Supabase et lancer

```bash
# Terminal dans le dossier web-design-studio-main
bun add @supabase/supabase-js
bun run dev
```

Site accessible sur : `http://localhost:8080`

---

## ÉTAPE 2: Scénarios de Test

### TEST 1: Connexion Agent

| Action | Résultat attendu |
|--------|-----------------|
| Aller sur `/` | Page de login s'affiche |
| Cliquer "Agent" | Redirection vers `/agent` |
| Se connecter | Dashboard agent s'affiche |
| Vérifier données | Aucune donnée (tables vides) |

**URL test:** `http://localhost:8080/agent`

---

### TEST 2: Créer un Client (via Agent)

1. Se connecter en tant qu'**Agent**
2. Aller dans **Clients** ou **Nouvelle demande**
3. Créer un nouveau client :
   - Nom: `Jean Test`
   - Email: `jean@test.com`
   - Téléphone: `+509 34 00 00 00`
   - Adresse: `Rue Test #123`
4. Vérifier dans Supabase : Table `clients` doit avoir 1 ligne

---

### TEST 3: Créer une Panne

1. Se connecter en tant qu'**Agent**
2. Aller dans **Pannes** → **Nouvelle demande**
3. Créer une panne :
   - Sélectionner le client créé
   - Titre: `Coupure complète`
   - Description: `Plus de courant depuis ce matin`
   - Priorité: `Haute`
   - Type: `Coupure`
4. Vérifier dans Supabase : Table `pannes` doit avoir 1 ligne

---

### TEST 4: Connexion Technicien

| Action | Résultat attendu |
|--------|-----------------|
| Se déconnecter | Retour à la page login |
| Cliquer "Technicien" | Dashboard technicien |
| Vérifier interventions | Liste vide (normal) |

---

### TEST 5: Planifier une Intervention (Chef Technicien)

1. Se connecter en tant que **Chef Technicien**
2. Voir la panne créée
3. Créer une intervention :
   - Assigner à un technicien
   - Date planifiée: demain
   - Notes: `Vérifier transformateur`
4. Vérifier dans Supabase : Table `interventions` doit avoir 1 ligne

---

### TEST 6: Voir Intervention (Technicien)

1. Se connecter en tant que **Technicien** assigné
2. Aller dans **Interventions**
3. Voir l'intervention assignée
4. Marquer comme **En cours** puis **Terminée**

---

### TEST 7: Créer une Facture (Agent)

1. Se connecter en tant qu'**Agent**
2. Aller dans **Factures**
3. Créer une facture :
   - Client: celui créé
   - Montant: 2500
   - Période: Octobre 2024
4. Vérifier dans Supabase : Table `factures` doit avoir 1 ligne

---

### TEST 8: Connexion Client

1. Se déconnecter
2. Se connecter en tant que **Client**
3. Vérifier :
   - Voir SEULEMENT ses propres factures
   - Voir SEULEMENT ses propres pannes
   - Ne PAS voir les autres clients

---

## ÉTAPE 3: Tests Spéciaux

### TEST 9: Mode Hors Ligne (PWA)

1. Ouvrir l'app dans Chrome
2. Appuyer `F12` → **Network** → **Offline**
3. Vérifier que le bandeau "Mode hors ligne" s'affiche
4. Essayer de créer une panne → Doit être sauvegardé localement
5. Remettre en ligne → Données doivent synchroniser

### TEST 10: Responsive (Mobile)

1. Appuyer `F12` → **Toggle Device Toolbar**
2. Tester en mode **iPhone 12 Pro** (390x844)
3. Vérifier :
   - Menu sidebar se replie
   - Tables scrollables
   - Boutons cliquables

---

## ÉTAPE 4: Vérification des Données

À la fin des tests, vérifier dans Supabase :

```sql
-- Compter les enregistrements
SELECT 'clients' as table, count(*) from clients
UNION ALL SELECT 'pannes', count(*) from pannes
UNION ALL SELECT 'interventions', count(*) from interventions
UNION ALL SELECT 'factures', count(*) from factures
UNION ALL SELECT 'profiles', count(*) from profiles;
```

**Résultat attendu :** Nombres > 0 pour chaque table testée

---

## 🚨 Problèmes Courants

### Erreur CORS
**Solution:** Dans Supabase → **API** → **CORS Origins**, ajoute :
```
http://localhost:8080
```

### Erreur "Failed to fetch"
**Vérifier:**
- `.env` bien configuré ?
- Supabase URL correcte ?
- Projet Supabase en ligne (pas en pause) ?

### RLS bloque les requêtes
**Solution:** Vérifier que l'utilisateur a le bon rôle dans `profiles`

---

## ✅ Checklist Finale

- [ ] Tables créées dans Supabase
- [ ] `.env` configuré avec bonnes clés
- [ ] `bun add @supabase/supabase-js` exécuté
- [ ] `bun run dev` démarre sans erreur
- [ ] Connexion Agent fonctionne
- [ ] Connexion Technicien fonctionne
- [ ] Connexion Client fonctionne
- [ ] Création client OK
- [ ] Création panne OK
- [ ] Création intervention OK
- [ ] Création facture OK
- [ ] Mode hors ligne OK
- [ ] Responsive mobile OK
