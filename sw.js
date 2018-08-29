const staticCache = 'restaurant-reviews';

/**
 * Creates cache when the Service Worker installs
 */

self.addEventListener('install', event => {
    console.log('Service Worker install');
    event.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            console.log('caching')
            return cache.addAll([
                '/',
                '/favicon.ico',
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
            ]).catch(error => {
                console.log('Caches open failed: ' + error);
            });
        })
    );
});

/**
 * Responds with cached content if matched
 */

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(fetchResponse => {
                return caches.open(staticCache).then(cache => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        })
    );
});

/**
 *  Purges the previous cache after activating the next cache
 */

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('restaurant-reviews-') && cacheName !== staticCacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});
