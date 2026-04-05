/\*\*

- Configuration pour implémenter le serveur WebSocket
-
- Ce fichier documente comment configurer un serveur WebSocket
- pour gérer les notifications en temps réel.
-
- TECHNOLOGIES RECOMMANDÉES:
- - Node.js avec Express + ws (simple)
- - Socket.io (plus robuste avec reconnexion automatique)
- - Django Channels (si vous utilisez Django)
- - FastAPI + WebSockets (si vous utilisez Python)
    \*/

/\*\*

- EXEMPLE AVEC EXPRESS + WS (Node.js)
-
- Installation:
- npm install express ws cors dotenv
-
- Code serveur (server.js):
  \*/

const exampleExpressServer = `
import express from 'express';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Créer le serveur HTTP
const server = app.listen(PORT, () => {
console.log('✅ Serveur actif sur http://localhost:\${PORT}');
});

// Créer le serveur WebSocket
const wss = new WebSocket.Server({ server });

// Stocker les connexions actives des utilisateurs
const userConnections = new Map();

// Événement de connexion
wss.on('connection', (ws) => {
console.log('🔗 Nouvel utilisateur connecté');

ws.on('message', (message) => {
try {
const data = JSON.parse(message);

      // Authentification
      if (data.type === 'auth') {
        const userId = data.userId;
        const userRole = data.userRole;

        if (!userConnections.has(userId)) {
          userConnections.set(userId, {
            ws,
            userId,
            userRole,
            connectedAt: new Date(),
          });
        }

        console.log(\`👤 Utilisateur \${userId} (\${userRole}) authentifié\`);
      }

      // Marquer comme lu
      if (data.type === 'mark_read') {
        // Implémenter la logique de base de données
        console.log(\`✅ Notification \${data.notificationId} marquée comme lue\`);
      }

      // Supprimer
      if (data.type === 'delete') {
        // Implémenter la logique de base de données
        console.log(\`🗑️ Notification \${data.notificationId} supprimée\`);
      }
    } catch (error) {
      console.error('❌ Erreur lors du traitement du message:', error);
    }

});

ws.on('close', () => {
// Trouver et supprimer l'utilisateur
for (const [userId, userInfo] of userConnections.entries()) {
if (userInfo.ws === ws) {
userConnections.delete(userId);
console.log(\`👤 Utilisateur \${userId} déconnecté\`);
break;
}
}
});

ws.on('error', (error) => {
console.error('❌ Erreur WebSocket:', error);
});
});

// Route API pour envoyer une notification à tous les utilisateurs
app.post('/api/notifications', (req, res) => {
const { type, title, message, roleTarget } = req.body;

if (!type || !title || !message) {
return res.status(400).json({ error: 'Données manquantes' });
}

const notification = {
id: Date.now().toString(),
type,
title,
message,
timestamp: new Date().toLocaleTimeString('fr-FR'),
read: false,
createdAt: new Date(),
roleTarget: roleTarget || [], // Si vide, tous les utilisateurs reçoivent
};

// Envoyer la notification à tous les utilisateurs connectés
let count = 0;
for (const [userId, userInfo] of userConnections.entries()) {
// Vérifier si l'utilisateur doit recevoir cette notification
if (roleTarget.length === 0 || roleTarget.includes(userInfo.userRole)) {
if (userInfo.ws.readyState === WebSocket.OPEN) {
userInfo.ws.send(JSON.stringify(notification));
count++;
}
}
}

console.log(\`📢 Notification envoyée à \${count} utilisateur(s)\`);
res.json({ success: true, sentTo: count, notification });
});

// Route pour obtenir les statistiques
app.get('/api/stats', (req, res) => {
res.json({
activeUsers: userConnections.size,
users: Array.from(userConnections.entries()).map(([userId, info]) => ({
userId,
role: info.userRole,
connectedAt: info.connectedAt,
})),
});
});
`;

/\*\*

- EXEMPLE AVEC SOCKET.IO (Plus recommandé)
-
- Installation:
- npm install express socket.io cors dotenv
-
- Code serveur (server.js):
  \*/

