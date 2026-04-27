# 👥 Guide des Collaborateurs - Tâches et Responsabilités

## 🎯 Vue d'ensemble du Projet

**EDH** - Application de gestion des pannes et interventions pour le secteur de l'électricité.

**Version 1.0** : Fonctionnalités internes (Admin, Agent, Chef-technicien, Technicien)  
**Version 2.0** : Ajout de l'espace client

---

## 🚨 IMPORTANT - RÈGLE DE VERSION

⚠️ **Le dossier `src/app/pages/client/` est RÉSERVÉ pour la Version 2.**  
⚠️ **Ne PAS développer dans ce dossier pour l'instant.**

---

## 👤 Marithza - Gestion des Pannes et Interventions

**Branche :** `marithza`

### 📁 Fichiers à modifier

```
src/app/pages/
├── GestionPannes.tsx           # Liste et gestion des pannes
├── GestionInterventions.tsx    # Liste et gestion des interventions
└── PlanificationTravaux.tsx    # Planification des interventions

src/app/components/
├── StatusBadge.tsx             # Badge de statut (créé, vide)
└── (créer vos composants spécifiques)
```

### ✅ Tâches Version 1

1. **GestionPannes.tsx**
   - [ ] Tableau listant toutes les pannes
   - [ ] Filtres par statut (Nouveau, En cours, Résolu, Urgent)
   - [ ] Bouton "Nouvelle panne" → modal de création
   - [ ] Actions : Voir détails, Modifier, Assigner technicien

2. **GestionInterventions.tsx**
   - [ ] Liste des interventions assignées
   - [ ] Filtres par technicien, date, statut
   - [ ] Création d'intervention liée à une panne
   - [ ] Suivi du temps passé

3. **PlanificationTravaux.tsx**
   - [ ] Vue calendrier des interventions
   - [ ] Drag & drop pour réassigner
   - [ ] Vue par technicien
   - [ ] Alertes surcharges

### 🔗 Intégrations
- Utiliser le système de notifications (Christopher) quand une panne est créée
- Exporter données pour facturation (Enriquez)

---

## 👤 Christopher - Système de Notifications en Temps Réel

**Branche :** `christopher`

### 📁 Fichiers à modifier

```
src/app/
├── contexts/
│   └── NotificationContext.tsx    # Context global (créé, vide)
├── hooks/
│   └── useNotification.ts         # Hook personnalisé (créé, vide)
├── services/
│   └── notificationService.ts     # Service WebSocket (créé, vide)
├── components/
│   ├── NotificationPopover.tsx    # UI popover notifications (créé, vide)
│   └── NotificationTester.tsx     # Composant de test (créé, vide)
└── pages/
    └── Notifications.tsx          # Page historique notifications
```

### ✅ Tâches Version 1

1. **notificationService.ts**
   - [ ] Connexion WebSocket au serveur
   - [ ] Reconnexion automatique (max 5 tentatives)
   - [ ] Envoi/reception messages JSON
   - [ ] Gestion des types : panne, intervention, facture, system

2. **NotificationContext.tsx**
   - [ ] Provider React pour état global
   - [ ] Méthodes : add, markAsRead, delete, clearAll
   - [ ] Gestion des notifications non lues

3. **useNotification.ts**
   - [ ] Hook `useNotifications()` - accès aux notifs
   - [ ] Hook `useNotificationsByType(type)` - filtrer
   - [ ] Hook `useUnreadNotifications()` - non lues
   - [ ] Hook `useNotificationStats()` - stats

4. **NotificationPopover.tsx**
   - [ ] Icône cloche avec badge compteur
   - [ ] Liste 5 dernières notifications
   - [ ] Marquer comme lu / supprimer
   - [ ] Lien vers page historique complet

5. **Notifications.tsx** (page)
   - [ ] Historique complet des notifications
   - [ ] Filtres par type et date
   - [ ] Pagination
   - [ ] Export

6. **Intégration main.tsx**
   - [ ] Envelopper `<App />` avec `<NotificationProvider>`

### 🔗 Intégrations
- Marithza : notifier quand panne créée/modifiée
- Enriquez : notifier quand facture générée
- Narcisse : afficher notifs dans les dashboards

### 📚 Documentation
- Voir [NOTIFICATIONS_GUIDE.md](./NOTIFICATIONS_GUIDE.md) pour le guide complet
- Voir [SERVER_SETUP.md](./SERVER_SETUP.md) pour configurer le serveur WebSocket

---

## 👤 Enriquez - Gestion des Clients et Factures

**Branche :** `enriquez`

### 📁 Fichiers à modifier

