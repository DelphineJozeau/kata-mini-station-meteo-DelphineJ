// A toi de jouer pour cette partie :-) Happy coding !

const APIgeocoding = "https://nominatim.openstreetmap.org"; // /search?q=Lyon&format=json&addressdetails=1&limit=1
const APImeteo = 0;


const buttonCity = document.querySelector("#buttonCity");

const cityData =  document.querySelector("#city");
const gpsData =  document.querySelector("#gps");
const temperatureData =  document.querySelector("#temperature");
const detailsData =  document.querySelector("#details");

//Coordonnées de la ville avec Nominatim

async function getCityCoordonnees() {
    let cityInput = document.querySelector("#cityInput").value;

    try {
      const response = await fetch(
        `${APIgeocoding}search?q=${cityInput}&format=json&addressdetails=1&limit=1 `     
      );

      const data = await response.json();
      let latitude = data[0].lat;
      let longitude = data[0].lon;

      if (data.error) {
        cityData.innerHTML = "Ville Inconnue";
        gpsData.innerHTML = "Coordonnées introuvables"
      } else {
        cityData.innerHTML = cityInput;
        gpsData.innerHTML = `Coordonnées GPS : ${latitude}, ${longitude}`
      }

    } catch (error) {
      console.error(error);
    }
  }

//executer

buttonCity.addEventListener("click", function ()  {
getCityCoordonnees()
  });




