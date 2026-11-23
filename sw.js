const CACHE_NAME = 'media-player-v8';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './brand/ikon.svg',
  './brand/ikon-192.png',
  './brand/ikon-512.png',
  './brand/ikon-maskable-192.png',
  './brand/ikon-maskable-512.png',
  './brand/apple-touch-icon.png',
  './brand/logo-kecil-gelap.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});