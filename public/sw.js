// Service Worker for POS System Offline Support
const CACHE_NAME = 'pos-system-v2.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/robots.txt',
  '/sw.js',
  '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(urlsToCache)
          .catch((error) => {
            console.error('Service Worker: Failed to cache assets during install', error);
          });
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - implement network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // For API requests to Supabase, use network-first strategy
  if (event.request.url.includes('supabase')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If the response is successful, cache it
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.warn('Service Worker: Failed to cache Supabase response', error);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If no cached response, throw error
              throw new Error('Network error and no cached response for Supabase request');
            });
        })
    );
    return;
  }

  // For static assets, use cache-first strategy with network fallback
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache the response for future offline use
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                })
                .catch((error) => {
                  console.warn('Service Worker: Failed to cache network response', error);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // If both cache and network fail, return appropriate fallbacks
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            // For CSS/JS assets, return a basic response
            return new Response('', {
              status: 200,
              statusText: 'OK'
            });
          });
      })
      .catch((error) => {
        console.error('Service Worker: Fetch handler error', error);
        // If everything fails, return appropriate fallbacks
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html')
            .then((response) => response || caches.match('/index.html'));
        }
        // For assets, return a basic response
        return new Response('', {
          status: 200,
          statusText: 'OK'
        });
      })
  );
});