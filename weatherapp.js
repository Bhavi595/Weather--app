let map = document.getElementById("page2-div2");
let lat= document.getElementById("lat");
let long = document.getElementById("long");
let Data_detail = document.getElementById("Data-detail");
let = document.getElementById("");
const Base_URL = "https://api.openweathermap.org/data/2.5";
const apiKey = "829c16228a150b746fb202483f946ed0"


function getLocation(){

    navigator.geolocation.getCurrentPosition((success) => {
            let {latitude, longitude} = success.coords;
            makeifram(latitude, longitude);
            setLat_long_value(latitude, longitude);
            fetchData(latitude, longitude);
        }
    )
       
}

function  makeifram(latitude, longitude){
   let ifram = document.createElement("iframe");
   ifram.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;
   ifram.width = "100%";
   ifram.height = "100%";
   map.appendChild(ifram);
}


function setLat_long_value(latitude, longitude){
    lat.innerText = `Lat : ${latitude}`;
    long.innerText =`Long : ${longitude}`;
}

function renderDataInUi(data){
    Data_detail.innerHTML = `<div class="Data">Location : ${data.name}</div>
    <div class="Data"  >Wind Speed : ${data.wind.speed}</div>
    <div class="Data">Humidity : ${data.main.humidity} %</div>
    <div class="Data">Time Zone : GMT +5:30</div>
    <div class="Data">Pressure : ${data.main.pressure} mbar</div>
    <div class="Data">Wind Direction : ${windDirection(data.wind.deg)}</div>
    <div class="Data">UV Index : 1</div>
    <div class="Data">Feels like : ${Math.floor(toCelcius(data.main.feels_like))}</div>
    `

}

function windDirection(degree){
    if(degree == 0){
        return "North";
    }
    if(degree == 90){
        return "East";
    }
    if(degree == 180){
        return "South";
    }
    if(degree == 270){
        return "West";
    }
    if(degree > 0 && degree < 90){
        return "North-East";
    }
    if(degree > 90 && degree < 180){
        return "South-East";
    }
    if(degree > 180 && degree < 270){
        return "South-West";
    }
    if(degree > 180 && degree < 360){
        return "North-West";
    }
}
function toCelcius(temp){
    return temp - 273.15;
}

async function fetchData(latitude, longitude){
    const url = `${Base_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
   try
    { const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    renderDataInUi(data);
    }
    catch(error){
        console.log=("Something went wrong");
    }
}

getLocation()
