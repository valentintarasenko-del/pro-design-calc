// Сервис-воркер: кеширует приложение для работы без интернета
const CACHE = 'prodesign-v1';

// Файлы которые всегда кешируем при установке
const PRECACHE = ['/', '/app', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  // Удаляем старые кеши
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Сначала пробуем сеть, при ошибке — кеш
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Кешируем успешные GET-запросы
        if (e.request.method === 'GET' && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
