/* Discursos Públicos · Oradores — Service Worker
   Estratégia: cache-first para o "shell" do app, com atualização em segundo
   plano. Suba uma versão nova do CACHE_NOME sempre que trocar arquivos
   estáticos (index.html, ícones) para forçar os aparelhos a atualizarem. */

const CACHE_NOME = 'discursos-v5';
const ARQUIVOS = [
  './',
  './index.html',
  './instalar/index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NOME)
      .then(cache => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(nomes =>
      Promise.all(nomes.filter(n => n !== CACHE_NOME).map(n => caches.delete(n)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  // Nunca guarda em cache chamadas ao Firebase/Google (auth, firestore, fontes) —
  // essas sempre vão direto para a rede.
  const url = new URL(req.url);
  if(url.origin !== self.location.origin){
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      const rede = fetch(req).then(resp => {
        if(resp && resp.ok){
          const copia = resp.clone();
          caches.open(CACHE_NOME).then(cache => cache.put(req, copia));
        }
        return resp;
      }).catch(() => cached);
      return cached || rede;
    })
  );
});
