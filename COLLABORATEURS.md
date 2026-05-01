# Guide des Collaborateurs - EDH Zero Papier

## 🚀 Instructions pour commencer

### 1. Cloner le repository
```bash
git clone https://github.com/jeremiechristopher11-svg/projet_final_WebDesign2.git
cd projet_final_WebDesign2
```

### 2. Installer et lancer
```bash
npm install
npm run dev
```

### 3. Basculer sur TA branche

#### Pour **Marithza** (Admin/Pannes/Interventions)
```bash
git checkout marithza
```
**Tes fichiers :**
- `src/pages/admin/Dashboard.jsx` - Dashboard Admin avec KPIs
- `src/pages/GestionPannes.jsx` - Gestion des pannes (CRUD)
- `src/pages/GestionInterventions.jsx` - Interventions + assignation
- `src/pages/Notifications.jsx` - Système de notifications

---

#### Pour **Narcisse** (Clients/Factures/Utilisateurs)
```bash
git checkout narcisse
```
**Tes fichiers :**
- `src/pages/GestionClients.jsx` - CRUD Clients
- `src/pages/Factures.jsx` - Gestion des factures
- `src/pages/GestionUtilisateurs.jsx` - Gestion utilisateurs + rôles
- `src/pages/agent/Dashboard.jsx` - Dashboard Agent

---

#### Pour **Enriquez** (Espace Client/Techniciens)
```bash
git checkout enriquez
```
**Tes fichiers :**
- `src/pages/client/EspaceClient.jsx` - Espace Client complet
- `src/pages/technicien/Dashboard.jsx` - Dashboard Technicien
- `src/pages/chef-technicien/Dashboard.jsx` - Dashboard Chef-tech
- `src/pages/PlanificationTravaux.jsx` - Planning calendrier

---

#### Pour **Christopher** (Chef - Toi)
```bash
git checkout christopher
```
**Tes fichiers :**
- `src/routes.jsx` - Routes
- `src/components/DashboardLayout.jsx` - Layout
- `src/components/ui.jsx` - Composants UI
- `src/components/StatusBadge.jsx` - Badge statut
- `src/pages/Login.jsx` - Login
- `src/main.jsx` - Entry point

---

## 📝 Workflow Git

### Pendant le développement
```bash
# Voir les fichiers modifiés
git status

# Ajouter tes changements
git add src/pages/TonFichier.jsx

# Commiter
git commit -m "feat: ajout de la gestion des X"

# Pusher sur ta branche
git push origin NOM_BRANCHE
```

### Quand tu as terminé une feature
1. Pusher ta branche sur GitHub
2. Créer une **Pull Request** vers `structure-initiale`
3. Demander à Christopher de review
4. Christopher merge après validation

---

## 🎯 Règles à suivre

1. **Ne jamais commit sur `main`** - Toujours sur ta branche perso
2. **Ne pas modifier les fichiers des autres** - Sauf accord
3. **Commenter ton code** - `// TODO: expliquer ce que fait cette fonction`
4. **Utiliser les couleurs EDH** :
   - Orange : `#F5A623`
   - Bleu foncé : `#1A3A5C`
   - Bleu clair : `#5B9BD5`
   - Vert : `#4CAF50`

---

## 🆘 Besoin d'aide ?

1. Vérifier le fichier `TASKS.md` pour plus de détails
2. Regarder les commentaires `// TODO` dans tes fichiers
3. Contacter Christopher sur WhatsApp/Discord
4. Créer une issue GitHub si bug

---

**Bon courage !** 🚀
