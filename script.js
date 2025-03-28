// A toi de jouer pour cette partie :-) Happy coding !

const APIgeocoding = "https://nominatim.openstreetmap.org"; // /search?q=Lyon&format=json&addressdetails=1&limit=1
const APImeteo = "https://api.open-meteo.com"; // /v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,precipitation,relative_humidity_2m


const buttonCity = document.querySelector("#buttonCity");

const cityData =  document.querySelector("#city");
const gpsData =  document.querySelector("#gps");
const temperatureData =  document.querySelector("#temperature");
const detailsData =  document.querySelector("#details");

//Coordonnées de la ville avec Nominatim

async function fetchCoordinates() {
    let cityInput = document.querySelector("#cityInput").value;
    //console.log(cityInput);

    try {
      const response = await fetch(
        `${APIgeocoding}/search?q=${cityInput}&format=json&addressdetails=1&limit=1 `     
      );
    console.log(response);


      const dataNominatim = await response.json();
      let latitude = dataNominatim[0].lat;
      let longitude = dataNominatim[0].lon;

      if (dataNominatim.length === 0) {
        cityData.innerHTML = "Ville non trouvée";
        gpsData.innerHTML = "Coordonnées introuvables"
      } 
      
        cityData.innerHTML = cityInput;
        gpsData.innerHTML = `Coordonnées GPS : ${latitude}, ${longitude}`
        fetchWeather(latitude, longitude)
      

    } catch (error) {
      console.error(error);
      cityData.innerHTML = "Une erreur s'est produite."
    }
  }

  async function fetchWeather(latitude, longitude){

    try {
        const response = await fetch(
          `${APImeteo}/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`
        );
        
        const data = await response.json();
        let temperature = data.current_units.temperature_2m;

        if (data.length === 0) {
        temperatureData.innerHTML = " Température inconnue ";
        } 
        
        temperatureData = " "; 
        temperatureData.innerHTML = `${temperature}°C`
        

      } catch (error) {
        console.error(error);
        temperatureData.innerHTML = "erreur"
      }
    }


//executer

buttonCity.addEventListener("click", function ()  {
    fetchCoordinates();
  });




