
import { getWeather } from './weather';
import { ICON_MAP } from './iconMap';

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
    getWeather(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    .then(renderWeather)
    .catch(e => {
        console.error(e)
        alert("Error getting weather")
    })
}

function positionError() {
  alert("There was an error getting your location. Please allow us to use your location and refresh the page.")
}


function renderWeather({position, current, daily, hourly }) {
    renderCurrentWeather(current, position)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove('blurred')
}

function setValue(selector, value, {parent = document} = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value;
}

// function getIconUrl(iconCode) {
//   return `icons/${ICON_MAP.get(iconCode)}.svg`;
// }

// const currentIcon = document.querySelector("[data-current-icon]")

function renderCurrentWeather(current, city) {

    console.log(current);
//   currentIcon.src = getIconUrl(current.iconCode)
   setValue("current-temp", current.currentTemp)
   setValue("current-city", city)
   setValue("current-fl-high", `Gefühlt: ${current.lowFeelsLike} - ${current.highFeelsLike}`)
//   setValue("current-fl-high", current.highFeelsLike)
//   setValue("current-fl-low", current.lowFeelsLike)
//   setValue("current-wind", current.windSpeed)
//   setValue("current-precip", current.precip)
}



function renderDailyWeather(daily) {

}

function renderHourlyWeather(hourly) {
    console.log(hourly);

}