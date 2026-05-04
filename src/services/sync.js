// sync.js — service de synchronisation local <-> serveur
// Pour l'instant, sans backend, on simule l'envoi (console + délai).
// Quand un backend sera branché, remplacer `sendToServer` par un fetch réel.

import { syncQueue } from "../db/localStorage";
import { toast } from "sonner";

let isSyncing = false;

async function sendToServer(action) {
  // TODO: remplacer par fetch('/api/...') quand le backend sera prêt
  console.log("[sync] -> server", action);
  await new Promise((r) => setTimeout(r, 200));
  return { ok: true };
}

export async function syncLocalData() {
  if (isSyncing) return;
  if (!navigator.onLine) return;

  const queue = syncQueue.all();
  if (queue.length === 0) return;

  isSyncing = true;
  toast.loading(`Synchronisation de ${queue.length} élément(s)...`, {
    id: "sync",
  });

  let success = 0;
  let failed = 0;

  for (const action of queue) {
    try {
      const res = await sendToServer(action);
      if (res.ok) success++;
      else failed++;
    } catch (e) {
      failed++;
      console.error("[sync] failed", e);
    }
  }

  // Tout est traité (mode optimiste : on vide la queue si tout est OK)
  if (failed === 0) {
    syncQueue.clear();
  }

  isSyncing = false;
  toast.dismiss("sync");
  if (success > 0) {
    toast.success(`${success} élément(s) synchronisé(s)`);
  }
  if (failed > 0) {
    toast.error(`${failed} échec(s) de synchronisation`);
  }
}

// Sauvegarde une donnée : envoie tout de suite si online, sinon enqueue
export async function saveOrQueue(collection, payload) {
  if (navigator.onLine) {
    try {
      await sendToServer({ type: "create", collection, payload });
      return { offline: false, ok: true };
    } catch (e) {
      // Si l'envoi échoue, on bascule en queue
      syncQueue.enqueue({ type: "create", collection, payload });
      return { offline: true, ok: true };
    }
  }
  syncQueue.enqueue({ type: "create", collection, payload });
  return { offline: true, ok: true };
}

// Initialise les listeners (à appeler une seule fois au démarrage)
export function initSync() {
  window.addEventListener("online", () => {
    toast.success("Connexion rétablie");
    syncLocalData();
  });
  window.addEventListener("offline", () => {
    toast.warning("Mode hors-ligne activé");
  });
  // Tentative initiale au chargement
  if (navigator.onLine) {
    syncLocalData();
  }
}
