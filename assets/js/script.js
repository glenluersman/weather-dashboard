var apiKey = "2d4a0de5c01a73e0bc35dafb10eadc48";
var searchBtnEl = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector("#search-form");
var cityNameEl = document.querySelector("#city-name");
var weatherIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#temperature");
var currentHumidityEl = document.querySelector("#humidity");
var currentWindSpeedEl = document.querySelector("#wind-speed");
var currentUVEl = document.querySelector("#UV-index");

var getCurrentWeather = function() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=troy,ohio&units=imperial&appid=" + apiKey;  
  fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          displayCurrentWeather(data);
        });
      } else {
        alert("Error: City not found");
      }
    });
};

var displayCurrentWeather = function(data) {
  var currentDate = new Date(data.dt*1000);
  console.log(currentDate); 
  var month = currentDate.getMonth();
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
  var UVapiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  fetch(UVapiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(oneCall) {
        console.log(oneCall);
        currentUVEl.innerHTML = "UV Index: " + oneCall.current.uvi; 
      });
    }
  });
}

//var formSubmitHandler = function(event) {
  //event.preventDefault();
  //console.log(event);

  // get value from input element
  //var cityName = searchFormEl.value.trim();
  //console.log(cityName);

  //if (cityName) {
    //getCurrentWeather(cityName);
    //searchFormEl.value = "";
    //} else {
      //alert("Please enter a City");
    //}
//};

//searchBtnEl.addEventListener("submit", formSubmitHandler);
getCurrentWeather()