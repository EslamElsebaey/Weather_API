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



// search country 

searchInput.addEventListener("keyup", function () {
  if (searchInput.value.length > 3) {
    getWeather(searchInput.value);
  }
});
 


// get weather 

async function getWeather (term){
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1c38be8040b44f4ca57114247220806&q=${term}&days=3`
    );
    let result = await response.json();
   weatherObj = result;
   console.log(weatherObj);
   displayWeather();
}

getWeather("cairo");





//  display Weather
function displayWeather(){
const weekday = ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday", "Saturday"];
const d = new Date();
let today = weekday[d.getDay()];
day.innerHTML = today;

const yearMonth = [ "January", "February", "March","April", "May", "June","July","August", "September", "October", "November","December",];
const m = new Date() ; 
let month = yearMonth[m.getMonth()];
let dayInMonth = m.getDate();
date.innerHTML = `${dayInMonth}${month}`;
city.innerHTML = weatherObj.location.name;
num.innerHTML = `${Math.round(weatherObj.current.temp_c) }<sup>o</sup>C <img src="${weatherObj.current.condition.icon}" alt="">`;
cloud.innerHTML = weatherObj.current.condition.text;
scndDayWord = weekday[weekday.indexOf(today) + 1];
thrdDayWord = weekday[weekday.indexOf(today) + 2];
scndDayWeather();
thrdDayWeather();
}



// second day weather 

function scndDayWeather() {
    scndDay.innerHTML = scndDayWord;
  scndDayIcon.src = weatherObj.forecast.forecastday[1].day.condition.icon;
  scndDayCloud.innerHTML = weatherObj.forecast.forecastday[1].day.condition.text;
  scndDayMaxTemp.innerHTML = `${weatherObj.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
  scndDayMinTemp.innerHTML = `${weatherObj.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C`;
}


// third day weather

function thrdDayWeather() {
    thrdDay.innerHTML = thrdDayWord;
  thrdDayIcon.src = weatherObj.forecast.forecastday[2].day.condition.icon;
  thrdDayCloud.innerHTML =weatherObj.forecast.forecastday[2].day.condition.text;
  thrdDayMaxTemp.innerHTML = `${weatherObj.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
  thrdDayMinTemp.innerHTML = `${weatherObj.forecast.forecastday[3].day.mintemp_c}<sup>o</sup>C`;
}
























