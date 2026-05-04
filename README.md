# EDH Zero Papier - Projet Final Web2

## 📋 Description du Projet

EDH Zero Papier est une application web moderne conçue pour la gestion numérique des documents et interventions. Ce projet a été développé dans le cadre du cours Web2 et utilise les technologies les plus récentes pour offrir une expérience utilisateur optimale.

## 🚀 Technologies Utilisées

### Frontend
- **React 18.3.1** - Framework principal
- **Vite 6.3.5** - Outil de build et développement
- **TailwindCSS 4.1.12** - Framework CSS
- **Material-UI 7.3.5** - Bibliothèque de composants
- **Radix UI** - Composants accessibles
- **React Router 7.13.0** - Gestion des routes
- **React Hook Form 7.55.0** - Gestion des formulaires

### Backend & Base de Données
- **Supabase** - Base de données et authentification
- **@supabase/supabase-js 2.105.1** - Client Supabase

### Déploiement
- **Vercel** - Hébergement et déploiement continu
- **URL de production**: https://zeropapier2.vercel.app

## 👥 Équipe et Contributions

### 📊 Répartition des Tâches

| Membre | Branche Git | Contributions Principales | Fichiers Modifiés |
|--------|-------------|--------------------------|-------------------|
| **Marithza Pierre** | `Marithza` | Composant StatusBadge, GestionIntervention | StatusBadge.jsx, StatusBadge.css, GestionIntervention.jsx, GestionIntervention.css |
| **Christopher Jérémie** | `christopher` | Page PlanificationTravaux, Configuration initiale | PlanificationTravaux.jsx, PlanificationTravaux.css |
| **Henriquez** | `henriquez` | GestionIntervention (merge), Intégration | GestionIntervention.jsx, GestionIntervention.css |
| **Jean Narcisse** | `feature/Narcisse-Jean` | Documentation README, Formatage | README.md |
| **Jérémie Christopher** | `main/principal` | Configuration Supabase, Déploiement Vercel, Fixes critiques | supabase.js, vercel.json, vite.config.js |

### 🔄 Historique des Commits Principaux

- **423d59f1** - Merge final pull request #7 (principal → main)
- **bb22fdc4** - Fix configuration Supabase (format clé sb_publishable)
- **80c2a686** - Fix crash next-themes/Sonner
- **aa882329** - Fix X-Frame-Options pour Vercel preview
- **f7f4c569** - Build validé localement
- **08463a36** - Configuration Supabase et Vercel + documentation

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou pnpm
- Git

### Étapes d'Installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/jeremiechristopher11-svg/web2_final_edh.git
cd web2_final_edh
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env.local
# Configurer les variables Supabase dans .env.local
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173` (ou port suivant si 5173 est occupé)

## 📁 Structure du Projet

```
web2_final_edh/
├── public/                 # Fichiers statiques
├── src/
│   ├── app/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── imports/      # Imports partagés
│   │   └── lib/           # Utilitaires et configuration
│   ├── main.jsx           # Point d'entrée React
│   └── styles/            # Styles globaux
├── supabase/              # Configuration Supabase
├── .env.example          # Variables d'environnement exemple
├── .env.production       # Variables de production
├── vercel.json          # Configuration Vercel
├── vite.config.js       # Configuration Vite
└── package.json         # Dépendances du projet
```

## 🔧 Scripts Disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser le build de production
- `npm run build:analyze` - Analyser le build

## 🌐 Déploiement

### Production
Le projet est déployé sur Vercel : https://zeropapier2.vercel.app

### Configuration de Déploiement
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x
- **Environment Variables**: Configurées dans Vercel

## 🔐 Configuration Supabase

Le projet utilise Supabase pour la base de données et l'authentification. Les variables d'environnement nécessaires :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon
VITE_SUPABASE_SERVICE_ROLE_KEY=votre_cle_service
```

## 🐛 Résolution de Problèmes

### Problèmes Connus et Solutions

1. **Crash avec next-themes**
   - **Problème**: Conflit avec Sonner causant des erreurs removeChild
   - **Solution**: next-themes a été retiré des dépendances Sonner

2. **X-Frame-Options**
   - **Problème**: DENY bloquait les previews Vercel
   - **Solution**: Changé en SAMEORIGIN pour compatibilité

3. **Configuration Base Path**
   - **Problème**: Routes incorrectes en production
   - **Solution**: Configuration dans vite.config.js et vercel.json

## 📝 Notes pour le Professeur

### Points Techniques Importants
- **Architecture React moderne** avec hooks et composants fonctionnels
- **Gestion d'état** avec React Hook Form
- **Design System** avec Material-UI et Radix UI
- **Styling** avec TailwindCSS pour un design responsive
- **Base de données** temps réel avec Supabase
- **Déploiement continu** avec Vercel
- **Git workflow** avec branches par développeur

### Qualité du Code
- **Code review** via Pull Requests
- **Tests** de build et déploiement automatiques
- **Documentation** complète du projet
- **Configuration** environnementale sécurisée

### Performance
- **Build optimisé** avec Vite
- **Lazy loading** des composants
- **Bundle size** optimisé
- **CDN** via Vercel

## 📞 Contact

Pour toute question concernant ce projet, vous pouvez contacter l'équipe de développement via GitHub Issues ou par email.

---

**Projet réalisé dans le cadre du cours Web2 - Session Printemps 2026**
