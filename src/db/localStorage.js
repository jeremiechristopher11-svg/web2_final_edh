// localStorage.js — wrapper simple pour le stockage local
// Stocke les collections : interventions, pannes, clients, syncQueue

const PREFIX = "edh:";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error("[localDB] write failed", e);
  }
}

export const localDB = {
  // Lecture/écriture brute d'une collection
  get(collection) {
    return read(collection, []);
  },
  set(collection, items) {
    write(collection, items);
  },

  // Ajoute un item à une collection
  add(collection, item) {
    const items = read(collection, []);
    items.push(item);
    write(collection, items);
    return item;
  },

  // Met à jour un item par id
  update(collection, id, patch) {
    const items = read(collection, []);
    const idx = items.findIndex((it) => it.id === id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], ...patch };
      write(collection, items);
    }
    return items[idx];
  },

  // Vide une collection
  clear(collection) {
    localStorage.removeItem(PREFIX + collection);
  },
};

// File d'attente de synchronisation
export const syncQueue = {
  enqueue(action) {
    // action: { type, collection, payload, createdAt }
    const queue = read("syncQueue", []);
    queue.push({ ...action, createdAt: Date.now() });
    write("syncQueue", queue);
  },
  all() {
    return read("syncQueue", []);
  },
  clear() {
    write("syncQueue", []);
  },
  remove(index) {
    const queue = read("syncQueue", []);
    queue.splice(index, 1);
    write("syncQueue", queue);
  },
};
