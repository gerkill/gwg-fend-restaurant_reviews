const cacheName = 'restaurant_reviews';

const filesToCache = [
  '/index.html',
  '/restaurant.html',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
];

/**
 * Creates cache when the Service Worker installs
 */
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('[ServiceWorker] Caching app');
      return cache.addAll(filesToCache);
    }),
  );
});

/**
 *  Purges the previous cache after activating the next cache
 */
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

/**
 * Responds with cached content if matched
 */
self.addEventListener('fetch', event => {
  const request = event.request.url.includes('/restaurant.html')
    ? new Request('/restaurant.html')
    : event.request;

  event.respondWith(
    caches.match(request).then(response => response || fetch(request)),
  );
});
