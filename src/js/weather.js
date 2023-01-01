import axios from "axios";
import getCity from './reverseGeocoding';





export async function getWeather(lat, lon, timezone) {

    const city = await getCity(lon, lat);

    
    // return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,surface_pressure,cloudcover,windspeed_10m,soil_temperature_0cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,winddirection_10m_dominant&current_weather=true&timezone=${timezone}`)
    // return axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,windspeed_10m,soil_temperature_6cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime', 

    return axios.get('https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,weathercode,surface_pressure,cloudcover,windspeed_10m,soil_temperature_0cm&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,rain_sum,precipitation_hours,winddirection_10m_dominant&current_weather=true&timeformat=unixtime', 
        {
            params: 
                {
                    latitude: lat,
                    longitude: lon,
                    timezone: timezone
                }
        }
    )
    
    .then(( { data }) => {
        console.log(data);
        return {
            position: city,
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data)
        }
    })
}

function parseCurrentWeather({ current_weather, hourly_units, daily }) {
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode,
        winddirection: winddirection
    } = current_weather

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        sunrise: [sunrise],
        sunset: [sunset],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily

    return {
        currentTemp: `${Math.round(currentTemp)}${hourly_units.apparent_temperature}`,
        highTemp: `${Math.round(maxTemp)}${hourly_units.apparent_temperature}`,
        lowTemp: `${Math.round(minTemp)}${hourly_units.apparent_temperature}`,
        highFeelsLike: `${Math.round(maxFeelsLike)}${hourly_units.apparent_temperature}`,
        lowFeelsLike: `${Math.round(minFeelsLike)}${hourly_units.apparent_temperature}`,
        sunrise: sunrise,
        sunset: sunset,
        windSpeed: `${windSpeed}${hourly_units.windspeed_10m}`,
        windDirection: `${winddirection}°`,
        precip: `${precip}${hourly_units.precipitation}`,
        iconCode,
    }
}

function parseDailyWeather({ daily, daily_units }) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: `${Math.round(daily.temperature_2m_max[index])}${daily_units.temperature_2m_max}`
        }
    })
}

function parseHourlyWeather({ hourly, hourly_units, current_weather }) {
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            apparent_temperature: `${hourly.apparent_temperature[index]}${hourly_units.apparent_temperature}`,
            humidity: `${hourly.relativehumidity_2m[index]}${hourly_units.relativehumidity_2m}`,
            cloudCover: `${hourly.cloudcover[index]}${hourly_units.cloudcover}`, 
            iconCode: hourly.weathercode[index],
            temp: `${Math.round(hourly.temperature_2m[index])}${hourly_units.temperature_2m} `,
            feelsLike: `${Math.round(hourly.apparent_temperature[index])}${hourly_units.apparent_temperature}`,
            windSpeed: `${Math.round(hourly.windspeed_10m[index])}${hourly_units.windspeed_10m}`,
            precip: `${Math.round(hourly.precipitation[index] * 100) / 100}${hourly_units.precipitation}`,
            pressure: `${hourly.surface_pressure[index]}${hourly_units.surface_pressure}`,
            soilTemp: `${hourly.soil_temperature_0cm[index]}${hourly_units.soil_temperature_0cm}`

        }
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000 && timestamp <= (current_weather.time * 1000 + 82800000))
}