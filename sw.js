// Calorie Log service worker: makes the app open offline.
// Bump VERSION whenever you upload changed files so phones pick up the update.
const VERSION = 'v3';
const SHELL = `shell-${VERSION}`;
const RUNTIME = 'runtime-v1';
const SHELL_FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('shell-') && k !== SHELL).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Product photos: keep a copy so your log shows them offline too.
  if (url.hostname === 'images.openfoodfacts.org') {
    e.respondWith(
      caches.open('photos-v1').then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') c.put(req, res.clone());
        return res;
      })))
    );
    return;
  }

  // Food database lookups always go to the network.
  if (url.hostname.endsWith('openfoodfacts.org')) return;

  // App files: network first so updates arrive, cached copy when offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(SHELL).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Fonts and the barcode scanner (script + WebAssembly): cache first.
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || /(^|\.)jsdelivr\.net$/.test(url.hostname)) {
    e.respondWith(
      caches.open(RUNTIME).then(c => c.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') c.put(req, res.clone());
        return res;
      })))
    );
  }
});
