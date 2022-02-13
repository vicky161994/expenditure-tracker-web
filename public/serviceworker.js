const CACHE_NAME = "version-1";
const urlsToCache = [
  "/",
  "/index.html",
  "/fontawesome.min.css",
  "/fc31dedf63.js",
  "/logo192.png",
  "/favicon.ico",

  /* production start */
  "/static/js/2.ea264269.chunk.js",
  "/static/js/main.b3243bcb.chunk.js",
  "/static/css/2.0a9ec390.chunk.css",
  "/static/css/main.2a5353f7.chunk.css",
  "/static/js/main.7ed304f1.chunk.js",
  "/static/js/2.ab9d8fe5.chunk.js",
  "/static/js/main.dd2f90d0.chunk.js",
  /* production end */

  /* local start */
  // "/static/js/bundle.js",
  // "/static/js/vendors~main.chunk.js",
  // "/static/js/main.chunk.js",
  /* local end */

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
  // if (!navigator.onLine) {
  event.respondWith(
    caches
      .match(event.request)
      .then((resp) => {
        // return fetch(event.request).catch(() => caches.match("offline.html"));
        if (resp) {
          return resp;
        }
        // let request_url = event.request.clone();
        // fetch(request_url);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
  );
  // }
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
