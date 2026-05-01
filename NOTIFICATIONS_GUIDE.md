# 📢 Système de Notifications en Temps Réel - Guide d'Intégration

## 🎯 Vue d'ensemble

Ce système permet à **tous les utilisateurs connectés** de recevoir des notifications en temps réel lorsque de nouvelles données sont ajoutées (pannes, interventions, factures, etc.).

## 🏗️ Architecture

```
Frontend (React)
├── NotificationService (WebSocket)
├── NotificationContext (State Management)
├── useNotifications Hook
└── NotificationPopover (UI)
       ↓
WebSocket Server (Node.js)
       ↓
Database (Stockage des notifications)
```

## 📦 Fichiers créés

### Frontend

1. **`src/app/services/notificationService.ts`**
   - Gère la connexion WebSocket
   - Reconnexion automatique
   - Gestion des événements

2. **`src/app/contexts/NotificationContext.tsx`**
   - Provider React pour les notifications
   - State global des notifications
   - Méthodes pour gérer les notifications

3. **`src/app/hooks/useNotification.ts`**
   - Hook `useNotifications()` - Accès aux notifications
   - Hook `useNotificationsByType()` - Filtrer par type
   - Hook `useUnreadNotifications()` - Notifications non lues
   - Hook `useNewNotifications()` - Dernières notifications
   - Hook `useNotificationStats()` - Statistiques

4. **`src/app/components/NotificationPopover.tsx`**
   - Affichage du popover de notifications
   - Liste des 5 dernières notifications
   - Actions (marquer comme lu, supprimer)

5. **`src/app/components/NotificationTester.tsx`**
   - Composant de test pour développement

### Backend

6. **`SERVER_SETUP.md`**
   - Guide de configuration du serveur WebSocket
   - Exemples avec Express + WS
   - Exemples avec Socket.io

## 🚀 Étapes d'intégration

### Étape 1 : Envelopper l'App avec le Provider

Modifier `src/main.tsx`:

```tsx
import { NotificationProvider } from "./app/contexts/NotificationContext";

const root = createRoot(document.getElementById("root")!);

root.render(
  <NotificationProvider
    userId="user-123" // À récupérer de votre système d'authentification
    userRole="admin" // À récupérer de votre système d'authentification
  >
    <App />
  </NotificationProvider>,
);
```

### Étape 2 : Configurer le serveur WebSocket

Suivez le guide dans `SERVER_SETUP.md` pour configurer un serveur WebSocket:

- Option 1: Express + WS (simple)
- Option 2: Socket.io (recommandé)

### Étape 3 : Utiliser les notifications dans les composants

```tsx
import { useNotifications } from "../contexts/NotificationContext";

export function MyComponent() {
  const {
    notifications, // Toutes les notifications
    unreadCount, // Nombre de non lues
    markAsRead, // Marquer comme lu
    deleteNotification, // Supprimer
  } = useNotifications();

  return (
    <div>
      <p>Notifications non lues: {unreadCount}</p>
      {/* Afficher vos notifications */}
    </div>
  );
}
```

### Étape 4 : Envoyer des notifications du backend

Quand un événement important se produit (nouvelle panne, intervention, facture):

```javascript
// Depuis votre API backend
POST /api/notifications
{
  "type": "panne",
  "title": "Nouvelle panne signalée",
  "message": "Une panne a été signalée à Cité Militaire",
  "roleTarget": ["admin", "technicien", "chef-technicien"]  // Optionnel
}
```

## 🎨 Types de notifications

- `panne` - Problèmes et défaillances
- `intervention` - Tâches et interventions
- `facture` - Facturation et paiements
- `system` - Système et mises à jour
- `client` - Communications clients

## 🔌 Hooks disponibles

### `useNotifications()`

```tsx
const {
  notifications,
  unreadCount,
  isConnected,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
} = useNotifications();
```

### `useNotificationsByType(type)`

```tsx
const pannes = useNotificationsByType("panne");
```

### `useUnreadNotifications()`

```tsx
const unread = useUnreadNotifications();
```

### `useNewNotifications()`

```tsx
const new = useNewNotifications(); // Les 5 plus récentes
```

### `useNotificationStats()`

```tsx
const stats = useNotificationStats();
// stats.total, stats.unread, stats.pannes, stats.isConnected...
```

## 🔒 Sécurité

- Les notifications sont filtrées par rôle côté serveur
- Les utilisateurs ne reçoivent que les notifications destinées à leur rôle
- Authentification requise pour la connexion WebSocket
- Les tokens peuvent être validés du côté serveur

## 🧪 Test

1. Importer le testeur dans une page:

```tsx
import { NotificationTester } from "../components/NotificationTester";
```

2. Utiliser le formulaire pour envoyer des notifications de test

## 📊 Bonnes pratiques

1. **Reconnexion automatique** - Déjà implémentée (5 tentatives max)
2. **Gestion de la mémoire** - Limiter l'historique à 100 notifications
3. **Performance** - Les notifications ne se rechargent que si modifiées
4. **Accessibilité** - Les toasts et badges sont bien visibles
5. **UX** - Badge avec compteur sur l'icône de notification

## 🐛 Dépannage

### Les notifications ne s'affichent pas

- Vérifier que le serveur WebSocket est en cours d'exécution
- Vérifier la console pour les erreurs
- Vérifier l'URL WebSocket dans `notificationService.ts`

### Les connexions se déconnectent

- Vérifier les logs du serveur
- Augmenter la reconnexion dans `notificationService.ts`
- Vérifier les paramètres CORS

### Les notifications ne sont pas en temps réel

- Vérifier que les deux clients reçoivent les mêmes notifications
- Vérifier les logs du serveur
- S'assurer que les messages JSON sont corrects

## 📚 Ressources supplémentaires

- [MDN WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Socket.io Documentation](https://socket.io/docs/)
- [Express WS](https://github.com/HenningM/express-ws)

## 📋 Checklist de déploiement

- [ ] Serveur WebSocket configuré et testé
- [ ] Variables d'environnement définies
- [ ] NotificationProvider ajouté à App
- [ ] Tests des notifications en production
- [ ] Gestion des déconnexions et reconnexions
- [ ] Monitoring et logs configurés
