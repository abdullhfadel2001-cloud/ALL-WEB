const CACHE_NAME = 'sanad-app-v6';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './quran_data.js',
  './data.js',
  './audio.js',
  './prayer.js',
  './app.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // للطلبات المحلية نستخدم الكاش أولاً
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // في حال عدم توفر اتصال
        return caches.match('./index.html');
      });
    })
  );
});
