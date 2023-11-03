//CACHES GEMMER KODEN OFFLINE 
const staticCache = 'static-caches-v4'

// Array med filer
const assets = [
    './index.html',
    './fallback.html', 
    './historik.html',
    './oversigt.html',
    './assets/css/main.css',
    './assets/css/index.css',
    './assets/js/el-priser.js',
    './assets/images/warning.svg'
]

// Tilføjer alle filerne fra arrayet assets til cache
self.addEventListener('install', async function (event) {
    event.waitUntil(
        caches.open(staticCache).then(cache => {
        return cache.addAll(assets);
    }));
});

//Sletter alle caches som ikke er staticCache ved at sammenligne cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            const filteredKeys = keys.filter(key => key !== staticCache)
            filteredKeys.map(key => {
                caches.delete(key)
            })
        })
    )
})