```
src/app/pages/
├── GestionClients.tsx           # CRUD clients (créé, vide)
└── Factures.tsx                  # Gestion factures (créé, vide)

src/app/services/
└── (créer services pour API clients/factures)
```

### ✅ Tâches Version 1 (Administrateur seulement)

1. **GestionClients.tsx**
   - [ ] Tableau clients avec recherche
   - [ ] Filtres : actif/inactif, type (particulier/entreprise)
   - [ ] Modal création client
   - [ ] Modal édition client
   - [ ] Désactivation client (soft delete)
   - [ ] Export liste clients
   - [ ] Historique interventions par client

2. **Factures.tsx**
   - [ ] Liste factures avec filtres (payée, en attente, retard)
   - [ ] Génération facture depuis intervention terminée
   - [ ] Calcul automatique montant
   - [ ] Modal détails facture
   - [ ] Marquer comme payée
   - [ ] Export PDF facture
   - [ ] Relances automatiques

### ⚠️ VERSION 2 - Espace Client (À NE PAS FAIRE MAINTENANT)

**RÉSERVÉ POUR PLUS TARD :**
```
src/app/pages/client/
└── EspaceClient.tsx              # ⚠️ VERSION 2 UNIQUEMENT
```

Fonctionnalités client à faire en v2 :
- Consultation interventions historique
- Téléchargement factures
- Signalement panne (simplifié)
- Profil et paramètres

### 🔗 Intégrations
- Marithza : lier interventions aux clients
- Christopher : notifier client quand facture créée
- Narcisse : stats clients dans dashboard admin

---

## 👤 Narcisse - Dashboards Administrateur et Agent

**Branche :** `narcisse`

### 📁 Fichiers à modifier

```
src/app/pages/
├── admin/
│   └── Dashboard.tsx             # Dashboard Admin global (créé, vide)
└── agent/
    └── Dashboard.tsx             # Dashboard Agent (créé, vide)

src/app/components/
├── DashboardLayout.tsx           # Layout commun (créé, vide)
└── (créer composants charts/stats)
```

### ✅ Tâches Version 1

1. **Dashboard Admin** (`src/app/pages/admin/Dashboard.tsx`)
   - [ ] KPIs globaux :
     - Nombre pannes aujourd'hui
     - Interventions en cours
     - Techniciens disponibles
     - Chiffre d'affaires du mois
   - [ ] Graphique : Pannes par zone/secteur
   - [ ] Graphique : Interventions par statut
   - [ ] Graphique : Performance techniciens
   - [ ] Tableau : Dernières pannes urgentes
   - [ ] Tableau : Interventions à assigner
   - [ ] Accès rapide aux différentes sections

2. **Dashboard Agent** (`src/app/pages/agent/Dashboard.tsx`)
   - [ ] Vue simplifiée des interventions du jour
   - [ ] Recherche client rapide
   - [ ] Création rapide panne (formulaire simplifié)
   - [ ] Statut des techniciens en temps réel
   - [ ] Notifications agent spécifiques

3. **DashboardLayout.tsx**
   - [ ] Sidebar navigation responsive
   - [ ] Header avec profil utilisateur
   - [ ] Intégration NotificationPopover (Christopher)
   - [ ] Breadcrumbs
   - [ ] Menu selon rôle (admin vs agent)

### 🔗 Intégrations
- Christopher : afficher notifications en temps réel
- Marithza : liens vers gestion pannes/interventions
- Enriquez : afficher stats clients et factures

---

## 👤 Structure-Initiale - Configuration et Architecture

**Branche :** `structure-initiale`

### 📁 Fichiers principaux

```
├── Configuration globale
│   ├── vite.config.ts            # Config Vite (existant)
│   ├── tsconfig.json             # Config TypeScript (existant)
│   ├── package.json              # Dépendances (existant)
│   └── tailwind.config.js        # Config Tailwind (à créer si besoin)
│
├── Routing
│   └── src/app/routes.tsx        # Configuration routes (créé, vide)
│
├── Authentification
│   └── src/app/contexts/AuthContext.tsx  # (à créer)
│
└── Styles globaux
    └── src/styles/theme.css      # Variables CSS (existant, vide)
```

### ✅ Tâches Version 1

1. **Configuration**
   - [ ] Vérifier toutes les configs fonctionnent
   - [ ] Ajouter plugins Vite nécessaires
   - [ ] Configurer aliases path (@/components, etc.)

