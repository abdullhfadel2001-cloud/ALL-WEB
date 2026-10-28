// ==========================================================================
// DAEM PWA Service Worker (Offline Cache & Network Engine)
// ==========================================================================

const CACHE_NAME = 'daem-core-v1.0';

// الأصول الأساسية المطلوب تخزينها مؤقتاً للعمل دون اتصال بالإنترنت
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './preview.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Orbitron:wght@600;700;800;900&family=Share+Tech+Mono&display=swap'
];

// روابط وروابط فحص الشبكة والـ Speedtest التي يجب أن تكون دائماً Network-Only ولا تُخزن في الكاش
const BYPASS_URL_PATTERNS = [
  '1.1.1.1',
  'api.github.com',
  'httpbin.org',
  'cdnjs.cloudflare.com',
  'cdn.jsdelivr.net',
  'unpkg.com',
  'cacheBust',
  'cdn-cgi/trace'
];

// ----------------------------------------------------
// مرحلة التثبيت: Install Event
// ----------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('SW Precache partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ----------------------------------------------------
// مرحلة التفعيل: Activate Event (حذف الكاش القديم)
// ----------------------------------------------------
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ----------------------------------------------------
// مرحلة جلب الطلبات: Fetch Event (إستراتيجية ذكية)
// ----------------------------------------------------
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = req.url;

  // 1. تجاوز أي طلبات قياس سرعة أو فحص استجابة (Ping / Speedtest / POST)
  if (req.method !== 'GET' || BYPASS_URL_PATTERNS.some(pat => url.includes(pat))) {
    event.respondWith(fetch(req));
    return;
  }

  // 2. إستراتيجية Network First مع Fallback إلى Cache للملفات الأساسية
  event.respondWith(
    fetch(req)
      .then((networkResponse) => {
        // تحديث الكاش بنسخة طازجة إذا كان الطلب ناجحاً
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, resClone);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // عند انقطاع الإنترنت، جلب النسخة المحفوظة من الكاش
        const cachedResponse = await caches.match(req);
        if (cachedResponse) {
          return cachedResponse;
        }

        // إذا كان الطلب تنقل بين الصفحات، إرجاع index.html أوفلاين
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }

        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      })
  );
});

