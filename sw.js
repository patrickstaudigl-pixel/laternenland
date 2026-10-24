// Offline-Cache für Laternenland
const CACHE = 'laternenland-mvm0pvle';
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).then((res) => { if (res.ok && (new URL(e.request.url).origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(new URL(e.request.url).hostname))) { const cp = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)); } return res; }).catch(() => r))); });
