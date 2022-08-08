const cacheName = "cache-v105";
const staticAssets = [
    '/',

    '/index.html',
    '/favicon.ico',
    '/manifest.webmanifest',
    '/logo192.png',
    '/logo512.png',
    '/logo192masked.png',
    '/logo512masked.png',

    "/auth/signin",
    "/new",
    "/new/villa",
    "/new/villa/extra",
    "/new/apartment",
    "/new/apartment/extra",
    "/new/land",
    "/new/land/extra",
    "/new/commercial",
    "/new/commercial/extra",
    "/new/hectare",
    "/new/hectare/extra",
    "/search",
    "/file/",
    "/logout"



    // '/static/media/logo.e49f7f96.png',
    // '/static/js/2.863a32a9.chunk.js',
    // '/static/js/main.ccb9125d.chunk.js',
    // '/static/css/main.4c165271.chunk.css',
]

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});

self.addEventListener('fetch', async event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin || url.pathname.split("/")[1] === "media") {
        event.respondWith(cacheFirst(req));
    }
});



async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (error) {
        const cached = await cache.match(req);
        return cached;
    }
}