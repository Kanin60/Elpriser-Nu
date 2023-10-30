//variabler
// const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${location}.json`
const urlTest = 'https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK1.json'
/* DK1 = Aarhus / Vest for Storebælt
   DK2 = København / Øst for Storebælt */
let myData = null
let myApp = null

function fetchData() {
    fetch(urlTest).then(res => res.json()).then( (data) => {
        loading()
        console.log({data});
    })
    .catch((error) => {
        console.error("****  Her er fejlen!  ****", error)
    }
    );
    myApp = document.getElementById('ligenu')
}
//bygger en loading side
function loading() {
    //section
    let loadingPage = document.createElement('section')
    loadingPage.classList.add('loading')
    myApp.appendChild(loadingPage)
    //icon
    let icon = document.createElement('img')
    icon.src = '../assets/images/mainIcon.svg'
    icon.alt = 'Loading...'
    icon.classList.add('lodingIcon')
    loadingPage.appendChild(icon)
}

fetchData()