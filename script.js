function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData, showError, undefined);
    } else {
         alert("Geolocation not supported by this browser");
    }
}

async function getWeatherData(position) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=08a6be8ebb3341f58ea222041232801&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`);
    const weatherData = await response.json();
    showWeatherData(weatherData);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Please accept location request to see weather data.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            alert("Please accept location request to see weather data.")
            break;
    }
}

function showWeatherData(weatherData) {
    document.getElementById("location").innerHTML = `${weatherData.location.name}, ${weatherData.location.region}`;
    document.getElementById("temp").innerHTML = `${weatherData["current"]["temp_c"]} C | ${weatherData["current"]["temp_f"]} F`;
    document.getElementById("condition").innerHTML = `${weatherData["current"]["condition"].text}`;
    document.getElementById("wind").innerHTML = `${weatherData["current"]["wind_mph"]} MPH | ${weatherData["current"]["wind_kph"]} KPH`;
    document.getElementById("uv").innerHTML = `UV Index: ${weatherData["current"]["uv"]}`;
}

const CLOCK = document.getElementById("clock");
setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour === 0) {
        hour = 12;
        am_pm = "AM";
    }

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    CLOCK.innerHTML = hour + ":" + min + ":" + sec + " " + am_pm;
}
showTime();

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const date = new Date();
let currentMonth = months[date.getMonth()];
let currentDay = date.getDate();
let currentYear = date.getFullYear();
document.getElementById("date").innerHTML = `${currentMonth}, ${currentDay}, ${currentYear}`
