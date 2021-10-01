let current = new Date();

let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

let currentDay = days[current.getDay()];
let hour = current.getHours();
let minutes = current.getMinutes();
let currentTime = `${hour}:${minutes}`;
let dayTime = `${currentDay} ${currentTime}`;
let day = document.querySelector(".day-Time");
day.innerHTML = `${dayTime}`;

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input");
  let cityChange = document.querySelector(".current");
  cityChange.innerHTML = `${city.value}`;

  let apiKey = "5863935ee9cca4c02ed68203f807c65b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;

  function showTemp(response) {
    console.log(response.data);
    let tempValue = Math.round(response.data.main.temp);
    let temp = document.querySelector(".temperature");
    temp.innerHTML = `${tempValue}°`;
    let description = document.querySelector(".sunny");
    let cityDescription = response.data.weather[0].main;
    description.innerHTML = `${cityDescription}`;
  }
  axios.get(`${apiUrl}&units=metric`).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function locale() {
  function currentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "5863935ee9cca4c02ed68203f807c65b";
    let apiGps = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    function showLocale(response) {
      let tempValue = Math.round(response.data.main.temp);
      let temp = document.querySelector(".temperature");
      temp.innerHTML = `${tempValue}°`;
      let description = document.querySelector(".sunny");
      let cityDescription = response.data.weather[0].main;
      description.innerHTML = `${cityDescription}`;
      let cityChange = document.querySelector(".current");
      let cityLocale = response.data.name;
      cityChange.innerHTML = `${cityLocale}`;
    }
    axios.get(`${apiGps}&units=metric`).then(showLocale);
  }

  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocation = document.querySelector("#gps");
currentLocation.addEventListener("click", locale);
