const API_KEY = "b865aec79a7cb0ba680901ae0b3dc514"
function handleFormSubmit(event) {
  event.preventDefault()
const input = document.getElementById('city')
const city = input.value
fetchCurrentWeather(city)
fetchFiveDayForecast(city)
}

//http://api.com?q=new york&appid=asdf
function fetchCurrentWeather(city) {
 fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY + '&units=imperial')
 .then( (data) =>{return data.json()})
 .then( (json) => {displayCurrentWeather(json)})
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  const currentTemp = json.main.temp
  //put main in html
  const tempContainer = document.getElementById('temp')
  tempContainer.innerHTML = currentTemp
  const low = document.getElementById('low')
  const high = document.getElementById('high')
  const humidity = document.getElementById('humidity')
  const cloudCover = document.getElementById('cloudCover')
  
  low.innerHTML = json.main.temp_min
  high.innerHTML = json.main.temp_max
  humidity.innerHTML = json.main.humidity
  cloudCover.innerHTML = json.clouds.all
}

function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ city + '&appid=' + API_KEY + '&units=imperial')
     .then( (data) =>{return data.json()})
     .then( (json) => {displayFiveDayForecast(json)})
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json)
//we have 40/39 forecasts and we want to make divs for each of them. We'll use a for loop 
const forecasts = json.list
createChart(json)
let startingString = ''
for (let forecast of forecasts){
  
  //make a box
  //1.doocument.createElement
  //doocument.createdElement('div')
  //2.
  
  let divString = "<div><p>" + forecast.main.temp_min + "</p>" +"<p>" + forecast.main.temp_max + "</p>" +"<p>" + "<p>" + forecast.dt_txt + "</p> </div>"
  startingString += divString
}
console.log(startingString)
const aside = document.getElementById('five-day')
aside.innerHTML = startingString
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  const ctx = document.getElementById('WeatherChart').getContext('2d'); 
  const labels = json.list.map((forecast) => {return forecast.dt_txt})
  const temps = json.list.map((forecast) => {return forecast.main.temp})
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '5 Day forecasts',
            data: temps,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

document.addEventListener('DOMContentLoaded', function() {
 document.addEventListener('submit', handleFormSubmit)
})
