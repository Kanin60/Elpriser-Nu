//Dato til url
const currentDate = new Date();
const hour = currentDate.getHours();
const day = currentDate.getDate().toString().padStart(2, '0') // Dag (1-31) som 2 cifre
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Måned (0-11, tilføj 1 for at få den faktiske måned, tilføj nul til måned 1- for at kunne bruges i url)
const year = currentDate.getFullYear(); // År 

//lokation til url
const vest = "DK1" 
/*DK1 = Aarhus / Vest for Storebælt. DK2 = København / Øst for Storebælt */

//urls
const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${vest}.json`
// const urlTest = 'https://www.elprisenligenu.dk/api/v1/prices/2023/09-30_DK1.json'
console.log("URL: ", url);

let myData = null
let myApp = null

//Registrerer serviceworker og sender beskeder i consolen
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('service worker registered', reg))
        .catch(err => console.error('service worker not registered', err))
}

//henter data
function fetchData() {
    fetch(url).then(res => res.json()).then( (data) => {
        ligenu(data)
        // console.log({data});
    })
    .catch((error) => {
        console.error("****  Her er fejlen!  ****", error)
    });
    myApp = document.getElementById('ligenu')
}

//Byg ligenu-siden
function ligenu(data) {
    myData = data

    //Nuværende pris
    let myPrice = document.getElementById('price')
    myPrice.innerText = `${myData[hour].DKK_per_kWh} kr.`

    //nuværende time
    let myTime = document.getElementById('time')
    myTime.innerText = `${hour}:00 - ${hour + 1}:00`
}

fetchData()