const exampleSocketIOServer = `
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
cors: {
origin: process.env.CLIENT_URL || 'http://localhost:5173',
methods: ['GET', 'POST'],
credentials: true,
},
});

const PORT = process.env.PORT || 3000;

// Stocker les utilisateurs connectés
const connectedUsers = new Map();

// Événements Socket.io
io.on('connection', (socket) => {
console.log('🔗 Utilisateur connecté:', socket.id);

socket.on('auth', (data) => {
const { userId, userRole } = data;

    connectedUsers.set(socket.id, {
      userId,
      userRole,
      socketId: socket.id,
    });

    // Joindre une room pour les notifications par rôle
    socket.join(\`role:\${userRole}\`);
    socket.join('all-users');

    console.log(\`👤 \${userId} (\${userRole}) authentifié\`);

});

socket.on('mark_read', (notificationId) => {
console.log(\`✅ Notification marquée comme lue: \${notificationId}\`);
// Implémenter la logique de base de données
});

socket.on('delete', (notificationId) => {
console.log(\`🗑️ Notification supprimée: \${notificationId}\`);
// Implémenter la logique de base de données
});

socket.on('disconnect', () => {
connectedUsers.delete(socket.id);
console.log('👤 Utilisateur déconnecté:', socket.id);
});
});

// Route pour envoyer une notification
app.post('/api/notifications', (req, res) => {
const { type, title, message, roleTarget } = req.body;

if (!type || !title || !message) {
return res.status(400).json({ error: 'Données manquantes' });
}

const notification = {
id: Date.now().toString(),
type,
title,
message,
timestamp: new Date().toLocaleTimeString('fr-FR'),
read: false,
createdAt: new Date(),
};

// Envoyer à tous ou à un rôle spécifique
if (roleTarget && roleTarget.length > 0) {
roleTarget.forEach((role) => {
io.to(\`role:\${role}\`).emit('notification', notification);
});
} else {
// Envoyer à tous
io.to('all-users').emit('notification', notification);
}

console.log(\`📢 Notification envoyée\`);
res.json({ success: true, notification });
});

// Route des statistiques
app.get('/api/stats', (req, res) => {
res.json({
activeUsers: connectedUsers.size,
users: Array.from(connectedUsers.values()),
});
});

server.listen(PORT, () => {
console.log(\`✅ Serveur actif sur http://localhost:\${PORT}\`);
});
`;

/\*\*

- CONFIGURATION DU CLIENT
-
- Le client est déjà configuré avec:
- - NotificationService (src/app/services/notificationService.ts)
- - NotificationContext (src/app/contexts/NotificationContext.tsx)
- - Hooks personnalisés (src/app/hooks/useNotification.ts)
-
- Pour utiliser:
-
- 1.  Envelopper l'app avec NotificationProvider:
-
- <NotificationProvider userId={currentUser.id} userRole={currentUser.role}>
- <App />
- </NotificationProvider>
-
- 2.  Utiliser le hook dans les composants:
-
- const { notifications, unreadCount, markAsRead } = useNotifications();
  \*/

/\*\*

- VARIABLES D'ENVIRONNEMENT
-
- .env:
- PORT=3000
- NODE_ENV=development
- CLIENT_URL=http://localhost:5173
- DATABASE_URL=your_database_url
  \*/

/\*\*

- EXEMPLES D'ENVOI DE NOTIFICATIONS
-
- POST /api/notifications
-
- // Envoyer à tous
- {
- "type": "panne",
- "title": "Nouvelle panne signalée",
- "message": "Une panne a été signalée à Cité Militaire"
- }
-
- // Envoyer à des rôles spécifiques
- {
- "type": "intervention",
- "title": "Intervention assignée",
- "message": "Une nouvelle intervention vous a été assignée",
- "roleTarget": ["technicien", "chef-technicien"]
- }
  \*/

export { exampleExpressServer, exampleSocketIOServer };
