const CACHE_NAME = 'media-player-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json'
];

// Install Service Worker & simpan aset utama
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ambil aset dari cache saat offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});