// Service Worker - EDH Zéro Papier
const CACHE_NAME = 'edh-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass through all requests
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
