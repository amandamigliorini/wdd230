// declaring variables to contain the last modified date and the current year for the footer
let oLastModif = new Date(document.lastModified);
//declaring navigation variables
const hamburguerElement = document.querySelector("#menu");
const navElements = document.querySelector(".navigation");
//declaring dark mode variables
const darkButton = document.getElementById('darkBtn');
const main = document.querySelector('main');

const options = {		
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
};
let currentYear = new Date().toLocaleDateString("en-US", {year:"numeric"});

// adding current year and last modified to the footer

const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = oLastModif.toLocaleDateString("en-US", options);
const yearElement = document.getElementById("year");
year.textContent = currentYear;

//adding class for open and close hamburguer menu
hamburguerElement.addEventListener('click', () => {
    navElements.classList.toggle('open');
    hamburguerElement.classList.toggle('open');
})

//code for dark mode click
darkButton.addEventListener('click',() =>{
    main.classList.toggle('dark');
})

// get .visits and initialize element
const visitsElement = document.querySelector(".visits");
// get the num of visits in the local storage if exists or (||) assign it to 0
let numVisits = Number(window.localStorage.getItem('numVisitsLocal')) || 0;

//display the num of visits or a message if is the first visit of the user
if(numVisits != 0){
    visitsElement.textContent = numVisits;
}
else{
    visitsElement.textContent = `This is your first visit.\u{1F600} Welcome!`
}
numVisits++;

localStorage.setItem('numVisitsLocal', numVisits);

// WEATHER CODE

//get the elements from the information card that is related to the weather
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#description");

// define the api url using my city's data
const url = "https://api.openweathermap.org/data/2.5/weather?lat=-24.726967085004386&lon=-53.748923914928255&units=imperial&appid=5eeb01c6caa5abd41bdf4f2759f15ad4";

async function apiFetch(){
    try{
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else{
            throw Error(await response.text());
        }
    } catch (error){
        console.log(error);
    }
}
function displayResults(data){
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", data.weather[0].main );
    captionDesc.textContent = `${desc}`;
}

apiFetch();