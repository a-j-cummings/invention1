const CACHE = 'shark-tank-v3';
const ASSETS = [
  '/tank/shark.html',
  '/tank/manifest.json',
  '/tank/sw.js',
  '/tank/shark-sprite.png',
  '/tank/shark2-sprite.png',
  '/tank/shark3-sprite.png',
  '/tank/shark4-sprite.png',
  '/tank/icon-180.png',
  '/tank/icon-192.png',
  '/tank/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
