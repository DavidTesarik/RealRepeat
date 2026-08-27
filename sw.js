/* Repeat — service worker
   Cache-first pro vlastní soubory, takže appka běží i offline.
   Verzi zvyš, kdykoli nahraješ novou verzi appky. */
const VERSION = 'repeat-v5';
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon.png',
  'fonts/ibm-plex-mono-latin-400-normal.woff2',
  'fonts/ibm-plex-mono-latin-500-normal.woff2',
  'fonts/ibm-plex-mono-latin-600-normal.woff2',
  'fonts/ibm-plex-mono-latin-ext-400-normal.woff2',
  'fonts/ibm-plex-mono-latin-ext-500-normal.woff2',
  'fonts/ibm-plex-mono-latin-ext-600-normal.woff2',
  'fonts/schibsted-grotesk-latin-400-normal.woff2',
  'fonts/schibsted-grotesk-latin-500-normal.woff2',
  'fonts/schibsted-grotesk-latin-600-normal.woff2',
  'fonts/schibsted-grotesk-latin-700-normal.woff2',
  'fonts/schibsted-grotesk-latin-ext-400-normal.woff2',
  'fonts/schibsted-grotesk-latin-ext-500-normal.woff2',
  'fonts/schibsted-grotesk-latin-ext-600-normal.woff2',
  'fonts/schibsted-grotesk-latin-ext-700-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(hit => {
      if(hit) return hit;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match('index.html'));
    })
  );
});

/* klepnutí na oznámení otevře appku */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
      for(const c of list){ if('focus' in c) return c.focus(); }
      if(self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
