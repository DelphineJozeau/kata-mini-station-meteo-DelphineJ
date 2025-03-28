const APIgeocoding = "https://nominatim.openstreetmap.org"; // /search?q=Lyon&format=json&addressdetails=1&limit=1
const APImeteo = "https://api.open-meteo.com"; // /v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation,relative_humidity_2m


const buttonCity = document.querySelector("#buttonCity");

const cityData = document.querySelector("#city");
const gpsData = document.querySelector("#gps");
const temperatureData = document.querySelector("#temperature");
const details = document.querySelector("#details");

//Coordonnées de la ville avec Nominatim

async function fetchCoordinates() {
    let cityInput = document.querySelector("#cityInput").value;
    //console.log(cityInput);

    try {
        const response = await fetch(
            `${APIgeocoding}/search?q=${cityInput}&format=json&addressdetails=1&limit=1 `
        );
        //console.log(response);

        const dataNominatim = await response.json();
        let latitude = dataNominatim[0].lat;
        let longitude = dataNominatim[0].lon;

        if (dataNominatim.length === 0) {
            cityData.innerHTML = "Ville non trouvée";
            gpsData.innerHTML = "Coordonnées introuvables"
        }

        else if (cityInput === "") {
            cityData.innerHTML = "Veuillez taper une ville"
        }

        cityData.innerHTML = cityInput;
        gpsData.innerHTML = `Coordonnées GPS : ${latitude}, ${longitude}`
        fetchWeather(latitude, longitude)


    } catch (error) {
        console.error(error);
        cityData.innerHTML = "Une erreur s'est produite."
    }
}

async function fetchWeather(latitude, longitude) {

    try {
        const response = await fetch(
            `${APImeteo}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`
        );

        const data = await response.json();
        let temperature = data.current.temperature_2m;

        temperatureData.innerHTML = "";

        if (data.length === 0) {
            details.innerHTML = " Température inconnue ";
        }

        else {
            temperatureData.innerHTML = `${temperature}°C`;
            details.innerHTML = "température actuelle"
if(temperature <= 10){temperatureData.style.color = "blue"}
else if (temperature > 25){temperatureData.style.color = "red"}
else{temperatureData.style.color = "purple"}
        };

    } catch (error) {
        console.error(error);
        details.innerHTML = "erreur"
    }
}

//executer

buttonCity.addEventListener("click", function () {
    fetchCoordinates();
});