2. **Routing** (`routes.tsx`)
   - [ ] Définir toutes les routes de l'app
   - [ ] Protection routes selon rôle
   - [ ] Lazy loading pour performance
   - [ ] Routes :
     - `/login` - Page connexion
     - `/admin/dashboard` - Dashboard admin
     - `/admin/*` - Routes admin
     - `/agent/dashboard` - Dashboard agent
     - `/chef-technicien/dashboard`
     - `/technicien/dashboard`
     - `/gestion-pannes`
     - `/gestion-interventions`
     - `/gestion-clients`
     - `/factures`
     - `/planification`
     - `/notifications`

3. **Authentification** (`AuthContext.tsx`)
   - [ ] Context pour état auth
   - [ ] Login/logout
   - [ ] Stockage token (localStorage/session)
   - [ ] Vérification rôle utilisateur
   - [ ] Redirection si non authentifié

4. **Composants UI communs** (`src/app/components/ui/`)
   - [ ] S'assurer tous les composants shadcn/ui sont fonctionnels
   - [ ] Thème personnalisé (couleurs EDH)
   - [ ] Composants de formulaire cohérents

### 🔗 Intégrations
- Tous : fournir la base pour les autres développeurs
- Christopher : intégrer AuthContext avec NotificationContext

---

## 🎨 Design System et Guidelines

### Couleurs EDH
```css
--primary: #0066CC;        /* Bleu électricité */
--secondary: #FF6B00;      /* Orange alerte */
--success: #22C55E;        /* Vert résolu */
--warning: #F59E0B;        /* Jaune attention */
--danger: #EF4444;         /* Rouge urgent */
--gray-100: #F3F4F6;
--gray-800: #1F2937;
```

### Composants UI disponibles
Voir dossier `src/app/components/ui/` :
- Button, Card, Dialog, Form, Input, Select, Table, Tabs
- Toast, Badge, Avatar, Dropdown, etc.

### Conventions de nommage
- Composants : PascalCase (`GestionPannes.tsx`)
- Hooks : camelCase avec prefix `use` (`useNotification.ts`)
- Services : camelCase (`notificationService.ts`)
- Fichiers CSS : kebab-case (`theme.css`)

---

## 🔄 Workflow Git Recommandé

### 1. Commencer sa journée
```bash
git checkout votre-branche
git pull origin votre-branche
npm install  # Si package.json changé
```

### 2. Pendant le développement
```bash
# Commit réguliers
git add .
git commit -m "[nom] Description claire du changement"
git push origin votre-branche
```

### 3. Quand une fonctionnalité est terminée
```bash
# Créer une Pull Request sur GitHub
# Titre : "[nom] Fonctionnalité X terminée"
# Description : Ce qui a été fait, comment tester
# Assigner : Jérémie (propriétaire)
```

### 4. Ne JAMAIS faire
- ❌ Modifier directement sur `main`
- ❌ Supprimer des fichiers des autres
- ❌ Travailler sur le dossier `client/` (réservé v2)
- ❌ Faire `git push --force` sans accord

---

## 📅 Planning Suggéré (Version 1)

### Semaine 1 : Fondations
- **Structure** : Config, routing, auth
- **Christopher** : Service WebSocket de base
- **Narcisse** : Layout dashboard
- **Marithza** : Structure formulaires pannes
- **Enriquez** : Structure CRUD clients

### Semaine 2 : Fonctionnalités Core
- **Christopher** : Context notifications + UI popover
- **Marithza** : CRUD pannes complet
- **Narcisse** : Dashboards avec données statiques
- **Enriquez** : CRUD clients + début factures

### Semaine 3 : Intégrations
- **Tous** : Connexion frontend/backend
- **Christopher** : Tests notifications temps réel
- **Marithza** : Intégration planification
- **Enriquez** : Génération PDF factures
- **Narcisse** : Charts et statistiques dynamiques

### Semaine 4 : Tests et Polish
- Tests utilisateurs
- Corrections bugs
- Optimisations
- Documentation

---

## 📞 Support et Questions

### Canal de communication
- GitHub Issues pour les bugs
- Pull Requests pour le code review
- Discussions GitHub pour les questions

### Responsable projet
**Jérémie Christopher** - Propriétaire du repository

### Documentation technique
- Ce fichier : Tâches par collaborateur
- [NOTIFICATIONS_GUIDE.md](./NOTIFICATIONS_GUIDE.md) : Système notifications
- [SERVER_SETUP.md](./SERVER_SETUP.md) : Config serveur
- [guidelines/Guidelines.md](./guidelines/Guidelines.md) : Règles de codage

---

**Bonne collaboration ! 🚀**

*Projet EDH - Version 1.0 (Sans espace client)*
*Dernière mise à jour : Avril 2026*
