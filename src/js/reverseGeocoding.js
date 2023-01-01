import axios from "axios";

// Leipzig
// const longitude = '12.4060723';
// const latitude = '51.3467167';

async function getCity(longitude, latitude){
    return axios.get(`https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=zB69YT8Zm0QVVtdpKiu1`)
    .then(({data}) => {
        return data.features.length > 2 ? data.features[3].place_name : "";
    })
    .catch(e => {
        console.error(e)
        alert("Error getting location")
    })
}

export default getCity;