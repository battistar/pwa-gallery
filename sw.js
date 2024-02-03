const CACHE_NAME = 'animals-v1';

const assets = [
  '/pwa-gallery/',
  '/pwa-gallery/index.html',
  '/pwa-gallery/assets/js/main.js',
  '/pwa-gallery/assets/css/style.css',
];

const preCache = async (assets) => {
  const cache = await caches.open(CACHE_NAME);

  await cache.addAll(assets);
};

const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);

      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    return Response.error();
  }
};

const cacheFirstWithRefresh = async (request) => {
  const fetchAssetList = async () => {
    try {
      const networkResponse = await fetch(request);

      if (networkResponse.ok) {
        const cache = await caches.open(CACHE_NAME);

        cache.put(request, networkResponse.clone());
      }

      return networkResponse;
    } catch (error) {
      return Response.error();
    }
  };

  const networkResponse = await fetchAssetList();

  return (await caches.match(request)) || networkResponse;
};

const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);

      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);

    return cachedResponse || Response.error();
  }
};

function isCacheable(request) {
  const url = new URL(request.url);

  return !url.pathname.endsWith('.json');
}

self.addEventListener('install', (e) => {
  console.log('Lifecycle - install');

  e.waitUntil(preCache(assets));
});

self.addEventListener('fetch', async (e) => {
  console.log('Lifecycle - fetch');

  if (isCacheable(e.request)) {
    e.respondWith(cacheFirst(e.request));
  }
});
