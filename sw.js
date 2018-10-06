const CACHE_NAME = 'tomruttle';

const assets = [
  '/',
  '/index.html',
  '/fallback-content.js',
];

async function addAssetsToCache(e) {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll(assets);
}

async function fetchAsset(e) {
  const cache = await caches.open(CACHE_NAME);

  const cachedResponse = await cache.match(e.request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    return await fetch(e.request);
  } catch (err) {
    if (e.request.url.includes('https://gist.github.com/tomruttle')) {
      return cache.match('/fallback-content.js');
    }
  }
}

addEventListener('install', (e) => {
  e.waitUntil(addAssetsToCache(e));
});

addEventListener('fetch', (e) => {
  if (e.request.method === 'GET') {
    e.respondWith(fetchAsset(e));
  }
});
