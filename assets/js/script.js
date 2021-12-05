var apiKey = "2d4a0de5c01a73e0bc35dafb10eadc48";
var searchBtnEl = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name");
var weatherIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var currentWindSpeedEl = document.querySelector("#wind-speed");
var currentUVEl = document.querySelector("#UV-index");
var forecastEls = document.querySelectorAll("#forecast");
var historyEl = document.querySelector("#search-history");
var searchHistory = {};

var getWeather = function(cityName) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;  
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        displayWeather(data);
        });
      } else {
        alert("Error: City not found");
      }
    });
  };
  
  var displayWeather = function(data) {
    var currentDate = new Date(data.dt*1000);
    console.log(currentDate); 
    var month = currentDate.getMonth() +1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    cityNameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
    var weatherIcon = data.weather[0].icon;
    weatherIconEl.setAttribute("src", " http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
    weatherIconEl.setAttribute("alt", data.weather[0].description);
  currentTempEl.innerHTML = "Temperature: " + data.main.temp + "\u2109";
  currentHumidityEl.innerHTML = "Humidity: " + data.main.humidity + " %";
  currentWindSpeedEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
  var lat = data.coord.lat;
  var lon = data.coord.lon;
  var UVapiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
  fetch(UVapiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(oneCall) {
        console.log(oneCall);
        var UVindex = oneCall.current.uvi;
        currentUVEl.innerHTML = "UV Index: " + UVindex;
        if (UVindex > 8) {
          currentUVEl.setAttribute("class", "badge bg-danger");
        } else if (UVindex < 4) {
          currentUVEl.setAttribute("class", "badge bg-success");
        } else {
          currentUVEl.setAttribute("class", "badge bg-warning");
        }
        
        
        for (i = 0; i < forecastEls.length; i++) {
          forecastEls[i].innerHTML = "";
          forecastDate = new Date(oneCall.daily[i].dt*1000);
          var month = forecastDate.getMonth() +1;
          var day = forecastDate.getDate();
          var year = forecastDate.getFullYear();
          var forecastDateEl = document.createElement("p");
          forecastDateEl.setAttribute("class", "forecast-date mt-3 mb-0");
          forecastDateEl.innerHTML = month + "/" + day + "/" + year;
          forecastEls[i].appendChild(forecastDateEl);
          var forecastIconEl = document.createElement("img");
          forecastIconEl.setAttribute("src", " http://openweathermap.org/img/wn/" + oneCall.daily[i].weather[0].icon + "@2x.png");
          forecastIconEl.setAttribute("alt", oneCall.daily[i].weather[0].description);
          forecastEls[i].appendChild(forecastIconEl);
          var forecastTempEl = document.createElement("p");
          forecastTempEl.innerHTML = "Temp: " + oneCall.daily[i].temp.day + "\u2109";
          forecastEls[i].appendChild(forecastTempEl);
          forecastHumidityEl = document.createElement("p");
          forecastHumidityEl.innerHTML = "Humidity: " + oneCall.daily[i].humidity + " %";
          forecastEls[i].appendChild(forecastHumidityEl);
          forecastWindEl = document.createElement("p");
          forecastWindEl.innerHTML = "Wind: " + oneCall.daily[i].wind_speed + " MPH";
          forecastEls[i].appendChild(forecastWindEl);
        }
      });
    }
  });
  
};

searchBtnEl.addEventListener("click", function(event) {
  event.preventDefault();
  var searchTerm = searchFormEl.value;
  console.log(searchTerm);
  setLocalStorage(searchTerm);
  getWeather(searchTerm);
  displaySearchHistory(searchTerm);
});

var setLocalStorage = function(searchTerm) {
  localStorage.setItem("city", JSON.stringify(searchTerm));
  
  searchHistory = JSON.parse(localStorage.getItem("city"));

  if (!searchHistory) {
    searchHistory = [];
  }
};

var displaySearchHistory = function(searchTerm) {
  var historyBtn = document.createElement("button");
  historyBtn.innerHTML = searchTerm;
  historyBtn.setAttribute("class", "btn btn-primary history-btn");
  historyEl.appendChild(historyBtn);
  historyBtn.addEventListener("click", function(event) {
    event.preventDefault();
    console.log(event.target);
    getWeather(searchTerm);
  });
};
