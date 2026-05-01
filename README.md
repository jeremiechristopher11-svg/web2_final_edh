# EDH - Système de Gestion des Pannes et Interventions

## 🎯 Vue d'ensemble

Application web pour la gestion des pannes, interventions, et maintenance dans le secteur de l'électricité.

**Version actuelle :** 1.0 (Sans espace client - v2 en développement)

## 👥 Équipe de Développement

| Collaborateur   | Branche              | Responsabilité                         |
| --------------- | -------------------- | -------------------------------------- |
| **Marithza**    | `marithza`           | Gestion des pannes et interventions    |
| **Christopher** | `christopher`        | Système de notifications en temps réel |
| **Enriquez**    | `enriquez`           | Gestion des clients et factures        |
| **Narcisse**    | `narcisse`           | Dashboards administrateur et agent     |
| **Structure**   | `structure-initiale` | Configuration et architecture de base  |

## 🏗️ Architecture du Projet

```
projet_final_WebDesign2/
├── src/
│   ├── app/
│   │   ├── components/     # Composants React réutilisables
│   │   ├── contexts/       # Contexts React (Auth, Notifications)
│   │   ├── hooks/          # Hooks personnalisés
│   │   ├── pages/          # Pages de l'application
│   │   │   ├── admin/      # Dashboard Admin
│   │   │   ├── agent/      # Dashboard Agent
│   │   │   ├── chef-technicien/  # Dashboard Chef Technicien
│   │   │   ├── client/     # Espace Client (⚠️ VERSION 2 UNIQUEMENT)
│   │   │   └── technicien/ # Dashboard Technicien
│   │   └── services/       # Services API et WebSocket
│   ├── imports/            # Images et assets
│   └── styles/             # Fichiers CSS
├── public/                 # Fichiers statiques
└── docs/                   # Documentation
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/jeremiechristopher11-svg/projet_final_WebDesign2.git

# 2. Se positionner sur votre branche
git checkout marithza  # ou christopher, enriquez, narcisse, structure-initiale

# 3. Installer les dépendances
npm install

# 4. Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📋 Documentation

- **[COLLABORATORS.md](./COLLABORATORS.md)** - Tâches détaillées pour chaque collaborateur
- **[NOTIFICATIONS_GUIDE.md](./NOTIFICATIONS_GUIDE.md)** - Guide du système de notifications
- **[SERVER_SETUP.md](./SERVER_SETUP.md)** - Configuration du serveur WebSocket
- **[guidelines/Guidelines.md](./guidelines/Guidelines.md)** - Guidelines de développement

## 🔄 Workflow de Collaboration

1. **Toujours travailler sur votre branche personnelle**

   ```bash
   git checkout marithza  # Votre branche
   git pull origin marithza
   ```

2. **Créer des fichiers dans la structure existante**
   - Les fichiers vides sont déjà créés avec les bons noms
   - Remplir uniquement les fichiers de votre domaine

3. **Commits réguliers**

   ```bash
   git add .
   git commit -m "[marithza] Ajout gestion pannes - formulaire création"
   git push origin marithza
   ```

4. **Pull Requests vers main**
   - Quand une fonctionnalité est terminée, créer une PR vers `main`
   - Attendre la validation avant merge

## ⚠️ IMPORTANT - Fonctionnalité Client

**L'espace client (`src/app/pages/client/`) est RÉSERVÉ pour la Version 2.**

Ne pas développer dans ce dossier pour l'instant. Priorité aux fonctionnalités internes :

- Admin
- Agent
- Chef-technicien
- Technicien

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Composants UI
- **WebSocket** - Notifications temps réel
- **React Router** - Navigation

## 📞 Support

Pour toute question sur :

- Les tâches assignées → Voir [COLLABORATORS.md](./COLLABORATORS.md)
- Les notifications → Voir [NOTIFICATIONS_GUIDE.md](./NOTIFICATIONS_GUIDE.md)
- Le serveur → Voir [SERVER_SETUP.md](./SERVER_SETUP.md)

---

**Projet EDH - Gestion des Pannes et Interventions**
