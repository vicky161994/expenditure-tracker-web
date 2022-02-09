const CACHE_NAME = "version-1";
const urlsToCache = [
  "/",
  "/index.html",
  "/static/js/2.ea264269.chunk.js",
  "/static/js/main.b3243bcb.chunk.js",
  "/logo192.png",
  "/fc31dedf63.js",
  "/fontawesome.min.css",
  // "offline.html"
];
const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache==>>>", cache);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
  );
});

//Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((resp) => {
        // return fetch(event.request).catch(() => caches.match("offline.html"));
        if (resp) {
          return resp;
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
  );
});

//Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhiteList.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch((error) => {
        console.log("error: ", error);
      })
  );
});
