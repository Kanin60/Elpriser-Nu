//CACHES GEMMER KODEN OFFLINE 
const staticCache = 'static-caches-v4'
const dynamicCacheName = 'site-dynamic-v2'

// Array med filer
const assets = [
    './index.html',
    './fallback.html', 
    './historik.html',
    './oversigt.html',
    './assets/css/main.css',
    './assets/css/index.css',
    './assets/js/el-priser.js',
    './assets/images/warning.svg',
    './assets/images/calendar-days.svg',
    './assets/images/circle-xmark.svg',
    './assets/images/mainIcon.svg',
    './assets/images/gear.svg',
    './assets/images/mainIcon.ico'
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

//TILFØJER SIDER(FILER) TIL CACHEN DYNAMISK
// Fetch event
self.addEventListener('fetch', event => {
    if(!(event.request.url.indexOf('http') === 0 )) return
	
	event.respondWith( // Kontroller svar på request
		caches.match(event.request).then(cacheRes => { // Kig efter file match i cache 
			return cacheRes || fetch(event.request).then(async fetchRes => { // Returner match fra cache - ellers hent fil på server
				return caches.open(dynamicCacheName).then(cache => { // Tilføjer nye sider til cachen
					cache.put(event.request.url, fetchRes.clone()) // Bruger put til at tilføje sider til vores cache via clone
					return fetchRes // Returnerer fetch request
				})
			})
		}).catch(() => {
            return caches.match('fallback.html')
        })
	)
})