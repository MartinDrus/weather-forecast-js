
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

function formatSunRiseSet(s) {
    return new Date(s * 1e3).toLocaleString('de-DE').slice(-8, -3);
}


  
// function getIconUrl(iconCode) {
//   return `icons/${ICON_MAP.get(iconCode)}.svg`;
// }

// const currentIcon = document.querySelector("[data-current-icon]")

function renderCurrentWeather(current, city) {

    console.log(current);




//   currentIcon.src = getIconUrl(current.iconCode)
//// left
    // setValue("current-pressure", `${current.pressure}`);
    setValue("current-sunrise", `Sonnenaufgang: ${formatSunRiseSet(current.sunrise)}`)
    setValue("current-sunset", `Sonnenuntergang: ${formatSunRiseSet(current.sunset)}`)

//// middle
   setValue("current-temp", current.currentTemp)
   setValue("current-city", `Wetter für  ${city}`)
   setValue("current-fl-high", `Gefühlt: ${current.lowFeelsLike} - ${current.highFeelsLike}`)

//// right
   setValue("current-windspeed", `Wind: ${current.windSpeed}`)
   setValue("current-winddirection", `Richtung: ${current.windDirection}`)

//   setValue("current-wind", current.windSpeed)
//   setValue("current-precip", current.precip)
}



function renderDailyWeather(daily) {

}

const hourlySection = document.querySelector(".hourly-container")
const hourTemplate = document.querySelector(".hourly-card-template")
function renderHourlyWeather(hourly) {
    hourlySection.innerHTML = "";
    console.log(hourly);



    hourly.forEach(hour => {
        const elHourTemplate = hourTemplate.content.cloneNode(true);

        setValue("hourly-hour", `${formatSunRiseSet(hour.timestamp/1000)}`, {parent: elHourTemplate})
        setValue("hourly-humidity", `${hour.humidity}`, {parent: elHourTemplate})
        setValue("hourly-temp", `${hour.temp}`, {parent: elHourTemplate})

        hourlySection.appendChild(elHourTemplate)
    })


}


document.querySelector("#open-left").addEventListener("click", () => document.querySelector(".panel-left").classList.toggle("displayNone"))
document.querySelector("#open-right").addEventListener("click", () => document.querySelector(".panel-right").classList.toggle("displayNone"))
