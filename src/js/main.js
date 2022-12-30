
import { currentPosition } from './currentPosition'
console.log("🚀 ~ file: main.js:3 ~ currentPosition", currentPosition)

  
import fetchCity from './reverseGeocoding'


// const longitude = '8.117036';
// const latitude = '50.458442';


// const longitude = '13.353312';
// const latitude = '52.466783';


const longitude = '10.091579';
const latitude = '53.499099';

// const longitude = '12.4060723';
// const latitude = '51.3467167';

let result = await fetchCity(longitude, latitude);
console.log(result);

console.log("--------------------------");
console.log("format:");
console.log(result[0].text);
console.log(result[3].place_name);

