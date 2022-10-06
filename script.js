console.log()
const Button = $('#btn');
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
let locationSearch = document.getElementById("location").value


const today = moment().format("MM-DD-YYYY")


function getApi() {
    // let weatherKey = '379288c134bd33ff0ca6a16b87f06183';
    let geoCall = 'api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=379288c134bd33ff0ca6a16b87f06183';
    let apiCall = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=379288c134bd33ff0ca6a16b87f06183';

    // api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=379288c134bd33ff0ca6a16b87f06183

    fetch(geoCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })

    //   fetch(apiCall)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //   })
    }


Button.addEventListener('click', getApi);