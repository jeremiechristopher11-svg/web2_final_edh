# Répartition des tâches - EDH Zero Papier

## Équipe de 4 personnes

---

## 👤 Personne 1 : Chef de projet (Toi)
**Responsabilité** : Architecture, composants partagés, intégration

### Fichiers à implémenter :
| Fichier | Description | Priorité |
|---------|-------------|----------|
| `src/routes.jsx` | Configuration des routes | 🔴 Haute |
| `src/components/DashboardLayout.jsx` | Layout avec sidebar/navigation | 🔴 Haute |
| `src/components/StatusBadge.jsx` | Badge de statut réutilisable | 🔴 Haute |
| `src/components/ui.jsx` | Composants UI (shadcn-style) | 🔴 Haute |
| `src/pages/Login.jsx` | Page de connexion | 🔴 Haute |
| `src/main.jsx` | Point d'entrée React | 🔴 Haute |

### Livrables attendus :
- [ ] Navigation fonctionnelle entre les pages
- [ ] Authentification (mock avec localStorage)
- [ ] Layout responsive avec menu sidebar
- [ ] Composants UI réutilisables (Button, Card, Table, etc.)

---

## 👤 Personne 2 : Développeur Backend-Admin
**Responsabilité** : Modules Admin et Gestion des Pannes/Interventions

### Fichiers à implémenter :
| Fichier | Description | Priorité |
|---------|-------------|----------|
| `src/pages/admin/Dashboard.jsx` | Dashboard Admin avec stats | 🔴 Haute |
| `src/pages/GestionPannes.jsx` | CRUD Pannes + filtrage | 🔴 Haute |
| `src/pages/GestionInterventions.jsx` | CRUD Interventions | 🔴 Haute |
| `src/pages/Notifications.jsx` | Système de notifications | 🟡 Moyenne |

### Livrables attendus :
- [ ] Dashboard avec graphiques (recharts)
- [ ] Liste des pannes avec filtrage (search + statut)
- [ ] Formulaire ajout/modification de panne
- [ ] Liste des interventions assignées
- [ ] Système de notifications (toast + badge)

**Mock data à utiliser** : `mockPannes`, `mockInterventions`

---

## 👤 Personne 3 : Développeur Gestion & Facturation
**Responsabilité** : Clients, Factures, Agent

### Fichiers à implémenter :
| Fichier | Description | Priorité |
|---------|-------------|----------|
| `src/pages/GestionClients.jsx` | CRUD Clients | 🔴 Haute |
| `src/pages/Factures.jsx` | Gestion des factures | 🔴 Haute |
| `src/pages/GestionUtilisateurs.jsx` | Gestion des utilisateurs | 🔴 Haute |
| `src/pages/agent/Dashboard.jsx` | Dashboard Agent | 🟡 Moyenne |

### Livrables attendus :
- [ ] Liste des clients avec recherche
- [ ] Formulaire ajout/modification client
- [ ] Liste des factures (payées/en attente)
- [ ] Génération/visualisation de facture
- [ ] CRUD utilisateurs (admin/agent/technicien/client)
- [ ] Dashboard Agent avec stats rapides

**Mock data à utiliser** : `mockClients`, `mockFactures`, `mockUsers`

---

## 👤 Personne 4 : Développeur Espace Client & Techniciens
**Responsabilité** : Espace Client, Technicien, Chef-technicien, Planification

### Fichiers à implémenter :
| Fichier | Description | Priorité |
|---------|-------------|----------|
| `src/pages/client/EspaceClient.jsx` | Espace client complet | 🔴 Haute |
| `src/pages/technicien/Dashboard.jsx` | Dashboard Technicien | 🔴 Haute |
| `src/pages/chef-technicien/Dashboard.jsx` | Dashboard Chef-technicien | 🟡 Moyenne |
| `src/pages/PlanificationTravaux.jsx` | Planification calendrier | 🟡 Moyenne |

### Livrables attendus :
- [ ] Espace client avec :
  - [ ] Consultation des factures
  - [ ] Historique des pannes
  - [ ] Déclaration de nouvelle panne
- [ ] Dashboard Technicien avec :
  - [ ] Liste des interventions assignées
  - [ ] Formulaire mise à jour statut
- [ ] Dashboard Chef-technicien avec :
  - [ ] Vue d'équipe
  - [ ] Assignation des techniciens
- [ ] Planification calendrier des travaux

**Mock data à utiliser** : `mockClientData`, `mockTechnicienTasks`, `mockPlanning`

---

## 🔄 Flux de travail Git

### Branches :
```
main                    ← Branche stable (merge validé par toi)
  ├── structure-initiale ← Structure vides (déjà poussée)
  ├── dev               ← Branche de développement commun
  ├── feature/pannes      ← Personne 2
  ├── feature/clients   ← Personne 3
  └── feature/espace-client ← Personne 4
```

### Workflow :
1. Chaque personne crée sa branche `feature/xxx` depuis `structure-initiale`
2. Développement sur sa branche
3. Pull Request vers `dev` pour review
4. Toi merges dans `dev` puis `main`

---

## 📝 Conventions de code

### Imports standard :
```jsx
import { useState } from 'react'
import { Button, Card, Input, Table } from '../components/ui'
import { toast } from '../components/ui'
import { Plus, Search, Edit, Trash } from 'lucide-react'
```

### Structure d'une page :
```jsx
export function NomDuComposant() {
  // 1. State
  const [data, setData] = useState([])
  
  // 2. Fonctions handlers
  const handleSubmit = () => { ... }
  
  // 3. Render
  return (
    <div className="space-y-6">
      <h1>Titre</h1>
      {/* Contenu */}
    </div>
  )
}
```

### Couleurs EDH :
- Orange primaire : `#F5A623`
- Bleu foncé : `#1A3A5C`
- Bleu clair : `#5B9BD5`
- Vert succès : `#4CAF50`
- Gris texte : `#6B7280`

---

## 📅 Planning suggéré

| Semaine | Objectif |
|---------|----------|
| Semaine 1 | Structure + Composants partagés (Personne 1) |
| Semaine 2 | Modules Admin/Pannes (Personne 2) |
| Semaine 3 | Clients/Factures (Personne 3) |
| Semaine 4 | Espace Client/Techniciens (Personne 4) |
| Semaine 5 | Tests, corrections, intégration finale |

---

## 🆘 Support

- **Questions techniques** : Créer une issue GitHub
- **Merge conflicts** : Demander au chef de projet
- **Composants manquants** : Demander à Personne 1

---

*Dernière mise à jour : $(Get-Date -Format "yyyy-MM-dd")*
