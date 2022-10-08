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

const today = moment().format("MM-DD-YYYY");
const tomorrow = moment().add(1, 'days').format("MM-DD-YYYY");
const dayAfterTomorrow = moment().add(2, 'days').format("MM-DD-YYYY");
const dayAfterThat = moment().add(3, 'days').format("MM-DD-YYYY");
const daysLater = moment().add(4, 'days').format("MM-DD-YYYY");

const days = [day1, day2, day3, day4, day5];
const fiveDay = [today, tomorrow, dayAfterTomorrow, dayAfterThat, daysLater];
let storageArray = [];

if (localStorage.getItem("search-history")) {
  storageArray = JSON.parse(localStorage.getItem("search-history"))
  for (let i = 0; i < storageArray.length; i++) {
    let searchBtn = document.createElement('button');
    searchBtn.textContent = storageArray[i];
    searchBtn.setAttribute('class', 'inline-block btn btn-lg btn-info');
    recentList.append(searchBtn);
  }
} else {
  localStorage.setItem("search-history", JSON.stringify(storageArray));
}


// $(window).load(function() {
  
// });


// pulling geoCall into its own function, take in the name of a city and run
// use event delegation for dynamically created list, delegate events onto parent UL and use
// event.target to get its text value and plug that into geoCall function.

function getApi(event) {
    event.preventDefault();
    const locationSearch = $('#location').val();
    console.log(locationSearch);
    let locationArray = JSON.parse(localStorage.getItem("search-history"));
    locationArray.push(locationSearch)
    console.log(locationArray);
    localStorage.setItem("search-history", JSON.stringify(locationArray));
    recentList.empty();
    for (let i = 0; i < locationArray.length; i++) {
      let searchBtn = document.createElement('button');
      searchBtn.textContent = locationArray[i];
      searchBtn.setAttribute('class', 'btn btn-lg btn-info w-100 my-2');
      recentList.append(searchBtn);
    }

    const geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q='+locationSearch+'&appid=379288c134bd33ff0ca6a16b87f06183';
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

//local storage: locationSearch, latitude, and longitude

// geoCall function

function getForecast(locationData) {
  console.log(locationData);
  const latitude = locationData[0].lat;
  const longitude = locationData[0].lon;
  const apiCall = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=379288c134bd33ff0ca6a16b87f06183&units=imperial';

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
  removeContent();
  const statusIcon = weatherData.list[0].weather[0].icon;
  const tempNow = weatherData.list[0].main.temp;
  const windNow = weatherData.list[0].wind.speed;
  const humidityNow = weatherData.list[0].main.humidity;
  const sIconUrl = 'http://openweathermap.org/img/wn/'+statusIcon+'.png';
  const imgIcon = '<img src='+sIconUrl+'>';
  locationName.append(weatherData.city.name + ' ' + '('+today+')' + '  ' + imgIcon);
  temp.append('Temp: ' + tempNow + " °F");
  wind.append('Wind: ' + windNow + " MPH");
  humidity.append('Humidity: ' + humidityNow + " %");

  for (let i = 0; i < 5; i++) {
  const weatherStatus = weatherData.list[i].weather[0].icon
  const iconUrl = 'http://openweathermap.org/img/wn/'+weatherStatus+'.png';
  const icon = '<img src='+iconUrl+'>'
  console.log(iconUrl);
  const tempForecast = weatherData.list[i].main.temp;
  console.log(tempForecast);
  const windForecast = weatherData.list[i].wind.speed;
  console.log(windForecast);
  const humidForecast = weatherData.list[i].main.humidity;
  console.log(humidForecast);
  days[i].append('<h4>' + fiveDay[i] + '<br> </h4>'+ icon +'<h5> <br> Temp: ' 
  + tempForecast + ' °F <br> Wind: ' + windForecast + ' MPH <br> Humidity: ' 
  + humidForecast + ' % </h5>');
  $('#location').val('')
  }};


function removeContent() {
  locationName.empty();
  temp.empty();
  wind.empty();
  humidity.empty();
  for (let i = 0; i < 5; i++) {
    days[i].empty();
}};



button.on('click', getApi);