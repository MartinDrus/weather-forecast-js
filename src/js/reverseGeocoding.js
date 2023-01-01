import axios from "axios";

// Leipzig
// const longitude = '12.4060723';
// const latitude = '51.3467167';

async function getCity(longitude, latitude, posAccuracy){
    console.log("🚀 ~ file: reverseGeocoding.js:8 ~ getCity ~ posAccuracy", posAccuracy)
    return axios.get(`https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=zB69YT8Zm0QVVtdpKiu1`)
    .then(({data}) => {
        if (posAccuracy < 20) {
            return data.features.length > 2 ? data.features[0].text : "";
        }
        return data.features.length > 2 ? data.features[3].text : "";
    })
    .catch(e => {
        console.error(e)
        alert("Error getting location")
    })
}

export default getCity;