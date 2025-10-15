const CACHE = 'fatloss-app-v3-2';
const ASSETS = [
  './',
  './index.html?v=3.2',
  './manifest.webmanifest?v=3.2',
  './icons/icon-192.svg?v=3.2',
  './icons/icon-512.svg?v=3.2',
  'https://cdn.jsdelivr.net/npm/chart.js'
];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});