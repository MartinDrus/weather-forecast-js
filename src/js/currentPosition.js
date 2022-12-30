export const currentPosition = {};

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;
    currentPosition.latitude = crd.latitude;
    currentPosition.longitude = crd.longitude,
    currentPosition.accuracy = crd.accuracy
    currentPosition.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
