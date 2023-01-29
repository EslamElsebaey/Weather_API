// selecting variables

let day = document.getElementById("day");
let date = document.getElementById("date");
let city = document.getElementById("city");
let num = document.getElementById("num");
let cloud = document.getElementById("cloud");
let weatherObj = {};
let scndDay = document.getElementById("scndDay");
let scndDayMaxTemp = document.getElementById("scndDayMaxTemp");
let scndDayMinTemp = document.getElementById("scndDayMinTemp");
let scndDayCloud = document.getElementById("scndDayCloud");
let scndDayIcon = document.getElementById("scndDayIcon");
let thrdDay = document.getElementById("thrdDay");
let thrdDayIcon = document.getElementById("thrdDayIcon");
let thrdDayCloud = document.getElementById("thrdDayCloud");
let thrdDayMaxTemp = document.getElementById("thrdDayMaxTemp");
let thrdDayMinTemp = document.getElementById("thrdDayMinTemp");
let scndDayWord = "";
let thrdDayWord = "";
let searchInput = document.getElementById("searchInput");
let tryToWrite = document.getElementById("tryToWrite");
let find = document.getElementById("find");

// onloading focus on input

window.addEventListener("load", () => {
  searchInput.focus();
});

// find city you want

find.addEventListener("click", function () {
  if (searchInput.value.length < 4 || searchInput.value == "") {
    tryToWrite.classList.remove("d-none");
    searchInput.value = "";
    searchInput.removeAttribute("placeholder");
  } else {
    tryToWrite.classList.add("d-none");
   p getWeather(searchInut.value);
  }
});

// use enter key to find

searchInput.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    e.preventDefault();
    find.click();
  }
});

// get weather

async function getWeather(term) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=1c38be8040b44f4ca57114247220806&q=${term}&days=3`
  );
  if (response.status != 200) {
    tryToWrite.classList.remove("d-none");
    tryToWrite.innerHTML = "write correct name of city";
  } else {
    let result = await response.json();
    weatherObj = result;
    displayWeather();
  }
}

getWeather("cairo");

//  display Weather
function displayWeather() {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let today = weekday[d.getDay()];
  day.innerHTML = today;

  const yearMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const m = new Date();
  let month = yearMonth[m.getMonth()];
  let dayInMonth = m.getDate();
  date.innerHTML = `${dayInMonth}${month}`;
  city.innerHTML = weatherObj.location.name;
  num.innerHTML = `${Math.round(
    weatherObj.current.temp_c
  )}<sup>o</sup>C <img src="${weatherObj.current.condition.icon}" alt="">`;
  cloud.innerHTML = weatherObj.current.condition.text;
  scndDayWord = weekday[new Date(weatherObj.forecast.forecastday[1].date).getDay()];
  thrdDayWord = weekday[new Date(weatherObj.forecast.forecastday[2].date).getDay()];
  scndDayWeather();
  thrdDayWeather();
}

// second day weather

function scndDayWeather() {
  scndDay.innerHTML = scndDayWord;
  scndDayIcon.src = weatherObj.forecast.forecastday[1].day.condition.icon;
  scndDayCloud.innerHTML =
    weatherObj.forecast.forecastday[1].day.condition.text;
  scndDayMaxTemp.innerHTML = `${weatherObj.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
  scndDayMinTemp.innerHTML = `${weatherObj.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
}

// third day weather

function thrdDayWeather() {
  thrdDay.innerHTML = thrdDayWord;
  thrdDayIcon.src = weatherObj.forecast.forecastday[2].day.condition.icon;
  thrdDayCloud.innerHTML =
    weatherObj.forecast.forecastday[2].day.condition.text;
  thrdDayMaxTemp.innerHTML = `${weatherObj.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
  thrdDayMinTemp.innerHTML = `${weatherObj.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C`;
}
