console.log()
const button = $('#btn');
const dataFormEl = document.getElementById('data-submit');
const recentSearch = $('#recent-search');
const recentList = $('#recent-list');
const locationToday = $('#location-today');
const locationName = $('#location-name');
const temp = $('#temperature');
const wind = $('#wind');
const humidity = $('#humidity');
const forecast = $('#forecast');
const day1 = $('#day-1');
const day2 = $('#day-2');
const day3 = $('#day-3');
const day4 = $('#day-4');
const day5 = $('#day-5');

const days = [day1, day2, day3, day4, day5];


const today = moment().format("MM-DD-YYYY")


function getApi(event) {
    event.preventDefault();
    let locationSearch = $('#location').val();
    console.log(locationSearch);
    let geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q='+locationSearch+'&appid=379288c134bd33ff0ca6a16b87f06183';
    console.log(geoCall);
    
    fetch(geoCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        getForecast(data);
      })
    }

function getForecast(locationData) {
  console.log(locationData);
  const latitude = locationData[0].lat;
  const longitude = locationData[0].lon;
  let apiCall = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=379288c134bd33ff0ca6a16b87f06183&units=imperial';

    fetch(apiCall)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    popData(data);
    })
}

function popData(weatherData) {
  for (let i = 0; i < 5; i++) {
  const tempForecast = weatherData.list[i].main.temp;
  console.log(tempForecast);
  const windForecast = weatherData.list[i].wind.speed;
  console.log(windForecast);
  const humidForecast = weatherData.list[i].main.humidity;
  console.log(humidForecast);
}}

button.on('click', getApi);