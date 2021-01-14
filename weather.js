const weather = document.querySelector(".js-weather");

const API_KEY ="7f1d0ceaadcd8cb5c78233d50264ebba";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response) {
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText =  `🌡️${temperature}℃  🚩${place}`
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position) {
    const latitude =  position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj ={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}

function handleGeoError() {
    console.log("위치정보를 읽어올수가 없엉!!");
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
      askForCords();
    } else{
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}


function init(){
     loadCoords()
}

init()