function formatDate(date) {
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} ${hours}:${minutes}`;
  }
  function displayWeatherCondition(response) {
    document.querySelector("#searched-city").innerHTML = response.data.name;
    document.querySelector("#show-temp").innerHTML = `Temperature:${Math.round(response.data.main.temp)}°C`;
  
    document.querySelector("#humidity").innerHTML = `Humidity:${response.data.main.humidity}%`;
  
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  
    
  }
  
  function searchCity(city) {
    
    let apiKey = "c60133e3aeccaa15628c36b5ff675130";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-name").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let apiKey = "c60133e3aeccaa15628c36b5ff675130";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  
  let dateElement = document.querySelector("#present-time");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  searchCity("Nairobi")
  