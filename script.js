// calling main
main();

/**
 * main function
 */
async function main()
{
    const [lat, long] = await getLocation(); 
    const data = await getWeather(lat, long);
    
    console.log(data.weather.id);
    console.log(data.sys.country);
    console.log(data.name);

    // document.getElementById("country").innerHTML += data.sys.country;
    // document.getElementById("city").innerHTML += data.name;
    // document.getElementById("temperature").innerHTML += data.main.temp;
    // document.getElementById("weatherDesc").innerHTML += data.weather[0].description;
    
}

/**
 * @returns latitude and longitude in the form of tuple
 */
async function getLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return [position.coords.latitude, position.coords.longitude];
    } catch (error) {
      console.log(error);
    }
    return [null, null];
  }

/**
 * Get the info of a place given the lat and long using await
 * @param lat latitude of the location
 * @param long longitude of the location
 * @param units metrics or imperial, if left unfilled it would be metric
 * @param return the data json object containing info
 */
async function getWeather(lat, lon, units = "metric") {
    const apiKey = "75e14ed0cc1e9172da2f18160c44f735";
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();  
        console.log(data)      
        return data;
    }
    
    catch (error) {
        console.log("There are some errors with the API - Long");
        console.log(error);
        return null;
    }
    
}

  



  
  

