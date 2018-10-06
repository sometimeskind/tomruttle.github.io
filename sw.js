const CACHE_NAME = 'tomruttle';

const assets = [
  '/',
  '/index.html',
];

const fallbackResponse = /* @html */`
  <div class="noscript">
    <p>Hi.</p>
    <p>There's a github gist here with some words in it that you can't see because you're offline.</p>
    <p>You're not missing anything.</p>
    <p>🦔</p>
  </div>
`;

async function addAssetsToCache(e) {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll(assets);
}

async function fetchAsset(e) {
  const cache = await caches.open(CACHE_NAME);

  const cachedResponse = await cache.match(e.request);

  if (cachedResponse) {
    e.waitUntil(async () => {
      await cache.add(e.request);
    });

    return cachedResponse;
  }

  try {
    return await fetch(e.request);
  } catch (err) {
    if (e.request.url.includes('https://gist.github.com/tomruttle')) {
      return new Response(`document.write(\`${fallbackResponse}\`)`, {
        headers: {'Content-Type': 'application/javascript'}
      });
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
