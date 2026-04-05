/**
 * Service de notifications en temps réel
 * Utilise WebSocket pour communiquer avec le serveur
 */

export type NotificationType =
  | "panne"
  | "intervention"
  | "facture"
  | "system"
  | "client";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  createdAt: Date;
  userId?: string;
  roleTarget?: string[]; // Rôles ciblés par cette notification
}

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  message: string;
  roleTarget?: string[]; // Si vide, tous les utilisateurs reçoivent la notification
}

type NotificationListener = (notification: Notification) => void;
type ConnectionListener = (connected: boolean) => void;

class NotificationService {
  private ws: WebSocket | null = null;
  private listeners: Set<NotificationListener> = new Set();
  private connectionListeners: Set<ConnectionListener> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private wsUrl: string;
  private userId: string | null = null;
  private userRole: string | null = null;

  constructor() {
    // Déterminer l'URL WebSocket basée sur l'environnement
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    this.wsUrl = `${protocol}//${host}/ws/notifications`;
  }

  /**
   * Initialiser la connexion WebSocket
   */
  public connect(userId: string, userRole: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        resolve();
        return;
      }

      this.userId = userId;
      this.userRole = userRole;

      try {
        this.ws = new WebSocket(this.wsUrl);

        this.ws.onopen = () => {
          console.log("✅ Connecté au service de notifications");
          this.reconnectAttempts = 0;

          // Envoyer les infos utilisateur au serveur
          this.sendMessage({
            type: "auth",
            userId: this.userId,
            userRole: this.userRole,
          });

          this.notifyConnectionListeners(true);
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const notification = JSON.parse(event.data) as Notification;
            notification.createdAt = new Date(notification.createdAt);
            this.notifyListeners(notification);
          } catch (error) {
            console.error("Erreur lors du parsing du message:", error);
          }
        };

        this.ws.onerror = (error) => {
          console.error("❌ Erreur WebSocket:", error);
          this.notifyConnectionListeners(false);
          reject(error);
        };

        this.ws.onclose = () => {
          console.warn("⚠️ Connexion WebSocket fermée");
          this.notifyConnectionListeners(false);
          this.attemptReconnect();
        };
      } catch (error) {
        console.error("❌ Erreur lors de la connexion WebSocket:", error);
        reject(error);
      }
    });
  }

  /**
   * Essayer de se reconnecter automatiquement
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;
      console.log(
        `🔄 Tentative de reconnexion dans ${delay}ms (${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
      );

      setTimeout(() => {
        if (this.userId && this.userRole) {
          this.connect(this.userId, this.userRole).catch(() => {
            // Continuer les tentatives
          });
        }
      }, delay);
    } else {
      console.error(
        "❌ Impossible de se reconnecter après plusieurs tentatives",
      );
    }
  }

  /**
   * Envoyer un message au serveur
   */
  private sendMessage(data: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ WebSocket non connectée");
    }
  }

  /**
   * S'abonner aux notifications
   */
  public subscribe(listener: NotificationListener): () => void {
    this.listeners.add(listener);

    // Retourner une fonction de désabonnement
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * S'abonner aux changements de connexion
   */
  public subscribeToConnectionStatus(listener: ConnectionListener): () => void {
    this.connectionListeners.add(listener);
    return () => {
      this.connectionListeners.delete(listener);
    };
  }

  /**
   * Notifier tous les listeners d'une notification
   */
  private notifyListeners(notification: Notification): void {
    this.listeners.forEach((listener) => {
      try {
        listener(notification);
      } catch (error) {
        console.error("Erreur dans le listener de notification:", error);
      }
    });
  }

  /**
   * Notifier tous les listeners du changement de connexion
   */
  private notifyConnectionListeners(connected: boolean): void {
    this.connectionListeners.forEach((listener) => {
      try {
        listener(connected);
      } catch (error) {
        console.error("Erreur dans le listener de connexion:", error);
      }
    });
  }

  /**
   * Marquer une notification comme lue
   */
  public markAsRead(notificationId: string): void {
    this.sendMessage({
      type: "mark_read",
      notificationId,
    });
  }

  /**
   * Supprimer une notification
   */
  public deleteNotification(notificationId: string): void {
    this.sendMessage({
      type: "delete",
      notificationId,
    });
  }

  /**
   * Obtenir l'état de connexion
   */
  public isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * Déconnecter le service
   */
  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.notifyConnectionListeners(false);
  }
}

// Exporter une instance unique
export const notificationService = new NotificationService();
