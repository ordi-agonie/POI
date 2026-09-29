/*const CACHE = "poi-v1.1";

const FICHIERS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(FICHIERS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((reponse) => {
      if (reponse) {
        return reponse;
      }

      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomsCaches) => {
      return Promise.all(
        nomsCaches.map((nom) => {
          if (nom !== CACHE) {
            return caches.delete(nom);
          }
        })
      );
    })
  );
});
*/
const CACHE = "poi-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomsCaches) => {
      return Promise.all(
        nomsCaches.map((nom) => caches.delete(nom))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});