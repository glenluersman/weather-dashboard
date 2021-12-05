var apiKey = "2d4a0de5c01a73e0bc35dafb10eadc48";
var searchBtnEl = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector("#search-form");
var currentWeatherEl = document.querySelector("#current-weather");

var getCurrentWeather = function() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;  
  fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          displayCurrentWeather(data);
        })
      } else {
        alert("Error: City not found");
      }
    })
};

var displayCurrentWeather = function(data) {
  currentWeatherEl.textContent = data.name + data.main.humidity + data.main.temp + data.wind.speed + data.weather[0].icon;

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