importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url: "/manifest.json", revision: "1" },
    { url: "/nav.html", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/pages/klasemen.html", revision: "1" },
    { url: "/pages/team.html", revision: "1" },
    { url: "/pages/favorite.html", revision: "1" },
    { url: "/css/materialize.min.css", revision: "1" },
    { url: "/css/style.css", revision: "1" },
    { url: "/js/materialize.min.js", revision: "1" },
    { url: "/js/nav.js", revision: "1" },
    { url: "/js/base-api.js", revision: "1" },
    { url: "/js/api.js", revision: "1" },
    { url: "/js/db.js", revision: "1" },
    { url: "/js/idb.js", revision: "1" },
    { url: "/js/regis-sw.js", revision: "2" },
    { url: "/js/slide.js", revision: "1" },
    { url: "/js/notif.js", revision: "1" },
    { url: "/image/icon.png", revision: "1" },
    { url: "/image/icon1.png", revision: "1" },
    { url: "/image/mee.png", revision: "1" },
    { url: "/image/cat.png", revision: "1" },
    { url: "/image/lin.png", revision: "1" },
    { url: "/image/twit.png", revision: "1" },
    { url: "/image/fb.png", revision: "1" },
    { url: "/image/back.jpg", revision: "1" },
    { url: "/image/slide1.jpg", revision: "1" },
    { url: "/image/slide3.jpg", revision: "1" },
    { url: "/image/trash.png", revision: "1" },
    { url: "/favicon.ico", revision: "1" },
  ]);

  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages",
    })
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images-cache",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/"),
    workbox.strategies.staleWhileRevalidate()
  );

 
  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );
} else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "/image/icon1.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
