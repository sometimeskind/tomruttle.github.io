const assets = [
  '/',
  '/index.html',
];

self.addEventListener('install', (e) => {
  const addAssetsToCache = caches
   .open('tomruttle')
   .then((cache) => cache.addAll(assets));

 e.waitUntil(addAssetsToCache);
});

self.addEventListener('fetch', (e) => {
  const fetchResource = caches
    .match(e.request)
    .then((response) => response || fetch(e.request))
    .catch((err) => { console.error(err); });

  e.respondWith(fetchResource);
});
