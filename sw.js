const CACHE_NAME = 'cardio-static-v1';
const APP_SHELL = [
  './',
  './index.html',
  './background.html',
  './cardio/build.js',
  './cardio/banner_prime.png',
  './cardio/start.png',
  './cardio/pause.png',
  './cardio/done.png',
  './cardio/finish.png',
  './cardio/start.wav',
  './cardio/ringGo.wav',
  './cardio/breaktime.wav',
  './cardio/finish.wav',
  './cardio/NJKlogo.ico',
  './cardio/fonts/sportrop.regular.ttf'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key !== CACHE_NAME;
          })
          .map(function (key) {
            return caches.delete(key);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then(function (networkResponse) {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          var responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(function () {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return caches.match(event.request);
        });
    })
  );
});
