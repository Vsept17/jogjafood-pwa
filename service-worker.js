const CACHE_NAME = "jogjafoodpwa-v1";
var urlsToCache = [
    "/",
    "/index.html",
    "/nav.html",
    "/register-sw.js",
    "/content/pages/home.html",
    "/content/pages/food.html",
    "/content/pages/gallery.html",
    "/content/pages/about.html",
    "/script/nav.js",
    "/script/script.js",
    "/content/style/materialize.min.css",
    "/content/style/materialize.min.js",
    "/content/style/style.css",
    "/manifest.json",
    "/content/assets/bakpia.jpg",
    "/content/assets/gatot.jpeg",
    "/content/assets/gudeg.jpg",
    "/content/assets/jadah-tempe.jpg",
    "/content/assets/krecek.jpg",
    "/content/assets/kue-geplak.jpg",
    "/content/assets/nasi-tiwul.jpg",
    "/content/assets/sate-klatak.jpg",
    "/content/assets/tengkleng.jpg",
    "/content/assets/yangko.jpg",
    "/content/assets/profile.jpg",
    "/content/assets/image-bg.jpg",
    "/content/assets/icon.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, {cacheName: CACHE_NAME})
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
            console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})