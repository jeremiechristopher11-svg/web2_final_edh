# Guide de Déploiement - EDH

Ce guide explique comment configurer Supabase et déployer l'application sur Vercel.

---

## 1. Configuration Supabase

### Étape 1 : Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com) et connectez-vous
2. Cliquez sur **"New Project"**
3. Choisissez votre organisation
4. Nommez le projet : `edh-gestion-pannes`
5. Choisissez une région proche de vos utilisateurs (ex: `West Europe`)
6. Attendez que le projet soit créé (1-2 minutes)

### Étape 2 : Récupérer les clés API

Une fois le projet créé :

1. Allez dans **Project Settings** (icône engrenage) → **API**
2. Copiez ces deux valeurs :
   - **Project URL** : `https://xxxxxxxx.supabase.co`
   - **anon/public** key : `eyJ...`

### Étape 3 : Créer la base de données

1. Allez dans **SQL Editor** (dans le menu de gauche)
2. Cliquez sur **"New Query"**
3. Copiez-collez le contenu du fichier `supabase/schema.sql`
4. Cliquez sur **"Run"** pour exécuter le script

### Étape 4 : Activer l'authentification

1. Allez dans **Authentication** → **Providers**
2. Activez **Email** (déjà activé par défaut)
3. Configurez les paramètres selon vos besoins
4. Allez dans **URL Configuration** et ajoutez votre URL de redirection après connexion

---

## 2. Configuration Locale

### Créer le fichier .env

Créez un fichier `.env` à la racine du projet avec :

```env
VITE_SUPABASE_URL=https://votre-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

> ⚠️ **Ne jamais commit ce fichier !** Il est déjà dans `.gitignore`

---

## 3. Déploiement sur Vercel

### Étape 1 : Préparer le repository

Assurez-vous que tout est commit sur GitHub :

```bash
git add .
git commit -m "Configuration Supabase et Vercel"
git push origin main
```

### Étape 2 : Connecter à Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur **"Add New Project"**
4. Importez le repository `web2_final_edh`
5. Sélectionnez la branche `main`

### Étape 3 : Configurer les variables d'environnement

Dans l'interface Vercel, avant le déploiement :

1. Allez dans **Environment Variables**
2. Ajoutez ces variables :
   - `VITE_SUPABASE_URL` = URL de votre projet Supabase
   - `VITE_SUPABASE_ANON_KEY` = Clé anon de Supabase

Ou utilisez la CLI Vercel :

```bash
npm i -g vercel
vercel
# Suivez les instructions et ajoutez les variables
```

### Étape 4 : Déployer

Cliquez sur **"Deploy"** dans l'interface Vercel.

L'application sera disponible sur `https://votre-projet.vercel.app`

---

## 4. Configuration Post-Déploiement

### Ajouter l'URL de Vercel dans Supabase

1. Allez dans Supabase → **Authentication** → **URL Configuration**
2. Dans **Site URL**, ajoutez : `https://votre-projet.vercel.app`
3. Dans **Redirect URLs**, ajoutez :
   - `https://votre-projet.vercel.app/login`
   - `https://votre-projet.vercel.app/callback`

---

## 5. Structure de la Base de Données

### Tables créées :

- **profiles** : Profils utilisateurs avec rôles (admin, agent, chef-technicien, technicien, client)
- **pannes** : Gestion des pannes signalées
- **interventions** : Suivi des interventions techniques
- **notifications** : Système de notifications
- **commentaires** : Commentaires sur les pannes
- **pieces_jointes** : Fichiers joints aux pannes/interventions

### Rôles utilisateurs :

- **admin** : Accès complet, gestion des utilisateurs
- **agent** : Réception et assignation des pannes
- **chef-technicien** : Supervision des interventions
- **technicien** : Exécution des interventions
- **client** : Signalement des pannes

---

## Commandes utiles

```bash
# Lancer en local
npm run dev

# Build pour production
npm run build

# Preview local du build
npm run preview

# Analyser le build
npm run build:analyze

# Déployer sur Vercel
vercel --prod
```

## Variables d'environnement requises sur Vercel

| Variable | Valeur | Description |
|----------|--------|-------------|
| `VITE_SUPABASE_URL` | URL de votre projet Supabase | Connexion à la base de données |
| `VITE_SUPABASE_ANON_KEY` | Clé publique Supabase | Authentification client |
| `VITE_BASE_PATH` | `/edh-gestion-pannes/` | Chemin de base pour les assets |
| `NODE_ENV` | `production` | Mode production |

## Configuration Vercel

Le fichier `vercel.json` inclut :
- ✅ Cache optimisé pour les assets statiques
- ✅ Headers de sécurité
- ✅ SPA routing (toutes les routes vers index.html)
- ✅ Support API routes
- ✅ URLs propres (cleanUrls)
- ✅ Build optimisé

## SEO et Performance

- `robots.txt` configuré pour l'indexation
- `sitemap.xml` pour les moteurs de recherche
- Headers de cache pour les assets statiques
- Compression et optimisation automatique Vercel

---

## Support

En cas de problème :

- Documentation Supabase : https://supabase.com/docs
- Documentation Vercel : https://vercel.com/docs
- Documentation React : https://react.dev
