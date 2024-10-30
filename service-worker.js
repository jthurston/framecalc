const CACHE_NAME = "frame-calc-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/service-worker.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
    // Add other static assets here (e.g., CSS, JS files)
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});